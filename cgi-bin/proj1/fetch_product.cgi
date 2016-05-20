#!/usr/bin/perl
 
use lib '/srv/www/cgi-bin/jadrn022/proj1/modules';
use DBI;
use CGI;
use Db_Helper;
use Session_Helper;

if(is_session_valid()) {
    $q = new CGI;
    my $sku = $q->param( "sku" );

    my $query = "SELECT sku, category.name as category, vendor.name as vendor,
    manufactureID,description, features, cost, retail, image
    FROM product, category, vendor WHERE product.catID = category.id
    AND product.venID = vendor.id
    AND sku='".$sku."';";

    my $arr = db_query_array( $query );

    print "Content-type: text/html\n\n";
    print $arr;
}
else {
    die "Status-Code: 401 Not Authorized";
}

