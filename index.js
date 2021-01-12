const express = require('express');
const env = require('dotenv');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const app = express();

//import routes
const authRoutes = require('./src/routes/auth');
const adminRoutes = require('./src/routes/admin');
// const categoryRoutes = require('../src/routes/category');
// const productRoutes = require('../src/routes/product');
// const cartRoutes = require('../src/routes/cart');

//Environment variables
env.config();

//mongodb connection
//mongodb+srv://root:<password>@cluster0.xiu50.mongodb.net/<dbname>?retryWrites=true&w=majority

mongoose.connect(
    `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.xiu50.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`, 
    {
        useNewUrlParser: true, 
        useUnifiedTopology: true,
        useCreateIndex: true
    }
).then(() => {
    console.log('Connected to MongoDB');
});

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
// parse application/json
app.use(bodyParser.json());

app.use('/api', authRoutes);
app.use('/api', adminRoutes);
// app.use('/api', categoryRoutes);
// app.use('/api', productRoutes);
// app.use('/api', cartRoutes);

app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`)
});