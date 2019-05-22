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

namespace HobbyShop

{
    public class SupplierContact
    {
        private int ID;
        private int supID;
        private string contactName;
        private string contactPhone;

        public int Id { get { return ID; } set { ID = value; } }
        public int SupID { get { return supID; } set { supID = value; } }
        public string Name { get { return contactName; } set { contactName = value; } }
        public string Phone { get { return contactPhone; } set { contactPhone = value; } }



        public SupplierContact()
        {

        }
        public SupplierContact(int supID, string Name, string Phone)
        {
            this.supID = supID;
            this.contactName = Name;
            this.contactPhone = Phone;
        }
        string connectionString = ConfigurationManager.ConnectionStrings["dbconnection"].ConnectionString.ToString();
        public void AddNewContact()
        {
            using (OleDbConnection con = new OleDbConnection(connectionString))
            {
                try
                {
                    con.Open();

                    string query = "INSERT INTO SupplierContacts (SupplierID, FullName, PhoneNo) VALUES (@id,@name,@phone)";
                    OleDbCommand cmd = new OleDbCommand(query, con);
                    cmd.Parameters.AddWithValue("@id", supID );
                    cmd.Parameters.AddWithValue("@name", contactName);
                    cmd.Parameters.AddWithValue("@phone", contactPhone);

                    cmd.ExecuteNonQuery();
                }
                catch (Exception ex)
                {
                    throw new System.ApplicationException(ex.Message);
                }
            }
        }
        public SupplierContact SearchById(int id)
        {
            using (OleDbConnection con = new OleDbConnection(connectionString))
            {
                try
                {
                    con.Open();
                    string query = "SELECT * FROM SupplierContacts WHERE ID=" + id;
                    OleDbCommand cmd = new OleDbCommand(query, con);
                    cmd.ExecuteNonQuery();

                    OleDbDataReader reader = cmd.ExecuteReader();
                    SupplierContact _sup = new SupplierContact();
                    while (reader.Read())
                    {
                        int contactid = Convert.ToInt32(reader["ID"]);
                        int supNum = Convert.ToInt32(reader["SupplierID"]);
                        string name = Convert.ToString(reader["FullName"]);
                        string phonenum = Convert.ToString(reader["PhoneNo"]);


                        _sup = new SupplierContact(supNum, name, phonenum);
                        _sup.Id = contactid;

                    }
                    return _sup;
                }
                catch (Exception e)
                {
                    throw new System.ApplicationException(e.Message);
                }
            }
        }
        public List<SupplierContact> SearchDatabase(string input)
        {
            using (OleDbConnection con = new OleDbConnection(connectionString))
            {
                try
                {
                    con.Open();
                    string query = "SELECT * FROM SupplierContacts WHERE FullName LIKE '%" + input + "%' OR PhoneNo LIKE '%" + input + "%' ORDER BY FullName";
                    OleDbCommand cmd = new OleDbCommand(query, con);
                    cmd.ExecuteNonQuery();

                    List<SupplierContact> sups = new List<SupplierContact>();

                    OleDbDataReader reader = cmd.ExecuteReader();
                    while (reader.Read())
                    {
                        int contactid = Convert.ToInt32(reader["ID"]);
                        int supNum = Convert.ToInt32(reader["SupplierID"]);
                        string name = Convert.ToString(reader["FullName"]);
                        string phone = Convert.ToString(reader["PhoneNo"]);

                        SupplierContact _sup = new SupplierContact(supNum, name, phone);
                        _sup.Id = contactid;
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
                    string query = "UPDATE SupplierContacts SET FullName=@name,PhoneNo=@phone, SupplierID=@id WHERE ID=" + ID;
                    OleDbCommand cmd = new OleDbCommand(query, con);
                    cmd.Parameters.AddWithValue("@name", contactName);
                    cmd.Parameters.AddWithValue("@phone", contactPhone);
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
                    string query = "DELETE FROM SupplierContacts WHERE ID=@id";
                    OleDbCommand cmd = new OleDbCommand(query, con);
                    cmd.Parameters.AddWithValue("@id", ID );

                    cmd.ExecuteNonQuery();
                }
                catch (Exception e)
                {
                    throw new System.ApplicationException(e.Message);
                }
            }
        }

    }
}