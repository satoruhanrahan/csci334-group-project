using System;
using System.Collections;
using System.Collections.Generic;
using System.Configuration;
using System.Data.OleDb;
using System.Linq;
using System.Web;

namespace HobbyShop.CLASS
{
    public class StoreInventory
    {
        private string itemName;
        private int stockCount;
        private int location;
        private DateTime firstStockDate;
        
        public string ItemName { get { return itemName; } }
        public int StockCount { get { return stockCount; } }
        public int Location { get { return location; } }
        public DateTime FirstStockDate { get { return firstStockDate; } }

        public StoreInventory(string itemName, int stockCount, int location, DateTime firstStockDate)
        {
            this.itemName = itemName;
            this.stockCount = stockCount;
            this.location = location;
            this.firstStockDate = firstStockDate;
        }
    }
}