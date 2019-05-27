using System;
using System.Collections;
using System.Configuration;
using System.Data.OleDb;

namespace HobbyShop.CLASS
{
    public class BaseModel
    {

        string connectionString = ConfigurationManager.ConnectionStrings["dbconnection"].ConnectionString.ToString();

        public virtual ArrayList GetRecords(string keyword)
        {
            using (var con = new OleDbConnection(connectionString))
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
    }
}
