using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace HobbyShop.CLASS
{
    public abstract class SystemUser
    {
        public int Id { get; set; }
        public string UserName { get; set; }
        public string PassWord { get; set; }
        public DateTime? LastLogged { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public abstract string UserType { get; }

        public SystemUser(string username, string password, string firstName, string lastName)
        {
            this.UserName = username;
            this.PassWord = password;
            this.FirstName = firstName;
            this.LastName = lastName;
        }
    }
}