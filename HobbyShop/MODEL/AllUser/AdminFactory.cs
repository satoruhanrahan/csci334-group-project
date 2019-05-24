using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace HobbyShop.CLASS
{
     class AdminFactory: SystemUserFactory
    {
        private string username;
        private string password;
        private DateTime? lastLogged;
        private string firstName;
        private string lastName;
        private int ID;

       
        public AdminFactory() { }
        public AdminFactory(string username, string password, string firstName, string lastName)
        {
            this.username = username;
            this.password = password;
            this.firstName = firstName;
            this.lastName = lastName;
        }
        public override SystemUser GetUser()
        {
            return new Admin(username, password, firstName, lastName);
        }
    }
}