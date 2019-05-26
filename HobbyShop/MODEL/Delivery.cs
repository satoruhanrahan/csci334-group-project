using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Configuration;
using System.Data.OleDb;
using System.Collections;

namespace HobbyShop.CLASS
{
    public class Delivery
    {
        private int deliveryID;
        private DateTime date;
        private int storeID;
        private int supplierID;
        private ArrayList items;
        private double totalValue;
        
        public int DeliveryID { get { return deliveryID; } }
        public DateTime Date { get { return date; } set { date = value; } }
        public int StoreID { get { return storeID; } set { storeID = value; } }
        public int SupplierID { get { return supplierID; } set { supplierID = value; } }
        public double TotalValue { get { return totalValue; } set { totalValue = value; } }
        public ArrayList Items { get { return items; } set { items = value; } }

        public Delivery() { }

        public Delivery(int deliveryID) { this.deliveryID = deliveryID; }

        public Delivery(DateTime date, int supplierID, int storeID, double totalValue)
        {
            this.date = date;
            this.storeID = storeID;
            this.supplierID = supplierID;
            this.totalValue = totalValue;
        }

        public Delivery(int deliveryID, DateTime date, int storeID, double totalValue)
        {
            this.deliveryID = deliveryID;
            this.date = date;
            this.storeID = storeID;
            this.totalValue = totalValue;
        }
        
        public Delivery(int deliveryID, DateTime date, int supplierID, int storeID, double totalValue)
        {
            this.deliveryID = deliveryID;
            this.date = date;
            this.supplierID = supplierID;
            this.storeID = storeID;
            this.totalValue = totalValue;
        }


        string connectionString = ConfigurationManager.ConnectionStrings["dbconnection"].ConnectionString.ToString();

        public ArrayList GetDeliveryRecords(string keyword)
        {
            using (OleDbConnection con = new OleDbConnection(connectionString))
            {
                try
                {
                    con.Open();
                    string query = "SELECT * FROM Deliveries WHERE DeliveryID LIKE '%" + keyword + "%' OR Date LIKE '%" + keyword +
                            "%' OR StoreID LIKE '%" + keyword + "%' OR TotalValue LIKE '%" + keyword + "%' OR SupplierID LIKE '%" + keyword +
                            "%' ORDER BY DeliveryID";
                    OleDbCommand cmd = new OleDbCommand(query, con);
                    cmd.ExecuteNonQuery();

                    ArrayList deliveryList = new ArrayList();

                    OleDbDataReader reader = cmd.ExecuteReader();

                    while (reader.Read())
                    {
                        int id = Convert.ToInt32(reader["DeliveryID"]);
                        DateTime date = Convert.ToDateTime(reader["Date"]);
                        int storeID = Convert.ToInt32(reader["StoreID"]);
                        int supplierID = Convert.ToInt32(reader["SupplierID"]);
                        double totalValue = Convert.ToDouble(reader["TotalValue"]);

                        Delivery delivery = new Delivery(id, date, supplierID, storeID, totalValue);
                        deliveryList.Add(delivery);
                    }
                    con.Close();
                    con.Open();
                    for (int i = 0; i < deliveryList.Count; i++)
                    {
                        Delivery delivery = (Delivery)deliveryList[i];
                        string itemQuery = "SELECT Models.Name, Models.CurrentRetailPrice, DeliveryItems.* FROM DeliveryItems" +
                            " INNER JOIN Models ON Models.ItemNumber = DeliveryItems.ItemNumber" +
                            " WHERE DeliveryItems.DeliveryID = @id";

                        OleDbCommand itemCmd = new OleDbCommand(itemQuery, con);
                        itemCmd.Parameters.AddWithValue("@id", delivery.DeliveryID);
                        itemCmd.ExecuteNonQuery();
                        OleDbDataReader itemReader = itemCmd.ExecuteReader();
                        ArrayList itemList = new ArrayList();
                        while (itemReader.Read())
                        {
                            string name = Convert.ToString(itemReader["Name"]);
                            int quantity = Convert.ToInt32(itemReader["ItemAmount"]);
                            double price = Convert.ToDouble(itemReader["CurrentRetailPrice"]);
                            //int itemNumber = Convert.ToInt32(itemReader["ItemNumber"]);
                            //double totalCost = Convert.ToDouble(itemReader["TotalCost"]);
                            DeliveryItem item = new DeliveryItem(name, quantity, price);
                            itemList.Add(item);
                        }
                        delivery.items = itemList;
                    }
                    return deliveryList;
                }
                catch (OleDbException ex)
                {
                    throw new System.ApplicationException(ex.Message);
                }
            }
        }
        public void AddDeliveryRecord()
        {
            using (OleDbConnection con = new OleDbConnection(connectionString))
            {
                try
                {
                    con.Open();
                    string query = "INSERT INTO Deliveries([Date], StoreID, SupplierID, TotalValue) VALUES (@date, @storeID, @supplierID, @totalValue)";
                    OleDbCommand cmd = new OleDbCommand(query, con);
                    cmd.Parameters.AddWithValue("@date", date);
                    cmd.Parameters.AddWithValue("@storeID", storeID);
                    cmd.Parameters.AddWithValue("@supplierID", supplierID);
                    cmd.Parameters.AddWithValue("@totalValue", totalValue);
                    cmd.ExecuteNonQuery();
                    con.Close();
                    con.Open();

                    string dQuery = "SELECT TOP 1 DeliveryID FROM Deliveries ORDER BY DeliveryID DESC";
                    OleDbCommand dCmd = new OleDbCommand(dQuery, con);
                    dCmd.ExecuteNonQuery();
                    OleDbDataReader dataReader = dCmd.ExecuteReader();

                    if (dataReader.Read())
                    {
                        deliveryID = Convert.ToInt32(dataReader["DeliveryID"]);
                    }

                    for (int i = 0; i < items.Count; i++)
                    {
                        DeliveryItem item = (DeliveryItem)items[i];
                        string modelQuery = "SELECT ItemNumber FROM Models WHERE Name=@name";
                        OleDbCommand modelCmd = new OleDbCommand(modelQuery, con);
                        modelCmd.Parameters.AddWithValue("@name", item.ItemName);
                        modelCmd.ExecuteNonQuery();
                        OleDbDataReader reader = modelCmd.ExecuteReader();
                        int itemNumber = 0;
                        if (reader.Read())
                        {
                            itemNumber = Convert.ToInt32(reader["ItemNumber"]);
                        }
                        string itemQuery = "INSERT INTO DeliveryItems VALUES (@deliveryID, @itemNumber, @itemAmount)";
                        OleDbCommand itemCmd = new OleDbCommand(itemQuery, con);
                        itemCmd.Parameters.AddWithValue("@deliveryID", deliveryID);
                        itemCmd.Parameters.AddWithValue("@itemNumber", itemNumber);
                        itemCmd.Parameters.AddWithValue("@itemAmount", item.Quantity);
                        //itemCmd.Parameters.AddWithValue("@itemPrice", item.Price);
                        itemCmd.ExecuteNonQuery();
                    }
                }
                catch (OleDbException ex)
                {
                    string itemQuery = "DELETE FROM DeliveryItems WHERE DeliveryID=@deliveryID";
                    OleDbCommand itemCmd = new OleDbCommand(itemQuery, con);
                    itemCmd.Parameters.AddWithValue("@deliveryID", deliveryID);
                    itemCmd.ExecuteNonQuery();

                    string query = "DELETE FROM Deliveries WHERE DeliveryID = @deliveryID";
                    OleDbCommand cmd = new OleDbCommand(query, con);
                    cmd.Parameters.AddWithValue("@deliveryID", deliveryID);
                    cmd.ExecuteNonQuery();

                    throw new System.ApplicationException(ex.Message);
                }
            }
        }

