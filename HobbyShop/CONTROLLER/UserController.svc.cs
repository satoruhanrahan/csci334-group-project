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
    public class UserController
    {
        [OperationContract]
        public string ReturnUser(string username, string password)
        {
            User _user = new User();
            DateTime currentTime = DateTime.Now;
            List<User> thatUser = _user.loginToAccount(username,password, currentTime);
            /*
            if (thatUser.Count == 1)
            {
                HttpContext.Current.Response.Redirect("MasterContent.aspx");
            }
            */
            string json = new JavaScriptSerializer().Serialize(thatUser);
            return json;

        }

        // Add more operations here and mark them with [OperationContract]
    }
}
