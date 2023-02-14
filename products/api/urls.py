from django.urls import path 
from products.api.views import ProductListApi,ProductRetrieveUpdateDestroyAPIView

urlpatterns=[
    path('products/', ProductListApi.as_view(), name='product_api'),
    path('products/<slug:pk>/', ProductRetrieveUpdateDestroyAPIView.as_view(),name="product2_api")

    

    

    

    

    

    

    

    

    
]