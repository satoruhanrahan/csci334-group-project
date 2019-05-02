using System;
using System.Collections;
using System.Collections.Generic;
using System.Configuration;
using System.Data.OleDb;
using System.Linq;
using System.Runtime.Serialization;
using System.ServiceModel;
using System.ServiceModel.Activation;
using System.ServiceModel.Web;
using System.Text;
using System.Web.Script.Serialization;

namespace HobbyShop.CONTROLLER
{

    [ServiceContract(Namespace = "")]
    [AspNetCompatibilityRequirements(RequirementsMode = AspNetCompatibilityRequirementsMode.Allowed)]


    public class ModelController
    {
        string connectionString = ConfigurationManager.ConnectionStrings["dbconnection"].ConnectionString.ToString();

        [OperationContract]
        public string AddNewModel(string name, string type, string area, double price, string des, bool avail, int stockCount)
        {
            using (OleDbConnection con = new OleDbConnection(connectionString))
            {
                try
                {
                    //Model x = new Model(name, type, area, price, des, avail, stockCount);
                    con.Open();
                    string query = "INSERT INTO Models (Name,Type,SubjectArea,CurrentRetailPrice,Description,Availability,StockCount) VALUES (@name,@type,@area,@price,@des,@avail, @count)";
                    OleDbCommand cmd = new OleDbCommand(query, con);
                    cmd.Parameters.AddWithValue("@name", name);
                    cmd.Parameters.AddWithValue("@type", type);
                    cmd.Parameters.AddWithValue("@area", area);
                    cmd.Parameters.AddWithValue("@price", price);
                    cmd.Parameters.AddWithValue("@des", des);
                    cmd.Parameters.AddWithValue("@avail", avail);
                    cmd.Parameters.AddWithValue("@count", stockCount);

                    cmd.ExecuteNonQuery();

                    return "";
                }
                catch (Exception oEx)
                {
                    return oEx.Message;
                }
            }
        }


        [OperationContract]
        public string ReturnFromDatabase()
        {
            using (OleDbConnection con = new OleDbConnection(connectionString))
            {
                con.Open();
                string query = "SELECT * FROM Models ";
                OleDbCommand cmd = new OleDbCommand(query, con);
                cmd.ExecuteNonQuery();

                ArrayList objects = new ArrayList();

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

                    Model _model = new Model(itemName, itemType, itemSbjArea, itemPrice, itemDes, itemAvail, stockCount);
                    _model.Id = itemNum;

                    objects.Add(_model);
                }

                string json = new JavaScriptSerializer().Serialize(objects);
                return json;
            }
        }

        [OperationContract]
        public string SearchDatabase(string input)
        {
            using (OleDbConnection con = new OleDbConnection(connectionString))
            {
                try 
                {
                    con.Open();
                    string query = "SELECT * FROM Models WHERE Name LIKE '%" + input + "%' OR Type LIKE '%" + input + "%' OR SubjectArea LIKE '%" + input + "%' ORDER BY Name";
                    OleDbCommand cmd = new OleDbCommand(query, con);
                    cmd.ExecuteNonQuery();

                    ArrayList objects = new ArrayList();

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

                        Model _model = new Model(itemName, itemType, itemSbjArea, itemPrice, itemDes, itemAvail, stockCount);
                        _model.Id = itemNum;

                        objects.Add(_model);
                    }

                    string json = new JavaScriptSerializer().Serialize(objects);
                    return json;
                }
                catch (Exception e)
                {
                    /*
                    Console.WriteLine("Caught Exception:", e);
                    return "{}";
                    */
                    return e.Message; //Linh: can be simple like this to catch the error message.
                }
            }
        }

        [OperationContract]
        public string UpdateModelDetails(int id, string name, string type, string area, double price, string des, bool avail, int stockCount)
        {
            using (OleDbConnection con = new OleDbConnection(connectionString))
            {
                try
                {
                    //Model x = new Model(name, type, area, price, des, avail, stockCount);
                    con.Open();
                    string query = "UPDATE Models SET Name=@name,Type=@type,SubjectArea=@area,CurrentRetailPrice=@price ,Description=@des, Availability=@avail, StockCount=@count WHERE ItemNumber=@id";
                    OleDbCommand cmd = new OleDbCommand(query, con);
                    cmd.Parameters.AddWithValue("@name", name);
                    cmd.Parameters.AddWithValue("@type", type);
                    cmd.Parameters.AddWithValue("@area", area);
                    cmd.Parameters.AddWithValue("@price", price);
                    cmd.Parameters.AddWithValue("@des", des);
                    cmd.Parameters.AddWithValue("@avail", avail);
                    cmd.Parameters.AddWithValue("@count", stockCount);
                    cmd.Parameters.AddWithValue("@id", id);

                    cmd.ExecuteNonQuery();

                    return "";
                }
                catch (Exception oEx)
                {
                    return oEx.Message;
                }
            }
        }

        [OperationContract]
        public string DeleteModel(int id)
        {
            using (OleDbConnection con = new OleDbConnection(connectionString))
            {
                try
                {
                    con.Open();
                    string query = "DELETE FROM Models WHERE ItemNumber=@id";
                    OleDbCommand cmd = new OleDbCommand(query, con);
                    cmd.Parameters.AddWithValue("@id", id);

                    cmd.ExecuteNonQuery();
                    return "";
                }
                catch (Exception oEx)
                {
                    return oEx.Message;
                }
            }
        }
    }
}

