﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Text.RegularExpressions;
using System.Data.OleDb;
using System.Configuration;

namespace HobbyShop
{
    public class Customer
    {
        private string cusName;
        private int cusNum;
        private string cusAddress;
        private string cusEmail;
        private string cusPhone;
        private double cusCreditLine;
        private double cusBalance;
        private string cusMemberStatus;
        private DateTime cusJoinDate;

        public int Id { get { return cusNum; } set { cusNum = value; } }
        public string Name { get { return cusName; } set { cusName = value; } }
        public string Address { get { return cusAddress; } set { cusAddress = value; } }
        public string Email { get { return cusEmail; } set { cusEmail = value; } }
        public string Phone { get { return cusPhone; } set { cusPhone = value; } }
        public double CreditLine { get { return cusCreditLine; } set { cusCreditLine = value; } }
        public double Balance { get { return cusBalance; } set { cusBalance = value; } }
        public string MemberStatus { get { return cusMemberStatus; } set { cusMemberStatus = value; } }
        public DateTime JoinDate { get { return cusJoinDate; } set { cusJoinDate = value; } }

        public Customer ()
        {

        }
        public Customer(string cusName, string cusAddress, string cusPhone, double cusCreditLine, double cusBalance, string cusMemberStatus, DateTime cusJoinDate, string cusEmail)    
        {
            this.cusName = cusName;
            this.cusPhone = cusPhone;
            this.cusAddress = cusAddress;
            this.cusCreditLine = cusCreditLine;
            this.cusBalance = cusBalance;
            this.cusMemberStatus = cusMemberStatus;
            this.cusJoinDate = cusJoinDate;
            this.cusEmail = cusEmail;
        }
        string connectionString = ConfigurationManager.ConnectionStrings["dbconnection"].ConnectionString.ToString();

