#!/usr/bin/perl
use lib '/srv/www/cgi-bin/jadrn022/proj1/modules';

use DBI;
use CGI;
use Db_Helper;

    my $query = "select id, name from category";
    my $arr = db_query_array( $query );

    print "Content-type: text/html\n\n";
    print $arr;
