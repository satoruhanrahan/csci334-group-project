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
    public class CustomerController
    {
        [OperationContract]
        public string Add(string cusName, string cusAddress, string cusPhone, double cusCreditLine, double cusBalance, string cusMemberStatus, DateTime? cusJoinDate, string cusEmail)
        {
            try
            {
                Customer _cus = new Customer(cusName, cusAddress, cusPhone, cusCreditLine, cusBalance, cusMemberStatus, cusJoinDate, cusEmail);
                _cus.Add();

                string json = new JavaScriptSerializer().Serialize(_cus);
                return json;
            }
            catch (Exception e)
            {
                throw new System.ApplicationException(e.Message);
            }
        }

        [OperationContract]
        public string Search(string input)
        {
            Customer _cus = new Customer();
            List<Customer> cusList = new List<Customer>();
            cusList = _cus.SearchDatabase(input);

            string json = new JavaScriptSerializer().Serialize(cusList);
            return json;
        }
        [OperationContract] 
        public string UpdateCustomer(int id, string cusName, string cusAddress, string cusPhone, double cusCreditLine, double cusBalance, string cusMemberStatus, DateTime? cusJoinDate, string cusEmail)
        {
            try
            {
                Customer _cus = new Customer();
                _cus.Id = id;
                _cus.Name = cusName;
                _cus.Address = cusAddress;
                _cus.Phone = cusPhone;
                _cus.CreditLine = cusCreditLine;
                _cus.Balance = cusBalance;
                _cus.MemberStatus = cusMemberStatus;
                _cus.JoinDate = cusJoinDate;
                _cus.Email = cusEmail;

                _cus.Update();

                string json = new JavaScriptSerializer().Serialize(_cus);
                return json;
            }
            catch (Exception e)
            {
                throw new System.ApplicationException(e.Message);
            }
        }

        [OperationContract]
        public string Delete(int id)
        {
            try
            {
                Customer _cus = new Customer
                {
                    Id = id
                };
                _cus.Delete();

                return id.ToString();
            }
            catch (Exception e)
            {
                throw new System.ApplicationException(e.Message);
            }
        }
        [OperationContract]
        public string ReturnMemberStatusList ()
        {
            try
            {
                Customer _cus = new Customer();
                List<String> all = new List<String>();
                all = _cus.returnStatus();

                string json = new JavaScriptSerializer().Serialize(all);
                return json;
            }
            catch (Exception e)
            {
                throw new System.ApplicationException(e.Message);
            }
        }
    }
}

