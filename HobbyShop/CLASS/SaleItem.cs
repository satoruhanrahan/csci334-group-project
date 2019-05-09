using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace HobbyShop.CLASS
{
    public class SaleItem
    {
        private string itemName;
        private int quantity;
        private double price;

        public string ItemName { get { return itemName; } set { itemName = value; } }
        public int Quantity { get { return quantity; } set { quantity = value; } }
        public double Price { get { return price; } set { price = value; } }

        public SaleItem() { }

        public SaleItem(string itemName, int quantity, double price)
        {
            this.itemName = itemName;
            this.quantity = quantity;
            this.price = price;
        }
    }
}