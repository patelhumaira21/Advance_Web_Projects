#!/usr/bin/perl

use CGI;
use CGI::Session;
use CGI::Carp qw (fatalsToBrowser);
use Crypt::SaltedHash;

my $q = new CGI;
print $q->header();
my $cookie_sid = $q->cookie('jadrn022SID');
my $session = new CGI::Session(undef, $cookie_sid, {Directory=>'/tmp'});
my $sid = $session->id;



if($cookie_sid ne $sid) {
    print <<END;

<html>
<head>
    <meta http-equiv="refresh" 
        content="0; url=http://jadran.sdsu.edu/~jadrn022/proj1/index.html" />
</head><body>

</body>
</html>

END

}
else {

open(DATA, "</srv/www/cgi-bin/jadrn022/proj1/application.txt") or die "Cannot open file";
@lines = <DATA>;
close DATA;
foreach $line (@lines) {
    print "$line\n";
    }
END

}
