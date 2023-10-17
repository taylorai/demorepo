// Initialize Supabase client
const SUPABASE_URL = 'YOUR_SUPABASE_URL';
const SUPABASE_ANON_KEY = 'YOUR_SUPABASE_ANON_KEY';
const supabase = Supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

// Add New Customer
document.getElementById('addCustomerForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    const { data, error } = await supabase
        .from('customer')
        .insert([
            {
                first_name: document.getElementById('firstName').value,
                last_name: document.getElementById('lastName').value,
                email: document.getElementById('email').value,
                store_id: 3,
                active: 1 // Simulating that the user is active by default
            }
        ]);

    if (error) console.error('Error inserting customer:', error);
    else loadCustomers();
});

// Update Customer Email
document.getElementById('updateCustomerForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    const { data, error } = await supabase
        .from('customer')
        .update({ email: document.getElementById('newEmail').value })
        .eq('id', document.getElementById('updateId').value);

    if (error) console.error('Error updating email:', error);
    else loadCustomers();
});

// Delete Customer
document.getElementById('deleteCustomerForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    const { data, error } = await supabase
        .from('customer')
        .delete()
        .eq('id', document.getElementById('deleteId').value);

    if (error) console.error('Error deleting customer:', error);
    else loadCustomers();
});

// Load Customers
async function loadCustomers() {
    const { data, error } = await supabase
        .from('customer')
        .select('id, first_name, last_name, email, active');

    if (error) {
        console.error('Error loading customers:', error);
        return;
    }

    const customerList = document.getElementById('customerList');
    customerList.innerHTML = '';

    data.forEach(customer => {
        const listItem = document.createElement('li');
        listItem.textContent = `${customer.id} - ${customer.first_name} ${customer.last_name} - ${customer.email} - Active: ${customer.active}`;
        customerList.appendChild(listItem);
    });
}

// Simulate Activity in the Last 7 Days (Set 'Active' to 1)
async function simulateRecentActivity(customerId) {
    const { data, error } = await supabase
        .from('customer')
        .update({ active: 1 })
        .eq('id', customerId);

    if (error) console.error('Error simulating activity:', error);
    else loadCustomers();
}

// Initialize customer list
loadCustomers();
