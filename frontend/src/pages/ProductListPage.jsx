import React from 'react';
import ProductListComponent from "./components/ProductListComponent";

import axios from 'axios';

const fetchProducts = async () => {
        const { data } = await axios.get('/api/products');
        return data;
}

const ProductListPage = () => {
    return <ProductListComponent fetchProducts={fetchProducts}/>;
};

export default ProductListPage;
