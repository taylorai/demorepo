import React, { useState, useEffect } from 'react';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient('YOUR_SUPABASE_URL', 'YOUR_SUPABASE_ANON_KEY');

function UserProfile() {
  const [formData, setFormData] = useState({
    id: '',
    username: '',
    email: '',
    address: '',
    phone: '',
    age: '',
    gender: ''
  });

  useEffect(() => {
    // Fetch user data when the component mounts
    const fetchData = async () => {
      // Replace this with real user ID
      const userId = 'some-user-id';
      const { data, error } = await supabase
        .from('customers')
        .select('*')
        .eq('id', userId)
        .single();

      if (data) {
        setFormData(data);
      }

      if (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchData();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleCreateProfile = async () => {
    const { data, error } = await supabase
      .from('customers')
      .insert([formData]);

    if (error) {
      console.error('Error creating profile:', error);
    } else {
      console.log('Profile created:', data);
    }
  };

  const handleUpdateProfile = async () => {
    const { data, error } = await supabase
      .from('customers')
      .update(formData)
      .eq('id', formData.id);

    if (error) {
      console.error('Error updating profile:', error);
    } else {
      console.log('Profile updated:', data);
    }
  };

  return (
    <form>
      <div>
        <label>Username:</label>
        <input
          type="text"
          name="username"
          value={formData.username}
          onChange={handleInputChange}
        />
      </div>
      <div>
        <label>Email:</label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleInputChange}
        />
      </div>
      <div>
        <label>Address:</label>
        <textarea
          name="address"
          value={formData.address}
          onChange={handleInputChange}
        />
      </div>
      <div>
        <label>Phone:</label>
        <input
          type="text"
          name="phone"
          value={formData.phone}
          onChange={handleInputChange}
        />
      </div>
      <div>
        <label>Age:</label>
        <input
          type="number"
          name="age"
          value={formData.age}
          onChange={handleInputChange}
        />
      </div>
      <div>
        <label>Gender:</label>
        <select name="gender" value={formData.gender} onChange={handleInputChange}>
          <option value="">Select Gender</option>
          <option value="male">Male</option>
          <option value="female">Female</option>
          <option value="other">Other</option>
        </select>
      </div>
      <button type="button" onClick={handleCreateProfile}>Create Profile</button>
      <button type="button" onClick={handleUpdateProfile}>Update Profile</button>
    </form>
  );
}

export default UserProfile;
