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
        .from('public.customer')
        .insert([
            { first_name: firstName, last_name: lastName, email: email }
        ]);
    
    if (error) {
        console.error('Error inserting customer:', error);
    } else {
        // Optionally, add new customer to the displayed list
        const customerList = document.getElementById('customerList');
        const listItem = document.createElement('li');
        listItem.textContent = `${firstName} ${lastName} - ${email}`;
        customerList.appendChild(listItem);
    }
});

// Load Customers
async function loadCustomers() {
    const { data, error } = await supabase
        .from('public.customer')
        .select('first_name, last_name, email');
    
    if (error) {
        console.error('Error loading customers:', error);
    } else {
        const customerList = document.getElementById('customerList');
        data.forEach(customer => {
            const listItem = document.createElement('li');
            listItem.textContent = `${customer.first_name} ${customer.last_name} - ${customer.email}`;
            customerList.appendChild(listItem);
        });
    }
}

loadCustomers();
