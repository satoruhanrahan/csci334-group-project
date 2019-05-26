using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace HobbyShop.MODEL
{
    public class Interest
    {
        private string type;
        private string sbj;
        public string Type { get { return type; } set { type = value; } }
        public string Sbj { get { return sbj; } set { sbj = value; } }
        public Interest(string type, string sbj)
        {
            this.type = type;
            this.sbj = sbj;
        }
    }
}