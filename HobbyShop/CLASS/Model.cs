using System;
using System.Collections.Generic;
using System.Data.OleDb;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using System.Data;
using System.Collections;
using System.Web.Script.Serialization;
namespace HobbyShop

{
    public class Model
    {
        
        /* model attributes*/
        private string itemName;
        private int itemNum;
        private string itemType;
        private string itemSbjArea;
        private double itemPrice;
        private string itemDes;
        private bool itemAvail;
        private int stockCount;

        public int Id { get { return itemNum; } set { itemNum = value; } }
        public string Name { get { return itemName; } set { itemName = value; } }
        public string Type { get { return itemType; } set { itemType = value; } }
        public string SbjArea { get { return itemSbjArea; } set { itemSbjArea = value; } }
        public double Price { get { return itemPrice; } set { itemPrice = value; } }
        public string Description { get { return itemDes; } set { itemDes = value; } }
        public bool Availablity { get { return itemAvail; } set { itemAvail = value; } }
        public int StockCount { get { return stockCount; } set { stockCount = value; } }



        public Model()
        {

        }
        public Model(string name, string type, string sbjArea, double price, string description, bool availability, int stockCount)
        {
            this.itemName = name;
            this.itemType = type;
            this.itemSbjArea = sbjArea;
            this.itemPrice = price;
            this.itemDes = description;
            this.itemAvail = availability;
            this.stockCount = stockCount;
        }
       

    }
}