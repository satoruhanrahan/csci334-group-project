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
    public class SupplierContact
    {
        
        private int contactID;
        private string contactName;
        private string contactPhone;
       
        public int Id { get { return contactID; } set { contactID = value; } }
        public string Name { get { return contactName; } set { contactName = value; } }
        public string Address { get { return contactPhone; } set { contactPhone = value; } }
       


        public Supplier()
        {

        }
        public Supplier(int ID, string Name, string Phone)
        {
            this.contactID=ID;
			this.contactName=Name;
			this.contactPhone=Phone;
        }
       

    }
}