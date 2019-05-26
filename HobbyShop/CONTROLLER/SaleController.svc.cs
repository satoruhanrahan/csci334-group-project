using HobbyShop.CLASS;
//using HobbyShop.CLASS.SaleItem;
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
    public class SaleController : BaseController<Sale>
    {

        [OperationContract]
        public string AddSaleRecord(string date, int customerID, int storeID, double totalValue, double discount, double finalTotal, string itemList)
        {
            try
            {
                DateTime formatedDate = DateTime.Parse(date);
                JavaScriptSerializer serializer = new JavaScriptSerializer();
                var list = serializer.Deserialize<SaleItem[]>(itemList);
                
                ArrayList items = new ArrayList(list);
                Sale sale = new Sale(formatedDate, customerID, storeID, totalValue, discount, finalTotal);
                sale.Items = items;
                sale.AddSaleRecord();
                return "";
            }
            catch (Exception e)
            {
                return e.Message;
            }
        }

        //[System.Runtime.InteropServices.ComVisible(false)]
        //public static void NotifyOfCrossThreadDependency();

        [OperationContract]
        public string EditSaleDetails(int saleID, string date, int customerID, int storeID, double totalValue, double discount, double finalTotal, string itemList)
        {
            try
            {
                DateTime formatedDate = DateTime.Parse(date);
                JavaScriptSerializer serializer = new JavaScriptSerializer();
                var list = serializer.Deserialize<SaleItem[]>(itemList);
                //JavaScriptSerializer js = new JavaScriptSerializer();
                //BlogSites blogObject = js.Deserialize<BlogSites>(jsonData);
                //var items = new JavaScriptSerializer().Deserialize<List<SaleItem>>(itemList);
                ArrayList items = new ArrayList(list);
                Sale sale = new Sale(saleID, formatedDate, customerID, storeID, totalValue, discount, finalTotal);
                sale.Items = items;
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
