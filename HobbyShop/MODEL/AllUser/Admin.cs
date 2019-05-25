using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace HobbyShop.CLASS
{
    class Admin : Staff
    {
        public override string UserType => "admin";

        public Admin(string username, string password, string firstName, string lastName) : base(username, password, firstName, lastName)
        {
          
        }

    }
}



