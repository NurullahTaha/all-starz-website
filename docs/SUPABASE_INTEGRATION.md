# Supabase Integration Guide

While Supabase doesn't offer static hosting, you can integrate it as a backend for enhanced functionality.

## What Supabase Can Add to Your Website

### 1. **Customer Reviews Database**
Replace hardcoded reviews with dynamic ones from Supabase:

```javascript
// Example: Fetch reviews from Supabase
import { createClient } from '@supabase/supabase-js'

const supabase = createClient('YOUR_SUPABASE_URL', 'YOUR_SUPABASE_ANON_KEY')

async function loadReviews() {
    const { data: reviews, error } = await supabase
        .from('customer_reviews')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(10)
    
    if (reviews) {
        displayReviews(reviews)
    }
}
```

### 2. **Contact Form with Database Storage**
Store contact form submissions in Supabase:

```javascript
async function submitContactForm(formData) {
    const { data, error } = await supabase
        .from('contact_submissions')
        .insert([
            {
                name: formData.name,
                email: formData.email,
                message: formData.message,
                submitted_at: new Date()
            }
        ])
    
    if (!error) {
        showSuccessMessage()
    }
}
```

### 3. **Menu Management System**
Dynamic menu items from database:

```javascript
async function loadMenu() {
    const { data: menuItems, error } = await supabase
        .from('menu_items')
        .select('*')
        .eq('available', true)
        .order('category', { ascending: true })
    
    if (menuItems) {
        renderMenuItems(menuItems)
    }
}
```

### 4. **Order System**
Simple online ordering with Supabase:

```javascript
async function submitOrder(orderData) {
    const { data, error } = await supabase
        .from('orders')
        .insert([
            {
                customer_name: orderData.name,
                customer_phone: orderData.phone,
                items: orderData.items,
                total_amount: orderData.total,
                status: 'pending',
                created_at: new Date()
            }
        ])
}
```

## Setup Instructions

### 1. Create Supabase Project
1. Go to [supabase.com](https://supabase.com)
2. Create new project
3. Note your Project URL and API Key

### 2. Create Database Tables

```sql
-- Customer Reviews Table
CREATE TABLE customer_reviews (
    id BIGSERIAL PRIMARY KEY,
    customer_name VARCHAR(100),
    rating INTEGER CHECK (rating >= 1 AND rating <= 5),
    review_text TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Contact Submissions Table
CREATE TABLE contact_submissions (
    id BIGSERIAL PRIMARY KEY,
    name VARCHAR(100),
    email VARCHAR(255),
    message TEXT,
    submitted_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Menu Items Table
CREATE TABLE menu_items (
    id BIGSERIAL PRIMARY KEY,
    name VARCHAR(100),
    description TEXT,
    price DECIMAL(10,2),
    category VARCHAR(50),
    image_url VARCHAR(255),
    available BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

### 3. Install Supabase Client

```bash
npm install @supabase/supabase-js
```

### 4. Initialize in Your JavaScript

```javascript
// Add to assets/js/script.js
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'YOUR_SUPABASE_URL'
const supabaseKey = 'YOUR_SUPABASE_ANON_KEY'
const supabase = createClient(supabaseUrl, supabaseKey)
```

## Deployment Options with Supabase Backend

1. **Host static site on Vercel/Netlify**
2. **Use Supabase for dynamic data**
3. **Best of both worlds: Fast static site + powerful backend**

## Security Notes

- Use Row Level Security (RLS) for public-facing tables
- Never expose your service key in frontend code
- Use environment variables for sensitive data

## Benefits of This Approach

✅ **Fast Loading**: Static site loads instantly  
✅ **Dynamic Content**: Fresh data from Supabase  
✅ **Scalable**: Handles growing data and traffic  
✅ **Cost Effective**: Both platforms have generous free tiers  
✅ **Real-time**: Supabase supports real-time updates  

## Example: Real-time Reviews

```javascript
// Listen for new reviews in real-time
supabase
    .channel('public:customer_reviews')
    .on('postgres_changes', { 
        event: 'INSERT', 
        schema: 'public', 
        table: 'customer_reviews' 
    }, (payload) => {
        addNewReviewToDisplay(payload.new)
    })
    .subscribe()
```

This setup gives you a professional restaurant website with powerful backend capabilities!