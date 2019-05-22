﻿using HobbyShop.CLASS;
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

    public class SupplierController
    {
        [OperationContract]
        public string Add(string name, string address, double credit)
        {
            try
            {
                Supplier _s = new Supplier(name, address, credit);
                _s.AddNewSupplier();

                string json = new JavaScriptSerializer().Serialize(_s);
                return json;
            }
            catch (Exception e)
            {
                return e.Message;
            }
        }

        [OperationContract]
        public string Search(string input)
        {
            Supplier _s = new Supplier();
            List<Supplier> sList = new List<Supplier>();
            sList = _s.SearchDatabase(input);

            string json = new JavaScriptSerializer().Serialize(sList);
            return json;
        }

        [OperationContract]
        public string Update(int id, string name, string address, double credit)
        {
            try
            {
                Supplier _s = new Supplier();
                _s = _s.SearchByID(id);
                _s.Name = name;
                _s.Address = address;
                _s.CreditLine = credit;

                _s.UpdateDetails();

                string json = new JavaScriptSerializer().Serialize(_s);
                return json;
            }
            catch (Exception e)
            {
                return e.Message;
            }
        }

        [OperationContract]
        public string Delete(int id)
        {
            try
            {
                Supplier _s = new Supplier
                {
                    Id = id
                };
                _s.Delete();

                return id.ToString();
            }
            catch (Exception e)
            {
                return e.Message;
            }
        }
    }
}

