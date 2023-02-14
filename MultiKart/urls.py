"""MultiKart URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/4.1/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path,include
from django.conf.urls.i18n import i18n_patterns
from django.conf import settings
from django.conf.urls.static import static

urlpatterns = [
    path('admin/', admin.site.urls),
    path("api/",include('orders.api.urls')),
    path('api/',include("products.api.urls")),
    path('',include('accounts.urls')),
    path("api/",include("accounts.api.urls")),
    
    path('',include('social_django.urls',namespace='social')),
]+ static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)

urlpatterns += i18n_patterns(
     path('i18n/', include('django.conf.urls.i18n')),
     path('',include('orders.urls')),
     path('', include('core.urls')),
     path('',include('products.urls')),
    #  path(r'^setlang',  'django.views.i18n.set_language'),
    
)
# handler404="core.views.handle_not_found"