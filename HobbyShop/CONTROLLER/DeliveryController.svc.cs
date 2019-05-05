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
    public class DeliveryController
    {
        string connectionString = ConfigurationManager.ConnectionStrings["dbconnection"].ConnectionString.ToString();


        [OperationContract]
        public string GetDeliveryRecords()
        {
            Delivery delivery = new Delivery();
            ArrayList deliveryList = delivery.GetDeliveryRecords();

            string json = new JavaScriptSerializer().Serialize(deliveryList);
            return json;
        }

        [OperationContract]
        public string AddDeliveryRecord(string date, int storeID, int supplierID)
        {
            try
            {
                DateTime formatedDate = DateTime.Parse(date);
                Delivery delivery = new Delivery(formatedDate, storeID, supplierID);
                delivery.AddDeliveryRecord();
                return "";
            }
            catch (Exception e)
            {
                return e.Message;
            }
        }

        [OperationContract]
        public string EditDeliveryDetails(int id, string date, int storeID, int supplierID)
        {
            try
            {
                DateTime formatedDate = DateTime.Parse(date);
                Delivery delivery = new Delivery(id, formatedDate, storeID, supplierID);
                delivery.EditDeliveryDetails();
                string json = new JavaScriptSerializer().Serialize(delivery);
                return json;
                //return "";
            }
            catch (Exception e)
            {
                return e.Message;
            }
        }

        [OperationContract]
        public string DeleteDeliveryRecord(int id)
        {
            try
            {
                Delivery delivery = new Delivery(id);
                delivery.DeleteDeliveryRecord();
                return "";
            }
            catch (Exception e)
            {
                return e.Message;
            }
        }
    }
}