        public void Add()
        {
            using (OleDbConnection con = new OleDbConnection(connectionString))
            {
                try
                {
                    con.Open();
                    string query = "INSERT INTO Customer (Name,Address,PhoneNumber,CreditLine,CurrentBalance,ClubMemberStatus,ClubMemberJoinDate,EmailAddress) VALUES (@name,@add,@phone,@credit,@balance,@status,@join,@email)";
                    OleDbCommand cmd = new OleDbCommand(query, con);
                    cmd.Parameters.AddWithValue("@name", cusName);
                    cmd.Parameters.AddWithValue("@add", cusAddress);
                    cmd.Parameters.AddWithValue("@phone", cusPhone);
                    cmd.Parameters.AddWithValue("@credit", cusCreditLine);
                    cmd.Parameters.AddWithValue("@balance", cusBalance);
                    cmd.Parameters.AddWithValue("@status", cusMemberStatus);
                    cmd.Parameters.AddWithValue("@join", cusJoinDate);
                    cmd.Parameters.AddWithValue("@email", cusEmail);
            
                    cmd.ExecuteNonQuery();
                }
                catch (Exception ex)
                {
                    throw new System.ApplicationException(ex.Message);
                }
            }
        }
        public Customer SearchByID(int id)
        {
            using (OleDbConnection con = new OleDbConnection(connectionString))
            {
                try
                {
                    con.Open();
                    string query = "SELECT * FROM Customer WHERE CustomerNumber=" + id;
                    OleDbCommand cmd = new OleDbCommand(query, con);
                    cmd.ExecuteNonQuery();

                    OleDbDataReader reader = cmd.ExecuteReader();

                    Customer _cus = new Customer();
                    while (reader.Read())
                    {
                        int cusNum = Convert.ToInt32(reader["CustomerNumber"]);
                        string cusName = Convert.ToString(reader["Name"]);
                        string cusAddress = Convert.ToString(reader["Address"]);
                        string cusPhone = Convert.ToString(reader["PhoneNumber"]);
                        double cusCredit = Convert.ToDouble(reader["CreditLine"]);
                        double cusBalance = Convert.ToDouble(reader["CurrentBalance"]);
                        string cusStatus = Convert.ToString(reader["ClubMemberStatus"]);
                        DateTime cusJoin = Convert.ToDateTime(reader["ClubMemberJoinDate"]);
                        string cusEmail = Convert.ToString(reader["EmailAddress"]);

                        _cus = new Customer(cusName, cusAddress, cusPhone, cusCredit, cusBalance, cusStatus, cusJoin, cusEmail);
                        _cus.Id = cusNum;

                    }
                    return _cus;
                }
                catch (Exception e)
                {
                    throw new System.ApplicationException(e.Message);
                }
            }
        }
        public List<Customer> SearchDatabase(string input)
        {
            using (OleDbConnection con = new OleDbConnection(connectionString))
            {
                try
                {
                    con.Open();
                    string query = "SELECT * FROM Customer WHERE Name LIKE '%" + input + "%' OR Address LIKE '%" + input + "%'  ORDER BY Name";
                    OleDbCommand cmd = new OleDbCommand(query, con);
                    cmd.ExecuteNonQuery();

                    OleDbDataReader reader = cmd.ExecuteReader();
                    List<Customer> cusList = new List<Customer>();
                    
                    while (reader.Read())
                    {
                        int cusNum = Convert.ToInt32(reader["CustomerNumber"]);
                        string cusName = Convert.ToString(reader["Name"]);
                        string cusAddress = Convert.ToString(reader["Address"]);
                        string cusPhone = Convert.ToString(reader["PhoneNumber"]);
                        double cusCredit = Convert.ToDouble(reader["CreditLine"]);
                        double cusBalance = Convert.ToDouble(reader["CurrentBalance"]);
                        string cusStatus = Convert.ToString(reader["ClubMemberStatus"]);
                        DateTime cusJoin = Convert.ToDateTime(reader["ClubMemberJoinDate"]);
                        string cusEmail = Convert.ToString(reader["EmailAddress"]);

                        Customer _cus = new Customer(cusName, cusAddress, cusPhone, cusCredit, cusBalance, cusStatus, cusJoin, cusEmail)
                        {
                            Id = cusNum
                        };
                        cusList.Add(_cus);

                    }
                    return cusList;
                }
                catch (Exception e)
                {
                    throw new System.ApplicationException(e.Message);
                }
            }
        }
        public void Update()
        {
            using (OleDbConnection con = new OleDbConnection(connectionString))
            {
                try
                {
                    con.Open();
                    string query = "UPDATE Customer SET Name=@name,Address=@add,PhoneNumber=@phone,CreditLine=@credit,CurrentBalance=@balance,ClubMemberStatus=@status,ClubMemberJoinDate=@join,EmailAddress=@email WHERE ItemNumber=@id";
                    OleDbCommand cmd = new OleDbCommand(query, con);
                    cmd.Parameters.AddWithValue("@name", cusName);
                    cmd.Parameters.AddWithValue("@add", cusAddress);
                    cmd.Parameters.AddWithValue("@phone", cusPhone);
                    cmd.Parameters.AddWithValue("@credit", cusCreditLine);
                    cmd.Parameters.AddWithValue("@balance", cusBalance);
                    cmd.Parameters.AddWithValue("@status", cusMemberStatus);
                    cmd.Parameters.AddWithValue("@join", cusJoinDate);
                    cmd.Parameters.AddWithValue("@email", cusEmail);
                    cmd.Parameters.AddWithValue("@id", cusNum);

                    cmd.ExecuteNonQuery();
                }
                catch (Exception e)
                {
                    throw new System.ApplicationException(e.Message);
                }
            }
        }
        public void Delete()
        {
            using (OleDbConnection con = new OleDbConnection(connectionString))
            {
                try
                {
                    con.Open();
                    string query = "DELETE FROM Customer WHERE CustomerNumber=@id";
                    OleDbCommand cmd = new OleDbCommand(query, con);
                    cmd.Parameters.AddWithValue("@id", cusNum);

                    cmd.ExecuteNonQuery();
                }
                catch (Exception e)
                {
                    throw new System.ApplicationException(e.Message);
                }
            }
        }
    }
}