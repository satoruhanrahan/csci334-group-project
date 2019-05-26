using System;
using System.ServiceModel;
using System.Web.Script.Serialization;

namespace HobbyShop.CONTROLLER
{
    [ServiceContract(Namespace = "")]
    public class BaseController<T> where T : CLASS.BaseModel, new()
    {
        public BaseController()
        {
        }

        [OperationContract]
        public string GetRecords(string search)
        {
            T model = new T();
            var modelList = model.GetRecords(search);

            string json = new JavaScriptSerializer().Serialize(modelList);
            return json;
        }

    }
}
