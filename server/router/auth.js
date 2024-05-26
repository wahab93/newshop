const express = require('express')
const router = express.Router()
require('../db/conn')
const User = require('../model/userSchema')
const path = require('path');
const bcrypt = require('bcrypt')
const authenticate = require('../middleware/authenticate')
const Product = require('../model/productSchema')
const multer = require('multer');


const storage = multer.diskStorage({
    // if you store images in client side public folder
    destination: '../client/public/images/',
    // if you store images in server side public folder
    // destination: './public/images/',
    filename: (req, file, cb) => {
        cb(null, file.fieldname + '_' + Date.now() + path.extname(file.originalname))
    }
});

const upload = multer({
    storage: storage
});

// Add New Products
router.post('/addProduct', upload.single('productImage'), async (req, res) => {
    try {
        // Extract product data from the request body
        const { pCategory, pName, pTitle, pPrice } = req.body;
        const productImage = req.file ? req.file.filename : null;

        // Create a new Product instance
        const product = new Product({
            pCategory,
            pName,
            pTitle,
            pPrice,
            productImage,
        });

        // Save the product to the database
        await product.save();

        // Respond with the created product
        res.status(201).json(product);
    } catch (error) {
        // Handle error
        res.status(500).json({ error: 'An error occurred' });
    }
});

// Edit Product
router.put('/editProduct/:productId', upload.single('productImage'), async (req, res) => {
    try {
        // Extract product data from the request body
        const { pCategory, pName, pTitle, pPrice } = req.body;
        const productImage = req.file ? req.file.filename : null;
        const productId = req.params.productId;

        // Find the product by ID
        const product = await Product.findById(productId);

        // Update the product fields
        if (product) {
            product.pCategory = pCategory;
            product.pName = pName;
            product.pTitle = pTitle;
            product.pPrice = pPrice;
            if (productImage) {
                product.productImage = productImage;
            }

            // Save the updated product to the database
            await product.save();

            // Respond with the updated product
            res.json(product);
        } else {
            res.status(404).json({ error: 'Product not found' });
        }
    } catch (error) {
        // Handle error
        console.error('Error editing product:', error);
        res.status(500).json({ error: 'An error occurred' });
    }
});



// get All Products
router.get('/products', async (req, res) => {
    try {
        // Fetch all products from the database

        const products = await Product.find();
        res.json(products);
    } catch (error) {
        console.error('Error fetching products:', error);
        res.status(500).json({ error: 'Failed to fetch products' });
    }
});

// Get All categories
router.get('/categories', async (req, res) => {
    try {
        // Fetch distinct categories from the database
        const categories = await Product.distinct('pCategory');

        // Respond with the fetched categories
        res.json(categories);
    } catch (error) {
        console.error('Error fetching categories:', error);
        res.status(500).json({ error: 'Failed to fetch categories' });
    }
});

// Get a single product by ID
router.get('/products/:id', async (req, res) => {
    try {
        // Extract the product ID from the request parameters
        const productId = req.params.id;

        // Fetch the product from the database using the ID
        const product = await Product.findById(productId);

        // If the product is not found, return a 404 error
        if (!product) {
            return res.status(404).json({ error: 'Product not found' });
        }

        // Return the product if found
        res.json(product);
    } catch (error) {
        console.error('Error fetching product on Server:', error);

        // Return a 500 error if something goes wrong
        res.status(500).json({ error: 'Failed to fetch product on Server' });
    }
});

// Register User
router.post('/register', async (req, res) => {

    const { name, email, phone, work, password, cpassword, role } = req.body;
    if (!name || !email || !phone || !work || !password || !cpassword) {
        return res.status(422).json({ error: "please fill" })
    }

    try {
        const userexist = await User.findOne({ email: email })
        if (userexist) {
            return res.status(422).json({ error: "Email Already Exist" })
        } else if (password !== cpassword) {
            return res.status(422).json({ error: 'Password and confirm password are not matched' })
        } else {
            const user = new User({ name, email, phone, work, password, cpassword, role })
            await user.save();
            res.status(201).json({ message: "user Registeration succesfull" })
        }
    } catch (error) {
        console.log(error);
    }
})

// user Login
router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({ error: 'please fill login' })
        }
        const userLogin = await User.findOne({ email: email })
        // check email and pass with Database
        if (userLogin) {
            const isMatch = await bcrypt.compare(password, userLogin.password)

            // for generate Token JWT
            const token = await userLogin.generateAuthToken();
            res.cookie('jsonwebtoken', token, {
                expires: new Date(Date.now() + 25892000000), // Cookie expiration time (30 days)
                httpOnly: true // Cookie accessible only via HTTP(S) protocol
            });

            if (!isMatch) {
                res.status(400).json({ error: "Invalid credentials" })
            } else {
                res.status(200).json({ message: "login Successfully", user: userLogin })
            }
        } else {
            res.status(400).json({ error: "Invalid credentials" })
        }
    } catch (error) {
        console.log(error);
    }
})


router.get('/about', authenticate, (req, res) => {
    res.send(req.rootUser);
})

// getUSerData for Contact Page and Home Page
// router.get('/getData', authenticate, (req, res) => {
//     res.send(req.rootUser);
// })

// store Contact form message data to server
router.post('/contactMessage', authenticate, async (req, res) => {
    try {
        const { name, email, phone, message } = req.body;
        if (!name || !email || !phone || !message) {
            return res.json({ error: 'please fill contact form' })
        }
        const userContactForm = await User.findOne({ _id: req.userID })
        if (userContactForm) {
            const userMessage = await userContactForm.addMessage(name, email, phone, message);
            await userContactForm.save()
            res.status(200).json({ message: "Succssefully send contact message" })
        }
    } catch (error) {
        console.log(error);
    }
})

// logout Route
router.post('/logout', authenticate, async (req, res) => {
    try {
        // Call removeToken method to remove the token associated with the user
        await req.rootUser.removeToken(req.token);
        res.clearCookie('jsonwebtoken'); // Clear the token from cookies
        res.status(200).json({ message: 'Logout successful' });
    } catch (error) {
        console.error('Logout Error:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});


module.exports = router;
