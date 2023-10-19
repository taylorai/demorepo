// TerminateEmployeeForm.jsx
import React, { useState } from 'react';
import { supabase } from './supabaseClient';

function TerminateEmployeeForm() {
  const [employeeId, setEmployeeId] = useState('');

  const handleInputChange = (e) => {
    setEmployeeId(e.target.value);
  };

  const handleTerminate = async () => {
    if (employeeId) {
      const { data, error } = await supabase
        .from('staff_list')
        .delete()
        .eq('id', parseInt(employeeId, 10));

      if (error) {
        console.error('Error terminating employee:', error);
      } else {
        console.log('Employee terminated:', data);
        setEmployeeId('');  // Clear the input field
      }
    }
  };

  return (
    <div>
      <h1>Terminate Employee</h1>
      <input 
        type="number" 
        value={employeeId} 
        onChange={handleInputChange} 
        placeholder="Enter Employee ID to Terminate" 
      />
      <button onClick={handleTerminate}>Terminate</button>
    </div>
  );
}

export default TerminateEmployeeForm;
