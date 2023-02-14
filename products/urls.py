from django.urls import path 
from .views import *
urlpatterns = [
    path("category_page/<slug:slug>/",CategoryView.as_view(),name="category_page"),
    path('<slug:cat_slug>/<slug:slug>/', ProductView.as_view(), name='product1'),
    path('<slug:maincat_slug>/<slug:cat_slug>/<slug:slug>/', ProductView.as_view(), name='product2'),
    path('<slug:mainmaincat_slug>/<slug:maincat_slug>/<slug:cat_slug>/<slug:slug>/', ProductView.as_view(), name='product3'),
    path('vendor_profile/<slug:slug>/',vendor,name="VendorProfile"),
    path("update/",UpdateItem,name="update")
]
