require('dotenv').config();
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const path = require('path');
const connectDB = require('./db');
const app = express();

// routes
const authRoutes = require('./routes/auth')
const adminRoutes = require('./routes/admin/auth')
const categoryRoutes = require('./routes/category')
const productRoutes = require('./routes/product')
const cartRoutes= require('./routes/cart')
const initialDataRoutes= require('./routes/admin/initData')

// middleware
app.use(cors());
console.log(process.env.NODE_ENV);
console.log('%c Oh my heavens! ', 'background: #222; color: #bada55');
console.log(app.get('env'));
if (app.get('env') == 'development') {
    app.use(morgan('tiny'));   
}
app.use(express.json());
app.use('/public', express.static(path.join(__dirname, 'uploads')))




// api
app.use('/api', authRoutes)
app.use('/api/admin', adminRoutes)
app.use('/api/category', categoryRoutes)
app.use('/api/product', productRoutes)
app.use('/api/cart', cartRoutes) 
app.use('/api/initaldata', initialDataRoutes ) 


const port = process.env.PORT || 5000;
const start = async () => {
    try {
        await connectDB(process.env.MONGO_URL);
        app.listen(port, () =>
            console.log(`server is running on http://localhost:${port}... `)
        );
    } catch (error) {
        console.log(error);
    }
};

start();