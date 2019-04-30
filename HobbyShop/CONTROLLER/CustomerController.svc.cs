using System;
using System.Collections;
using System.Collections.Generic;
using System.Data.OleDb;
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
        static OleDbConnection con = new OleDbConnection("Provider=Microsoft.JET.OLEDB.4.0; Data Source=" + System.Web.Hosting.HostingEnvironment.MapPath("~/Database.mdb"));
        static OleDbCommand cmd = new OleDbCommand();

        [OperationContract]
        public string AddNewCustomer(string cusName,string cusAddress,string cusEmail,string cusPhone,int cusCreditLine,double cusBalance,bool cusMemberStatus,DateTime cusJoinDate)
        {
            try
            {
                Customer x = new Customer(cusName, cusAddress, cusPhone, cusCreditLine, cusBalance, cusMemberStatus, cusJoinDate, cusEmail);

                if (con.State == System.Data.ConnectionState.Closed)
                {
                    cmd.Connection = con;
                    con.Open();
                }

                string query = "INSERT INTO Models (Name,Address,PhoneNumber,CreditLine,CurrentBalance,ClubMemberStatus,ClubMemberJoinDate,EmailAddress) VALUES (@name,@address,@phone,@credit,@balance,@status, @joindate, @email)";

                cmd = new OleDbCommand(query, con);

                cmd.Parameters.AddWithValue("@name", x.Name);
                cmd.Parameters.AddWithValue("@address", x.Address);
                cmd.Parameters.AddWithValue("@phone", x.Phone);
                cmd.Parameters.AddWithValue("@credit", x.CreditLine);
                cmd.Parameters.AddWithValue("@balance", x.Balance);
                cmd.Parameters.AddWithValue("@status", x.MemberStatus);
                cmd.Parameters.AddWithValue("@email", x.Email);
                cmd.Parameters.AddWithValue("@joindate", x.JoinDate);

                cmd.ExecuteNonQuery();
                con.Close();

                return "";
            }
            catch (Exception oEx)
            {
                return oEx.Message;
            }
        }


        [OperationContract]
        public string ReturnFromDatabase()
        {
            if (con.State == System.Data.ConnectionState.Closed)
            {
                cmd.Connection = con;
                con.Open();
            }
            string query = "SELECT * FROM Models ";

            cmd = new OleDbCommand(query, con);

            ArrayList objects = new ArrayList();

            OleDbDataReader reader = cmd.ExecuteReader();

         string cusName;
         int cusNum;
         string cusAddress;
         string cusEmail;
         string cusPhone;
         int cusCreditLine;
         double cusBalance;
         bool cusMemberStatus;
         DateTime cusJoinDate;


            while (reader.Read())
            {
                cusNum = Convert.ToInt32(reader["CustomerNumber"]);
                cusName = Convert.ToString(reader["Name"]);
                cusAddress = Convert.ToString(reader["Address"]);
                cusPhone = Convert.ToString(reader["PhoneNumber"]);
                cusCreditLine = Convert.ToInt32(reader["CreditLine"]);
                cusBalance = Convert.ToDouble(reader["CurrentBalance"]);
                cusMemberStatus = Convert.ToBoolean(reader["ClubMemberStatus"]);
                cusJoinDate = Convert.ToDateTime(reader["ClubMemberJoinDate"]);
                cusEmail = Convert.ToString(reader["EmailAddress"]);

                Customer _cus = new Customer(cusName, cusAddress, cusPhone, cusCreditLine, cusBalance, cusMemberStatus, cusJoinDate, cusEmail);
                _cus.Id = cusNum;

                objects.Add(_cus);
            }
            con.Close();

            string json = new JavaScriptSerializer().Serialize(objects);
            return json;
        }
    }
}
