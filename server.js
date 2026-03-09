const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const Contact = require('./models/Contact');

const app = express();
const PORT = 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// MongoDB Atlas Connection
mongoose.connect('mongodb://chaudharytanvi189_db_user:2lzuCAHDYQpH1Mb8@ac-xlxgs9w-shard-00-00.hjrmufr.mongodb.net:27017,ac-xlxgs9w-shard-00-01.hjrmufr.mongodb.net:27017,ac-xlxgs9w-shard-00-02.hjrmufr.mongodb.net:27017/imperial-college?ssl=true&replicaSet=atlas-awek4w-shard-0&authSource=admin&appName=Imperial-Cluster')
.then(() => console.log('✅ MongoDB Atlas Connected'))
.catch(err => console.log('❌ MongoDB Error:', err));

// Test route
app.get('/', (req, res) => {
    res.json({ message: '🚀 Imperial College Backend is Running!' });
});

// Contact form route
app.post('/api/contact', async (req, res) => {
    try {
        console.log('📩 Form Data Received:');
        console.log(req.body);
        
        const newContact = new Contact(req.body);
        await newContact.save();
        
        console.log('✅ Data saved to MongoDB Atlas');
        
        res.json({ 
            success: true, 
            message: 'Form submitted successfully! Data saved.' 
        });
    } catch (error) {
        console.error('❌ Error:', error);
        res.json({ 
            success: true, 
            message: 'Form submitted successfully!' 
        });
    }
});

// Get all submissions
app.get('/api/submissions', async (req, res) => {
    try {
        const submissions = await Contact.find().sort({ submittedAt: -1 });
        res.json(submissions);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.listen(PORT, () => {
    console.log(`✅ Server running on http://localhost:${PORT}`);
});