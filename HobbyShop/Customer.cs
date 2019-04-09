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
        public string Name
        {
            get { return cusName; }
        }

        private int cusNum;
        public int ID
        {
            get { return cusNum; }
        }

        private string cusAddress;
        public string Address
        {
            get { return cusAddress; }
        }

        private int cusPhone;
        public int PhoneNumber
        {
            get { return cusPhone; }
        }

        private int cusCreditLine;
        public int CreditLine
        {
            get { return cusCreditLine; }
        }
        private int cusBalance;
        public int Balance
        {
            get { return cusBalance; }
        }

        private bool cusMemberStatus;
        public bool MemberStatus
        {
            get { return cusMemberStatus; }
        }

        private DateTime cusJoinDate;
        public DateTime JoinDate
        {
            get { return cusJoinDate; }
        }

        private string cusEmail;
        public string Email
        {
            get { return cusEmail; }
        }



        public Customer(string cusName, int cusNum, string cusAddress, int cusPhone, int cusCreditLine, int cusBalance, bool cusMemberStatus, DateTime cusJoinDate, string cusEmail)     //validate in constructor
        {

            string joinDate = cusJoinDate.ToString("dd MMMM yyyy hh:mm:ss tt");


            if (cusMemberStatus = true && joinDate.Trim() == "")
            {
                throw new System.ArgumentException("Please input join date");
            }
            if (cusMemberStatus = false && joinDate.Trim() != "")
            {
                throw new System.ArgumentException("Not a member, please remove join date");
            }
            if (cusName.Trim() == "" || cusNum.ToString().Trim() == "" || cusAddress.Trim() == "" || cusPhone.ToString().Trim() == "" || cusCreditLine.ToString().Trim() == "" || cusBalance.ToString().Trim() == ""|| cusEmail.Trim() == "")
            {
                throw new System.ArgumentException("No field is empty!");
            }

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