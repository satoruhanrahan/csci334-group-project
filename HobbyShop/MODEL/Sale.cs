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
        private int storeID;
        private double totalValue;
        private double discount;
        private double finalTotal;
        private ArrayList items;
        
        public int SaleID { get { return saleID; } }
        public DateTime Date { get { return date; } set { date = value; } }
        public int CustomerID { get { return customerID; } set { customerID = value; } }
        public int StoreID { get { return storeID; } set { storeID = value; } }
        public double TotalValue { get { return totalValue; } set { totalValue = value; } }
        public double Discount { get { return discount; } set { discount = value; } }
        public double FinalTotal { get { return finalTotal; } set { finalTotal = value; } }
        public ArrayList Items { get { return items; } set { items = value; } }
        
        public Sale() { }

        public Sale(int saleID) { this.saleID = saleID; }

        public Sale(int saleID, DateTime date, int storeID, double totalValue, double discount, double finalTotal)
        {
            this.saleID = saleID;
            this.date = date;
            this.storeID = storeID;
            this.totalValue = totalValue;
            this.discount = discount;
            this.finalTotal = finalTotal;
        }

        public Sale(DateTime date, int customerID, int storeID, double totalValue, double discount, double finalTotal)
        {
            this.date = date;
            this.customerID = customerID;
            this.storeID = storeID;
            this.totalValue = totalValue;
            this.discount = discount;
            this.finalTotal = finalTotal;
        }

        public Sale(int saleID, DateTime date, int customerID, int storeID, double totalValue, double discount, double finalTotal)
        {
            this.saleID = saleID;
            this.date = date;
            this.customerID = customerID;
            this.storeID = storeID;
            this.totalValue = totalValue;
            this.discount = discount;
            this.finalTotal = finalTotal;
        }

        string connectionString = ConfigurationManager.ConnectionStrings["dbconnection"].ConnectionString.ToString();

        public ArrayList GetSaleRecords(string keyword)
        {
            using (OleDbConnection con = new OleDbConnection(connectionString))
            {
                try
                {
                    con.Open();
                    string saleQuery = "SELECT * FROM Sales WHERE SaleID LIKE '%" + keyword + "%' OR DateOfSale LIKE '%" + keyword +
                        "%' OR CustomerNumber LIKE '%" + keyword + "%' OR TotalValue LIKE '%" + keyword + "%' OR Discount LIKE '%" + keyword +
                        "%' OR FinalTotal LIKE '%" + keyword + "%' ORDER BY SaleID";
                    OleDbCommand cmd = new OleDbCommand(saleQuery, con);
                    cmd.ExecuteNonQuery();

                    ArrayList saleList = new ArrayList();

                    OleDbDataReader reader = cmd.ExecuteReader();
                    while (reader.Read())
                    {
                        int saleID = Convert.ToInt32(reader["SaleID"]);
                        int storeID = Convert.ToInt32(reader["StoreID"]);
                        DateTime date = Convert.ToDateTime(reader["DateOfSale"]);
                        int customerID = Convert.ToInt32(reader["CustomerNumber"]);
                        double totalValue = Convert.ToDouble(reader["TotalValue"]);
                        double discount = Convert.ToDouble(reader["Discount"]);
                        double finalTotal = Convert.ToDouble(reader["FinalTotal"]);
                        
                        Sale sale = new Sale(saleID, date, customerID, storeID, totalValue, discount, finalTotal);
                        saleList.Add(sale);
                    }
                    con.Close();
                    con.Open();

                    for (int i = 0; i < saleList.Count; i++)
                    {
                        Sale sale = (Sale)saleList[i];
                        string itemQuery = "SELECT Models.Name, Models.CurrentRetailPrice, SaleItems.* FROM SaleItems" +
                        " INNER JOIN Models ON Models.ItemNumber = SaleItems.ItemNumber" +
                        " WHERE SaleItems.SaleID = @id";
                        OleDbCommand itemCmd = new OleDbCommand(itemQuery, con);
                        itemCmd.Parameters.AddWithValue("@id", sale.SaleID);
                        itemCmd.ExecuteNonQuery();

                        OleDbDataReader itemReader = itemCmd.ExecuteReader();
                        ArrayList itemList = new ArrayList();
                        while (itemReader.Read())
                        {
                            string name = Convert.ToString(itemReader["Name"]);
                            int quantity = Convert.ToInt32(itemReader["ItemAmount"]);
                            //double price = Convert.ToDouble(itemReader["ItemPrice"]);
                            double price = Convert.ToDouble(itemReader["CurrentRetailPrice"]);
                            SaleItem item = new SaleItem(name, quantity, price);
                            itemList.Add(item);
                        }
                        sale.Items = itemList;
                    }
                    return saleList;
                }
                catch (OleDbException ex)
                {
                    throw new System.ApplicationException(ex.Message);
                }
            }
        }

        public void AddSaleRecord()
        {
            using (OleDbConnection con = new OleDbConnection(connectionString))
            {
                try
                {
                    con.Open();
                    string query = "INSERT INTO Sales (DateOfSale, CustomerNumber, TotalValue, Discount, FinalTotal, StoreID) VALUES (@date, @customerID, @totalValue, @discount, @finalTotal, @store)";
                    OleDbCommand cmd = new OleDbCommand(query, con);
                    cmd.Parameters.AddWithValue("@date", date);
                    cmd.Parameters.AddWithValue("@customerID", customerID);
                    cmd.Parameters.AddWithValue("@totalValue", totalValue);
                    cmd.Parameters.AddWithValue("@discount", discount);
                    cmd.Parameters.AddWithValue("@finalTotal", finalTotal);
                    cmd.Parameters.AddWithValue("@store", storeID);
                    cmd.ExecuteNonQuery();

                    con.Close();
                    con.Open();

                    string saleQuery = "SELECT TOP 1 SaleID FROM Sales ORDER BY SaleID DESC";
                    OleDbCommand saleCmd = new OleDbCommand(saleQuery, con);
                    saleCmd.ExecuteNonQuery();
                    OleDbDataReader dataReader = saleCmd.ExecuteReader();

                    if (dataReader.Read())
                    {
                        saleID = Convert.ToInt32(dataReader["SaleID"]);
                    }

                    for (int i = 0; i < items.Count; i++)
                    {
                        SaleItem item = (SaleItem)items[i];
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
                        string itemQuery = "INSERT INTO SaleItems VALUES (@saleID, @itemNumber, @itemAmount)";
                        OleDbCommand itemCmd = new OleDbCommand(itemQuery, con);
                        itemCmd.Parameters.AddWithValue("@saleID", saleID);
                        itemCmd.Parameters.AddWithValue("@itemNumber", itemNumber);
                        itemCmd.Parameters.AddWithValue("@itemAmount", item.Quantity);
                        //itemCmd.Parameters.AddWithValue("@itemPrice", item.Price);
                        itemCmd.ExecuteNonQuery();
                    }
                }
                catch (Exception ex)
                {
                    string itemQuery = "DELETE FROM SaleItems WHERE SaleID=@saleID";
                    OleDbCommand itemCmd = new OleDbCommand(itemQuery, con);
                    itemCmd.Parameters.AddWithValue("@saleID", saleID);
                    itemCmd.ExecuteNonQuery();

                    string query = "DELETE FROM Sales WHERE SaleID = @saleID";
                    OleDbCommand cmd = new OleDbCommand(query, con);
                    cmd.Parameters.AddWithValue("@saleID", saleID);
                    cmd.ExecuteNonQuery();

                    throw new System.ApplicationException(ex.Message);
                }
            }
        }

        public void EditSaleDetails()
        {
            using (OleDbConnection con = new OleDbConnection(connectionString))
            { 
                try
                {
                    con.Open();
                    string query = "DELETE FROM SaleItems WHERE SaleID=@saleID";
                    OleDbCommand cmd = new OleDbCommand(query, con);
                    cmd.Parameters.AddWithValue("@saleID", saleID);
                    cmd.ExecuteNonQuery();
                    /*
                    string itemNumberQuery = "SELECT ItemNumber FROM SaleItems WHERE SaleID=@id";
                    OleDbCommand cmd = new OleDbCommand(itemNumberQuery, con);
                    cmd.Parameters.AddWithValue("@id", saleID);
                    cmd.ExecuteNonQuery();
                    

                    ArrayList itemNumbers = new ArrayList();
                    int itemNumber = 0;
                    OleDbDataReader reader = cmd.ExecuteReader();
                    while (reader.Read())
                    {
                        int itemNumber = Convert.ToInt32(reader["ItemNumber"]);
                        itemNumber = Convert.ToInt32(reader["ItemNumber"]);
                        itemNumbers.Add(itemNumber);
                    }
                    con.Close();

                    for (int i = 0; i < itemNumbers.Count; i++)
                    SaleItem item = (SaleItem)items[0];
                    int number = (int)itemNumbers[0];
                    */
                    //
                    
                    for (int j = 0; j < items.Count; j++)
                    {
                        SaleItem item = (SaleItem)items[j];
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
                        //string itemQuery = "INSERT INTO SaleItems VALUES (@saleID, @itemNumber, @itemAmount, @itemPrice)";
                        string itemQuery = "INSERT INTO SaleItems VALUES (@saleID, @itemNumber, @itemAmount)";
                        OleDbCommand itemCmd = new OleDbCommand(itemQuery, con);
                        itemCmd.Parameters.AddWithValue("@saleID", saleID);
                        itemCmd.Parameters.AddWithValue("@itemNumber", itemNumber);
                        itemCmd.Parameters.AddWithValue("@itemAmount", item.Quantity);
                        //itemCmd.Parameters.AddWithValue("@itemPrice", item.Price);
                        itemCmd.ExecuteNonQuery();
                    }
                    //UpdateModel(item, number);
                    //UpdateItem(item, number);
                    con.Close();
                    con.Open();
                    string saleQuery = "UPDATE Sales SET DateOfSale=@date, CustomerNumber=@customerID, TotalValue=@totalValue, Discount=@discount, FinalTotal=@finalTotal, StoreID=@store WHERE SaleID=@id";
                    OleDbCommand saleCmd = new OleDbCommand(saleQuery, con);
                    saleCmd.Parameters.AddWithValue("@date", date);
                    saleCmd.Parameters.AddWithValue("@customerID", customerID);
                    saleCmd.Parameters.AddWithValue("@totalValue", totalValue);
                    saleCmd.Parameters.AddWithValue("@discount", discount);
                    saleCmd.Parameters.AddWithValue("@finalTotal", finalTotal);
                    saleCmd.Parameters.AddWithValue("@store", storeID);
                    saleCmd.Parameters.AddWithValue("@id", saleID);
                    saleCmd.ExecuteNonQuery();
                    con.Close();
                }
                catch (OleDbException ex)
                {
                    throw new System.ApplicationException(ex.Message);
                }
            }
        }

        public void UpdateItem(SaleItem item, int number)
        {
            using (OleDbConnection con = new OleDbConnection(connectionString))
            {
                try
                {
                    con.Open();
                    string itemQuery = "UPDATE SaleItems SET ItemAmount=@quantity WHERE ItemNumber=@itemNumber AND SaleID=@saleID";//"UPDATE SaleItems SET SaleItems.ItemAmount = @amount WHERE(((SaleItems.[ItemNumber]) = @itemNumber))";//
                    OleDbCommand itemCmd = new OleDbCommand(itemQuery, con);
                    itemCmd.Parameters.AddWithValue("@quantity", item.Quantity);
                    itemCmd.Parameters.AddWithValue("@itemNumber", number);
                    itemCmd.Parameters.AddWithValue("@saleID", saleID);
                    itemCmd.ExecuteNonQuery();
                }
                catch (OleDbException ex)
                {
                    throw new System.ApplicationException(ex.Message);
                }
            }
        }

        public void UpdateModel(SaleItem item, int number)
        {
            using (OleDbConnection con = new OleDbConnection(connectionString))
            {
                try
                {
                    con.Open();
                    string modelQuery = "UPDATE Models SET Name=@name, CurrentRetailPrice=@price WHERE ItemNumber=@itemNumber";
                    OleDbCommand modelCmd = new OleDbCommand(modelQuery, con);
                    modelCmd.Parameters.AddWithValue("@name", item.ItemName);
                    modelCmd.Parameters.AddWithValue("@price", item.Price);
                    modelCmd.Parameters.AddWithValue("@itemNumber", number);
                    modelCmd.ExecuteNonQuery();
                }
                catch (OleDbException ex)
                {
                    throw new System.ApplicationException(ex.Message);
                }
            }
        }

        public void EditSaleDetail()
        {
            using (OleDbConnection con = new OleDbConnection(connectionString))
            {
                try
                {
                    con.Open();
                    string itemNumberQuery = "SELECT ItemNumber FROM SaleItems WHERE SaleID=@id";
                    OleDbCommand cmd = new OleDbCommand(itemNumberQuery, con);
                    cmd.Parameters.AddWithValue("@id", saleID);
                    cmd.ExecuteNonQuery();
                    
                    ArrayList itemNumbers = new ArrayList();
                    OleDbDataReader reader = cmd.ExecuteReader();
                    while (reader.Read())
                    {
                        int itemNumber = Convert.ToInt32(reader["ItemNumber"]);
                        itemNumbers.Add(itemNumber);
                    }
                    con.Close();

                    for (int i = 0; i < itemNumbers.Count; i++)
                    {
                        SaleItem item = (SaleItem)items[i];
                        int number = (int)itemNumbers[i];
                        con.Open();
                        string itemQuery = "UPDATE SaleItems SET ItemAmount=@quantity WHERE ItemNumber=@itemNumber AND SaleID=@saleID";//"UPDATE SaleItems SET SaleItems.ItemAmount = @amount WHERE(((SaleItems.[ItemNumber]) = @itemNumber))";//
                        OleDbCommand itemCmd = new OleDbCommand(itemQuery, con);
                        itemCmd.Parameters.AddWithValue("@itemNumber", number);
                        itemCmd.Parameters.AddWithValue("@quantity", item.Quantity);
                        itemCmd.Parameters.AddWithValue("@saleID", saleID);
                        itemCmd.ExecuteNonQuery();
                        con.Close();

                        con.Open();
                        string modelQuery = "UPDATE Models SET Name=@name, CurrentRetailPrice=@price WHERE ItemNumber=@itemNumber";//"UPDATE SaleItems SET SaleItems.ItemAmount = @amount WHERE(((SaleItems.[ItemNumber]) = @itemNumber))";//
                        OleDbCommand modelCmd = new OleDbCommand(modelQuery, con);
                        modelCmd.Parameters.AddWithValue("@itemNumber", number);
                        modelCmd.Parameters.AddWithValue("@name", item.ItemName);
                        modelCmd.Parameters.AddWithValue("@price", item.Price);
                        modelCmd.ExecuteNonQuery();
                        con.Close();
                    }
                    con.Open();
                    string saleQuery = "UPDATE Sales SET DateOfSale=@date, CustomerNumber=@customerID, TotalValue=@totalValue, Discount=@discount, FinalTotal=@finalTotal WHERE SaleID=@id";
                    OleDbCommand saleCmd = new OleDbCommand(saleQuery, con);
                    saleCmd.Parameters.AddWithValue("@date", date);
                    saleCmd.Parameters.AddWithValue("@customerID", customerID);
                    saleCmd.Parameters.AddWithValue("@totalValue", totalValue);
                    saleCmd.Parameters.AddWithValue("@discount", discount);
                    saleCmd.Parameters.AddWithValue("@finalTotal", finalTotal);
                    saleCmd.Parameters.AddWithValue("@id", saleID);
                    saleCmd.ExecuteNonQuery();
                }
                catch (OleDbException ex)
                {
                    throw new System.ApplicationException(ex.Message);
                }
            }
        }

        public void DeleteSaleRecord()
        {
            using (OleDbConnection con = new OleDbConnection(connectionString))
            {
                try
                {
                    con.Open();
                    string query = "DELETE FROM Sales WHERE SaleID=@id";
                    OleDbCommand cmd = new OleDbCommand(query, con);
                    cmd.Parameters.AddWithValue("@id", saleID);

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