Full-Stack-Medical-Inventory-Management-System(IMS)/
├── backend(Python)
│   ├── app/
│   │   ├── main.py                             # Main application
│   │   │
│   │   ├── config/                             # Environment & DB config  
│   │   │   ├── db.py                           # Database connection (SQLAlchemy or MongoDB)
│   │   │   ├── setting.py                      # Env vars
│   │   │   └── __init__.py                     
│   │   │
│   │   ├── models/                             # SQLAlchemy ORM models
│   │   │   ├── auth/
│   │   │   │   ├── models.py
│   │   │   │   ├── schemas.py
│   │   │   │   ├── routes.py
│   │   │   │   ├── service.py
│   │   │   │   └── utils.py
│   │   │   ├── users/
│   │   │   │   ├── models.py
│   │   │   │   ├── schemas.py
│   │   │   │   ├── routes.py
│   │   │   │   ├── service.py
│   │   │   │   └── utils.py
│   │   │   ├── categories/
│   │   │   │   ├── models.py
│   │   │   │   ├── schemas.py
│   │   │   │   ├── routes.py
│   │   │   │   └── service.py
│   │   │   ├── products/
│   │   │   │   ├── models.py
│   │   │   │   ├── schemas.py
│   │   │   │   ├── routes.py
│   │   │   │   ├── service.py
│   │   │   │   └── utils.py
│   │   │   ├── suppliers/
│   │   │   │   ├── models.py
│   │   │   │   ├── schemas.py
│   │   │   │   ├── routes.py
│   │   │   │   └── service.py
│   │   │   ├── sales/
│   │   │   │   ├── models.py
│   │   │   │   ├── schemas.py
│   │   │   │   ├── routes.py
│   │   │   │   ├── service.py
│   │   │   │   └── utils.py
│   │   │   ├── purchases/
│   │   │   │   ├── models.py
│   │   │   │   ├── schemas.py
│   │   │   │   ├── routes.py
│   │   │   │   ├── service.py
│   │   │   │   └── utils.py
│   │   │   ├── inventory/
│   │   │   │   ├── models.py
│   │   │   │   ├── schemas.py
│   │   │   │   ├── routes.py
│   │   │   │   └── service.py
│   │   │   ├── logs/
│   │   │   │   ├── models.py
│   │   │   │   ├── routes.py
│   │   │   │   └── service.py
│   │   │   └── settings/
│   │   │       ├── routes.py
│   │   │       ├── service.py
│   │   │       └── utils.py
│   │   ├── middleware/                            # Global middlewares
│   │   │   ├── auth.py                            # JWT/role-based
│   │   │   ├── logging.py                         # Request/response logging
│   │   │   └── error_handlers.py                  # Exception handlers
│   │   │
│   │   ├── utils/                                 # Shared utilities
│   │   │   ├── hashing.py                         # Password hashing
│   │   │   ├── token.py                           # JWT generation/verification
│   │   │   ├── response.py                        # Standardized API response
│   │   │   └── logger.py                          # Logging helpers
│   │   │
│   │   ├── constants/                             # Global constants
│   │   │   ├── roles.py                           
│   │   │   └── http_status.py                            
│   │   └── database/           
│   │       └── seed.py       
│   ├── tests/                                 
│   │   ├── conftest.py
│   │   ├── test_auth.py
│   │   ├── test_product.py
│   │   ├── test_suppliers.py
│   │   ├── test_orders.py
│   │   └── test_stock.py
│   ├── .env
│   ├── Dockerfile
│   ├── docker-compose.yml
│   ├── requirements.txt
│   └── README.md
│   
├── frontend/ (React • JavaScript • HTML • CSS) components -> pages -> hooks -> services -> routes -> utils -> App.jsx
│   │
│   ├── src/
│   │   ├── app/                                         # App initialization
│   │   │   ├── store.js  
│   │   │   ├── Provider.jsx
│   │   │   └── App.jsx.
│   │   ├── routes/                                      # Routing system
│   │   │   ├── AppRoutes.jsx    
│   │   │   └── PrivateRoute.jsx
│   │   ├── api/                                         # API configuration
│   │   │   ├── axiosClient.js    
│   │   │   └── endpoint.js
│   │   │
│   │   ├── features/                                    # Feature-based modules
│   │   │   ├── auth/                                                              
│   │   │   │   ├── api/                                    
│   │   │   │   │   └── authApi.js
│   │   │   │   ├── hooks/                                    
│   │   │   │   │   └── useAuth.js
│   │   │   │   ├── pages/        
│   │   │   │   │   ├── Login.jsx  
│   │   │   │   │   └── Register.jsx                        
│   │   │   │   ├── authSlice.js
│   │   │   │   └── authService.js
│   │   │   ├── products/                                                              
│   │   │   │   ├── api/                                    
│   │   │   │   │   └── productApi.js
│   │   │   │   ├── components/                                    
│   │   │   │   │   ├── ProductTable.jsx 
│   │   │   │   │   └── ProductForm.jsx
│   │   │   │   ├── pages/        
│   │   │   │   │   ├── ProductList.jsx
│   │   │   │   │   └── ProductDetials.jsx
│   │   │   │   ├── hooks/                                    
│   │   │   │   │   └── useProduct.js
│   │   │   │   ├── productSlice.js
│   │   │   │   └── productService.js
│   │   │   ├── sales/                                                              
│   │   │   │   ├── api/                                    
│   │   │   │   │   └── saleApi.js
│   │   │   │   ├── components/                                    
│   │   │   │   │   └── SalesTable.jsx
│   │   │   │   ├── pages/        
│   │   │   │   │   ├── SalesPage.jsx
│   │   │   │   │   └── SaleDetails.jsx
│   │   │   │   ├── hooks/                                    
│   │   │   │   │   └── useSales.js
│   │   │   │   ├── saleSlice.js
│   │   │   │   └── salesService.js
│   │   │   ├── purchases/
│   │   │   │   ├── api/                                    
│   │   │   │   │   └── purchaseApi.js
│   │   │   │   └── pages/
│   │   │   │       └── PurchasePage.jsx
│   │   │   ├── suppliers/
│   │   │   │   ├── api/                                    
│   │   │   │   │   └── supplierApi.js
│   │   │   │   └── pages/
│   │   │   │       └── SupplierPage.jsx
│   │   │   ├── categories/
│   │   │   │   ├── api/                                    
│   │   │   │   │   └── categoryApi.js
│   │   │   │   └── pages/
│   │   │   │       └── CategoryPage.jsx
│   │   │   ├── inventory/
│   │   │   │   ├── api/                                    
│   │   │   │   │   └── stockApi.js
│   │   │   │   ├── pages/                                    
│   │   │   │   │   └── InventoryPage.jsx
│   │   │   │   └── inventorySlice.js  
│   │   │   └── settings/
│   │   │       ├── api/
│   │   │       │   └── settingsApi.js
│   │   │       └── pages/
│   │   │           └── SettingsPage.jsx
│   │   ├── components/                                  # Global reuable components    
│   │   │   ├── ui/                                                              
│   │   │   │   ├── Button/ 
│   │   │   │   │   ├── Button.jsx      
│   │   │   │   │   ├── Button.css
│   │   │   │   │   └── index.js                     
│   │   │   │   ├── Input/
│   │   │   │   │   ├── Input.jsx      
│   │   │   │   │   ├── Input.css
│   │   │   │   │   └── index.js
│   │   │   │   ├── Select/
│   │   │   │   │   ├── Select.jsx      
│   │   │   │   │   ├── Select.css
│   │   │   │   │   └── index.js                                  
│   │   │   │   ├── Checkbox/
│   │   │   │   │   ├── Checkbox.jsx      
│   │   │   │   │   ├── Checkbox.css
│   │   │   │   │   └── index.js                              
│   │   │   │   ├── Table/
│   │   │   │   │   ├── Table.jsx      
│   │   │   │   │   ├── TableHeader.jsx
│   │   │   │   │   ├── TableRow.jsx
│   │   │   │   │   ├── TableCell.jsx
│   │   │   │   │   ├── Table.css
│   │   │   │   │   └── index.js
│   │   │   │   ├── Modal/
│   │   │   │   │   ├── Modal.jsx
│   │   │   │   │   ├── ModalHeader.jsx      
│   │   │   │   │   ├── ModalBody.jsx
│   │   │   │   │   ├── ModalFooter.jsx
│   │   │   │   │   ├── Modal.css
│   │   │   │   │   └── index.js
│   │   │   │   ├── Card/
│   │   │   │   │   ├── Card.jsx      
│   │   │   │   │   ├── CardHeader.jsx
│   │   │   │   │   ├── CardBody.jsx
│   │   │   │   │   ├── CardFoodter.jsx
│   │   │   │   │   ├── Card.css
│   │   │   │   │   └── index.js
│   │   │   │   ├── Badge/
│   │   │   │   │   ├── Badge.jsx      
│   │   │   │   │   ├── Badge.css
│   │   │   │   │   └── index.js
│   │   │   │   ├── Spinner/
│   │   │   │   │   ├── Spinner.jsx      
│   │   │   │   │   ├── Spinner.css
│   │   │   │   │   └── index.js
│   │   │   │   ├── Loader/
│   │   │   │   │   ├── Loader.jsx      
│   │   │   │   │   ├── Loader.css
│   │   │   │   │   └── index.js
│   │   │   │   ├── Pagination/
│   │   │   │   │   ├── Pagination.jsx 
│   │   │   │   │   ├── Pagination.css     
│   │   │   │   │   └── index.js
│   │   │   │   └── index.js                           
│   │   │   ├── layout/ 
│   │   │   │   ├── Navbar/
│   │   │   │   │   ├── Navbar.jsx 
│   │   │   │   │   ├── Navbar.css     
│   │   │   │   │   └── index.js
│   │   │   │   ├── Sidebar/
│   │   │   │   │   ├── Sidebar.jsx 
│   │   │   │   │   ├── Sidebar.css     
│   │   │   │   │   └── index.js
│   │   │   │   ├── PageHeader/
│   │   │   │   │   ├── PageHeader.jsx 
│   │   │   │   │   ├── PageHeader.css     
│   │   │   │   │   └── index.js
│   │   │   │   ├── Breadcrumb/
│   │   │   │   │   ├── Breadcrumb.jsx 
│   │   │   │   │   ├── Breadcrumb.css     
│   │   │   │   │   └── index.js
│   │   │   │   ├── DashboardLayout/
│   │   │   │   │   ├── DashboardLayout.jsx 
│   │   │   │   │   ├── DashboardLayout.css     
│   │   │   │   │   └── index.js
│   │   │   │   └── index.js
│   │   │   └── charts/
│   │   │       ├── SaleChart.jsx
│   │   │       └── InventoryChart.jsx
│   │   │      
│   │   ├── hooks/                                       # Global shared hooks
│   │   │   ├── useDebounce.js
│   │   │   └── usePagination.js
│   │   ├── utils/                                       # Utility function
│   │   │   ├── formatCurrency.js
│   │   │   ├── formatDate.js
│   │   │   ├── validation.js
│   │   │   └── constants.js                       
│   │   └── main.jsx
│   └── public/                  
├── .env                                      
├── package.json
├── docker-compose.yml
└── README.md                                  