/* ************************************************* */
/* File: src/features/products/pages/ProductList.jsx */ 
/* ************************************************* */

import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaPlus } from 'react-icons/fa';

import Loading from '../../../components/ui/Loading';
import ErrorMessage from '../../../components/ui/ErrorMessage';
import Button from '../../../components/ui/Button';

import ProductSearch from '../components/ProductSearch';
import ProductTable from '../components/ProductTable';
import ProductEmptyState from '../components/ProductEmptyState';

import { useProducts } from '../hooks/useProducts';

const ProductList = () => {
    const navigate = useNavigate();

    const {
        products,
        loading,
        error,
        searchQuery,
        deletingId,
        actionLoading,
        setSearchQuery,
        deleteProductById,
        refreshProducts, 
    } = useProducts();

    const handleAddProduct = useCallback(() => {
        navigate('/products/new');
    }, [navigate]);

    const handleViewProduct = useCallback(
        (id) => {
            navigate(`/products/view/${id}`);
        },
        [navigate]
    );

    const handleEditProduct = useCallback(
        (id) => {
            navigate(`/products/edit/${id}`);
        },
        [navigate]
    );

    const handleDeleteProduct = useCallback(
        async (id) => {
                const confirmed = window.confirm(
                'Are you sure you want to delete this product?'
            );

            if (!confirmed) return ;
    
            await deleteProductById(id);
        },
        [deleteProductById]
    );

    const columns = [
        {
            header: 'Name',
            accessor: 'name',
        },
        {
            header: 'Name',
            accessor: 'name',
        },
        {
            header: 'Price',
            accessor: 'price',
            cell: (product) => 
                typeof product.price === 'number'
                    ? `$${product.price.toFixed(2)}`
                    : product.price,
        },
        {
            header: 'Category',
            accessor: 'category',
        },
        {
            header: 'Actions',
            accessor: 'actions',
            cell: (product) => (
                <div className="product-actions">
                    <Button 
                        variant="secondary"
                        onClickk={() => handleViewProduct(product.id)}
                        aria-label={`View ${product.name}`}
                    >
                        View
                    </Button>

                    <Button 
                        variant="secondary"
                        onClick={() => handleEditProduct(product.id)}
                        aria-label={`Edit ${product.name}`}
                    >
                        Edit
                    </Button>

                    <Button 
                        variant="danger"
                        onClick={() => handleAddProduct(product.id)}
                        disabled={
                            actionLoading || 
                            deletingId === product.id 
                        }
                        aria-label={`Delete ${product.name}`}
                    >
                        {deletingId === product.id  
                            ? 'Deleting...'
                            : 'Delete'}
                    </Button>
                </div>
            ),
        },
    ];

    if (loading) {
        return <Loading />;
    }

    return (
        <section className="product-list-page">
            <header className="product-list-header">
                <div>
                    <h1>Products</h1>
                    <p>Manage your inventory products.</p>
                </div>

                <Button onClick={handleAddProduct}>
                    <FaPlus />
                        <span>Add Product</span>
                </Button>
            </header>

            {error && (
                <ErrorMessage message={error} />
            )}

            <ProductSearch 
                value={searchQuery}
                onChange={setSearchQuery}
                onRefresh={refreshProducts}
            />
            
            {products.length === 0 ? (
                <ProductEmptyState  
                    searchQuery={searchQuery}
                    onAddProduct={handleAddProduct}
                    onReload={refreshProducts}
                />
            ) : (
                <ProductTable 
                    data={products}
                    column={column}
                />
            )}
        </section>
    );
};

export default ProductList;
