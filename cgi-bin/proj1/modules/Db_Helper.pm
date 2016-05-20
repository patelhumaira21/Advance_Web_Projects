package Db_Helper;

use DBI;
use CGI;
use JSON;

require Exporter;
@ISA = qw(Exporter);
@EXPORT = qw(db_insert db_query_array db_delete_update);

sub get_db_handle {
    my $host = "opatija.sdsu.edu";
    my $port = "3306";
    my $database = "jadrn022";
    my $username = "jadrn022";
    my $password = "removal";
    my $database_source = "dbi:mysql:$database:$host:$port";
    my $response = "";

    my $dbh = DBI->connect($database_source, $username, $password)
        or die 'Cannot connect to db';
    return $dbh;
}

sub db_insert {
    my $sql = shift @_;
    my $dbh = get_db_handle();
    my $num_rows_affected = $dbh->do($sql);
    $dbh->disconnect();
    return $num_rows_affected
}

sub db_delete_update {
    my $sql = shift @_;
    my $dbh = get_db_handle();
    my $sth = $dbh->prepare($sql);
    my $num_rows_deleted = $sth->execute();
    $sth->finish();
    $dbh->disconnect();
    return $num_rows_deleted
}

sub db_query_array {
    my @arr;
    my $sql = shift @_;
    my $dbh = get_db_handle();
    my $sth = $dbh->prepare($sql);
    $sth->execute();
    while(my @row=$sth->fetchrow_array()) {
      push(@arr, \@row);
    }
    $sth->finish();
    $dbh->disconnect();
    return encode_json(\@arr);
}
1;
