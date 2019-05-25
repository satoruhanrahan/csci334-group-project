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
using System.Configuration;
using HobbyShop.CLASS;

namespace HobbyShop
{
    public class Model

    {
        string connectionString = ConfigurationManager.ConnectionStrings["dbconnection"].ConnectionString.ToString();
        /* model attributes*/
        private string itemName;
        private int itemNum;
        private string itemType;
        private string itemSbjArea;
        private double itemPrice;
        private string itemDes;
        private bool itemAvail;
        private int stockCount; // total count of all stores

    public int Id { get { return itemNum; } set { itemNum = value; } }
        public string Name { get { return itemName; } set { itemName = value; } }
        public string Type { get { return itemType; } set { itemType = value; } }
        public string SbjArea { get { return itemSbjArea; } set { itemSbjArea = value; } }
        public double Price { get { return itemPrice; } set { itemPrice = value; } }
        public string Description { get { return itemDes; } set { itemDes = value; } }
        public bool Availability { get { return itemAvail; } set { itemAvail = value; } }
        public int StockCount { get { return stockCount; } set { stockCount = value; } }
        
        public Model()
        { 
        }
        public Model(string name, string type, string sbjArea, double price, string description,bool avail)
        {
            this.itemName = name;
            this.itemType = type;
            this.itemSbjArea = sbjArea;
            this.itemPrice = price;
            this.itemDes = description;
            this.itemAvail = avail; // while adding a new item, total count is 0 as it needs to be automatically increased by stock in stores
            this.stockCount = 0; // same reason for availability, if there is stock in any store, automatically change to true
        }
        public void AddNewModel()
        {
            using (OleDbConnection con = new OleDbConnection(connectionString))
            {
                try
                {
                    con.Open();
                    
                    string query = "INSERT INTO Models (Name,Type,SubjectArea,CurrentRetailPrice,Description,Availability) VALUES (@name,@type,@area,@price,@des,@avai)";
                    OleDbCommand cmd = new OleDbCommand(query, con);
                    cmd.Parameters.AddWithValue("@name", itemName);
                    cmd.Parameters.AddWithValue("@type", itemType);
                    cmd.Parameters.AddWithValue("@area", itemSbjArea);
                    cmd.Parameters.AddWithValue("@price", itemPrice);
                    cmd.Parameters.AddWithValue("@des", itemDes);
                    cmd.Parameters.AddWithValue("@avai", itemAvail);


                    cmd.ExecuteNonQuery();
                }
                catch (Exception ex)
                {
                    throw new System.ApplicationException(ex.Message);
                }
            }
        }
        public Model SearchByID(int id)
        {
            using (OleDbConnection con = new OleDbConnection(connectionString))
            {
                try
                {
                    con.Open();
                    string query = "SELECT * FROM Models WHERE ItemNumber=" + id;
                    OleDbCommand cmd = new OleDbCommand(query, con);
                    cmd.ExecuteNonQuery();

                    OleDbDataReader reader = cmd.ExecuteReader();
                    Model _model = new Model();
                    while (reader.Read())
                    {
                        int itemNum = Convert.ToInt32(reader["ItemNumber"]);
                        string itemName = Convert.ToString(reader["Name"]);
                        string itemType = Convert.ToString(reader["Type"]);
                        string itemSbjArea = Convert.ToString(reader["SubjectArea"]);
                        double itemPrice = Convert.ToDouble(reader["CurrentRetailPrice"]);
                        string itemDes = Convert.ToString(reader["Description"]);
                        bool itemAvail = Convert.ToBoolean(reader["Availability"]);
                        int stockCount = Convert.ToInt32(reader["StockCount"]);

                        _model = new Model(itemName, itemType, itemSbjArea, itemPrice, itemDes,itemAvail)
                        {
                            Id = itemNum,
                           
                            StockCount = stockCount
                        };

                    }
                    return _model;
                }
                catch (Exception e)
                {
                    throw new System.ApplicationException(e.Message);
                }
            }
        }
        public List<Model> SearchDatabase(string input)
        {
            using (OleDbConnection con = new OleDbConnection(connectionString))
            {
                try
                {
                    con.Open();
                    string query = "SELECT * FROM Models WHERE Name LIKE '%" + input + "%' OR Type LIKE '%" + input + "%' OR SubjectArea LIKE '%" + input + "%' ORDER BY Name";
                    OleDbCommand cmd = new OleDbCommand(query, con);
                    cmd.ExecuteNonQuery();

                    List<Model> objects = new List<Model>();

                    OleDbDataReader reader = cmd.ExecuteReader();
                    while (reader.Read())
                    {
                        int itemNum = Convert.ToInt32(reader["ItemNumber"]);
                        string itemName = Convert.ToString(reader["Name"]);
                        string itemType = Convert.ToString(reader["Type"]);
                        string itemSbjArea = Convert.ToString(reader["SubjectArea"]);
                        double itemPrice = Convert.ToDouble(reader["CurrentRetailPrice"]);
                        string itemDes = Convert.ToString(reader["Description"]);
                        bool itemAvail = Convert.ToBoolean(reader["Availability"]);
                        int stockCount = Convert.ToInt32(reader["StockCount"]);

                        Model _model = new Model(itemName, itemType, itemSbjArea, itemPrice, itemDes,itemAvail);
                        _model.Id = itemNum;
                       
                        _model.StockCount = stockCount;

                        objects.Add(_model);
                    }
                    return objects;
                }
                catch (Exception e)
                {
                    throw new System.ApplicationException(e.Message);
                }
            }
        }
        public void UpdateModelDetails()
        {
            using (OleDbConnection con = new OleDbConnection(connectionString))
            {
                try
                {
                    con.Open();
                    string query = "UPDATE Models SET Name=@name,Type=@type,SubjectArea=@area,CurrentRetailPrice=@price ,Description=@des, Availability=@avai WHERE ItemNumber=@id";
                    OleDbCommand cmd = new OleDbCommand(query, con);
                    cmd.Parameters.AddWithValue("@name", itemName);
                    cmd.Parameters.AddWithValue("@type", itemType);
                    cmd.Parameters.AddWithValue("@area", itemSbjArea);
                    cmd.Parameters.AddWithValue("@price", itemPrice);
                    cmd.Parameters.AddWithValue("@des", itemDes);
                    cmd.Parameters.AddWithValue("@id", itemNum);
                    cmd.Parameters.AddWithValue("@avai", itemAvail);

                    cmd.ExecuteNonQuery();
                }
                catch (Exception e)
                {
                    throw new System.ApplicationException(e.Message);
                }
            }
        }
        public void DeleteModel()
        {
            using (OleDbConnection con = new OleDbConnection(connectionString))
            {
                try
                {
                    con.Open();
                    string query = "DELETE FROM Models WHERE ItemNumber=@id";
                    OleDbCommand cmd = new OleDbCommand(query, con);
                    cmd.Parameters.AddWithValue("@id", itemNum);

                    cmd.ExecuteNonQuery();
                }
                catch (Exception e)
                {
                    throw new System.ApplicationException(e.Message);
                }
            }
        }
        public List<Supplier> returnSuppliers()
        {
            using (OleDbConnection con = new OleDbConnection(connectionString))
            {
                try
                {
                    con.Open();
                    string query = "SELECT Suppliers.SupplierID, SupplierName,SupplierAddress,CreditLine FROM Suppliers INNER JOIN SupplierItems ON Suppliers.SupplierID = SupplierItems.SupplierID WHERE ItemNumber="+itemNum;
                    OleDbCommand cmd = new OleDbCommand(query, con);
                    cmd.ExecuteNonQuery();

                    List<Supplier> sups = new List<Supplier>();

                    OleDbDataReader reader = cmd.ExecuteReader();
                    while (reader.Read())
                    {
                        int supID = Convert.ToInt32(reader["SupplierID"]);
                        string supName = Convert.ToString(reader["SupplierName"]);
                        string supAddress = Convert.ToString(reader["SupplierAddress"]);
                        double creditLine = Convert.ToDouble(reader["CreditLine"]);

                        Supplier _supplier = new Supplier(supName, supAddress, creditLine)
                        {
                            Id = supID
                        };

                        sups.Add(_supplier);
                        Console.WriteLine(_supplier.Name);
                    
                    }
                    return sups;
                }
                catch (Exception e)
                {
                    throw new System.ApplicationException(e.Message);
                }
            }
        }
        
