// StaffForm.jsx
import React, { useState } from 'react';
import { supabase } from './supabaseClient';

function StaffForm() {
  const [formData, setFormData] = useState({
    id: '',
    name: '',
    address: '',
    zip_code: '',
    phone: '',
    city: '',
    country: '',
    sid: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { data, error } = await supabase
      .from('staff_list')
      .upsert([formData]);

    if (error) {
      console.error('Error:', error);
    } else {
      console.log('Staff Updated:', data);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {/* Your form fields here */}
      {/* ... */}
      <button type="submit">Submit</button>
    </form>
  );
}

export default StaffForm;
