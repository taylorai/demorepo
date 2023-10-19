// StaffList.jsx
import React, { useState, useEffect } from 'react';
import { supabase } from './supabaseClient';

function StaffList() {
  const [staffList, setStaffList] = useState([]);

  useEffect(() => {
    const fetchStaff = async () => {
      const { data, error } = await supabase.from('staff_list').select('*');
      if (error) {
        console.error('Error:', error);
      } else {
        setStaffList(data);
      }
    };

    fetchStaff();
  }, []);

  return (
    <div>
      {/* Render staff list */}
      {/* ... */}
    </div>
  );
}

export default StaffList;
