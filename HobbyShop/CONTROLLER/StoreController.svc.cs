using HobbyShop.CLASS;
using System;
using System.Collections;
using System.Collections.Generic;
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
    public class StoreController
    {
        [OperationContract]
        public string GetStores(string keyword)
        {
            Store store = new Store();
            ArrayList storeList = store.GetStores(keyword);

            string json = new JavaScriptSerializer().Serialize(storeList);
            return json;
        }

        [OperationContract]
        public string AddStore(string address)
        {
            try
            {
                Store store = new Store(address);
                store.AddStore();
                return "";
            }
            catch (Exception ex)
            {
                return ex.Message;
            }
        }

        [OperationContract]
        public string UpdateStore(int storeID, string address)
        {
            try
            {
                Store store = new Store(storeID, address);
                store.UpdateStore();
                return "";
            }
            catch (Exception ex)
            {
                return ex.Message;
            }
        }

        [OperationContract]
        public string DeleteStore(int id)
        {
            try
            {
                Store store = new Store(id);
                store.DeleteStore();
                return "";
            }
            catch (Exception ex)
            {
                return ex.Message;
            }
        }

        [OperationContract]
        public string AddInventoryItem(string itemList) //string itemName, int stockCount, int location, DateTime firstStockDate
        {
            try
            {
                JavaScriptSerializer serializer = new JavaScriptSerializer();
                var list = serializer.Deserialize<SaleItem[]>(itemList);

                ArrayList items = new ArrayList(list);
                Store store = new Store();
                store.Items = items;
                //store.AddInventoryItem();
                return "";
            }
            catch (Exception ex)
            {
                return ex.Message;
            }
        }

        [OperationContract]
        public string AddInventorItem(int storeID, string itemName, int stockCount, int location, string firstDate)
        {
            try
            {
                Store store = new Store();
                DateTime formatedDate = DateTime.Parse(firstDate);
                store.AddInventoryItem(storeID, itemName, stockCount, location, formatedDate);
                return "";
            }
            catch (Exception ex)
            {
                return ex.Message;
            }
        }

        [OperationContract]
        public string EditInventoryItem(string itemName, int stockCount, int location, string firstDate) //users are not allowed to change the storeID
        {
            try
            {
                Store store = new Store();
                DateTime formatedDate = DateTime.Parse(firstDate);
                store.EditInventoryItem(itemName, stockCount, location, formatedDate);
                return "";
            }
            catch (Exception ex)
            {
                return ex.Message;
            }
        }

        [OperationContract]
        public string DeleteInventoryItem(string itemName) //users are not allowed to change the storeID
        {
            try
            {
                Store store = new Store();
                store.DeleteInventoryItem(itemName);
                return "";
            }
            catch (Exception ex)
            {
                return ex.Message;
            }
        }
    }
}