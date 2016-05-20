#!/usr/bin/perl
use lib '/srv/www/cgi-bin/jadrn022/proj1/modules';

use DBI;
use CGI;
use Db_Helper;
use File::Basename;
use Session_Helper;

# check for a valid session.
if(is_session_valid()) {
    $q = new CGI;
    my $sku = $q->param("sku");
    my $category= $q->param("category");
    my $vendor = $q->param("vendor");
    my $manufacture_id = $q->param("manufacture_id");
    my $description = $q->param("description");
    my $features = $q->param("features");
    my $cost = $q->param("cost");
    my $retail = $q->param("retail");
    my $filename = $q->param("product_img");
    my ($name, $path, $extension) = fileparse($filename,qr/\.[^.]*/);
    my $image = $sku.$extension;

    my $update_statement = "UPDATE product SET
                            catID = ".$category.",
                            venID = ".$vendor.",
                            manufactureID = '".$manufacture_id."',
                            description = '".$description."',
                            features = '".$features."',
                            cost = ".$cost.",
                            retail = ".$retail.",
                            image = '".$image."'
                            WHERE sku = '".$sku."';";

    if(db_delete_update($update_statement)) {

        print "Content-type: text/html\n\n";
        print "SUCCESS";
    }
}
else {
    die "Status-Code: 401 Not Authorized";
}