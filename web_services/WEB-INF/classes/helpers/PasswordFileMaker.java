package helpers;

import sun.security.util.Password;

import java.lang.Boolean;
import java.lang.System;
import java.security.*;
import java.util.*;
import java.io.*;

public class PasswordFileMaker {
    private String username, clearTextPassword, encryptedPassword;
            
        public PasswordFileMaker(String usr, String pass) {
            username = usr.trim();
            clearTextPassword = pass.trim();
            encryptedPassword = PasswordUtilities.getEncryptedPassword(clearTextPassword);
            }

        private void insertIntoDb() {
            boolean dbResult = DBHelper.runUpdateQuery("Insert into user values('"+username+"','"+encryptedPassword+"');");
            }
      
        public static void main(String [] args) {
            if(args.length != 2) {
                System.out.println("Usage:\njava PasswordFileMaker" +
                "  USERNAME  PASSWORD");
                return;
                }
    
            PasswordFileMaker maker = new PasswordFileMaker(args[0], args[1]);
            maker.insertIntoDb();
        }    
}    
        
