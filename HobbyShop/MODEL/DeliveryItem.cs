using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace HobbyShop.CLASS
{
    public class DeliveryItem
    {
        /*
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
        */
        private string itemName;
        private int quantity;
        private double price;

        public string ItemName { get { return itemName; } set { itemName = value; } }
        public int Quantity { get { return quantity; } set { quantity = value; } }
        public double Price { get { return price; } set { price = value; } }

        public DeliveryItem() { }

        public DeliveryItem(string itemName, int quantity, double price)
        {
            this.itemName = itemName;
            this.quantity = quantity;
            this.price = price;
        }
    }
}