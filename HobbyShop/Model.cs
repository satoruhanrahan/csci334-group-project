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
   
    public class Model
    {
        OleDbConnection con = new OleDbConnection("Provider=Microsoft.JET.OLEDB.4.0; Data Source=" + System.Web.Hosting.HostingEnvironment.MapPath("~/Database.mdb"));
        OleDbCommand cmd = new OleDbCommand();
        private string itemName;
        public string Name
        {
            get { return itemName; }
        }

        private int itemNum;
        public int ID
        {
            get { return itemNum; }
        }

        private string itemType;
        public string Type
        {
            get { return itemType; }
        }

        private string itemSbjArea;
        public string SbjArea
        {
            get { return itemSbjArea; }
        }

        private int itemPrice;
        public int Price
        {
            get { return itemPrice; }
        }
        private string itemDes;
        public string Description
        {
            get { return itemDes; }
        }

        private string itemAvail;
        public string Availability
        {
            get { return itemAvail; }
        }

        public Model(string name, string type, string sbjArea, int price, string description, string availability)     //validate in constructor
        {
            if (con.State == System.Data.ConnectionState.Closed)
            {
                cmd.Connection = con;
                con.Open();
            }
            string query = "SELECT* FROM Models ";
            cmd = new OleDbCommand(query, con);

            OleDbDataReader reader = cmd.ExecuteReader();
            int countNum=0;
            // automatically generate a number id for a new model
            while (reader.Read())
            {
                countNum = countNum + 1;
            }

            if (name.Trim() == "" || type.Trim() == "" || sbjArea.Trim() == "" || price.ToString().Trim() == "" || description.Trim() == "" || availability.Trim() == "")
            {
                throw new System.ArgumentException("No field is empty!");
            }

            this.itemName = name;
            this.itemNum = countNum + 1;
            this.itemType = type;
            this.itemSbjArea = sbjArea;
            this.itemPrice = price;
            this.itemDes = description;
            this.itemAvail = availability;

        }
    }
}