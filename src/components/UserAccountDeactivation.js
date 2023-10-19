// DeactivateCustomerForm.jsx
import React, { useState } from 'react';
import { supabase } from './supabaseClient';

function DeactivateCustomerForm() {
  const [customerId, setCustomerId] = useState('');

  const handleInputChange = (e) => {
    setCustomerId(e.target.value);
  };

  const handleDeactivate = async () => {
    if (customerId) {
      const { data, error } = await supabase
        .from('customer')
        .update({ activebool: false })
        .eq('customer_id', parseInt(customerId, 10));

      if (error) {
        console.error('Error deactivating customer:', error);
      } else {
        console.log('Customer deactivated:', data);
      }
    }
  };

  return (
    <div>
      <input 
        type="number" 
        value={customerId} 
        onChange={handleInputChange} 
        placeholder="Enter Customer ID to Deactivate"
      />
      <button onClick={handleDeactivate}>Deactivate</button>
    </div>
  );
}

export default DeactivateCustomerForm;
