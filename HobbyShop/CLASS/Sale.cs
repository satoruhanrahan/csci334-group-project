using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Configuration;
using System.Data.OleDb;
using System.Collections;

namespace HobbyShop.CLASS
{
    public class Sale
    {
        private int saleID;
        private DateTime date;
        private int customerID;
        private double totalValue;
        private double discount;
        private double finalTotal;

        public int SaleID { get { return saleID; } }
        public DateTime Date { get { return date; } set { date = value; } }
        public int CustomerID { get { return customerID; } set { customerID = value; } }
        public double TotalValue { get { return totalValue; } set { totalValue = value; } }
        public double Discount { get { return discount; } set { discount = value; } }
        public double FinalTotal { get { return finalTotal; } set { finalTotal = value; } }

        public Sale() { }

        public Sale(int saleID, DateTime date, int customerID, double totalValue, double discount, double finalTotal)
        {
            this.saleID = saleID;
            this.date = date;
            this.customerID = customerID;
            this.totalValue = totalValue;
            this.discount = discount;
            this.finalTotal = finalTotal;
        }

        string connectionString = ConfigurationManager.ConnectionStrings["dbconnection"].ConnectionString.ToString();
        
        public ArrayList GetSaleRecords()
        {
            using (OleDbConnection con = new OleDbConnection(connectionString))
            {
                con.Open();
                string query = "SELECT * FROM Sales ";
                OleDbCommand cmd = new OleDbCommand(query, con);
                cmd.ExecuteNonQuery();

                ArrayList saleList = new ArrayList();

                OleDbDataReader reader = cmd.ExecuteReader();

                while (reader.Read())
                {
                    int id = Convert.ToInt32(reader["SaleID"]);
                    DateTime date = Convert.ToDateTime(reader["DateOfSale"]);
                    int customerID = Convert.ToInt32(reader["CustomerNumber"]);
                    double totalValue = Convert.ToDouble(reader["TotalValue"]);
                    double discount = Convert.ToDouble(reader["Discount"]);
                    double finalTotal = Convert.ToDouble(reader["FinalTotal"]);

                    Sale sale = new Sale(id, date, customerID, totalValue, discount, finalTotal);
                    saleList.Add(sale);
                }
                return saleList;
            }
        }

        public void AddSaleRecord(DateTime date, int customerID, double totalValue, double discount, double finalTotal)
        {
            using (OleDbConnection con = new OleDbConnection(connectionString))
            {
                try
                {
                    con.Open();
                    string query = "INSERT INTO Sales (DateOfSale, CustomerNumber, TotalValue, Discount, FinalTotal) VALUES (@date, @customerID, @totalValue, @discount, @finalTotal)";
                    OleDbCommand cmd = new OleDbCommand(query, con);
                    cmd.Parameters.AddWithValue("@date", date);
                    cmd.Parameters.AddWithValue("@customerID", customerID);
                    cmd.Parameters.AddWithValue("@totalValue", totalValue);
                    cmd.Parameters.AddWithValue("@discount", discount);
                    cmd.Parameters.AddWithValue("@finalTotal", finalTotal);
                    cmd.ExecuteNonQuery();
                }
                catch (OleDbException ex)
                {
                    throw new System.ApplicationException(ex.Message);
                }
            }
        }

        public void UpdateSaleDetails(int id, DateTime date, int customerID, double totalValue, double discount, double finalTotal)
        {
            using (OleDbConnection con = new OleDbConnection(connectionString))
            {
                try
                {
                    con.Open();
                    string query = "UPDATE Sales SET DateOfSale=@date, CustomerNumber=@customerID, TotalValue=@totalValue, Discount=@discount, FinalTotal=@finalTotal WHERE SaleID=@id";
                    OleDbCommand cmd = new OleDbCommand(query, con);
                    cmd.Parameters.AddWithValue("@date", date);
                    cmd.Parameters.AddWithValue("@customerID", customerID);
                    cmd.Parameters.AddWithValue("@totalValue", totalValue);
                    cmd.Parameters.AddWithValue("@discount", discount);
                    cmd.Parameters.AddWithValue("@finalTotal", finalTotal);

                    cmd.ExecuteNonQuery();
                }
                catch (OleDbException ex)
                {
                    throw new System.ApplicationException(ex.Message);
                }
            }
        }
        
        public void DeleteSaleRecord(int id)
        {
            using (OleDbConnection con = new OleDbConnection(connectionString))
            {
                try
                {
                    con.Open();
                    string query = "DELETE FROM Sales WHERE SaleID=@id";
                    OleDbCommand cmd = new OleDbCommand(query, con);
                    cmd.Parameters.AddWithValue("@id", id);

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