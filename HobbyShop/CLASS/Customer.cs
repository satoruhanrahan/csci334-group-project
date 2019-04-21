using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Text.RegularExpressions;

namespace HobbyShop
{
    public class Customer
    {
        private string cusName;
        private int cusNum;
        private string cusAddress;
        private string cusEmail;
        private int cusPhone;
        private int cusCreditLine;
        private double cusBalance;
        private bool cusMemberStatus;
        private DateTime cusJoinDate;

        public int Id { get { return cusNum; } set { cusNum = value; } }
        public string Name { get { return cusName; } set { cusName = value; } }
        public string Address { get { return cusAddress; } set { cusAddress = value; } }
        public string Email { get { return cusEmail; } set { cusEmail = value; } }
        public int Phone { get { return cusPhone; } set { cusPhone = value; } }
        public int CreditLine { get { return cusCreditLine; } set { cusCreditLine = value; } }
        public double Balance { get { return cusBalance; } set { cusBalance = value; } }
        public bool MemberStatus { get { return cusMemberStatus; } set { cusMemberStatus = value; } }
        public DateTime JoinDate { get { return cusJoinDate; } set { cusJoinDate = value; } }

        public Customer(string cusName, int cusNum, string cusAddress, int cusPhone, int cusCreditLine, int cusBalance, bool cusMemberStatus, DateTime cusJoinDate, string cusEmail)    
        {
            this.cusName = cusName;
            this.cusNum = cusNum;
            this.cusPhone = cusPhone;
            this.cusAddress = cusAddress;
            this.cusCreditLine = cusCreditLine;
            this.cusBalance = cusBalance;
            this.cusMemberStatus = cusMemberStatus;
            this.cusJoinDate = cusJoinDate;
            this.cusEmail = cusEmail;

        }
    }
}