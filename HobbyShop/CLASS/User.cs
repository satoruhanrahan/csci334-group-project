using System;
using System.Collections.Generic;
using System.Configuration;
using System.Data.OleDb;
using System.Linq;
using System.Web;

namespace HobbyShop.CLASS
{
    public class User
    {
        private string username;
        private string password;
        private DateTime? lastLogged;
        private string firstName;
        private string lastName;
        private string userType;

        public string UserName { get { return username; } set { username = value; } }
        public string PassWord { get { return password; } set { password = value; } }
        public DateTime? LastLogged { get { return lastLogged; } set { lastLogged = value; } }
        public string FirstName { get { return firstName; } set { firstName = value; } }
        public string LastName { get { return lastName; } set { lastName = value; } }
        public string UserType { get { return userType; } set { userType = value; } }

        public User() { }
        public User(string username,string password, string firstName,string lastName,string userType)
        {
            this.username = username;
            this.password = password;
            this.firstName = firstName;
            this.lastName = lastName;
            this.userType = userType;
            this.lastLogged = null;
        }
        string connectionString = ConfigurationManager.ConnectionStrings["dbconnection"].ConnectionString.ToString();
        public List<User> loginToAccount(string username,string password, DateTime loginTime)
        {
            using (OleDbConnection con = new OleDbConnection(connectionString))
            {
                try
                {
                    con.Open();
                    string query = "SELECT * FROM Users WHERE UserName='" + username +"' AND Password='" + password +"'";
                    OleDbCommand cmd = new OleDbCommand(query, con);
                    cmd.ExecuteNonQuery();


                    OleDbDataReader reader = cmd.ExecuteReader();
                    List<User> users = new List<User>();
                    while (reader.Read())
                    {
                        string userName = Convert.ToString(reader["UserName"]);
                        string passWord = Convert.ToString(reader["Password"]);
                        string firstName = Convert.ToString(reader["GivenName"]);
                        string lastName = Convert.ToString(reader["LastName"]);
                        string userType = Convert.ToString(reader["UserType"]);
                        //DateTime? lastLogged = Convert.ToDateTime(reader["LastLoginDate"]);
                        User _user = new User();
                        _user.UserName = userName;
                        _user.PassWord = passWord;
                        _user.FirstName = firstName;
                        _user.LastName = lastName ;
                        _user.UserType = userType;
                        _user.lastLogged = loginTime;

                        users.Add(_user);
                    }
                    // Update Login DateTime
                    query = "UPDATE Users SET LastLoginDate='" + loginTime + "' WHERE UserName='" +username +"'";
                    cmd = new OleDbCommand(query, con);
                    cmd.ExecuteNonQuery();

                    return users;
                }
                catch (Exception e)
                {
                    throw new System.ApplicationException(e.Message);
                }
            }
        }
    }
}