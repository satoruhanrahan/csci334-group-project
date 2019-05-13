using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Configuration;
using System.Data.OleDb;
using System.Collections;

namespace HobbyShop.CLASS
{
    public class DeliveryItem
    {
        private int deliveryID;
        private int itemNumber;
        private double totalCost;

        public int DeliveryID { get { return deliveryID; } set { deliveryID = value; } }
        public int ItemNumber { get { return itemNumber; } set { itemNumber = value; } }
        public double TotalCost { get { return totalCost; } set { totalCost = value; } }

        public DeliveryItem(int deliveryID, int itemNumber, double totalCost)
        {
            this.deliveryID = deliveryID;
            this.itemNumber = itemNumber;
            this.totalCost = totalCost;
        }
    }
}