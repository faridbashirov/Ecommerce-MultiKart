from django.urls import path

from .views import *
urlpatterns = [
    path('',home,name='home'),
    path('error/',error,name='error'),
    path('about-page/',about_page,name='about_page'),
    path('faq/',faq,name='faq'),
    path('search/',Search.as_view(),name='search'),
    path('contact/',contact.as_view(),name='contact'),
    path("subscribe/",subscribe,name="subscribe")
]

