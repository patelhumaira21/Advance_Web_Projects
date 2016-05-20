package Session_Helper;

use CGI;
use CGI::Session;
use CGI::Carp qw (fatalsToBrowser);
use Crypt::SaltedHash;

require Exporter;
@ISA = qw(Exporter);
@EXPORT = qw(is_session_valid);

sub is_session_valid {
    my $q = new CGI;
    my $saved_sid = $q->cookie( 'jadrn022SID' );
    my $session = new CGI::Session( undef, $saved_sid, { Directory => '/tmp' } );
    my $sid = $session->id;
    my $who = $session->param( 'user' );
    return($saved_sid eq $sid && $who);
}

1;