
using System;
using System.Collections.Generic;
using System.Configuration;
using System.Data.OleDb;
using System.Linq;
using System.Web;
using System.Web.Script.Serialization;

namespace HobbyShop.CLASS
{
    public class UserData
    {
       
        string connectionString = ConfigurationManager.ConnectionStrings["dbconnection"].ConnectionString.ToString();

        public List<SystemUser> SearchDatabase(string input)
        {
            using (OleDbConnection con = new OleDbConnection(connectionString))
            {
                try
                {
                    con.Open();
                    string query = "SELECT* FROM Users WHERE GivenName LIKE '%" + input + "%' OR LastName LIKE '%" + input + "%' OR UserName LIKE '%" + input + "%' ORDER BY GivenName";
                    OleDbCommand cmd = new OleDbCommand(query, con);
                    cmd.ExecuteNonQuery();


                    OleDbDataReader reader = cmd.ExecuteReader();
                    List<SystemUser> users = new List<SystemUser>();
                    while (reader.Read())
                    {
                        string userName = Convert.ToString(reader["UserName"]);
                        string passWord = Convert.ToString(reader["Password"]);
                        string firstName = Convert.ToString(reader["GivenName"]);
                        string lastName = Convert.ToString(reader["LastName"]);
                        string userType = Convert.ToString(reader["UserType"]);
                        int id = Convert.ToInt32(reader["ID"]);
                        DateTime? lastLogged = Convert.ToDateTime(reader["LastLoginDate"]);

                        SystemUserFactory _userFactory = null;

                        switch (userType.ToLower())
                        {
                            case "admin":
                                _userFactory = new AdminFactory(userName, passWord, firstName, lastName);
                                break;
                            case "staff":
                                _userFactory = new StaffFactory(userName, passWord, firstName, lastName);
                                break;
                        }

                        SystemUser _user = _userFactory.GetUser();
                        _user.LastLogged = lastLogged;
                        _user.Id = id;
                        users.Add(_user);
                    }
                    return users;
                }
                catch (Exception e)
                {
                    throw new System.ApplicationException(e.Message);
                }
            }

        }
        /*
        // can be used to displayed all Users in Users tab
        public List<User> returnUsersCheck(string username, string password)
        {
            using (OleDbConnection con = new OleDbConnection(connectionString))
            {
                try
                {
                    con.Open();
                    string query = "SELECT * FROM Users WHERE UserName='" + username + "' AND Password='" + password + "'";
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
                        int id = Convert.ToInt32(reader["ID"]);
                        DateTime? lastLogged = Convert.ToDateTime(reader["LastLoginDate"]);

                        User _user = new User();
                        _user.UserName = userName;
                        _user.PassWord = passWord;
                        _user.FirstName = firstName;
                        _user.LastName = lastName;
                        _user.UserType = userType;
                        _user.lastLogged = lastLogged;
                        _user.Id = id;
                        users.Add(_user);
                    }
                    return users;
                }
                catch (Exception e)
                {
                    throw new System.ApplicationException(e.Message);
                }
            }

        }
        public void updateLoginTime(string username, DateTime loginTime)
        {
            using (OleDbConnection con = new OleDbConnection(connectionString))
            {
                try
                {
                    con.Open();
                    // Update Login DateTime
                    string query = "UPDATE Users SET LastLoginDate='" + loginTime + "' WHERE UserName='" + username + "'";
                    OleDbCommand cmd = new OleDbCommand(query, con);
                    cmd.ExecuteNonQuery();
                }
                catch (Exception e)
                {
                    throw new System.ApplicationException(e.Message);
                }
            }
        }

        public List<String> createAccount(string username, string password, string lastname, string firstname, string usertype)
        {
            using (OleDbConnection con = new OleDbConnection(connectionString))
            {
                try
                {
                    OleDbCommand cmd = new OleDbCommand();
                    cmd.Connection = con;
                    con.Open();

                    string sql = "SELECT * from Users where UserName='" + username + "'";
                    cmd.CommandText = sql;
                    OleDbDataReader reader = cmd.ExecuteReader();
                    List<String> results = new List<String>();
                    int count = 0;
                    User _user = new User();
                    while (reader.Read())
                    {
                        string userName = Convert.ToString(reader["UserName"]);
                        string passWord = Convert.ToString(reader["Password"]);
                        string firstName = Convert.ToString(reader["GivenName"]);
                        string lastName = Convert.ToString(reader["LastName"]);
                        string userType = Convert.ToString(reader["UserType"]);
                        DateTime? lastLogged = Convert.ToDateTime(reader["LastLoginDate"]);
                        int id = Convert.ToInt32(reader["ID"]);
                        _user.Id = id;
                        _user.UserName = userName;
                        _user.PassWord = passWord;
                        _user.FirstName = firstName;
                        _user.LastName = lastName;
                        _user.UserType = userType;
                        _user.lastLogged = lastLogged;
                        count += 1;
                        string json = new JavaScriptSerializer().Serialize(_user);
                        results.Add(json);
                    }

                    con.Close();
                    if (count == 1)
                    {
                        results.Add("User already exists");
                    }

                    else if (count == 0)
                    {
                        con.Open();
                        sql = "INSERT INTO Users(UserName,Password,GivenName,LastName,UserType) VALUES (@username,@password,@given,@last,@type)";
                        cmd.CommandText = sql;
                        cmd.ExecuteNonQuery();
                        con.Close();
                        _user = new User(username, password, firstname, lastname, usertype);
                        string json = new JavaScriptSerializer().Serialize(_user);
                        results.Add(json);
                        results.Add("New account successfully created");
                    }
                    return results;

                }
                catch (Exception ex)
                {
                    throw new System.ApplicationException(ex.Message);
                }
            }
        }
        public User SearchByUsername(string username)
        {
            using (OleDbConnection con = new OleDbConnection(connectionString))
            {
                try
                {
                    con.Open();
                    string query = "SELECT * FROM Users WHERE UserName='" + username + "'";
                    OleDbCommand cmd = new OleDbCommand(query, con);
                    cmd.ExecuteNonQuery();

                    OleDbDataReader reader = cmd.ExecuteReader();
                    User _user = new User();
                    while (reader.Read())
                    {
                        int id = Convert.ToInt32("ID");
                        string password = Convert.ToString(reader["Password"]);
                        string firstname = Convert.ToString(reader["GivenName"]);
                        string lastname = Convert.ToString(reader["LastName"]);
                        string usertype = Convert.ToString(reader["UserType"]);
                        DateTime loginTime = Convert.ToDateTime(reader["LastLoginDate"]);
                        _user.Id = id;
                        _user.FirstName = firstname;
                        _user.LastName = lastname;
                        _user.UserType = usertype;
                        _user.UserName = username;
                        _user.PassWord = password;

                    }
                    return _user;
                }
                catch (Exception e)
                {
                    throw new System.ApplicationException(e.Message);
                }
            }
        }
        public void DeleteUser()
        {
            using (OleDbConnection con = new OleDbConnection(connectionString))
            {
                try
                {
                    con.Open();
                    string query = "DELETE FROM Users WHERE UserName=@username";
                    OleDbCommand cmd = new OleDbCommand(query, con);
                    cmd.Parameters.AddWithValue("@username", username);

                    cmd.ExecuteNonQuery();
                }
                catch (Exception e)
                {
                    throw new System.ApplicationException(e.Message);
                }
            }
        } */
    }
}