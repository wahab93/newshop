import React, { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom';
import { productServices } from '../services/productService';
import { useProductContext } from './common/api/provider';
import { useDispatch, useSelector } from 'react-redux';


export const Product = () => {
    const { ProductByIdURL, categoriesURL } = useProductContext();
    const stateCart = useSelector((state) => state.cartHandler);
    const [product, setProduct] = useState(null);
    const [categories, setCategories] = useState([]);
    console.log('categories', categories)
    const { productId } = useParams();

    useEffect(() => {
        const fetchProductById = async () => {
            try {
                const response = await productServices.getProductById(ProductByIdURL, productId);
                setProduct(response);
            } catch (error) {
                console.error('Error fetching product:', error);
            }
        };
        fetchProductById();

        const getCategories = async () => {
            try {
                const response = await productServices.getCategories(categoriesURL);
                setCategories(response);
            } catch (error) {
                console.error('Error fetching Categories:', error);
            }
        };
        getCategories();
    }, []);


    const dispatch = useDispatch();
    const addProduct = (product) => {
        dispatch(addCart(product));
    };

    const isProductInCart = (productId) => stateCart.some((e) => e._id === productId)

    return (
        <div className='container'>
            <div className='row'>
                <div className='col-md-8'>
                    <div className='row'>
                    <h1>Product Detials</h1>
                        {
                            product &&
                            <>
                                <div className='col-md-6'>
                                    <img src={process.env.REACT_APP_IMAGE_PATH + product.productImage} alt={product.pTitle} className='img-fluid' />
                                </div>
                                <div className='col-md-6'>
                                    <p>{product.pCategory}</p>
                                    <p>{product.pName}</p>
                                    <p>{product.pPrice}</p>
                                    {isProductInCart(product._id) ?
                                        <Link to='/cart' className='btn btn-primary'>Go to Cart</Link>
                                        :
                                        <button className='btn btn-primary' onClick={() => addProduct(product)}>Add to Cart</button>
                                    }
                                </div>
                            </>
                        }
                    </div>
                </div>
                <div className='col-md-4'>
                    <h2>Categories</h2>
                    <ul className='list-group'>
                        {categories.map((category) => (
                            <li key={category._id} className='list-group-item'>{category}</li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    )
}