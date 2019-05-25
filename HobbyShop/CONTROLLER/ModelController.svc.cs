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
    // FOR OLIVER: Delete only return modelName because when model is deleted cannot retrieve object, everything else return modelObject

    [ServiceContract(Namespace = "")]
    [AspNetCompatibilityRequirements(RequirementsMode = AspNetCompatibilityRequirementsMode.Allowed)]

    public class ModelController
    {
        [OperationContract]
        public string AddNewModel(string name, string type, string area, double price, string des, bool avail)
        {
            try
            {
                Model _model = new Model(name,type,area,price,des,avail);
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
        public string UpdateModelDetails(int id, string name, string type, string area, double price, string des, bool avail)
        {
            try
            {
                Model modelOnSearch = new Model();
                modelOnSearch=modelOnSearch.SearchByID(id); 
                //set the item attributes 
                modelOnSearch.Name = name;
                modelOnSearch.Type = type;
                modelOnSearch.SbjArea = area;
                modelOnSearch.Price = price;
                modelOnSearch.Description = des;
                modelOnSearch.Availability = avail;
                modelOnSearch.UpdateModelDetails();

                string json = new JavaScriptSerializer().Serialize(modelOnSearch);
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

        [OperationContract]
        public string ReturnCorrespondingSupplier(int id)
        {
            try
            {
                Model _model = new Model();
                _model.Id = id;
                List<Supplier> supList = new List<Supplier>();
                supList=_model.returnSuppliers();

                string json = new JavaScriptSerializer().Serialize(supList);
                return json;
            }
            catch (Exception e)
            {
                return e.Message;
            }
        }
        [OperationContract]
        public string ReturnCorrespondingStores(int id)
        {
            try
            {
                Model _model = new Model();
                _model.Id = id;
                List<Store> storeList = new List<Store>();
                storeList = _model.returnStores();

                string json = new JavaScriptSerializer().Serialize(storeList);
                return json;
            }
            catch (Exception e)
            {
                return e.Message;
            }
        }
        [OperationContract]
        public string ReturnStores(int id)
        {
            try
            {
                Model _model = new Model();
                _model.Id = id;
                List<Store> storeList = new List<Store>();
                storeList = _model.returnStores();

                string json = new JavaScriptSerializer().Serialize(storeList);
                return json;
            }
            catch (Exception e)
            {
                return e.Message;
            }
        }
        [OperationContract]
        public string ReturnSubjectAreaList()
        {
            try
            {
                Model _model = new Model();
                List<String> areas = new List<String>();
                areas = _model.returnSubjectAreas();

                string json = new JavaScriptSerializer().Serialize(areas);
                return json;
            }
            catch (Exception e)
            {
                return e.Message;
            }
        }
        [OperationContract]
        public string ReturnTypeList()
        {
            try
            {
                Model _model = new Model();
                List<String> types = new List<String>();
                types = _model.returnTypes();

                string json = new JavaScriptSerializer().Serialize(types);
                return json;
            }
            catch (Exception e)
            {
                return e.Message;
            }
        }
    }
}

