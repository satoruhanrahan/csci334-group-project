using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Configuration;
using System.Data.OleDb;
using System.Collections;

namespace HobbyShop.CLASS
{
    public class Store
    {
        private int storeID;
        private string storeName;
        private string address;
        private ArrayList items;

        public int StoreID { get { return storeID; } }
        public string StoreName { get { return storeName; } }
        public string Address { get { return address; } }
        public ArrayList Items { get { return items; } set { items = value; } }

        public Store() { }

        public Store(int storeID)
        {
            this.storeID = storeID;
        }

        public Store(string storeName, string address)
        {
            this.storeName = storeName;
            this.address = address;
        }

        public Store(int storeID, string storeName, string address)
        {
            this.storeID = storeID;
            this.storeName = storeName;
            this.address = address;
        }

        string connectionString = ConfigurationManager.ConnectionStrings["dbconnection"].ConnectionString.ToString();

        public ArrayList GetStores()
        {
            using (OleDbConnection con = new OleDbConnection(connectionString))
            {
                try
                {
                    con.Open();
                    string query = "SELECT * FROM Stores";
                    OleDbCommand cmd = new OleDbCommand(query, con);
                    cmd.ExecuteNonQuery();

                    ArrayList storeList = new ArrayList();

                    OleDbDataReader reader = cmd.ExecuteReader();
                    while (reader.Read())
                    {
                        int storeID = Convert.ToInt32(reader["StoreID"]);
                        string name = Convert.ToString(reader["StoreName"]);
                        string address = Convert.ToString(reader["StoreAddress"]);

                        Store store = new Store(storeID, name, address);
                        storeList.Add(store);
                    }
                    con.Close();
                    con.Open();

                    for (int i = 0; i < storeList.Count; i++)
                    {
                        Store store = (Store)storeList[i];
                        string itemQuery = "SELECT Models.Name, Models.CurrentRetailPrice, StoreInventory.* FROM StoreInventory" +
                        " INNER JOIN Models ON Models.ItemNumber = StoreInventory.ItemNumber" +
                        " WHERE StoreInventory.StoreID = @id";
                        OleDbCommand itemCmd = new OleDbCommand(itemQuery, con);
                        itemCmd.Parameters.AddWithValue("@id", store.StoreID);
                        itemCmd.ExecuteNonQuery();

                        OleDbDataReader itemReader = itemCmd.ExecuteReader();
                        ArrayList itemList = new ArrayList();
                        while (itemReader.Read())
                        {
                            string itemName = Convert.ToString(itemReader["Name"]);
                            int stockCount = Convert.ToInt32(itemReader["StockCount"]);
                            int location = Convert.ToInt32(itemReader["LocationInStore"]);
                            DateTime firstDate = Convert.ToDateTime(itemReader["FirstStockDate"]);
                            StoreInventory item = new StoreInventory(itemName, stockCount, location, firstDate);
                            itemList.Add(item);
                        }
                        store.Items = itemList;
                    }
                    return storeList;
                }
                catch (OleDbException ex)
                {
                    throw new System.ApplicationException(ex.Message);
                }
            }
        }

        public void AddStore()
        {
            using (OleDbConnection con = new OleDbConnection(connectionString))
            {
                try
                {
                    con.Open();
                    string query = "INSERT INTO Stores (StoreName, StoreAddress) VALUES (@name, @address)";
                    OleDbCommand cmd = new OleDbCommand(query, con);
                    cmd.Parameters.AddWithValue("@name", storeName);
                    cmd.Parameters.AddWithValue("@address", address);
                    cmd.ExecuteNonQuery();
                }
                catch (OleDbException ex)
                {
                    throw new System.ApplicationException(ex.Message);
                }
            }
        }

        public void DeleteStore()
        {
            using (OleDbConnection con = new OleDbConnection(connectionString))
            {
                try
                {
                    con.Open();
                    string query = "DELETE FROM Stores WHERE StoreID = @id";
                    OleDbCommand cmd = new OleDbCommand(query, con);
                    cmd.Parameters.AddWithValue("@id", storeID);
                    cmd.ExecuteNonQuery();
                }
                catch (OleDbException ex)
                {
                    throw new System.ApplicationException(ex.Message);
                }
            }
        }

        public void AddInventoryItem()
        {
            using (OleDbConnection con = new OleDbConnection(connectionString))
            {
                try
                {
                    con.Open();
                    for (int i = 0; i < items.Count; i++)
                    {
                        StoreInventory item = (StoreInventory)items[i];
                        string query = "SELECT ItemNumber FROM Models WHERE Name=@name";
                        OleDbCommand cmd = new OleDbCommand(query, con);
                        cmd.Parameters.AddWithValue("@name", item.ItemName);
                        cmd.ExecuteNonQuery();
                        OleDbDataReader reader = cmd.ExecuteReader();
                        int itemNumber = 0;
                        if (reader.Read())
                        {
                            itemNumber = Convert.ToInt32(reader["ItemNumber"]);
                        }
                        string itemQuery = "INSERT INTO StoreInventory VALUES (@storeID, @itemNumber, @stockCount, @location, @firstDate)";
                        OleDbCommand itemCmd = new OleDbCommand(itemQuery, con);
                        itemCmd.Parameters.AddWithValue("@storeID", storeID);
                        itemCmd.Parameters.AddWithValue("@itemNumber", itemNumber);
                        itemCmd.Parameters.AddWithValue("@stockCount", item.StockCount);
                        itemCmd.Parameters.AddWithValue("@firstDate", item.FirstStockDate);
                        itemCmd.ExecuteNonQuery();
                    }
                }
                catch (OleDbException ex)
                {
                    throw new System.ApplicationException(ex.Message);
                }
            }
        }

        public void EditInventoryItem(string itemName, int stockCount, int location, DateTime firstDate)
        {
            using (OleDbConnection con = new OleDbConnection(connectionString))
            {
                try
                {
                    con.Open();
                    string query = "SELECT ItemNumber FROM Models WHERE Name=@name";
                    OleDbCommand cmd = new OleDbCommand(query, con);
                    cmd.Parameters.AddWithValue("@name", itemName);
                    cmd.ExecuteNonQuery();
                    OleDbDataReader reader = cmd.ExecuteReader();
                    int itemNumber = 0;
                    if (reader.Read())
                    {
                        itemNumber = Convert.ToInt32(reader["ItemNumber"]);
                    }
                    string itemQuery = "UPDATE StoreInventory SET ItemNumber=@itemNumber, StockCount=@count, LocationInStore=@location, FirstStockDate=@date" +
                        "WHERE StoreID=@storeID";
                    OleDbCommand itemCmd = new OleDbCommand(itemQuery, con);
                    itemCmd.Parameters.AddWithValue("@itemNumber", itemNumber);
                    itemCmd.Parameters.AddWithValue("@count", stockCount);
                    itemCmd.Parameters.AddWithValue("@location", location);
                    itemCmd.Parameters.AddWithValue("@date", firstDate);
                }
                catch (OleDbException ex)
                {
                    throw new System.ApplicationException(ex.Message);
                }
            }
        }
    }
}