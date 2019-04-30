using System;
using System.Collections;
using System.Collections.Generic;
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
        static OleDbConnection con = new OleDbConnection("Provider=Microsoft.JET.OLEDB.4.0; Data Source=" + System.Web.Hosting.HostingEnvironment.MapPath("~/Database.mdb"));
        static OleDbCommand cmd = new OleDbCommand();

        [OperationContract]
        public string AddNewModel(string name, string type, string area, double price, string des, bool avail, int stockCount)
        {
            try
            {
                Model x = new Model(name, type, area, price, des, avail, stockCount);

                if (con.State == System.Data.ConnectionState.Closed)
                {
                    cmd.Connection = con;
                    con.Open();
                }

                string query = "INSERT INTO Models (Name,Type,SubjectArea,CurrentRetailPrice,Description,Availability,StockCount) VALUES (@name,@type,@area,@price,@des,@avail, @count)";

                cmd = new OleDbCommand(query, con);

                cmd.Parameters.AddWithValue("@name", x.Name);
                cmd.Parameters.AddWithValue("@type", x.Type);
                cmd.Parameters.AddWithValue("@area", x.SbjArea);
                cmd.Parameters.AddWithValue("@price", x.Price);
                cmd.Parameters.AddWithValue("@des", x.Description);
                cmd.Parameters.AddWithValue("@avail", x.Availability);
                cmd.Parameters.AddWithValue("@count", x.StockCount);

                cmd.ExecuteNonQuery();
                con.Close();
               
                return "";
            }
            catch (Exception oEx)
            {
                return oEx.Message;
            }
        }


        [OperationContract]
        public string ReturnFromDatabase()
        {
            if (con.State == System.Data.ConnectionState.Closed)
            {
                cmd.Connection = con;
                con.Open();
            }
            string query = "SELECT * FROM Models ";

            cmd = new OleDbCommand(query, con);

            ArrayList objects = new ArrayList();

            OleDbDataReader reader = cmd.ExecuteReader();

            int itemNum;
            string itemName;
            string itemType;
            string itemSbjArea;
            double itemPrice;
            string itemDes;
            bool itemAvail;
            int stockCount;

            while (reader.Read())
            {
                itemNum = Convert.ToInt32(reader["ItemNumber"]);
                itemName = Convert.ToString(reader["Name"]);
                itemType = Convert.ToString(reader["Type"]);
                itemSbjArea = Convert.ToString(reader["SubjectArea"]);
                itemPrice = Convert.ToDouble(reader["CurrentRetailPrice"]);
                itemDes = Convert.ToString(reader["Description"]);
                itemAvail = Convert.ToBoolean(reader["Availability"]);
                stockCount = Convert.ToInt32(reader["StockCount"]);

                Model _model = new Model(itemName, itemType, itemSbjArea, itemPrice, itemDes, itemAvail, stockCount);
                _model.Id = itemNum;

                objects.Add(_model);
            }
            con.Close();
           
            string json = new JavaScriptSerializer().Serialize(objects);
            return json;

        }


    }
}

