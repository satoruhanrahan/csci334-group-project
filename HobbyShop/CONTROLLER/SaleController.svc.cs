using HobbyShop.CLASS;
using System;
using System.Collections;
using System.Collections.Generic;
using System.Configuration;
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
        [OperationContract]
        public string GetSaleRecords(string keywords)
        {
            Sale sale = new Sale();
            ArrayList saleList = sale.GetSaleRecords(keywords);

            string json = new JavaScriptSerializer().Serialize(saleList);
            return json;
        }

        [OperationContract]
        public string AddSaleRecord(string date, int customerID, double totalValue, double discount, double finalTotal)
        {
            try
            {
                DateTime formatedDate = DateTime.Parse(date);
                Sale sale = new Sale(formatedDate, customerID, totalValue, discount, finalTotal);
                sale.AddSaleRecord();
                return "";
            }
            catch (Exception e)
            {
                return e.Message;
            }
        }

        [OperationContract]
        public string EditSaleDetails(string date, int customerID, double totalValue, double discount, double finalTotal)
        {
            try
            {
                DateTime formatedDate = DateTime.Parse(date);
                Sale sale = new Sale(formatedDate, customerID, totalValue, discount, finalTotal);
                sale.EditSaleDetails();
                string json = new JavaScriptSerializer().Serialize(sale);
                return json;
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
