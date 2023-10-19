// src/CategoryForm.js
import React, { useState } from 'react';
import supabase from './supabaseClient';

function CategoryForm() {
  const [categoryID, setCategoryID] = useState('');
  const [name, setName] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (categoryID) {
      // Update
      const { data, error } = await supabase
        .from('category')
        .update({ name })
        .eq('category_id', categoryID);
    } else {
      // Insert
      const { data, error } = await supabase
        .from('category')
        .insert([{ name }]);
    }
  };

  const handleDelete = async () => {
    if (categoryID) {
      const { data, error } = await supabase
        .from('category')
        .delete()
        .eq('category_id', categoryID);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label>
          Category ID (leave blank for new records):
          <input type="text" value={categoryID} onChange={(e) => setCategoryID(e.target.value)} />
        </label>
        <label>
          Name:
          <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
        </label>
        <button type="submit">Insert/Update</button>
      </form>
      <button onClick={handleDelete}>Delete</button>
    </div>
  );
}

export default CategoryForm;
