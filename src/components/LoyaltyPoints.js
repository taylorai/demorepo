import React from 'react';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient('YOUR_SUPABASE_URL', 'YOUR_SUPABASE_ANON_KEY');

function CustomerActions({ customerId, updateLoyaltyPoints }) {
  const incrementLoyaltyPoints = async () => {
    const { data, error } = await supabase
      .from('customers')
      .update({ loyalty_points: supabase.raw('loyalty_points + 1') })
      .eq('id', customerId);

    if (error) {
      console.error('Error updating loyalty points:', error);
    } else {
      console.log('Loyalty points incremented:', data);
      updateLoyaltyPoints(data[0].loyalty_points);
    }
  };

  return (
    <div>
      <button onClick={incrementLoyaltyPoints}>Increment Loyalty Points</button>
    </div>
  );
}

export default CustomerActions;
