#!/usr/bin/perl

use CGI;
use CGI::Session;
use CGI::Carp qw (fatalsToBrowser);
use Crypt::SaltedHash;

##---------------------------- MAIN ---------------------------------------

authenticate_user();
   

###########################################################################

sub authenticate_user {
    $q = new CGI;
    my $user = $q->param("user");
    my $password = $q->param("password");    
    open DATA, "</srv/www/cgi-bin/jadrn022/proj1/passwords.dat" 
        or die "Cannot open file.";
    @file_lines = <DATA>;
    close DATA;

    $OK = 0; #not authorized

    foreach $line (@file_lines) {
       	chomp $line;
        ($stored_user, $stored_pass) = split /=/, $line; 
	
        if($stored_user eq $user && Crypt::SaltedHash->validate($stored_pass, $password))  {
            $OK = 1;
            last;
            }
        }
        if($OK) {

            my $session = new CGI::Session(undef, undef, {Directory=>'/tmp'});
            $session->expires('+1d');
            my $cookie = $q->cookie(
                -name       => 'jadrn022SID',
                -value      => $session->id,
                -expires    => '+1h');
            print $q->header( -cookie=>$cookie ); #send cookie with session ID to browser
            my $sid = $session->id;
            $session->param('user',$user);
            print "OK";          
            }    
        else {
            print $q->header();
            #print "ERROR, username ".$user." password: ".$password;
            }
    }
