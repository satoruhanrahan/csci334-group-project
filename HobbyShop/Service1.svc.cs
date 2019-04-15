using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.Serialization;
using System.ServiceModel;
using System.ServiceModel.Activation;
using System.ServiceModel.Web;
using System.Text;
using System.Web.Script.Serialization;

namespace HobbyShop
{
    [ServiceContract(Namespace = "")]
    [AspNetCompatibilityRequirements(RequirementsMode = AspNetCompatibilityRequirementsMode.Allowed)]
    public class Service1
    {
        [OperationContract]
        public string GetInventoryName()
        {
            InventoryDB data = new InventoryDB();
            return data.GetInventoryName();
        }


        [OperationContract]
        public string AddNewModel(string name, string type, string area, int price, string des, string avail)
        {
               
            try
            {
                ModelDBData data = new ModelDBData();
                Model x = new Model(name, type, area, price, des, avail);
                data.AddNewModel(x);
                return "";
               
            }
            catch (Exception oEx)
            {
                return oEx.Message;
            }
        }
    }
}
