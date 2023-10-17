// Initialize Supabase client
const SUPABASE_URL = 'YOUR_SUPABASE_URL';
const SUPABASE_ANON_KEY = 'YOUR_SUPABASE_ANON_KEY';
const supabase = Supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

// Add New Customer
document.getElementById('addCustomerForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const firstName = document.getElementById('firstName').value;
    const lastName = document.getElementById('lastName').value;
    const email = document.getElementById('email').value;
    
    const { data, error } = await supabase
        .from('customer')
        .insert([
            { first_name: firstName, last_name: lastName, email: email }
        ]);
    
    if (error) {
        console.error('Error inserting customer:', error);
    } else {
        loadCustomers();
    }
});

// Update Customer
document.getElementById('updateCustomerForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const id = document.getElementById('updateId').value;
    const newEmail = document.getElementById('newEmail').value;

    const { data, error } = await supabase
        .from('customer')
        .update({ email: newEmail })
        .match({ id: id });

    if (error) {
        console.error('Error updating customer:', error);
    } else {
        loadCustomers();
    }
});

// Delete Customer
document.getElementById('deleteCustomerForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const id = document.getElementById('deleteId').value;

    const { data, error } = await supabase
        .from('customer')
        .delete()
        .match({ id: id });

    if (error) {
        console.error('Error deleting customer:', error);
    } else {
        loadCustomers();
    }
});

// Load Customers
async function loadCustomers() {
    const { data, error } = await supabase
        .from('customer')
        .select('id, first_name, last_name, email');
    
    if (error) {
        console.error('Error loading customers:', error);
        return;
    }

    const customerList = document.getElementById('customerList');
    customerList.innerHTML = ''; // Clear the list
    
    data.forEach(customer => {
        const listItem = document.createElement('li');
        listItem.textContent = `${customer.id} - ${customer.first_name} ${customer.last_name} - ${customer.email}`;
        customerList.appendChild(listItem);
    });
}

loadCustomers();
