import React, { useEffect, useState } from 'react'
import { useProductContext } from './common/api/provider';
import { productServices } from '../services/productService';
import { useDispatch, useSelector } from 'react-redux';
import { addCart, addFav, removeFav } from '../redux/action';
import { Link } from 'react-router-dom';

export const Products = () => {
    const { productsURL } = useProductContext();
    const stateCart = useSelector((state) => state.cartHandler);
    const favproduct = useSelector((state) => state.favHandler);
    const [data, setData] = useState([])
    const [productcat, setProductCat] = useState([])
    const [productData, setProductData] = useState([])
    const dispatch = useDispatch();

    useEffect(() => {
        const getProducts = async () => {
            try {
                // Getting the data from the API
                const data = await productServices.getProducts(productsURL);

                // Find the unique categories and add 'ALL'
                const uniqueList = [...new Set(data.map(e => e.productCategory)), 'ALL'];
                setProductCat(uniqueList);

                // If the filtered products array is empty, set the full data to productData
                if (productData.length === 0) {
                    setProductData(data);
                }
                setData(data);
            } catch (error) {
                console.error('Error fetching products:', error);
            }
        };
        getProducts();
    }, [])


    // Filter Products
    const filterProducts = (cat) => {
        if (cat === 'ALL') {
            return setProductData(data)
        }
        const updateList = data.filter((e) => {
            return e.productCategory === cat
        })
        setProductData(updateList)
    }

    const addProductToCart = (product) => dispatch(addCart(product));


    const isProductInCart = (productId) => stateCart.some((e) => e._id === productId);

    const isFavProductInCart = (productId) => favproduct.some((e) => e._id === productId);

    const addOrRemoveFavProduct = (product) => {
        if (isFavProductInCart(product._id)) {
            dispatch(removeFav(product));
        } else {
            dispatch(addFav(product));
        }
    };

    return (
        <>
            <div className="container my-5">
                <div className="row g-4">
                    <h1 className='text-center fw-bold'>Our Products</h1>
                    <div className="col-md-12 text-center">
                        {
                            productcat.map((e, i) => {
                                return (
                                    <>
                                        <button className="btn btn-outline-dark me-2 text-capitalize" onClick={() => filterProducts(e)} key={i}>
                                            {e}
                                        </button>
                                    </>
                                )
                            })
                        }
                    </div>
                    {
                        productData.map((product, i) => {
                            const { _id, productName, productTitle, productPrice,productImage } = product
                            return (
                                <>
                                    <div className="col-md-3" key={i}>
                                        <div className="card bg-light p-3">
                                            {/* <img src="/images/slider/banner-1.jpg" className="d-block w-100" alt="Banner" /> */}
                                            <Link to={`/products/${product._id}`}>
                                                <img className='w-100 mb-3' style={{ objectFit: 'cover' }} height={200} src={process.env.REACT_APP_IMAGE_PATH + productImage} alt={productTitle} />
                                            </Link>
                                            <p className='text-capitalize m-0'>{productName}</p>
                                            <p>Rs. {productPrice}</p>
                                            <button className="btn btn-primary" onClick={() => addOrRemoveFavProduct(product)}>
                                                {isFavProductInCart(_id) ? 'Remove from Fav' : 'Add to Fav'}
                                            </button>
                                            {isProductInCart(_id) ? (
                                                <Link to='/cart' className='btn btn-primary'>
                                                    Go to Cart
                                                </Link>
                                            ) : (
                                                <button className='btn btn-primary' onClick={() => addProductToCart(product)}>
                                                    Add to Cart
                                                </button>
                                            )}
                                        </div>
                                    </div>
                                </>
                            )
                        })
                    }
                </div>
            </div>
        </>
    )
}
