using HobbyShop.CLASS;
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
    public class SaleController
    {
        string connectionString = ConfigurationManager.ConnectionStrings["dbconnection"].ConnectionString.ToString();

        [OperationContract]
        public string GetSaleRecords()
        {
            Sale sale = new Sale();
            ArrayList saleList = sale.GetSaleRecords();

            string json = new JavaScriptSerializer().Serialize(saleList);
            return json;
        }

        [OperationContract]
        public string AddSaleRecord(DateTime date, int customerID, double totalValue, double discount, double finalTotal)
        {
            try
            {
                Sale sale = new Sale();
                sale.AddSaleRecord(date, customerID, totalValue, discount, finalTotal);
                return "";
            }
            catch (Exception oEx)
            {
                return oEx.Message;
            }
        }

        public string UpdateModelDetails(int id, string name, string type, string area, double price, string des, bool avail, int stockCount)
        {
            try
            { 
                return "";
            }
            catch (Exception oEx)
            {
                return oEx.Message;
            }
        }

        [OperationContract]
        public string DeleteModel(int id)
        {
            try
            {
                return "";
            }
            catch (Exception oEx)
            {
                return oEx.Message;
            }
        }
    }
}
