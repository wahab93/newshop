import React, { useState, useEffect } from 'react';
import swal from 'sweetalert';
import { productServices } from '../../services/productService';
import { useProductContext } from '../common/api/provider';

export const AddProduct = () => {
    const { productsURL } = useProductContext();
    const [productCat, setProductCat] = useState('');
    const [productName, setProductName] = useState('');
    const [productTitle, setProductTitle] = useState('');
    const [productPrice, setProductPrice] = useState('');
    const [isNew, setIsNew] = useState(true);
    const [productImage, setProductImage] = useState(null);
    const [data, setData] = useState([])
    const [loading, setLoading] = useState(false);
    const [currentProductId, setCurrentProductId] = useState(null);

    useEffect(() => {
        const getProducts = async () => {
            try {
                // Getting the data from the API
                const res = await productServices.getProducts(productsURL);
                const data = res.reverse()
                setData(data)
            } catch (error) {
                console.error('Error fetching products:', error);
            }
        };
        getProducts();
    }, [])

    const postData = async (e) => {
        debugger
        e.preventDefault();
        if (!productCat || !productName || !productPrice || !productTitle || (!productImage && isNew)) {
            alert('Please fill all fields');
            return;
        }

        setLoading(true)
        try {
            const formData = new FormData();
            formData.append('productImage', productImage);
            formData.append('productCategory', productCat);
            formData.append('productName', productName);
            formData.append('productTitle', productTitle);
            formData.append('productPrice', productPrice);
            formData.append('isNew', isNew);
            if (!isNew) {
                formData.append('_id', currentProductId);
            }

            const response = await fetch('/addEditProduct', {
                method: 'POST',
                body: formData,
            });

            if (response.ok) {
                const updatedProduct = await response.json();
                setData((prevData) => {
                    if (isNew) {
                        return [updatedProduct, ...prevData];
                    } else {
                        return prevData.map((product) =>
                            product._id === updatedProduct._id ? updatedProduct : product
                        );
                    }
                });
                // Clear form fields after successful submission
                setProductCat('');
                setProductName('');
                setProductTitle('');
                setProductPrice('');
                setIsNew(true);
                setProductImage(null);
                setCurrentProductId(null);
                setLoading(false)
                swal("Success", isNew ? "Product Added Successfully!" : "Product Updated Successfully!", "success");
                document.getElementById('closeModalButton').click();
            } else {
                swal("Error", "Failed to add or update product", "error");
            }
        } catch (error) {
            console.error(error);
        }
    };

    const handleEdit = (product) => {
        setProductCat(product.productCategory);
        setProductName(product.productName);
        setProductTitle(product.productTitle);
        setProductPrice(product.productPrice);
        setIsNew(false);
        setCurrentProductId(product._id);
        document.getElementById('addProductModalButton').click();
    };

    return (
        <div className='container'>
            <div className='row my-4 justify-content-end'>
                <div className='col-md-2'>
                    <button type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#addProductModal" id="addProductModalButton">
                        Add Product
                    </button>

                    <div className="modal fade" id="addProductModal" tabIndex="-1" aria-labelledby="addProductModalLabel" aria-hidden="true">
                        <div className="modal-dialog modal-lg">
                            <div className="modal-content">
                                <div className="modal-header">
                                    <h5 className="modal-title" id="addProductModalLabel">{isNew ? "Add Product" : "Edit Product"}</h5>
                                    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                </div>
                                <div className="modal-body">
                                    <form onSubmit={postData}>
                                        <div className="row g-3">
                                            <div className="col-md-6">
                                                <label htmlFor="pcat" className="form-label">Product Category</label>
                                                <select className="form-select" id='pcat' name='pcat' aria-label="Default select example"
                                                    onChange={(e) => setProductCat(e.target.value)}
                                                    value={productCat}
                                                >
                                                    <option>Category</option>
                                                    <option value="men's clothing">men's clothing</option>
                                                    <option value='jewelery'>jewelery</option>
                                                    <option value='electronics'>electronics</option>
                                                    <option value="women's clothing">women's clothing</option>
                                                </select>
                                            </div>
                                            <div className="col-md-6">
                                                <label htmlFor="productName" className="form-label">Product Name</label>
                                                <input type="text" className='form-control' placeholder='Product Name' id='productName'
                                                    onChange={(e) => setProductName(e.target.value)}
                                                    value={productName}
                                                />
                                            </div>
                                            <div className="col-md-6">
                                                <label htmlFor="productTitle" className="form-label">Product Title</label>
                                                <input type="text" className='form-control' placeholder='Product Title' id='productTitle'
                                                    onChange={(e) => setProductTitle(e.target.value)}
                                                    value={productTitle}
                                                />
                                            </div>
                                            <div className="col-md-6">
                                                <label htmlFor="productPrice" className='form-label'>Product Price</label>
                                                <input type="number" className='form-control' placeholder='Product Price'
                                                    value={productPrice}
                                                    onChange={(e) => setProductPrice(e.target.value)}
                                                />
                                            </div>
                                            <div className="col-md-6">
                                                <label htmlFor="pImage" className='form-label d-block'>Product Image</label>
                                                <input
                                                    type="file"
                                                    accept="image/*"
                                                    onChange={e => setProductImage(e.target.files[0])}
                                                    required={isNew}
                                                />
                                            </div>
                                        </div>
                                    </form>
                                </div>
                                <div className="modal-footer">
                                    <button type="button" className="btn btn-secondary" data-bs-dismiss="modal" id="closeModalButton">Close</button>
                                    <button type="button" className="btn btn-primary" onClick={postData} disabled={loading}>
                                        {loading ?
                                            <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                                            :
                                            (isNew ? "Add Product" : "Update Product")
                                        }
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className='row'>
                <div className='col-md-12'>
                    <table className='table table-striped table-hover'>
                        <thead>
                            <tr>
                                <th scope="col">Product Name</th>
                                <th scope="col">Product Category</th>
                                <th scope="col">Product Title</th>
                                <th scope="col">Product Price</th>
                                <th scope="col">Product Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                data.map((product) => (
                                    <tr key={product._id}>
                                        <td>{product.productName}</td>
                                        <td>{product.productCategory}</td>
                                        <td>{product.productTitle}</td>
                                        <td>{product.productPrice}</td>
                                        <td>
                                            <button className='btn btn-secondary' onClick={() => handleEdit(product)}>Edit</button>
                                        </td>
                                    </tr>
                                ))
                            }
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};