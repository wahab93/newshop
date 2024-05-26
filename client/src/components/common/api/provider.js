import React, { createContext, useContext } from 'react';

// Create a context
const ProductContext = createContext();

// Custom hook to access the context
export function  useProductContext() {
    return useContext(ProductContext);
}

// Context Provider component
export function ProductProvider({ children }) {
    // Your base URL to the API
    const baseUrl = process.env.REACT_APP_BASE_URL;
    // const companyId = process.env.REACT_APP_COMPANYID;
    // const LocationId = process.env.REACT_APP_LOCATIONID;

    const companyId = 4;
    const LocationId = 4;

    // Product
    const apiProducts = `${baseUrl}Product/GetAllProduct?CompanyID=${companyId}&ProductCategoryId=0&ProductTypeId=0&ProductBrandId=0`;
    const apiProductById = `${baseUrl}Product/GetProductDetail?CompanyID=${companyId}&ProductCategoryId=0&ProductTypeId=0&ProductBrandId=0&ProductId=`;
    const addEditProduct = `${baseUrl}Product/AddEditProduct`;

    // Product Category
    const apiCategory = `${baseUrl}ProductCategory/GetAllProductCategory?CompanyId=${companyId}`;
    const getCategoryById = `${baseUrl}Product/GetProductCode?CompanyId=${companyId}&CategoryId=`;
    const addEditProductCategory = `${baseUrl}ProductCategory/AddEditProductCategory`;

    // Product Brand
    const apiProductBrand = `${baseUrl}ProductBrand/GetAllProductBrand?CompanyId=${companyId}`;
    const addEditProductBrand = `${baseUrl}ProductBrand/AddEditProductBrand`;

    // Product Type
    const apiProductType = `${baseUrl}ProductType/GetAllProductType?CompanyId=${companyId}`;
    const addEditProductType = `${baseUrl}ProductType/AddEditProductType`;


    // Web Setting
    const apiGetWebSettingsDetail = `${baseUrl}WebSettings/GetWebSettingsDetail?CompanyId=${companyId}&LocationId=${LocationId}`;
    const AddEditWebSettings = `${baseUrl}WebSettings/AddEditWebSettings`;

    // Orders
    const apiOrder = `${baseUrl}Orders/GetAllOrders?CompanyID=${companyId}&LocationId=${LocationId}&PaymentTypeId=0&OrderStatusId=0&CustomerId=0&OrderId=0&OrderCode=0&FromDate=2022/01/01&ToDate=2024/12/30`;
    const postOrder = `${baseUrl}Orders/AddEditOrder`;
    const orderFilter = `${baseUrl}Orders/GetAllOrders?CompanyId=${companyId}&LocationId=${LocationId}&PaymentTypeId=0&OrderStatusId=1&CustomerId=0&OrderId=0&OrderCode=`;

    // login
    const loginURL = `/login`;
    const logoutURL = `/logout`;
    const getDataURL = `/getData`;
    const contactMessageURL = `/contactMessage`;
    const aboutURL = `/about`;
    const productsURL = `/products`;
    const ProductByIdURL =`/products/`;
    const categoriesURL = `/categories`;
    // const login = `${baseUrl}Account/Login`;

    // Value to provide to consumers of the context
    const value = {
        loginURL,
        getDataURL,
        contactMessageURL,
        logoutURL,
        aboutURL,
        productsURL,
        ProductByIdURL,
        categoriesURL,
        postOrder,
        LocationId,
        companyId,
        apiProducts,
        apiCategory,
        apiProductType,
        apiProductBrand,
        apiOrder,
        apiProductById,
        addEditProductBrand,
        addEditProductType,
        addEditProductCategory,
        addEditProduct,
        getCategoryById,
        orderFilter,
        apiGetWebSettingsDetail,
        AddEditWebSettings
    };

    // Provide the value to the context
    return (
        <ProductContext.Provider value={value}>
            {children}
        </ProductContext.Provider>
    );
}