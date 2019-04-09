using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace HobbyShop

{
    public class SaleItem
    {
        private int storeID;
        public int StoreID
        {
            get { return storeID; }
        }

        private int itemID;
        public int ItemID
        {
            get { return itemID; }
        }

        private int stockCount;
        public int StockCount
        {
            get { return stockCount; }
        }
        private string location;
        public string ItemLocation
        {
            get { return location; }
        }

        private DateTime firstStocked;
        public DateTime FirstStockDate
        {
            get { return firstStocked; }
        }

        public SaleItem(int storeID, int itemID, int stockCount, string location, DateTime firstStocked)     //validate in constructor
        {

            if (storeID.ToString().Trim() == "" || itemID.ToString().Trim() == "" || stockCount.ToString().Trim() == "" || location.Trim() == "" || firstStocked.ToString("dd MMMM yyyy hh:mm:ss tt").Trim() == "")
            {
                throw new System.ArgumentException("No field is empty!");
            }

            this.storeID = storeID;
            this.itemID = itemID;
            this.stockCount = stockCount;
            this.location = location;
            this.firstStocked = firstStocked;
        }
    }
}