using System;
using System.Collections.Generic;
using System.Configuration;
using System.Data.OleDb;
using System.Linq;
using System.Web;

namespace HobbyShop.CLASS
{
    public class Supplier
    {
        private int supID;
        private string supName;
        private string supAddress;
        private double supCreditLine;

        public int Id { get { return supID; } set { supID = value; } }
        public string Name { get { return supName; } set { supName = value; } }
        public string Address { get { return supAddress; } set { supAddress = value; } }
        public double CreditLine { get { return supCreditLine; } set { supCreditLine = value; } }

        public Supplier()
        {

        }
        public Supplier(string Name, string Address, double Credit)
        {
            this.supName = Name;
            this.supAddress = Address;
            this.supCreditLine = Credit;
        }

        string connectionString = ConfigurationManager.ConnectionStrings["dbconnection"].ConnectionString.ToString();
        public void AddNewSupplier()
        {
            using (OleDbConnection con = new OleDbConnection(connectionString))
            {
                try
                {
                    con.Open();
 
                    string query = "INSERT INTO Suppliers (SupplierName,SupplierAddress,CreditLine) VALUES (@name,@address,@credit)";
                    OleDbCommand cmd = new OleDbCommand(query, con);
                    cmd.Parameters.AddWithValue("@name", supName);
                    cmd.Parameters.AddWithValue("@address", supAddress);
                    cmd.Parameters.AddWithValue("@credit", supCreditLine);

                    cmd.ExecuteNonQuery();
                }
                catch (Exception ex)
                {
                    throw new System.ApplicationException(ex.Message);
                }
            }
        }
        public Supplier SearchByID(int id)
        {
            using (OleDbConnection con = new OleDbConnection(connectionString))
            {
                try
                {
                    con.Open();
                    string query = "SELECT * FROM Suppliers WHERE SupplierID=" + id;
                    OleDbCommand cmd = new OleDbCommand(query, con);
                    cmd.ExecuteNonQuery();

                    OleDbDataReader reader = cmd.ExecuteReader();
                    Supplier _sup = new Supplier();
                    while (reader.Read())
                    {
                        int supNum = Convert.ToInt32(reader["SupplierID"]);
                        string supName = Convert.ToString(reader["SupplierName"]);
                        string supAdd = Convert.ToString(reader["SupplierAddress"]);
                        double supCredit = Convert.ToDouble(reader["CreditLine"]);

                        _sup = new Supplier(supName, supAdd, supCredit);
                        _sup.Id = supNum;
                       
                    }
                    return _sup;
                }
                catch (Exception e)
                {
                    throw new System.ApplicationException(e.Message);
                }
            }
        }
        public List<Supplier> SearchDatabase(string input)
        {
            using (OleDbConnection con = new OleDbConnection(connectionString))
            {
                try
                {
                    con.Open();
                    string query = "SELECT * FROM Suppliers WHERE SupplierName LIKE '%" + input + "%' OR SupplierAddress LIKE '%" + input + "%' ORDER BY SupplierName";
                    OleDbCommand cmd = new OleDbCommand(query, con);
                    cmd.ExecuteNonQuery();

                    List<Supplier> sups = new List<Supplier>();

                    OleDbDataReader reader = cmd.ExecuteReader();
                    while (reader.Read())
                    {
                        int supNum = Convert.ToInt32(reader["SupplierID"]);
                        string supName = Convert.ToString(reader["SupplierName"]);
                        string supAdd = Convert.ToString(reader["SupplierAddress"]);
                        double supCredit = Convert.ToDouble(reader["CreditLine"]);

                        Supplier _sup = new Supplier(supName,supAdd,supCredit);
                        _sup.Id = supNum;
                        sups.Add(_sup);
                    }
                    return sups;
                }
                catch (Exception e)
                {
                    throw new System.ApplicationException(e.Message);
                }
            }
        }
        public void UpdateDetails()
        {
            using (OleDbConnection con = new OleDbConnection(connectionString))
            {
                try
                {
                    con.Open();
                    string query = "UPDATE Suppliers SET SupplierName=@name,SupplierAddress=@add,CreditLine=@credit WHERE SupplierID=@id";
                    OleDbCommand cmd = new OleDbCommand(query, con);
                    cmd.Parameters.AddWithValue("@name", supName);
                    cmd.Parameters.AddWithValue("@type", supAddress);
                    cmd.Parameters.AddWithValue("@area", supCreditLine);
                    cmd.Parameters.AddWithValue("@id", supID);
                    cmd.ExecuteNonQuery();
                }
                catch (Exception e)
                {
                    throw new System.ApplicationException(e.Message);
                }
            }
        }
        public void Delete()
        {
            using (OleDbConnection con = new OleDbConnection(connectionString))
            {
                try
                {
                    con.Open();
                    string query = "DELETE FROM Suppliers WHERE SupplierID=@id";
                    OleDbCommand cmd = new OleDbCommand(query, con);
                    cmd.Parameters.AddWithValue("@id", supID);

                    cmd.ExecuteNonQuery();
                }
                catch (Exception e)
                {
                    throw new System.ApplicationException(e.Message);
                }
            }
        }
        public List<Model> returnModels()
        {
            using (OleDbConnection con = new OleDbConnection(connectionString))
            {
                try
                {
                    con.Open();
                    string query = "SELECT Models.ItemNumber,Models.Name,Type,SubjectArea,CurrentRetailPrice,Description,Availability,StockCount FROM Models INNER JOIN SupplierItems ON Models.ItemNumber = SupplierItems.ItemNumber WHERE SupplierItems.SupplierID=" + supID;
                    OleDbCommand cmd = new OleDbCommand(query, con);
                    cmd.ExecuteNonQuery();

                    List<Model> mods = new List<Model>();
                    
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

                        Model _model = new Model(itemName, itemType, itemSbjArea, itemPrice, itemDes)
                        {
                            Id = itemNum,
                            Availability = itemAvail,
                            StockCount = stockCount
                        };
                        mods.Add(_model);

                    }
                    return mods;
                }
                catch (Exception e)
                {
                    throw new System.ApplicationException(e.Message);
                }
            }
        }

        public List<SupplierContact> returnContacts()
        {
            using (OleDbConnection con = new OleDbConnection(connectionString))
            {
                try
                {
                    con.Open();
                    string query = "SELECT SupplierContacts.SupplierID, FullName, PhoneNo FROM SupplierContacts INNER JOIN Suppliers ON SupplierContacts.SupplierID = Suppliers.SupplierID WHERE Suppliers.SupplierID=" + supID;
                    OleDbCommand cmd = new OleDbCommand(query, con);
                    cmd.ExecuteNonQuery();

                    List<SupplierContact> contacts = new List<SupplierContact>();

                    OleDbDataReader reader = cmd.ExecuteReader();
                    while (reader.Read())
                    {
                        int supID = Convert.ToInt32(reader["SupplierID"]);
                        string name = Convert.ToString(reader["FullName"]);
                        string phone = Convert.ToString(reader["PhoneNo"]);

                        SupplierContact supplierContact = new SupplierContact(supID, name, phone);

                        contacts.Add(supplierContact);
                    }
                    return contacts;
                }
                catch (Exception e)
                {
                    throw new System.ApplicationException(e.Message);
                }
            }
        }
    }
}