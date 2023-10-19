import React, { useState } from 'react';
import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = 'YOUR_SUPABASE_URL'; // Replace with your Supabase Project URL
const SUPABASE_API_KEY = 'YOUR_SUPABASE_API_KEY'; // Replace with your Supabase API Key

const supabase = createClient(SUPABASE_URL, SUPABASE_API_KEY);

function DvdRentalsForm() {
  const [formData, setFormData] = useState({
    rental_id: '',
    dvd_id: '',
    customer_id: '',
    rental_date: new Date().toISOString().split("T")[0], // default to today's date
    // ... Add other fields as necessary ...
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
      .from('rentals')
      .insert([formData]);
    
    if (error) {
      console.error("Error inserting data:", error);
    } else {
      console.log("Data inserted successfully:", data);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {/* Fields for DVD Rentals Form */}
      {/* Add validation or dropdowns where needed */}
      {/* Rental ID */}
      <div>
        <label>Rental ID:</label>
        <input 
          type="text" 
          name="rental_id" 
          value={formData.rental_id} 
          onChange={handleInputChange}
        />
      </div>

      {/* DVD ID */}
      <div>
        <label>DVD ID:</label>
        <input 
          type="text" 
          name="dvd_id" 
          value={formData.dvd_id} 
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

      {/* Rental Date */}
      <div>
        <label>Rental Date:</label>
        <input 
          type="date" 
          name="rental_date" 
          value={formData.rental_date} 
          onChange={handleInputChange}
        />
      </div>

      {/* ... Other fields ... */}

      <button type="submit">Rent DVD</button>
    </form>
  );
}

export default DvdRentalsForm;
