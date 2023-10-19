import React, { useState } from 'react';

function PaymentForm() {
  const [formData, setFormData] = useState({
    payment_id: '',
    customer_id: '',
    staff_id: '',
    rental_id: '',
    amount: '',
    payment_date: new Date().toISOString().split("T")[0]  // default to today's date
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // API call for inserting the payment
    fetch("/api/payments", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    })
    .then(response => response.json())
    .then(data => {
      console.log("Payment added:", data);
    });
  };

  const handleDelete = () => {
    if (formData.payment_id) {
      fetch(`/api/payments/${formData.payment_id}`, {
        method: "DELETE",
      })
      .then(response => response.json())
      .then(data => {
        console.log("Payment deleted:", data);
        setFormData({
          payment_id: '',
          customer_id: '',
          staff_id: '',
          rental_id: '',
          amount: '',
          payment_date: new Date().toISOString().split("T")[0]
        });
      });
    }
  };

  const handleUpdate = (field) => {
    if (formData.payment_id) {
      fetch(`/api/payments/${formData.payment_id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          [field]: formData[field]
        }),
      })
      .then(response => response.json())
      .then(data => {
        console.log("Payment updated:", data);
      });
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {/* Fields for Payment Form */}
      {/* Add validation or dropdowns where needed */}
      {/* Payment ID */}
      <div>
        <label>Payment ID:</label>
        <input 
          type="text" 
          name="payment_id" 
          value={formData.payment_id} 
          onChange={handleInputChange}
        />
      </div>

      {/* Customer ID */}
      <div>
        <label>Customer ID:</label>
        <input 
          type="text" 
          name="customer_id" 
          value={formData.customer_id} 
          onChange={handleInputChange}
        />
      </div>

      {/* Staff ID */}
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
      {/* Add more specific update buttons if needed */}
    </form>
  );
}

export default PaymentForm;