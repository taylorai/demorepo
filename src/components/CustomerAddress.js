// UpdateCustomerAddressForm.jsx
import React, { useState } from 'react';
import { supabase } from './supabaseClient';

function UpdateCustomerAddressForm() {
  const [customerId, setCustomerId] = useState('');
  const [newAddressId, setNewAddressId] = useState('');

  const handleCustomerIdChange = (e) => {
    setCustomerId(e.target.value);
  };

  const handleNewAddressIdChange = (e) => {
    setNewAddressId(e.target.value);
  };

  const handleUpdate = async () => {
    if (customerId && newAddressId) {
      const { data, error } = await supabase
        .from('customer')
        .update({ address_id: parseInt(newAddressId, 10) })
        .eq('customer_id', parseInt(customerId, 10));

      if (error) {
        console.error('Error updating address:', error);
      } else {
        console.log('Address updated:', data);
      }
    }
  };

  return (
    <div>
      <input 
        type="number" 
        value={customerId} 
        onChange={handleCustomerIdChange} 
        placeholder="Enter Customer ID"
      />
      <input 
        type="number" 
        value={newAddressId} 
        onChange={handleNewAddressIdChange} 
        placeholder="Enter New Address ID"
      />
      <button onClick={handleUpdate}>Update Address</button>
    </div>
  );
}

export default UpdateCustomerAddressForm;
