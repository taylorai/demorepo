// src/InventoryForm.js
import React, { useState, useEffect } from 'react';
import supabase from './supabaseClient';

function InventoryForm() {
  const [inventoryID, setInventoryID] = useState('');
  const [filmID, setFilmID] = useState('');
  const [storeID, setStoreID] = useState('');
  const [lastUpdate, setLastUpdate] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      const { data: inventoryData, error } = await supabase.from('inventory').select('*');
      if (inventoryData) {
        setInventoryID(inventoryData.inventory_id || '');
        setFilmID(inventoryData.film_id || '');
        setStoreID(inventoryData.store_id || '');
        setLastUpdate(inventoryData.last_update || '');
      }
    };

    fetchData();
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (inventoryID) {
      // Update
      const { data, error } = await supabase
        .from('inventory')
        .update({
          film_id: filmID,
          store_id: storeID,
          last_update: new Date()
        })
        .eq('inventory_id', inventoryID);
    } else {
      // Insert
      const { data, error } = await supabase
        .from('inventory')
        .insert([
          {
            film_id: filmID,
            store_id: storeID,
            last_update: new Date()
          }
        ]);
    }
  };

  const handleDelete = async () => {
    if (inventoryID) {
      const { data, error } = await supabase
        .from('inventory')
        .delete()
        .eq('inventory_id', inventoryID);
    }
  };

  const handleAlter = async () => {
    // Example: Alter the inventory table to add a new column "description"
    const { data, error } = await supabase
      .rpc('alter_inventory_add_description'); // Assuming you have this function on your Postgres

    if (error) {
      console.error('Error altering table:', error);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label>
          Inventory ID (leave blank for new records):
          <input type="text" value={inventoryID} onChange={(e) => setInventoryID(e.target.value)} />
        </label>
        <label>
          Film ID:
          <input type="text" value={filmID} onChange={(e) => setFilmID(e.target.value)} />
        </label>
        <label>
          Store ID:
          <input type="text" value={storeID} onChange={(e) => setStoreID(e.target.value)} />
        </label>
        <button type="submit">Insert/Update</button>
      </form>
      <button onClick={handleDelete}>Delete</button>
      <button onClick={handleAlter}>Alter Table</button>
    </div>
  );
}

export default InventoryForm;
