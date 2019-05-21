using System;
using System.Collections.Generic;
using System.Configuration;
using System.Data.OleDb;
using System.Linq;
using System.Web;

namespace HobbyShop.CLASS
{
    public class Inventory
    {
        private int storeID;
        private int itemID;
        private int itemCount;
        private string itemLocation;
        private DateTime firstStocked;

        public int StoreID { get { return storeID; } set { storeID = value; } }
        public int ItemID { get { return itemID; } set { storeID = itemID; } }
        public int ItemCount { get { return itemCount; } set { itemCount = value; } }
        public string ItemLocation { get { return itemLocation; } set { itemLocation = value; } }
        public DateTime FirstStocked { get { return firstStocked; } set { firstStocked = value; } }

        public Inventory()
        {

        }
        public Inventory(int storeID, int itemID, int itemCount, string itemLocation, DateTime firstStocked)
        {
            this.storeID = storeID;
            this.itemID = itemID;
            this.itemCount = itemCount;
            this.itemLocation = itemLocation;
            this.firstStocked = firstStocked;
        }

        string connectionString = ConfigurationManager.ConnectionStrings["dbconnection"].ConnectionString.ToString();
        public void AddNewItemToInventory()
        {
            using (OleDbConnection con = new OleDbConnection(connectionString))
            {
                try
                {
                    con.Open();

                    string query = "INSERT INTO StoreInventory VALUES (@storeID,@itemID,@itemCount,@location,@stockDate)";
                    OleDbCommand cmd = new OleDbCommand(query, con);
                    cmd.Parameters.AddWithValue("@storeID", storeID);
                    cmd.Parameters.AddWithValue("@itemID", itemID);
                    cmd.Parameters.AddWithValue("@itemCount", itemCount);
                    cmd.Parameters.AddWithValue("@location", itemLocation);
                    cmd.Parameters.AddWithValue("@stockDate", firstStocked);

                    cmd.ExecuteNonQuery();
                }
                catch (Exception ex)
                {
                    throw new System.ApplicationException(ex.Message);
                }
            }
        }
        
    }
}