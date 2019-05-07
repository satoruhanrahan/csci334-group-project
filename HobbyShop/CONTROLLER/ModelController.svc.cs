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

    public class ModelController
    {
        [OperationContract]
        public string AddNewModel(string name, string type, string area, double price, string des)
        {
            try
            {
                Model _model = new Model (name,type,area,price,des);
                _model.AddNewModel();

                string json = new JavaScriptSerializer().Serialize(_model);
                return json;
            }
            catch (Exception e)
            {
                return e.Message;
            }
        }

        [OperationContract]
        public string SearchDatabase(string input)
        {
            Model _model = new Model();
            List<Model> modelList = new List<Model>();
            modelList=_model.SearchDatabase(input);

            string json = new JavaScriptSerializer().Serialize(modelList);
            return json;
        }

        [OperationContract]
        public string UpdateModelDetails(int id, string name, string type, string area, double price, string des)
        {
            try
            {
                Model _model = new Model();
                List<Model> modelList=_model.SearchDatabase(id.ToString()); // this list only have one item because the parsed variable is ID, get the item to update

                //set the item attributes 
                modelList[0].Name = name;
                modelList[0].Type = type;
                modelList[0].SbjArea = area;
                modelList[0].Price = price;
                modelList[0].Description = des;
                modelList[0].UpdateModelDetails();

                string json = new JavaScriptSerializer().Serialize(modelList[0]);
                return json;
            }
            catch (Exception e)
            {
                return e.Message;
            }
        }

        [OperationContract]
        public string DeleteModel(int id)
        {
            try
            {
                Model _model = new Model();
                _model.Id = id;
                _model.DeleteModel();
                return id.ToString();
            }
            catch (Exception e)
            {
                return e.Message;
            }
        }
    }
}

