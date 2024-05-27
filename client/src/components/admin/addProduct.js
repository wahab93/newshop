import React, { useState } from 'react'
import swal from 'sweetalert'

export const AddProduct = () => {
    const [productCat, setProductCat] = useState('')
    const [productName, setProductName] = useState('')
    const [productTitle, setProductTitle] = useState('')
    const [productPrice, setProductPrice] = useState('')
    const [productImage, setProductImage] = useState(null);
    const postData = async (e) => {
        e.preventDefault();
        if (!productCat && !productName && !productPrice && !productTitle && !productImage) {
            alert('Please Fill all')
        } else {
            try {
                const formData = new FormData();
                formData.append('productImage', productImage);
                formData.append('pCategory', productCat);
                formData.append('pName', productName);
                formData.append('pTitle', productTitle);
                formData.append('pPrice', productPrice);

                const response = await fetch('/addEditProduct', {
                    method: 'POST',
                    body: formData,
                });
                if (response.ok) {
                    // Clear form fields after successful submission
                    setProductCat('');
                    setProductName('');
                    setProductTitle('');
                    setProductPrice('');
                    setProductImage(null);
                    swal("Success", "Product Added Successful!", "success");
                } else {
                    swal("error", `productSubmitResponse.statusText`, "error");
                }
            } catch (error) {
                console.error(error);
            }
        }
    }
    return (
        <>
            <div className="container-fluid my-5">
                <div className="row">
                    <div className="col-md-8 bg-light mx-auto shadow p-3">
                        <h4 className='text-center'>Add Product</h4>
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
                                    <label htmlFor="pname" className="form-label">Product Name</label>
                                    <input type="text" className='form-control' placeholder='Product Name' id='pname'
                                        onChange={(e) => setProductName(e.target.value)}
                                        value={productName}
                                    />
                                </div>
                                <div className="col-md-6">
                                    <label htmlFor="pname" className="form-label">Product Title</label>
                                    <input type="text" className='form-control' placeholder='Product Title' id='pname'
                                        onChange={(e) => setProductTitle(e.target.value)}
                                        value={productTitle}
                                    />
                                </div>
                                <div className="col-md-6">
                                    <label htmlFor="pPrice" className='form-label'>Product Price</label>
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
                                        required
                                    />
                                </div>
                                <div className="col-md-6">
                                    <label htmlFor="" className="form-label invisible">a</label>
                                    <button className='btn btn-primary d-block ms-auto'>Submit</button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}
