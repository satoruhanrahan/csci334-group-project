using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.Serialization;
using System.ServiceModel;
using System.ServiceModel.Activation;
using System.ServiceModel.Web;
using System.Text;
using System.Web;
using System.Web.Script.Serialization;
using HobbyShop.CLASS;

namespace HobbyShop.CONTROLLER
{
    [ServiceContract(Namespace = "")]
    [AspNetCompatibilityRequirements(RequirementsMode = AspNetCompatibilityRequirementsMode.Allowed)]


    // NOTE (TO OLIVER) : USERNAME IS UNIQUE, PLEASE DO NOT USE ID WHEN RETRIEVING INFO IN JS
    // NO UPDATE
    public class UserController
    {
        [OperationContract]
        public string ReturnUser(string username, string password) // is currently used to validate users
        // Note: can be used to displayed all users, can not be used for search, don't need to worry about search at the moment
        {
            User _user = new User();
            DateTime currentTime = DateTime.Now;
            _user.updateLoginTime(username, currentTime);
            List<User> thatUser = _user.returnUsers(username,password);
            
            string json = new JavaScriptSerializer().Serialize(thatUser);
            return json;

        }
        [OperationContract]
        public string CreateNewAccount(string username,string password, string firstname, string lastname, string usertype)
        {
            User _user = new User() ;
            List<String> results = new List<string>();
            results = _user.createAccount(username, password, lastname, firstname, usertype);

            string json = new JavaScriptSerializer().Serialize(results);
            return json;
            // NOTE: THE RETURN LIST FORM: { [OBJECT STRING] , [CONFIRMATION RESULT - ALREADY EXISTS/ ADD SUCCESSFULLY] }
            // USE: JSON.PARSE (LIST [0]) TO GET THE OBJECT OR JSON.PARSE (LIST [1]) TO GET THE RESULT
        }
        [OperationContract]
        public string DeleteUserAccount(string username)
        {
            try
            {
                User _user = new User();
                _user.UserName = username;
                _user.DeleteUser();
                return username;
            }
            catch (Exception e)
            {
                return e.Message;
            }
        }

    }
}
