using System;
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
    //NOTE: PHONE IS UNIQUE
    [ServiceContract(Namespace = "")]
    [AspNetCompatibilityRequirements(RequirementsMode = AspNetCompatibilityRequirementsMode.Allowed)]
    public class ContactsController
    {
        [OperationContract]
        public string Add(int supid, string fullname, string phone)
        {
            try
            {
                SupplierContact _sup = new SupplierContact(supid, fullname, phone);
                _sup.AddNewContact();

                string json = new JavaScriptSerializer().Serialize(_sup);
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
            SupplierContact _s = new SupplierContact();
            List<SupplierContact> sList = new List<SupplierContact>();
            sList = _s.SearchDatabase(input);

            string json = new JavaScriptSerializer().Serialize(sList);
            return json;
        }

        [OperationContract]
        public string Update(int id,int supid, string name, string phone )
        {
            try
            {
                SupplierContact _s = new SupplierContact();
                _s = _s.SearchById(id);
                _s.SupID = supid;
                _s.Name = name;
                _s.Phone = phone;

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
                SupplierContact _s = new SupplierContact
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
