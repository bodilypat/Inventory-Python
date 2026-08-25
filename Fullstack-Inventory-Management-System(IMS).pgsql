Fullstack-Medical-Inventory-Management-System(IMS)/
├── frontend/ (React.js • HTML • CSS) components -> pages -> hooks -> services -> routes -> utils -> App.jsx
│   │
│   ├── public/
│   │   ├── favicon.ico
│   │   ├── logo.png
│   │   └── index.html
│   ├── src/
│   │   ├── assets/                                         
│   │   │   ├── icons/                                 
│   │   │   ├── images/                             
│   │   │   ├── fonts/
│   │   │   └── styles/  
│   │   │       ├── global.css
│   │   │       ├── variable.css
│   │   │       ├── reset.css
│   │   │       └── typography.css                        
│   │   ├── components/                                     
│   │   │   ├── ui/  
│   │   │   │   ├── Button.jsx
│   │   │   │   ├── Input.jsx 
│   │   │   │   ├── Select.jsx 
│   │   │   │   ├── Textarea.jsx 
│   │   │   │   ├── Checkbox.jsx
│   │   │   │   ├── Radio.jsx
│   │   │   │   └── index.js     
│   │   │   ├── layout/  
│   │   │   │   ├── Navbar.jsx
│   │   │   │   ├── Sidebar.jsx
│   │   │   │   ├── Footer.jsx
│   │   │   │   └── Layout.css
│   │   │   └── ...
│   │   │  		├── 
│   │   │       └── 
│   │   │  
│   │   ├── features/                                       
│   │   │   ├── auth/ 
│   │   │  	│	├── components/                          # Reusable authentication UI
│   │   │  	│	│   ├── LoginForm.jsx        
│   │   │  	│	│   ├── RegisterForm.jsx             
│   │   │  	│	│   ├── ForgotPasswordForm.jsx
│   │   │  	│	│   ├── ResetPasswordForm.jsx
│   │   │  	│	│   ├── ChangePasswordForm.jsx
│   │   │  	│	│   ├── PasswordInput.jsx 
│   │   │  	│	│   ├── AuthCard.jsx
│   │   │   │   │   └── index.js
│   │   │  	│	├── pages/                               # Route-level pages 
│   │   │  	│	│   ├── Login.jsx
│   │   │  	│	│   ├── Register.jsx
│   │   │  	│	│   ├── ForgotPassword.jsx
│   │   │  	│	│   ├── ResetPassword.jsx
│   │   │  	│	│   ├── VerifyEmail.jsx 
│   │   │   │   │   └── Unauthorized.jsx
│   │   │  	│	├── hooks/                               # Authenticatio logic and custom hooks
│   │   │  	│	│   ├── useAuth.js
│   │   │  	│	│   ├── useLogin.js
│   │   │  	│	│   ├── useRegister.js
│   │   │  	│	│   ├── useLogout.js
│   │   │  	│	│   ├── useCurrentUser.js
│   │   │  	│	│   ├── useRefreshToken.js
│   │   │   │   │   └── index.js
│   │   │  	│	├── services/                            # API calls (login, logout, refresh token, profile)
│   │   │   │   │   └── authApi.js
│   │   │  	│	├── context/                             # Global authentication state
│   │   │  	│	│   ├── AuthContext.jsx
│   │   │  	│	│   ├── AuthProvider.jsx
│   │   │   │   │   └── index.js
│   │   │  	│	├── guards/                              
│   │   │  	│	│   ├── ProtectedRoute.jsx 
│   │   │  	│	│   ├── PublicRoute.jsx 
│   │   │  	│	│   ├── RoleGuard.jsx 
│   │   │   │   │   └── PermissionGuard.jsx 
│   │   │  	│	├── utils/                               # Helper functions messages, storage keys
│   │   │  	│	│   ├── authHelpers.js
│   │   │  	│	│   ├── authValidators.js
│   │   │   │   │   └── index.js
│   │   │  	│	├── constants/                           # Roles permissions message storage keys
│   │   │  	│	│   ├── roles.js
│   │   │  	│	│   ├── permissions.js
│   │   │  	│	│   ├── authMessages.js
│   │   │  	│	│   ├── storageKeys.js
│   │   │   │   │   └── index.js
│   │   │  	│	├── styles/                              # Authentication-specific styling 
│   │   │   │   │   └── auth.css
│   │   │   │   └── index.js
│   │   │   ├── products/ 
│   │   │   │   ├── pages/
│   │   │  	│	│   ├── ProductList.jsx
│   │   │  	│	│   ├── AddProduct.jsx
│   │   │  	│	│   ├── EditProduct.jsx
│   │   │   │   │   └── ProductDetailspage.jsx
│   │   │  	│	├── components/
│   │   │  	│	│   ├── ProductForm.jsx
│   │   │  	│	│   ├── ProductTable.jsx
│   │   │  	│	│   ├── ProductCard.jsx
│   │   │  	│	│   ├── ProductSearch.jsx
│   │   │  	│	│   ├── ProductFilter.jsx 
│   │   │  	│	│   ├── ProductActions.jsx 
│   │   │  	│	│   ├── ProductStatusBadge.jsx 
│   │   │  	│	│   ├── ProductStockBadge.jsx
│   │   │  	│	│   ├── ProductPagination.jsx
│   │   │  	│	│   ├── ProductEmptyState.jsx
│   │   │   │   │   └── ProductDeleteModel.jsx
│   │   │  	│	├── hooks/
│   │   │  	│	│   ├── useProducts.js 
│   │   │  	│	│   ├── useProduct.js 
│   │   │  	│	│   ├── useProductForm.js 
│   │   │   │   │   └── useProductFilters.js
│   │   │  	│	├── services/
│   │   │   │   │   └── productsApi.js
│   │   │  	│	├── store/
│   │   │   │   │   └── productSlice.js
│   │   │  	│	├── validation/
│   │   │   │   │   └── productSchema.js
│   │   │  	│	├── selectors/
│   │   │   │   │   └── productsSelectors.js
│   │   │  	│	├── utils/
│   │   │  	│	│   ├── productHelpers.js 
│   │   │  	│	│   ├── productFormatter.js 
│   │   │   │   │   └── productConstants.js
│   │   │   │   └── index.js
│   │   │   ├── inventory/
│   │   │   │   ├── pages/
│   │   │  	│	│   ├── Inventory.jsx 
│   │   │  	│	│   ├── InventoryDetailsPage.jsx
│   │   │   │   │   └── StockAdjustmentPage.jsx 
│   │   │  	│	├── components/
│   │   │  	│	│   ├── InventoryTable.jsx 
│   │   │  	│	│   ├── InventoryCard.jsx 
│   │   │  	│	│   ├── InventoryDetails.jsx 
│   │   │  	│	│   ├── InventoryFilters.jsx 
│   │   │  	│	│   ├── InventoryStats.jsx 
│   │   │  	│	│   ├── StockAdjustment.jsx 
│   │   │  	│	│   ├── LowSTockAlert.jsx   
│   │   │   │   │   └── StockStatus.jsx 
│   │   │  	│	├── hooks/
│   │   │   │   │   └── useInventory.js
│   │   │  	│	├── services/
│   │   │   │   │   └── inventoryApi.js
│   │   │  	│	├── store/
│   │   │   │   │   └── inventorySlice.js
│   │   │  	│	├── inventorySelectors.js
│   │   │   │   └── InventoryUtils.js
│   │   │   ├── purchases/
│   │   │   │   ├── pages/
│   │   │  	│	│   ├── Purchases.jsx                            # Purchase order listing page
│   │   │  	│	│   ├── AddPruchase.jsx                          # Create ne purchase 
│   │   │  	│	│   ├── EditPurchase.jsx                         # Edit an existing purchase 
│   │   │  	│	│   ├── PurchasesDetailsPage.jsx                 # Full purchase order details 
│   │   │   │   │   └── ReceivePurchasePage.jsx                  # Receive ordered products  
│   │   │  	│	├── components/                                
│   │   │  	│	│   ├── PurchaseForm.jsx                         # Reusable create/edit from 
│   │   │  	│	│   ├── PurchaseTable.jsx                        # Purchase order table 
│   │   │  	│	│   ├── PurchaseDetils.jsx                       # Purchase Information/details
│   │   │  	│	│   ├── PurchaseFilters.jsx                      # Search, status, supplier/date filters 
│   │   │  	│	│   ├── PurchaseStatus.jsx                       # Status badge/display 
│   │   │  	│	│   ├── ReceivePurchase.jsx                      # Receving form/component 
│   │   │   │   │   └── PurchaseSummary.jsx                      # Subtotal, tax, discount total 
│   │   │  	│	├── hooks/
│   │   │   │   │   └── usePurchases.js                          # Reuseable purchase-management logic 
│   │   │  	│	├── services/
│   │   │   │   │   └── purchasesApi.js                          # Backend API requests 
│   │   │  	│	├── store/ 
│   │   │   │   │   └── purchasesSlice.js                        # Redux State management 
│   │   │  	│	├── purchasesSelector.js                         # Derived Redux state 
│   │   │   │   └── PurchasesUtils.js                            # Formatting/calculation helpers 
│   │   │   ├── sales/
│   │   │   │   ├── pages/
│   │   │  	│	│   ├── Sales.jsx 
│   │   │  	│	│   ├── AddSale.jsx 
│   │   │  	│	│   ├── EditSale.jsx 
│   │   │  	│	│   ├── SaleDetailPage.jsx 
│   │   │   │   │   └── ProcessReturnPage.jsx
│   │   │  	│	├── components/
│   │   │  	│	│   ├── SalesForm.jsx 
│   │   │  	│	│   ├── SalesTable.jsx  
│   │   │  	│	│   ├── SaleDetails.jsx 
│   │   │  	│	│   ├── SaleFilters.jsx 
│   │   │  	│	│   ├── SalesStatus.jsx 
│   │   │  	│	│   ├── SaleItems.jsx 
│   │   │  	│	│   ├── ProcessReturn.jsx 
│   │   │   │   │   └── SalesSummary.jsx 
│   │   │  	│	├── hooks/
│   │   │   │   │   └── useSales.js
│   │   │  	│	├── services/
│   │   │   │   │   └── salesApi.js
│   │   │  	│	├── store/
│   │   │   │   │   └── salesSlice.js
│   │   │  	│	├── salesSelectors.js 
│   │   │   │   └── salesUtils.js 
│   │   │   ├── suppliers/
│   │   │   │   ├── pages/
│   │   │  	│	│   ├── Suppliers.jsx 
│   │   │  	│	│   ├── AddSupplier.jsx 
│   │   │  	│	│   ├── EditSupplier.jsx
│   │   │   │   │   └── SupplierDetailsPage.jsx 
│   │   │  	│	├── components/
│   │   │  	│	│   ├── SupplierForm.jsx 
│   │   │  	│	│   ├── SupplierTable.jsx
│   │   │  	│	│   ├── SupplierDetails.jsx 
│   │   │  	│	│   ├── SupplierFilters.jsx 
│   │   │  	│	│   ├── SupplierStatus.jsx  
│   │   │   │   │   └── SupplierSummary.jsx
│   │   │  	│	├── hooks/
│   │   │   │   │   └── useSuppliers.js 
│   │   │  	│	├── services/
│   │   │   │   │   └── suppliersApi.js
│   │   │  	│	├── store/
│   │   │   │   │   └── suppliersSlice.js
│   │   │  	│	├── suppliersSelectors.js 
│   │   │   │   └── suppliersUtils.js
│   │   │   ├── customers/
│   │   │   │   ├── pages/
│   │   │  	│	│   ├── Customers.jsx 
│   │   │  	│	│   ├── AddCustomer.jsx 
│   │   │  	│	│   ├── EditCustomer.jsx 
│   │   │   │   │   └── CustomerDetailsPage.jsx 
│   │   │  	│	├── components/
│   │   │  	│	│   ├── CustomerForm.jsx 
│   │   │  	│	│   ├── CustomerTable.jsx 
│   │   │  	│	│   ├── CustomerDetails.jsx 
│   │   │  	│	│   ├── CustomerFilters.jsx 
│   │   │  	│	│   ├── CustomerStatus.jsx
│   │   │   │   │   └── CustomerSummary.jsx
│   │   │  	│	├── hooks/
│   │   │   │   │   └── useCustomers.js 
│   │   │  	│	├── services/
│   │   │   │   │   └── customersApi.js
│   │   │  	│	├── store/
│   │   │   │   │   └── customerSlice.js
│   │   │  	│	├── customerSelectors.js 
│   │   │   │   └── customersUtils.js
│   │   │   ├── categories/                                        
│   │   │   │   ├── pages/
│   │   │  	│	│   ├── Categories.jsx 
│   │   │  	│	│   ├── AddCategory.jsx 
│   │   │  	│	│   ├── EditCategory.jsx 
│   │   │   │   │   └── CategoryDetailsPage.jsx 
│   │   │  	│	├── components/
│   │   │  	│	│   ├── CategoryForm.jsx
│   │   │  	│	│   ├── CategoryTable.jsx 
│   │   │  	│	│   ├── CategoryDetials.jsx 
│   │   │  	│	│   ├── CategoryFilters.jsx 
│   │   │  	│	│   ├── CategoryStatus.jsx  
│   │   │   │   │   └── CategorySummary.jsx 
│   │   │  	│	├── hooks/
│   │   │   │   │   └── useCategories.js 
│   │   │  	│	├── services/
│   │   │   │   │   └── categoriesApi.js 
│   │   │  	│	├── store/
│   │   │   │   │   └── categoriesSlice.js
│   │   │  	│	├── categoriesSelector.js
│   │   │   │   └── categoriesUtils.js
│   │   │   ├── warehouses/
│   │   │   │   ├── pages/
│   │   │  	│	│   ├── Warehouses.jsx
│   │   │  	│	│   ├── AddWarehouse.jsx 
│   │   │  	│	│   ├── EditWarehouse.jsx
│   │   │   │   │   └── WarehouseDetailsPage.jsx
│   │   │  	│	├── components/
│   │   │  	│	│   ├── WarehouseForm.jsx 
│   │   │  	│	│   ├── WarehouseTable.jsx
│   │   │  	│	│   ├── WarehouseCard.jsx 
│   │   │  	│	│   ├── WarehouseDetails.jsx 
│   │   │  	│	│   ├── WarehouseStats.jsx 
│   │   │   │   │   └── StockTransfer.jsx
│   │   │  	│	├── hooks/
│   │   │   │   │   └── useWarehouses.js 
│   │   │  	│	├── services/
│   │   │   │   │   └── warehousesApi.js 
│   │   │  	│	├── store/
│   │   │   │   │   └── warehousesSlice.js 
│   │   │  	│	├── warehouseSelectors.js
│   │   │   │   └── warehousesUtils.js
│   │   │   ├── stockMovements/
│   │   │   │   ├── pages/
│   │   │  	│	│   ├── StockMovements.jsx
│   │   │  	│	│   ├── StockInpage.jsx 
│   │   │  	│	│   ├── StockOutPage.jsx
│   │   │   │   │   └── StockAdjustmentPage.jsx
│   │   │   │   ├── components/
│   │   │  	│	│   ├── StockMovementTable.jsx
│   │   │  	│	│   ├── StockMovementForm.jsx 
│   │   │  	│	│   ├── StockMovementFilters.jsx
│   │   │  	│	│   ├── StockMovementStats.jsx
│   │   │  	│	│   ├── StockIn.jsx
│   │   │  	│	│   ├── StockOut.jsx
│   │   │  	│	│   ├── StockAdjustment.jsx
│   │   │   │   │   └── MovementTimeline.jsx
│   │   │  	│	├── hooks/
│   │   │   │   │   └── useStockMovements.js 
│   │   │  	│	├── services/
│   │   │   │   │   └── stockMovementsApi.js 
│   │   │  	│	├── store/
│   │   │   │   │   └── stockMovemenstSlice.js
│   │   │  	│	├── stockMovementsSelectors.js 
│   │   │   │   └── stockMovementsUtilits.js 
│   │   │   ├── dashboard/
│   │   │  	│	├── pages/
│   │   │   │   │   └── Dashboard.jsx 
│   │   │  	│	├── components/
│   │   │  	│	│   ├── StatsCards.jsx 
│   │   │  	│	│   ├── SalesCart.jsx 
│   │   │  	│	│   ├── PurchaseChart.jsx 
│   │   │  	│	│   ├── InventoryChart.jsx 
│   │   │  	│	│   ├── LowStockProducts.jsx 
│   │   │  	│	│   ├── RecentSales.jsx 
│   │   │  	│	│   ├── RecentPurchases.jsx 
│   │   │  	│	│   ├── RecentStockMovement.jsx 
│   │   │   │   │   └── TopSellingProducts.jsx
│   │   │  	│	├── hooks/
│   │   │   │   │   └── useDashboard.js 
│   │   │  	│	├── services/
│   │   │   │   │   └── dashboardApi.js
│   │   │  	│	├── store/
│   │   │   │   │   └── dashboardSlice.js
│   │   │  	│	├── dashboardSelectors.js 
│   │   │   │   └── dashboardUtils.js
│   │   │   │       
│   │   │   └── Reports/
│   │   │  	 	├── pages/
│   │   │   	│   ├── Reports.jsx 
│   │   │   	│   ├── InventoryReport.jsx 
│   │   │   	│   ├── SaleReports.jsx 
│   │   │   	│   ├── PurchaseReports.jsx 
│   │   │   	│   ├── StockMovementReports.jsx 
│   │   │       │   └── PerformanceReports.jsx
│   │   │  	 	├── components/
│   │   │  		│   ├── ReportFilters.jsx 
│   │   │   	│   ├── ReportHeader.jsx 
│   │   │   	│   ├── ReportSummary.jsx
│   │   │   	│   ├── InventoryReport.jsx
│   │   │   	│   ├── SalesReport.jsx
│   │   │   	│   ├── PurchaseReport.jsx 
│   │   │   	│   ├── StockMovementReport.jsx 
│   │   │   	│   ├── SupplierReport.jsx
│   │   │   	│   ├── CustomerReport.jsx
│   │   │   	│   ├── SalesChart.jsx 
│   │   │   	│   ├── PurchaseChart.jsx  
│   │   │   	│   ├── InventoryChart.jsx 
│   │   │       │   └── ReportTable.jsx
│   │   │  	 	├── hooks/
│   │   │       │   └── useReports.js
│   │   │  	 	├── services/
│   │   │       │   └── reportApi.js
│   │   │  	 	├── store/
│   │   │       │   └── reportsSlice.js
│   │   │  	 	├── reportsSelectors.js
│   │   │       └── reportsUtils.js
│   │   │
│   │   ├── hooks/                                       
│   │   │   ├── useFetch.js                              # Generic API request handing (loading, error, data)
│   │   │   ├── useDashboard.js                          # Dashboard statistics and summaries
│   │   │   ├── usePagination.js                         # Pagination Logic reusable across tables
│   │   │   ├── useDebounce.js                           # Debounce values for search inputs
│   │   │   ├── useLocalStorage.js                       # Persist datain local state
│   │   │   ├── useModal.js                              # Open/Close State for dialogs and Modal
│   │   │   ├── useTheme.js                              # Theme switching (light/dark)
│   │   │   └── index.js
│   │   │
│   │   ├── services/                                    
│   │   │   ├── api.js                                   # Configure Axios (base URL, interceptors, auth token, error banding)
│   │   │   └── ...
│   │   │
│   │   ├── routes/                                  
│   │   │   ├── AppRoutes.jsx                            # Defines all application route 
│   │   │   ├── PrivateRoute.jsx
│   │   │   ├── PublicRoute.jsx                          # Prevents authenticated users from accessing pages like login 
│   │   │   ├── RoleRoute.jsx                            # Restricts routes based on user roles (Admin, Manager, Staff)
│   │   │   ├── routePaths.js                            # Stores all paths as constants
│   │   │   └── index.js                                 # Re-exports route modules clearner imports
│   │   │
│   │   ├── utils/                                       
│   │   │   ├── helpers.js                               # General reusable utility functions
│   │   │   ├── constants.js                             # Application wide constants
│   │   │   ├── validator.js                             # Custom validation function 
│   │   │   ├── formatter.js                             # Formatting text, numbers, IDs 
│   │   │   ├── date.js                                  # Date and time formatting utilities
│   │   │   ├── currency.js                              # Currency calculations and formatting 
│   │   │   ├── storage.js                               # LocalStorage and SessionStorage helpers                           # Role and permission helper functions
│   │   │   └── index.js                                 # Re-export utitity function
│   │   │     
│   │   ├── constants/                                         
│   │   │   ├── api.js                                   # API endpoint timeout values
│   │   │   ├── app.js                                   # Application name, version, page size 
│   │   │   ├── auth.js                                  # Authentication-related constants 
│   │   │   ├── routes.js                                # Route paths 
│   │   │   ├── roles.js                                 # User roles and permissions 
│   │   │   ├── inventory.js                             # Stock limits, movement types 
│   │   │   ├── messages.js                              # Success and error messages 
│   │   │   ├── status.js                                # Order, inventory, and user status values 
│   │   │   ├── validation.js                            # Validation rules and limits 
│   │   │   └── index.js                   
│   │   │      
│   │   ├── App.jsx 
│   │   ├── main.jsx                                    
│   │   └── index.css    
│   │
│   ├── package.json
│   ├── vite.config.js
│   ├── .env
│   ├── .gitignore                        
│   └── README.MD               
│                            
├── backend(Python) FastAPI(API Routes-> Validation / Schema ->Service Layer->Repository Layer->SQLAlchemy ORM)-> PostgreSQL -> Response -> React.js UI
│   ├── app/
│   │   ├── __init__.py 
│   │   ├── main.py
│   │   │
│   │   ├── core/
│   │   │   ├── __init__.py
│   │   │   ├── config.py
│   │   │   ├── database.py    
│   │   │   └── security.py             
│   │   │
│   │   ├── api/   
│   │   │   ├── __init__.py
│   │   │   ├── deps.py                           
│   │   │   └── routes/                  
│   │   │       ├── __init__.py 
│   │   │       ├── auth.py
│   │   │       ├── users.py 
│   │   │       ├── products.py
│   │   │       ├── categories.py
│   │   │       ├── suppliers.py 
│   │   │       ├── inventory.py+
│   │   │       ├── purchases.py
│   │   │       ├── sales.py 
│   │   │       ├── batches.py 
│   │   │       ├── expiry.py
│   │   │       ├── dashboard.py 
│   │   │       └── reports.py
│   │   │
│   │   ├── schemas/                             
│   │   │   ├── __init__.py
│   │   │   ├── user.py 
│   │   │   ├── product.py 
│   │   │   ├── category.py 
│   │   │   ├── supplier.py 
│   │   │   ├── customer.py 
│   │   │   ├── batch.py  
│   │   │   ├── inventory.py 
│   │   │   ├── purchase.py 
│   │   │   ├── purchase_item.py 
│   │   │   ├── sale.py 
│   │   │   └── sale_item.py                          
│   │   │
│   │   ├── services/          
│   │   │   ├── __init__.py                    
│   │   │   ├── auth_service.py
│   │   │   ├── user_service.py
│   │   │   ├── product_service.py 
│   │   │   ├── category_service.py
│   │   │   ├── supplier_service.py 
│   │   │   ├── inventory_service.py 
│   │   │   ├── purchase_service.py 
│   │   │   ├── sale_service.py 
│   │   │   ├── batch_service.py 
│   │   │   ├── expiry_service.py 
│   │   │   └── report_service.py
│   │   │
│   │   ├── repositories/                             
│   │   │   ├── __init__.py 
│   │   │   ├── user_repository.py 
│   │   │   ├── product_repository.py
│   │   │   ├── category_repository.py 
│   │   │   ├── supplier_repository.py 
│   │   │   ├── inventory_repository.py
│   │   │   ├── purchase_repository.py 
│   │   │   ├── sale_repository.py 
│   │   │   ├── batch_repository.py
│   │   │   └── report_repository.py
│   │   │
│   │   └── models/                                 
│   │       ├── __init__.py 
│   │       ├── user.py
│   │       ├── product.py 
│   │       ├── category.py 
│   │       ├── supplier.py 
│   │       ├── customer.py
│   │       ├── batch.py 
│   │       ├── inventory.py 
│   │       ├── purchase.py 
│   │       ├── purchase_item.py
│   │       ├── sale.py 
│   │       └── sale_item.py
│   │    
│   ├── tests/
│   │   ├── unit/
│   │   ├── integration/
│   │   └── api/
│   ├── migrations/
│   │   └── ...
│   ├── requirements.txt 
│   ├── .env 
│   ├── .env.example 
│   └── README.md 
└── 