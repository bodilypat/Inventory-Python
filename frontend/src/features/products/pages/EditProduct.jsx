/* ************************************************* */
/* File: src/features/products/pages/EditProduct.jsx */ 
/* ************************************************* */

import { useCallback } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import Loading from '../../../components/ui/Loading';
import ErrorMessage from '../../../components/uii/ErrorMessage';
import SuccessMessage from '../../../components/ui/SuccessMessage';
import Button from '../../..components/ui/Button';

import ProductForm from '../components/ProductForm';
import { useProductForm } from '../hooks/useProductForm';

const EditProduct = () => {
    const { id } = useState();
    const navigate = useNavigate();

    const {
        loading,
        submitting,
        error,
        success,
        product,
        categories,
        vendors,
        handleSubmit,
        reload,
    } = useProductForm(id);

    const handleProductSubmit = useCallback(
        async (formData) => {
            const updated = 
                await handleSubmit(formData);

            if (updated) {
                navigate('/products');
            }
        },
        [handleSubmit, navigate]
    );

    const handleBack = useCallback(() => {
        navigate('/products');
    }, [navigate]);

    if (loading) {
        return <Loading />;
    }

    return (
        <section className="product-edit-page">
            <header className="product-edit-header">
                <div>
                    <h1>Edit Product</h1>

                    <p>
                        Update the product information below.
                    </p>
                </div>
            </header>

            {error && (
                <div className="product-edit-error">
                    <ErrorMessage message={error} />

                    <div className="product-edit-error-actions">
                        <Button 
                            onClick={reload}
                            disabled={loading}
                        >
                            Retry
                        </Button>

                        <Button 
                            variant="secondary"
                            onClick={handleBack}
                        >
                            Back to products
                        </Button>
                    </div>
                </div>
            )}

            {success && (
                <SuccessMessage message={success} />
            )}

            {!error && product && (
                <ProductForm
                    initialData={product}
                    cetegories={categories}
                    vendors={vendors}
                    onSubmit={handleProductSubmit}
                    isSubmitting={submitting}
                />
            )}
        </section>
    );
};

export default EditProduct;

