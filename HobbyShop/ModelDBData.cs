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


namespace HobbyShop
{
    public class ModelDBData
    {


        OleDbConnection con = new OleDbConnection("Provider=Microsoft.JET.OLEDB.4.0; Data Source=" + System.Web.Hosting.HostingEnvironment.MapPath("~/Database.mdb"));
        OleDbCommand cmd = new OleDbCommand();
        public void AddNewModel(Model model1)
        {

            
            if (con.State == System.Data.ConnectionState.Closed)
            {
                cmd.Connection = con;
                con.Open();
            }
            int newModelID = model1.ID;
            string query = "INSERT INTO Models VALUES (@newModelID,@name,@type,@area,@price,@des,@avail)";

            cmd = new OleDbCommand(query, con);

            cmd.Parameters.AddWithValue("@newModelID", newModelID);
            cmd.Parameters.AddWithValue("@name", model1.Name);
            cmd.Parameters.AddWithValue("@type", model1.Type);
            cmd.Parameters.AddWithValue("@area", model1.SbjArea);
            cmd.Parameters.AddWithValue("@price", model1.Price);
            cmd.Parameters.AddWithValue("@des", model1.Description);
            cmd.Parameters.AddWithValue("@avail", model1.Availability);

            cmd.ExecuteNonQuery();

       

            con.Close();
            
        }


        /*
        internal string GetInventoryName()
        {
            throw new NotImplementedException();
        }*/
    }
}