using System;
using System.ServiceModel;
using System.Web.Script.Serialization;

namespace HobbyShop.CONTROLLER
{
    public abstract class BaseController<T> where T : CLASS.BaseModel, new()
    {
        public virtual string GetRecords(string search)
        {
            T model = new T();
            var modelList = model.GetRecords(search);

            string json = new JavaScriptSerializer().Serialize(modelList);
            return json;
        }
    }
}