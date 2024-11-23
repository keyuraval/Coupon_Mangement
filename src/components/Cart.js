import React from 'react';

const Cart = ({ cart }) => {
   return (
      <div className="card mt-3 shadow-sm">
         <div className="card-header bg-info text-white">Cart Items</div>
         <div className="card-body">
            <ul className="list-group">
               {cart.items.map((item, index) => (
                  <li className="list-group-item" key={index}>
                     <strong>Product ID:</strong> {item.product_id} <br />
                     <strong>Quantity:</strong> {item.quantity} <br />
                     <strong>Price:</strong> ₹{item.price} <br />
                  </li>
               ))}
            </ul>
         </div>
      </div>
   );
};

export default Cart;
