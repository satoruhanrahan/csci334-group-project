using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Configuration;
using System.Data.OleDb;
using System.Collections;

namespace HobbyShop.CLASS
{
    public class Delivery : BaseModel
    {
        private int deliveryID;
        private DateTime date;
        private int storeID;
        private int supplierID;
        private ArrayList items;

        public int DeliveryID { get { return deliveryID; } }
        public DateTime Date { get { return date; } set { date = value; } }
        public int StoreID { get { return storeID; } set { storeID = value; } }
        public int SupplierID { get { return supplierID; } set { supplierID = value; } }
        public ArrayList Items { get { return items; } set { items = value; } }

        public Delivery() { }

        public Delivery(int deliveryID) { this.deliveryID = deliveryID; }

        public Delivery(DateTime date, int storeID, int supplierID)
        {
            this.date = date;
            this.storeID = storeID;
            this.supplierID = supplierID;
        }

        public Delivery(int deliveryID, DateTime date, int storeID, int supplierID)
        {
            this.deliveryID = deliveryID;
            this.date = date;
            this.storeID = storeID;
            this.supplierID = supplierID;
        }

        string connectionString = ConfigurationManager.ConnectionStrings["dbconnection"].ConnectionString.ToString();

        public override ArrayList GetRecords(string keyword)
        {
            using (OleDbConnection con = new OleDbConnection(connectionString))
            {
                con.Open();
                string query = "SELECT * FROM Deliveries ";
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

                    Delivery delivery = new Delivery(id, date, storeID, supplierID);
                    deliveryList.Add(delivery);
                }
                con.Close();
                con.Open();
                for (int i = 0; i < deliveryList.Count; i++)
                {
                    Delivery delivery = (Delivery)deliveryList[i];
                    string itemQuery = "SELECT DeliveryItems.* FROM DeliveryItems" +
                        " INNER JOIN Deliveries ON Deliveries.DeliveryID = DeliveryItems.DeliveryID" +
                        " WHERE DeliveryItems.DeliveryID = @id";
                    OleDbCommand itemCmd = new OleDbCommand(itemQuery, con);
                    itemCmd.Parameters.AddWithValue("@id", delivery.DeliveryID);
                    itemCmd.ExecuteNonQuery();
                    OleDbDataReader itemReader = itemCmd.ExecuteReader();
                    ArrayList itemList = new ArrayList();
                    while (itemReader.Read())
                    {
                        int itemNumber = Convert.ToInt32(itemReader["ItemNumber"]);
                        double totalCost = Convert.ToDouble(itemReader["TotalCost"]);
                        DeliveryItem item = new DeliveryItem(itemNumber, totalCost);
                        itemList.Add(item);
                    }
                    delivery.items = itemList;
                }
                return deliveryList;
            }
        }
        public void AddDeliveryRecord()
        {
            using (OleDbConnection con = new OleDbConnection(connectionString))
            {
                try
                {
                    con.Open();
                    string query = "INSERT INTO Deliveries (Date, StoreID, SupplierID) VALUES (@date, @storeID, @supplierID)";
                    OleDbCommand cmd = new OleDbCommand(query, con);
                    cmd.Parameters.AddWithValue("@date", date);
                    cmd.Parameters.AddWithValue("@storeID", storeID);
                    cmd.Parameters.AddWithValue("@supplierID", supplierID);
                    cmd.ExecuteNonQuery();
                    con.Close();
                }
                catch (OleDbException ex)
                {
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
                    string deleteQuery = "DELETE FROM DeliveryItems WHERE DeliveryID=@delivery" +
                        "ID";
                    OleDbCommand cmd = new OleDbCommand(deleteQuery, con);
                    cmd.Parameters.AddWithValue("@deliveryID", deliveryID);
                    cmd.ExecuteNonQuery();
                    con.Close();

                    //insert new deliveries items
                    for (int j = 0; j < items.Count; j++)
                    {
                        string itemQuery = "INSERT INTO DeliveryItems VALUES (@itemNumber, @totalCost)";
                        OleDbCommand itemCmd = new OleDbCommand(itemQuery, con);
                        itemCmd.Parameters.AddWithValue("@deliveryID", deliveryID);
                        //itemCmd.Parameters.AddWithValue("@itemNumber", itemNumber); //doesnt work for some reason
                        //itemCmd.Parameters.AddWithValue("@totalCost", totalCost);
                        itemCmd.ExecuteNonQuery();
                    }
                    //UpdateModel(item, number);
                    //UpdateItem(item, number);
                    con.Close();

                    //update delivery details
                    con.Open();
                    string query = "UPDATE Delivery SET Date=@date, StoreID=@storeID, SupplierID=@supplierID WHERE DeliveryID=@id";
                    OleDbCommand updateCmd = new OleDbCommand(query, con);
                    cmd.Parameters.AddWithValue("@date", date);
                    cmd.Parameters.AddWithValue("@storeID", storeID);
                    cmd.Parameters.AddWithValue("@supplierID", supplierID);
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