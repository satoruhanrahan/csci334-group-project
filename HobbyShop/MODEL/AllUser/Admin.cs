using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace HobbyShop.CLASS
{
    class Admin : SystemUser
    {
        private readonly string userType;
        private string username;
        private string password;
        private DateTime? lastLogged;
        private string firstName;
        private string lastName;
        private int ID;

        public override int Id { get { return ID; } set { ID = value; } }
        public override string UserType { get { return userType; }  }
        public override string UserName { get { return username; } set { username = value; } }
        public override string PassWord { get { return password; } set { password = value; } }
        public override DateTime? LastLogged { get { return lastLogged; } set { lastLogged = value; } }
        public override string FirstName { get { return firstName; } set { firstName = value; } }
        public override string LastName { get { return lastName; } set { lastName = value; } }
        public Admin() { }
        public Admin(string username, string password, string firstName, string lastName)
        {
            this.username = username;
            this.password = password;
            this.firstName = firstName;
            this.lastName = lastName;
            this.userType = "admin";
        }
    }
}