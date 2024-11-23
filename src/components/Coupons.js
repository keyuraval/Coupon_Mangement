import React from 'react';

const Coupons = ({ coupons, onSelect, selectedCoupon }) => {
   return (
      <div className="card mt-3 shadow-sm">
         <div className="card-header bg-primary text-white">Available Coupons</div>
         <div className="card-body">
            <ul className="list-group">
               {coupons.map((coupon) => (
                  <li
                     key={coupon.id}
                     className={`list-group-item list-group-item-action ${
                        selectedCoupon?.id === coupon.id ? 'active' : ''
                     }`}
                     onClick={() => onSelect(coupon)} // Pass selected coupon to parent
                     style={{ cursor: 'pointer' }}
                  >
                     <strong>Type:</strong> {coupon.type} <br />
                     <strong>Discount:</strong> {coupon.details.discount}% <br />
                     <small className="text-muted">Expires: {new Date(coupon.expirationDate).toDateString()}</small>
                  </li>
               ))}
            </ul>
         </div>
      </div>
   );
};

export default Coupons;
