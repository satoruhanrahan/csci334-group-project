using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace HobbyShop.CLASS
{
     class StaffFactory
    {
        
        private string username;
        private string password;
        private string firstName;
        private string lastName;

        public StaffFactory(string username, string password, string firstName, string lastName)
        {
            this.username = username;
            this.password = password;
            this.firstName = firstName;
            this.lastName = lastName;
        }
        public  Staff GetUser()
        {
            return new Staff(username, password, firstName, lastName);
        }
    }
}