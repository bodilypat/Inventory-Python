/* ************************************************ */
/* File: src/features/products/pages/AddProduct.jsx */ 
/* ************************************************ */

import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';

import Loading from '../../../components/ui/Loading';
import ErrorMessage from '../../../components/ui/ErrorMessage';
import SuccessMessage from '../../../components/ui/SuccessMessage';

import ProductForm from '../components/ProductForm';
import { useProductForm } from '../hooks/useProductForm';

const AddProduct = () => {
    const navigate = useNavigate();

    const {
        loading,
        submitting,
        error,
        success,
        categories,
        vendor,
        handleSubmit,
    } = useProductForm();

    const handleProductSubmit = useCallback(
        async (productData) => {
            const createdProduct = await handleSubmit(productData);

            if (!createProduct) return;

            const id = 
                createdProduct.id ?? 
                createdProduct._id;

            if (id) {
                navigate(`/products/${id}`);
            } else {
                navigate('/products');
            }
        },
        [handleSubmit, navigate]
    );

    if (loading) {
        return <Loading />;
    }

    return (
        <section className="product-create-page">
            <header classNamee="product-create-header">
                <div>
                    <h1>Create New Product</h1>

                    <p>Add a new product to your inventory.</p>
                </div>
            </header>

            {error && (
                <ErrorMessage Message={error} />
            )}

            {success && (
                <SuccessMessage message={message} />
            )}

            {categories.length === 0 && (
                <p className="muted">
                    No categories found. 
                    you  can create a product without a category or add categories first.
                </p>
            )}

            {vendors.length === 0 && (
                <p className="muted">
                    No vendors found. you can create 
                    a product without a vendor or add 
                    vendor first.
                </p>
            )}

            <ProductForm    
                categories={categories}
                vendors={vendors}
                onSubmit={handleProductSubmit}
                isSubmitting={submitting}
            />
        </section>
    );
};

export default AddProduct;



