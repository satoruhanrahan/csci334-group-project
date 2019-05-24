using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace HobbyShop.CLASS
{
    public abstract class SystemUser
    {
        public abstract int Id { get; set; }
        public abstract string UserName { get; set; }
        public abstract string PassWord { get; set; }
        public abstract DateTime? LastLogged { get; set; }
        public abstract string FirstName { get; set; }
        public abstract string LastName { get; set; }
        public abstract string UserType { get;  }
    }
}