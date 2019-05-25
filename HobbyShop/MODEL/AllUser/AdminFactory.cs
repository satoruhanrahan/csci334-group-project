using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace HobbyShop.CLASS
{
     class AdminFactory: StaffFactory
    {
        private string username;
        private string password;
        private string firstName;
        private string lastName;

     
        public AdminFactory(string username, string password, string firstName, string lastName) : base(username, password, firstName, lastName)
        {
           
        }
        public new Staff GetUser()
        {
            return new Admin(username, password, firstName, lastName);
        }
    }
}