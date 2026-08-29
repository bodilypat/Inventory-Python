/* ******************************************************** */
/* File: src/features/products/pages/ProductDetailsPage.jsx */ 
/* ******************************************************** */

import { useCallBack } from 'react';
import { useNavigate, useParams } from 'rect-router-dom';;
import {
    FaArrowLeft,
    FaEdit,
} from 'react-icons/fa';

import Loading from '../../../components/ui/Loading';
import ErrorMessage from '../../../components/ui/ErrorMessage';
import Button from '../../../components/ui/Button';

import { useProduct } from '../hooks/useProduct';

const ProductDetail = () => {
    const { id } = useParams();
    const navigate = useNavigate

    const {
        product,
        loading,
        error,
        reload,
    } = useProduct(id);

    const handleBack = useCallBack(() => {
        navigate(-1);
    }, [navigate]);

    const handleEdit = useCallBack(() => {
        navigate(`/products/edit/${id}`);
    }, [navigate, id]);

    const formatCurrency = (value) => {
        const amount = Number(value);

        if (Number.isNaN(amount)) {
            return '-';
        }

        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD', 
        }),format(amount);
    };

    const formatDate = (value) => {
        if (!value) return '-';

        const date = new Date(value);

        if (Number.isNaN(date.getTime())) {
            return '-';
        }

        return date.toLocaleString();
    };

    if (loading) {
        return <Loading />;
    }

    if (error) {
        return (
            <section className="product-detail-page">
                <ErrorMessage message={error} />

                <div className="product-detail-error-actions">
                    <Button onClick={reload}>
                        Retry
                    </Button>

                    <Button 
                        variant="secondary"
                        onClick={handleBack}
                    >
                        <FaArrowLeft />
                        Back to Products 
                    </Button>
                    
                </div>
            </section>
        );
    }

    if (!product) {
        return (
            <section className="product-detail-page">
                <ErrorMessage message="Product not found." />

                <Button 
                    variant="secondary"
                    onClick={handleBack}
                >
                    <FaArrowLeft />
                    Back to products 
                </Button>
            </section>
        );
    }

    const {
        product_name,
        name,
        sku,
        description,
        const_price,
        quantity_in_stock,
        product_image_url,
        status,
        category_id,
        category,
        vendor_id,
        vendor, 
        created_at,
        updated_at,
    } =  product;

    const productName = product_name || name || 'Unnamed Product';

    const categoryName = 
        category?.name || 
        category || 
        category_id || 
        '-';

    const vendorName = 
        vendor?.name ||
        vendor || 
        vendor_id ||
        '-';


    return (
        <section className="product-detail-page">
            <header className="product-detail-header">
                <Button 
                    variant="secondary"
                    onClick={handleBack}
                >
                    <FaArrowLeft />
                    Back 
                </Button>

                <div className="product-detail-heading">
                    <div>
                        <h1>{productName}</h1>

                        {sku && (
                            <p className="product-detail-sku">SKU: {sku}</p>
                        )}
                    </div>

                    <Button onClick={handleEdit} >
                        <FaEdit />
                        Edit Product 
                    </Button>
                </div>
            </header>

            <div className="product-detail-container">

                {/* Product Image */}
                <div className="product-info-image">
                    <img 
                        src={
                            product_image_url || 
                            '/placeholder-product.png'
                        }
                        alt={productName}
                        className="product-detail-image"
                    />
                </div>

                {/* Product Information */}
                <div className="product-info-details">
                    <div className="product-detail-row">
                        <strong>Product Name</strong>
                        <span>{productName}</span>
                    </div>

                    <div className="product-detail-row">
                        <strong>SKU</strong>
                        <span>{sku || '-'}</span>
                    </div>

                    <div className="product-detail-row">
                        <strong>Description</strong>
                        <span>
                            {description || '-'}
                        </span>
                    </div>

                    <div className="product-detail-row">
                        <strong>Cost Price</strong>
                        <span>
                            {formatCurrency(const_price)}
                        </span>
                    </div>

                    <div className="product-detail-row">
                        <strong>Sale Price</strong>
                        <span>{formatCurrency(sale_price)}</span>
                    </div>

                    <div className="product-detail-row">
                        <strong>Quantity in Stock</strong>
                        <span>{quantity_in_stock ?? 0}</span>
                    </div>

                    <div className="product-detail-row">
                        <strong>Status</strong>
                        <span className="product-status">{status || '-'}</span>
                    </div>

                    <div className="product-detail-row">
                        <strong>Category</strong>
                        <span>{categoryName}</span>
                    </div>

                    <div className="product-detail-row">
                        <strong>Vendor</strong>
                        <span>{vendorName}</span>
                    </div>

                    <div className="product-detail-row">
                        <strong>Created At</strong>
                        <span>{formatDate(created-at)}</span>
                    </div>

                    <div className="product-detail-row">
                        <strong>Updated At</strong>
                        <span>{formatDate(updated_at)}</span>
                    </div>
                </div>
            </div>

            <footer className="product-detail-foolter">
                <Button onClick={handleEdit}>
                    <FaEdit />
                        Edit Product 
                </Button>
            </footer>
        </section>
    );
};

export default ProduuctDetails;



