import React, { useState } from 'react';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient('YOUR_SUPABASE_URL', 'YOUR_SUPABASE_ANON_KEY');

function PaymentForm() {
  const [formData, setFormData] = useState({
    payment_id: '',
    customer_id: '',
    staff_id: '',
    rental_id: '',
    amount: '',
    payment_date: new Date().toISOString().split("T")[0]
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { data, error } = await supabase
      .from('payment')
      .insert([formData]);

    if (error) {
      console.error("Error adding payment:", error);
    } else {
      console.log("Payment added:", data);
    }
  };

  const handleDelete = async () => {
    if (formData.payment_id) {
      const { data, error } = await supabase
        .from('payment')
        .delete()
        .eq('payment_id', formData.payment_id);

      if (error) {
        console.error("Error deleting payment:", error);
      } else {
        console.log("Payment deleted:", data);
        setFormData({
          payment_id: '',
          customer_id: '',
          staff_id: '',
          rental_id: '',
          amount: '',
          payment_date: new Date().toISOString().split("T")[0]
        });
      }
    }
  };

  const handleUpdate = async (field) => {
    if (formData.payment_id) {
      const { data, error } = await supabase
        .from('payment')
        .update({ [field]: formData[field] })
        .eq('payment_id', formData.payment_id);

      if (error) {
        console.error("Error updating payment:", error);
      } else {
        console.log("Payment updated:", data);
      }
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {/* Fields for Payment Form */}
      <div>
        <label>Payment ID:</label>
        <input 
          type="text" 
          name="payment_id" 
          value={formData.payment_id} 
          onChange={handleInputChange}
        />
      </div>
      <div>
        <label>Customer ID:</label>
        <input 
          type="text" 
          name="customer_id" 
          value={formData.customer_id} 
          onChange={handleInputChange}
        />
      </div>
      <div>
        <label>Staff ID:</label>
        <input 
          type="text" 
          name="staff_id" 
          value={formData.staff_id} 
          onChange={handleInputChange}
        />
      </div>
      {/* ... Other fields ... */}
      <button type="submit">Add Payment</button>
      <button type="button" onClick={handleDelete}>Delete Payment</button>
      <button type="button" onClick={() => handleUpdate('amount')}>Update Amount Only</button>
    </form>
  );
}

export default PaymentForm;
