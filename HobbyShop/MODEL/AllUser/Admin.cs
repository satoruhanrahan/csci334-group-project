using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace HobbyShop.CLASS
{
    class Admin : SystemUser
    {
        private readonly string userType;
        public override string UserType { get { return userType; }  }

        public Admin(string username, string password, string firstName, string lastName) : base(username, password, firstName, lastName)
        {
            this.userType = "admin";
        }
    }
}