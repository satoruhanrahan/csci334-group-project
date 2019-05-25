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

    //use Username to retrieve info
    // NO UPDATE YET
    public class UserController
    {
        
        [OperationContract]
        public string ReturnAll(string input)
        {
            UserData _userData = new UserData();
            List<Staff> allUsers = _userData.SearchDatabase(input);

            string json = new JavaScriptSerializer().Serialize(allUsers);
            return json;
        }
         

        [OperationContract]
        public string ReturnUser(string username, string password) // is currently used to validate user when logged in
        
        {
            UserData _user = new UserData();
            DateTime currentTime = DateTime.Now;
            _user.updateLoginTime(username, currentTime);
            Staff theUser = _user.returnUsersCheck(username,password);
            
            string json = new JavaScriptSerializer().Serialize(theUser);
            return json;

        }
        
        [OperationContract]
        public string CreateNewAccount(string username,string password, string firstname, string lastname, string usertype)
        {
            UserData _user = new UserData() ;
            
            string results = _user.createAccount(username, password, lastname, firstname, usertype);
            return results;
            
            // NOTE: THE RETURN LIST FORM: { [OBJECT STRING] , [CONFIRMATION RESULT - ALREADY EXISTS/ ADD SUCCESSFULLY] }
            // USE: JSON.PARSE (LIST [0]) TO GET THE OBJECT OR JSON.PARSE (LIST [1]) TO GET THE RESULT
        }
        
        [OperationContract]
        public void DeleteUserAccount(int id)
        {
            try
            {
                UserData _user = new UserData();
                _user.DeleteUser(id);
                
            }
            catch (Exception e)
            {
                throw new Exception(e.Message);
            }
        } 

    }
}
