#!/usr/bin/perl
use lib '/srv/www/cgi-bin/jadrn022/proj1/modules';

use DBI;
use CGI;
use Db_Helper;
use Session_Helper;

if(is_session_valid()) {
    $q = new CGI;
    my $sku = $q->param( "sku" );

    my $delete_statement = "DELETE FROM product WHERE sku = '".$sku."';";

    if (db_delete_update( $delete_statement )) {
        print "Content-type: text/html\n\n";
        print "SUCCESS";
    }
}
else {
    die "Status-Code: 401 Not Authorized";
}
