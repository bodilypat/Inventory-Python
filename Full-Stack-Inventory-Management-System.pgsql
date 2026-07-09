Full-Stack-Medical-Inventory-Management-System(IMS)/
├── frontend/ (React • JavaScript • HTML • CSS) components -> pages -> hooks -> services -> routes -> utils -> App.jsx
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
│   │   │   ├── common/  
│   │   │   │   ├── Button.jsx
│   │   │   │   ├── Input.jsx 
│   │   │   │   ├── Select.jsx 
│   │   │   │   ├── Textarea.jsx 
│   │   │   │   ├── Checkbox.jsx
│   │   │   │   ├── Radio.jsx
│   │   │   │   ├── ButtonGroup.jsx 
│   │   │   │   ├── Card.jsx
│   │   │   │   ├── Modal.jsx 
│   │   │   │   ├── Table.jsx 
│   │   │   │   ├── Badge.jsx 
│   │   │   │   ├── Alert.jsx
│   │   │   │   ├── Toast.jsx
│   │   │   │   ├── Loader.jsx
│   │   │   │   ├── Spinner.jsx
│   │   │   │   ├── SearchBar.jsx
│   │   │   │   ├── Pagination.jsx 
│   │   │   │   ├── Breadcrumb.jsx 
│   │   │   │   ├── Avatar.jsx
│   │   │   │   ├── EmptyState.jsx
│   │   │   │   ├── ConfirmDialog.jsx
│   │   │   │   ├── Common.css
│   │   │   │   └── index.js     
│   │   │   ├── layout/  
│   │   │   │   ├── Navbar.jsx
│   │   │   │   ├── Sidebar.jsx
│   │   │   │   ├── Footer.jsx
│   │   │   │   └── Layout.css
│   │   │   └── inventory/    
│   │   │  		├── ProductCard.jsx
│   │   │  		├── ProductForm.jsx
│   │   │  		├── ProductTable.jsx 
│   │   │  		├── CategoryForm.jsx
│   │   │  		├── SupplierForm.jsx
│   │   │  		├── CustomerForm.jsx
│   │   │  		├── PurchaseForm.jsx 
│   │   │  		├── PurchaseTable.jsx 
│   │   │  		├── SaleForm.jsx
│   │   │  		├── SaleTable.jsx
│   │   │  		├── InventoryTable.jsx 
│   │   │  		├── StockBadge.jsx
│   │   │  		├── StockStatus.jsx
│   │   │  		├── StockMovementTable.jsx
│   │   │  		├── DashboardCards.jsx 
│   │   │  		├── LowStockAlert.jsx 
│   │   │  		├── SummaryCards.jsx
│   │   │  		├── Filters.jsx
│   │   │  		├── Inventory.css
│   │   │       └── index.js
│   │   │  
│   │   ├── features/                                       
│   │   │   ├── auth/ 
│   │   │  	│	├── api/                                
│   │   │  	│	│   ├── auth.api.js
│   │   │   │   │   └── token.api.js
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
│   │   │  	│	│   ├── Unauthorized.jsx
│   │   │   │   │   └── index.js
│   │   │  	│	├── hooks/                               # Authenticatio logic and custom hooks
│   │   │  	│	│   ├── useAuth.js
│   │   │  	│	│   ├── useRegister.js
│   │   │  	│	│   ├── useLogin.js
│   │   │  	│	│   ├── useLogout.js
│   │   │  	│	│   ├── useCurrentUser.js
│   │   │  	│	│   ├── useRefreshToken.js
│   │   │   │   │   └── index.js
│   │   │  	│	├── services/                            # API calls (login, logout, refresh token, profile)
│   │   │   │   │   └── auth.service.js
│   │   │  	│	├── context/                             # Global authentication state
│   │   │  	│	│   ├── AuthContext.jsx
│   │   │  	│	│   ├── AuthProvider.jsx
│   │   │   │   │   └── index.js
│   │   │  	│	├── utils/                               # Helper functions messages, storage keys
│   │   │  	│	│   ├── authHelpers.js
│   │   │  	│	│   ├── authValidators.js
│   │   │   │   │   └── index.js
│   │   │  	│	├── constants/                           # Roles permissions message storage keys
│   │   │  	│	│   ├── permissions.js
│   │   │  	│	│   ├── authMessages.js
│   │   │  	│	│   ├── storageKeys.js
│   │   │   │   │   └── index.js
│   │   │  	│	├── styles/                              # Authentication-specific styling 
│   │   │   │   │   └── auth.css
│   │   │   │   └── index.js
│   │   │   ├── dashboard/  
│   │   │   │   ├── Dashboard.jsx
│   │   │  	│	├── dashboard.css
│   │   │   │   └── index.js
│   │   │   ├── products/ 
│   │   │   │   ├── pages/
│   │   │  	│	│   ├── ProductList.jsx
│   │   │  	│	│   ├── ProductCreate.jsx
│   │   │  	│	│   ├── ProductEdit.jsx
│   │   │   │   │   └── ProductDetails.jsx
│   │   │  	│	├── components/
│   │   │  	│	│   ├── ProductForm.js
│   │   │   │   │   └── ProductTable.js
│   │   │  	│	├── hooks/
│   │   │  	│	├── services/
│   │   │   │   └── index.js
│   │   │   ├── categories/   
│   │   │   │   ├── CategoryList.jsx
│   │   │  	│	├── CategoryCreate.jsx
│   │   │  	│	├── CategoryEdit.jsx
│   │   │  	│	├── categories.css
│   │   │   │   └── index.css                                             
│   │   │   ├── suppliers/
│   │   │   │   ├── SupplierList.jsx
│   │   │  	│	├── SupplierCreate.jsx 
│   │   │  	│	├── SupplierEdit.jsx 
│   │   │  	│	├── supplier.css
│   │   │   │   └── index.js
│   │   │   ├── customers/
│   │   │   │   ├── CustomerList.jsx 
│   │   │  	│	├── CustomerCreate.jsx 
│   │   │  	│	├── CustomerEdit.jsx
│   │   │  	│	├── customers.css
│   │   │   │   └── index.js
│   │   │   ├── purchases/
│   │   │   │   ├── PurchaseList.jsx
│   │   │  	│	├── PurchaseCreate.jsx 
│   │   │  	│	├── PurchaseEdit.jsx 
│   │   │  	│	├── purchase.css
│   │   │   │   └── index.js
│   │   │   ├── sales/
│   │   │   │   ├── SaleList.jsx 
│   │   │  	│	├── SaleCreate.jsx 
│   │   │  	│	├── SaleDetails.jsx
│   │   │  	│	├── sales.css
│   │   │   │   └── index.js
│   │   │   ├── inventory/
│   │   │   │   ├── Inventory.jsx
│   │   │   │   ├── StockMovement.jsx
│   │   │   │   ├── LowStock.jsx 
│   │   │   │   ├── inventory.css
│   │   │   │   └── index.js
│   │   │   ├── reports/
│   │   │   │   ├── Reports.jsx
│   │   │   │   ├── SalesReport.jsx 
│   │   │   │   ├── InventoryReport.jsx
│   │   │   │   ├── reports.css
│   │   │   │   └── index.js
│   │   │   ├── settings/
│   │   │   │   ├── Settings.jsx
│   │   │   │   ├── Profile.jsx 
│   │   │   │   ├── settings.css
│   │   │   │   └── index.js
│   │   │   └── not-found/
│   │   │  		├── Not-found.jsx
│   │   │  		├── not-found.css
│   │   │       └── index.js
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
├── backend(Python)
│   ├── app/
│   │   ├── api/                              
│   │   │   ├── v1/                       
│   │   │   │   ├── auth/
│   │   │   │   │   ├── controller.py
│   │   │   │   │   ├── service.py
│   │   │   │   │   ├── repository.py
│   │   │   │   │   ├── schemas.py 
│   │   │   │   │   ├── dependencies.py
│   │   │   │   │   └── __init__.py
│   │   │   │   │
│   │   │   │   ├── dashboard/
│   │   │   │   ├── products/
│   │   │   │   ├── categories/
│   │   │   │   ├── suppliers/
│   │   │   │   ├── customers/
│   │   │   │   ├── purchases/
│   │   │   │   ├── sales/
│   │   │   │   ├── inventory/
│   │   │   │   ├── reports/
│   │   │   │   ├── settings/
│   │   │   │   └── __init__py
│   │   │   ├── routes.py
│   │   │   └── _init__.py
│   │   │
│   │   ├── core/
│   │   │   ├── config.py
│   │   │   ├── security.py
│   │   │   ├── database.py 
│   │   │   ├── logger.py
│   │   │   ├── middleware.py 
│   │   │   ├── exceptions.py  
│   │   │   ├── permissions.py 
│   │   │   ├── roles.py 
│   │   │   ├── paginations.py 
│   │   │   ├── responses.py                       
│   │   │   ├── constants.py                      
│   │   │   └── __init__.py             
│   │   │
│   │   ├── models/                                 
│   │   │   ├── user.py
│   │   │   ├── role.py
│   │   │   ├── permission.py
│   │   │   ├── category.py 
│   │   │   ├── supplier.py 
│   │   │   ├── customer.py 
│   │   │   ├── product.py 
│   │   │   ├── product_image.py 
│   │   │   ├── purchase.py 
│   │   │   ├── sale.py 
│   │   │   ├── sale_item.py 
│   │   │   ├── inventory.py 
│   │   │   ├── stock_movement.py 
│   │   │   ├── setting.py 
│   │   │   ├── notification.py 
│   │   │   ├── activity_log.py 
│   │   │   └── __init__.py
│   │   │
│   │   ├── schemas/                             
│   │   │   ├── auth.py 
│   │   │   ├── user.py 
│   │   │   ├── category.py 
│   │   │   ├── supplier.py 
│   │   │   ├── customer.py 
│   │   │   ├── product.py 
│   │   │   ├── purchase.py 
│   │   │   ├── sale.py 
│   │   │   ├── inventory.py 
│   │   │   ├── report.py 
│   │   │   ├── dashboard.py       
│   │   │   └── __init__.py                          
│   │   │
│   │   ├── repositories/                             
│   │   │   ├── base.py 
│   │   │   ├── auth_repository.py 
│   │   │   ├── user_repository.py 
│   │   │   ├── product_repository.py 
│   │   │   ├── category_repository.py
│   │   │   ├── supplier_repository.py 
│   │   │   ├── customer_repository.py
│   │   │   ├── purchase_repository.py 
│   │   │   ├── sale_repository.py
│   │   │   ├── inventory_repository.py 
│   │   │   ├── report_repository.py
│   │   │   └── __init__.py   
│   │   │
│   │   ├── services/                             
│   │   │   ├── auth_service.py
│   │   │   ├── user_service.py 
│   │   │   ├── dashboard_service.py 
│   │   │   ├── product_service.py 
│   │   │   ├── category_service.py 
│   │   │   ├── supplier_service.py 
│   │   │   ├── customer_service.py 
│   │   │   ├── purchase_service.py 
│   │   │   ├── sale_service.py 
│   │   │   ├── inventory_service.py 
│   │   │   ├── report_service.py 
│   │   │   ├── upload_service.py                    
│   │   │   ├── email_service.py 
│   │   │   ├── notificatio_service.py 
│   │   │   └── __init__.py 
│   │   │
│   │   ├── dependencies/                             
│   │   │   ├── auth.py 
│   │   │   ├── permission.py 
│   │   │   ├── pagination.py 
│   │   │   ├── database.py        
│   │   │   └── __init__.py                 
│   │   │
│   │   ├── middlewares/                             
│   │   │   ├── authentication.py 
│   │   │   ├── authorization.py 
│   │   │   ├── logging.py 
│   │   │   ├── rate_limit.py 
│   │   │   ├── cors.py      
│   │   │   ├── exception_handler.py 
│   │   │   └── __init__.py
│   │   │
│   │   ├── utils/                             
│   │   │   ├── validators.py 
│   │   │   ├── helpers.py 
│   │   │   ├── formatter.py 
│   │   │   ├── date.py 
│   │   │   ├── currency.py 
│   │   │   ├── file.py 
│   │   │   ├── barcode.py 
│   │   │   ├── or_code.py 
│   │   │   ├── gr_code.py 
│   │   │   ├── pdf.py                    
│   │   │   ├── excel.py 
│   │   │   └── __init__.py
│   │   │
│   │   ├── events/
│   │   ├── listeners/
│   │   ├── tasks/
│   │   │   ├── email_tasks.py
│   │   │   ├── report_tasks.py 
│   │   │   ├── cleanup_tasks.py 
│   │   │   └── backeup_tasks.py 
│   │   ├── uploads/ 
│   │   │   ├── products/                    
│   │   │   ├── users/ 
│   │   │   └── temp/
│   │   ├── templates/
│   │   │   ├── email/                    
│   │   │   ├── reports/
│   │   │   └── invoices/
│   │   ├── static/
│   │   │   ├── images/                    
│   │   │   ├── logos/ 
│   │   │   └── exports/
│   │   ├── tests/
│   │   │   ├── unit/
│   │   │   ├── integration/                    
│   │   │   ├── api/ 
│   │   │   └── conftest.py
│   │   ├── main.py                                                      
│   │   └── __init__.py           
│   │             
│   ├── migrations/
│   ├── scripts/                                 
│   │   ├── 
│   │   ├── 
│   │   ├── 
│   │   └── 
│   ├── docs/                                 
│   │   ├── 
│   │   ├── 
│   │   ├── 
│   │   └── 
│   ├── requirements.txt
│   ├── pyproject.tom1 
│   ├── alebic.ini
│   ├── .env
│   ├── .env.example
│   ├── Dockerfile
│   ├── docker-compose.yml
│   ├── gitignore
│   ├── README.md
│   └── LICENSE 
