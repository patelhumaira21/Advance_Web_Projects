#!/usr/bin/perl
use lib '/srv/www/cgi-bin/jadrn022/proj1/modules';

use CGI;
use CGI::Carp qw (fatalsToBrowser);
use File::Basename;
use Session_Helper;

unless(is_session_valid()){
    die "Status-Code: 401 Not Authorized";
}
####################################################################
### constants
$CGI::POST_MAX = 1024 * 3000; # Limit file size to 3MB
my $upload_dir = '/home/jadrn022/public_html/proj1/_uploads';
my $safe_filename_chars = "a-zA-Z0-9_.-";
####################################################################

my $q = new CGI;
my $filename = $q->param("product_img");
my $sku = $q->param("sku");
unless($filename) {
    die "There was a problem uploading the image; ".
            "it's probably too big.";
}

my $mimetype = $q->uploadInfo($filename)->{'Content-Type'};

# check the mime type and if it is not an image, reject it.
if($mimetype !~ /image/) {
    die "Invalid mime type, $mimetype";
}

my ($name, $path, $extension) = fileparse($filename,qr/\.[^.]*/);
$filename = $sku.$extension;
$filename =~ s/ //; #remove any spaces
if($filename !~ /^([$safe_filename_chars]+)$/) {
    die "Sorry, invalid character in the filename.";
}

$filename = untaint($filename);
$filename = lc($filename);
# get a handle on the uploaded image
my $filehandle = $q->upload("product_img");

unless($filehandle) { die "Invalid handle"; }

# save the file
open UPLOADFILE, ">$upload_dir/$filename" or die
    "Error, cannot save the file.";
binmode UPLOADFILE;
while(<$filehandle>) {
    if($_ =~ /\<\?php/) {
        die "Invalid file, php tag found!";
    }
    print UPLOADFILE $_;
}
close UPLOADFILE;

print "Content-type:text/html\n\n";

print $filename;

sub untaint {
    if($filename =~ m/^(\w+)$/) { die "Tainted filename!"; }
    return $1;
}
