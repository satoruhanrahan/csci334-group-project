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

        public int DeliveryID { get { return deliveryID; } }
        public DateTime Date { get { return date; } set { date = value; } }
        public int StoreID { get { return storeID; } set { storeID = value; } }
        public int SupplierID { get { return supplierID; } set { supplierID = value; } }

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

        public ArrayList GetDeliveryRecords()
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
                    con.Open();
                    string query = "UPDATE Delivery SET Date=@date, StoreID=@storeID, SupplierID=@supplierID WHERE DeliveryID=@id";
                    OleDbCommand cmd = new OleDbCommand(query, con);
                    cmd.Parameters.AddWithValue("@date", date);
                    cmd.Parameters.AddWithValue("@storeID", storeID);
                    cmd.Parameters.AddWithValue("@supplierID", supplierID);
                    cmd.Parameters.AddWithValue("@id", deliveryID);

                    cmd.ExecuteNonQuery();
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