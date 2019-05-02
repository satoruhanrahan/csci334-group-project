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
                Sale sale = new Sale(date, customerID, totalValue, discount, finalTotal);
                sale.AddSaleRecord();
                return "";
            }
            catch (Exception e)
            {
                return e.Message;
            }
        }

        public string UpdateSaleDetails(int id, DateTime date, int customerID, double totalValue, double discount, double finalTotal)
        {
            try
            {
                Sale sale = new Sale(id, date, customerID, totalValue, discount, finalTotal);
                sale.UpdateSaleDetails();
                return "";
            }
            catch (Exception e)
            {
                return e.Message;
            }
        }

        [OperationContract]
        public string DeleteSaleRecord(int id)
        {
            try
            {
                Sale sale = new Sale(id);
                sale.DeleteSaleRecord();
                return "";
            }
            catch (Exception e)
            {
                return e.Message;
            }
        }
    }
}
