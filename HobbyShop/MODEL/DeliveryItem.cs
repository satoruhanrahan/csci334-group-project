using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace HobbyShop.CLASS
{
    public class DeliveryItem
    {
        private int itemNumber;
        private double totalCost;

        public int ItemNumber { get { return itemNumber; } set { itemNumber = value; } }
        public double TotalCost { get { return totalCost; } set { totalCost = value; } }

        public DeliveryItem() { }

        public DeliveryItem(int itemNumber, double totalCost)
        {
            this.itemNumber = itemNumber;
            this.totalCost = totalCost;
        }
    }
}