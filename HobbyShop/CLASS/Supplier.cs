using System;
using System.Collections.Generic;
using System.Data.OleDb;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using System.Data;
using System.Collections;
using System.Web.Script.Serialization;
namespace HobbyShop

{
    public class Supplier
    {
        private int supID;
        private string supName;
        private string subAddress;
		private double subCreditLine;
       
        public int Id { get { return supID; } set { supID = value; } }
        public string Name { get { return supName; } set { supName = value; } }
        public string Address { get { return supAddress; } set { supAddress = value; } }
        public double CreditLine { get { return supCreditLine; } set { supCreditLine = value; } }

        public Supplier()
        {

        }
        public Supplier(int ID, string Name, string Address, double Credit)
        {
            this.supID=ID;
			this.supName=Name;
			this.supAddress=Address;
			this.supCreditLine=Credit;
        }
       

    }
}