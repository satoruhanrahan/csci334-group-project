using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace HobbyShop.CLASS
{
    abstract class SystemUserFactory
    {
        public abstract SystemUser GetUser();
    }
}