        public void EditDeliveryDetails()
        {
            using (OleDbConnection con = new OleDbConnection(connectionString))
            {
                try
                {
                    //remove old deliveries items
                    con.Open();
                    string deleteQuery = "DELETE FROM DeliveryItems WHERE DeliveryID=@deliveryID";
                    OleDbCommand cmd = new OleDbCommand(deleteQuery, con);
                    cmd.Parameters.AddWithValue("@deliveryID", deliveryID);
                    cmd.ExecuteNonQuery();
                    //con.Close();

                    //insert new deliveries items
                    for (int j = 0; j < items.Count; j++)
                    {
                        DeliveryItem item = (DeliveryItem)items[j];
                        string modelQuery = "SELECT ItemNumber FROM Models WHERE Name=@name";
                        OleDbCommand modelCmd = new OleDbCommand(modelQuery, con);
                        modelCmd.Parameters.AddWithValue("@name", item.ItemName);
                        modelCmd.ExecuteNonQuery();
                        //con.Close();
                        OleDbDataReader reader = modelCmd.ExecuteReader();
                        int itemNumber = 0;
                        if (reader.Read())
                        {
                            itemNumber = Convert.ToInt32(reader["ItemNumber"]);
                        }

                        string itemQuery = "INSERT INTO DeliveryItems VALUES (@deliveryID, @itemNumber, @itemAmount)";
                        OleDbCommand itemCmd = new OleDbCommand(itemQuery, con);
                        itemCmd.Parameters.AddWithValue("@deliveryID", deliveryID);
                        itemCmd.Parameters.AddWithValue("@itemNumber", itemNumber); //doesnt work for some reason
                        itemCmd.Parameters.AddWithValue("@itemAmount", item.Quantity);
                        //itemCmd.Parameters.AddWithValue("@totalCost", totalCost);
                        itemCmd.ExecuteNonQuery();
                    }
                    //UpdateModel(item, number);
                    //UpdateItem(item, number);

                    con.Close();

                    //update delivery details
                    con.Open();
                    string query = "UPDATE Deliveries SET [Date]=@date, StoreID=@storeID, SupplierID=@supplierID, TotalValue=@totalValue WHERE DeliveryID=@id";
                    OleDbCommand updateCmd = new OleDbCommand(query, con);
                    cmd.Parameters.AddWithValue("@date", date);
                    cmd.Parameters.AddWithValue("@storeID", storeID);
                    cmd.Parameters.AddWithValue("@supplierID", supplierID);
                    cmd.Parameters.AddWithValue("@totalValue", totalValue);
                    cmd.Parameters.AddWithValue("@id", deliveryID);
                    cmd.ExecuteNonQuery();
                    con.Close();
                }
                catch (OleDbException ex)
                {
                    throw new System.ApplicationException(ex.Message);
                }
            }
        }

        public void DeleteDeliveryRecord()
        {
            using (OleDbConnection con = new OleDbConnection(connectionString))
            {
                try
                {
                    con.Open();
                    string query = "DELETE FROM Deliveries WHERE DeliveryID=@id";
                    OleDbCommand cmd = new OleDbCommand(query, con);
                    cmd.Parameters.AddWithValue("@id", deliveryID);

                    cmd.ExecuteNonQuery();
                }
                catch (OleDbException ex)
                {
                    throw new System.ApplicationException(ex.Message);
                }
            }
        }
    }
}