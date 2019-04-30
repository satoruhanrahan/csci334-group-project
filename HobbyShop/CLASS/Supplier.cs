using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace HobbyShop.CLASS
{
    public class Supplier
    {
        private int supID;
        private string supName;
        private string supAddress;
        private double supCreditLine;

        public int Id { get { return supID; } set { supID = value; } }
        public string Name { get { return supName; } set { supName = value; } }
        public string Address { get { return supAddress; } set { supAddress = value; } }
        public double CreditLine { get { return supCreditLine; } set { supCreditLine = value; } }

        public Supplier()
        {

        }
        public Supplier(int ID, string Name, string Address, double Credit)
        {
            this.supID = ID;
            this.supName = Name;
            this.supAddress = Address;
            this.supCreditLine = Credit;
        }
    }
}