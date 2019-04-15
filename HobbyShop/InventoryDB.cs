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
    public class InventoryDB 
    {

        
        OleDbConnection con = new OleDbConnection("Provider=Microsoft.JET.OLEDB.4.0; Data Source=" + System.Web.Hosting.HostingEnvironment.MapPath("~/Database.mdb"));
        OleDbCommand cmd= new OleDbCommand();
        public string GetInventoryName()
        {
            if (con.State == System.Data.ConnectionState.Closed)
            {
                cmd.Connection = con;
                con.Open();
            }



            string query = "SELECT Models.Name FROM Models ";

            
            string itemName;

            cmd =  new OleDbCommand( query, con);

            OleDbDataReader reader = cmd.ExecuteReader();

            ArrayList nameList = new ArrayList();
           
                while (reader.Read())
                {
                    itemName = reader["Name"].ToString();
                    nameList.Add(itemName);
                }
            
            
            con.Close();
            string json = new JavaScriptSerializer().Serialize(nameList);
            return json;
        }
       

        /*
        internal string GetInventoryName()
        {
            throw new NotImplementedException();
        }*/
    }
}