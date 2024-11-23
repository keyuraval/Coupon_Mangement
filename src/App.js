import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Cart from './components/Cart';
import Coupons from './components/Coupons';
import ApplyCoupon from './components/ApplyCoupon';
import './styles.css';

const API_URL = 'http://localhost:5001';

const App = () => {
   const [cart, setCart] = useState({
      items: [
         { product_id: 1, quantity: 2, price: 100 },
         { product_id: 2, quantity: 1, price: 200 },
         { product_id: 3, quantity: 3, price: 50 },
      ],
   });
   const [coupons, setCoupons] = useState([]);
   const [selectedCoupon, setSelectedCoupon] = useState(null);
   const [cartTotal, setCartTotal] = useState(0);
   const [finalCart, setFinalCart] = useState(null);

   // Calculate the cart total initially and whenever the cart changes
   useEffect(() => {
      const total = cart.items.reduce((sum, item) => sum + item.price * item.quantity, 0);
      setCartTotal(total);
   }, [cart]);

   // Fetch all coupons
   useEffect(() => {
      axios
         .get(`${API_URL}/coupons`)
         .then((response) => setCoupons(response.data))
         .catch((error) => console.error('Error fetching coupons:', error));
   }, []);

   // Apply the selected coupon
   const applyCoupon = () => {
      if (!selectedCoupon) {
         alert('Please select a coupon to apply!');
         return;
      }

      axios
         .post(`${API_URL}/apply-coupon/${selectedCoupon.id}`, { cart })
         .then((response) => {
            setFinalCart(response.data);
         })
         .catch((error) => console.error('Error applying coupon:', error));
   };

   return (
      <div className="container mt-5">
         <h1 className="text-center">Coupon Management</h1>

         {/* Cart Section */}
         <Cart cart={cart} />

         {/* Cart Total */}
         <div className="card mt-3 shadow-sm">
            <div className="card-header bg-secondary text-white">Cart Total</div>
            <div className="card-body">
               <p><strong>Total:</strong> ₹{cartTotal}</p>
            </div>
         </div>

         {/* Coupons Section */}
         <Coupons
            coupons={coupons}
            onSelect={setSelectedCoupon}
            selectedCoupon={selectedCoupon}
         />

         {/* Apply Coupon Button */}
         <ApplyCoupon onApply={applyCoupon} />

         {/* Discounted Cart Section */}
         {finalCart && (
            <div className="card mt-4 shadow-sm">
               <div className="card-header bg-success text-white">Discounted Cart</div>
               <div className="card-body">
                  <p><strong>Cart Total:</strong> ₹{finalCart.cartTotal}</p>
                  <p><strong>Discount Applied:</strong> ₹{finalCart.totalDiscount}</p>
                  <p><strong>Final Price:</strong> ₹{finalCart.finalPrice}</p>
                  <p>
                     <strong>Applied Coupon:</strong> 
                     {finalCart.appliedCoupon?.type} - {finalCart.appliedCoupon?.details?.discount}%
                  </p>
               </div>
            </div>
         )}
      </div>
   );
};

export default App;
