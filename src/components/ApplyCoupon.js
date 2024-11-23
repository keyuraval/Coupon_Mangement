import React from 'react';

const ApplyCoupon = ({ onApply }) => {
   return (
      <div className="text-center mt-3">
         <button className="btn btn-primary btn-lg shadow-sm" onClick={onApply}>
            Apply Selected Coupon
         </button>
      </div>
   );
};

export default ApplyCoupon;