        public List<Store> returnStores()
        {
            using (OleDbConnection con = new OleDbConnection(connectionString))
            {
                try
                {
                    con.Open();
                    string query = "SELECT Stores.StoreID, StoreAddress FROM Stores INNER JOIN StoreInventory ON Stores.StoreID = StoreInventory.StoreID WHERE ItemNumber=" + itemNum;
                    OleDbCommand cmd = new OleDbCommand(query, con);
                    cmd.ExecuteNonQuery();

                    List<Store> stores = new List<Store>();

                    OleDbDataReader reader = cmd.ExecuteReader();
                    while (reader.Read())
                    {
                        int storeID = Convert.ToInt32(reader["StoreID"]);
                        string storeAdd = Convert.ToString(reader["StoreAddress"]);

                        Store _store = new Store(storeID, storeAdd);

                        stores.Add(_store);
                    }
                    return stores;
                }
                catch (Exception e)
                {
                    throw new System.ApplicationException(e.Message);
                }
            }
        }
        public List<String> returnSubjectAreas()
        {
            using (OleDbConnection con = new OleDbConnection(connectionString))
            {
                try
                {
                    con.Open();
                    string query = "SELECT SubjectArea FROM SubjectAreas";
                    OleDbCommand cmd = new OleDbCommand(query, con);
                    cmd.ExecuteNonQuery();

                    List<string> areaList = new List<String>();
                    OleDbDataReader reader = cmd.ExecuteReader();
                    while (reader.Read())
                    {
                        string area = Convert.ToString(reader["SubjectArea"]);
                        areaList.Add(area);
                    }
                    return areaList;
                }
                catch (Exception e)
                {
                    throw new System.ApplicationException(e.Message);
                }
            }
        }
        public List<String> returnTypes()
        {
            using (OleDbConnection con = new OleDbConnection(connectionString))
            {
                try
                {
                    con.Open();
                    string query = "SELECT Type FROM ModelTypes";
                    OleDbCommand cmd = new OleDbCommand(query, con);
                    cmd.ExecuteNonQuery();

                    List<string> typeList = new List<String>();
                    OleDbDataReader reader = cmd.ExecuteReader();
                    while (reader.Read())
                    {
                        string type = Convert.ToString(reader["Type"]);
                        typeList.Add(type);
                    }
                    return typeList;
                }
                catch (Exception e)
                {
                    throw new System.ApplicationException(e.Message);
                }
            }
        }
    }
}