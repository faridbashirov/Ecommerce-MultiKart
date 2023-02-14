"""
Django settings for MultiKart project.

Generated by 'django-admin startproject' using Django 4.1.1.

For more information on this file, see
https://docs.djangoproject.com/en/4.1/topics/settings/

For the full list of settings and their values, see
https://docs.djangoproject.com/en/4.1/ref/settings/
"""

from pathlib import Path
import os
from django.utils.translation import ugettext_lazy as _
# Build paths inside the project like this: BASE_DIR / 'subdir'.
BASE_DIR = Path(__file__).resolve().parent.parent


# Quick-start development settings - unsuitable for production
# See https://docs.djangoproject.com/en/4.1/howto/deployment/checklist/

# SECURITY WARNING: keep the secret key used in production secret!
SECRET_KEY = 'django-insecure-mp%dqtd@gd8^bry+r$e+@*t=w)(-12jn0mf1_yjc++==f9vl^x'

# SECURITY WARNING: don't run with debug turned on in production!
DEBUG = False if os.environ.get('DEBUG') else True
PROD= not DEBUG


ALLOWED_HOSTS = ["*"]


# Application definition

INSTALLED_APPS = [
    
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
    "main",
    'core',
    'accounts',
    
    'products',
    'orders',
    'social_django',
    'rest_framework',
    'rest_framework_simplejwt',
    'django_filters',
    "django_celery_beat",
    
    
]
REST_FRAMEWORK = {
    'DEFAULT_FILTER_BACKENDS': ['django_filters.rest_framework.DjangoFilterBackend'],
    'DEFAULT_PERMISSION_CLASSES': [
    'rest_framework.permissions.AllowAny',
], 'DEFAULT_AUTHENTICATION_CLASSES': (
        'rest_framework.authentication.BasicAuthentication',
        'rest_framework.authentication.SessionAuthentication',
        'rest_framework_simplejwt.authentication.JWTAuthentication',
    )
    
} 

MIDDLEWARE = [
    
    'django.middleware.security.SecurityMiddleware',
    'django.contrib.sessions.middleware.SessionMiddleware',
    'django.middleware.locale.LocaleMiddleware',
    'django.middleware.common.CommonMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
    
]

ROOT_URLCONF = 'MultiKart.urls'

TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        'DIRS': [],
        'APP_DIRS': True,
        'OPTIONS': {
            'context_processors': [
                'django.template.context_processors.debug',
                'django.template.context_processors.request',
                'django.contrib.auth.context_processors.auth',
                'django.contrib.messages.context_processors.messages',
                "django.template.context_processors.request"
            ],
        },
    },
]

WSGI_APPLICATION = 'MultiKart.wsgi.application'


# Database
# https://docs.djangoproject.com/en/4.1/ref/settings/#databases

DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.postgresql',
        'NAME': os.environ.get("POSTGRES_DB","MultiKart"),
        'USER':os.environ.get("POSTGRES_USER","farid"),
        'PORT': os.environ.get("POSTGRES_PORT",5433),
        'HOST': os.environ.get("POSTGRES_HOST","localhost"),
        'PASSWORD':os.environ.get("POSTGRES_PASSWORD","123"),
        
    }
}

#Celery settings
CELERY_BROKER_URL = f"redis://{os.environ.get('REDIS_HOST','localhost')}:6379"
CELERY_RESULT_BACKEND =f"redis://{os.environ.get('REDIS_HOST','localhost')}:6379"
CELERY_TIMEZONE = 'Asia/Baku'


# Password validation
# https://docs.djangoproject.com/en/4.1/ref/settings/#auth-password-validators

AUTH_PASSWORD_VALIDATORS = [
    {
        'NAME': 'django.contrib.auth.password_validation.UserAttributeSimilarityValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.MinimumLengthValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.CommonPasswordValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.NumericPasswordValidator',
    },
]
AUTHENTICATION_BACKENDS=(
    'social_core.backends.google.GoogleOAuth2',
    'social_core.backends.facebook.FacebookOAuth2',
    'django.contrib.auth.backends.ModelBackend',
)

# AUTHENTICATION_BACKENDS = ['django.contrib.auth.backends.AllowAllUsersModelBackend']
# Internationalization
# https://docs.djangoproject.com/en/4.1/topics/i18n/

LANGUAGE_CODE = 'en-us'

from django.utils.translation import gettext_lazy as _


LANGUAGES =[ ('en', _('English')),
('az', _('Azeribaijan')),]
LOCALE_PATHS = ( os.path.join(BASE_DIR, 'locale'), )


TIME_ZONE = 'Asia/Baku'


USE_I18N = True

USE_TZ = True


LOGIN_REDIRECT_URL='/'
LOGOUT_REDIRECT_URL='/login'
LOGIN_URL='/login'

SOCIAL_AUTH_RAISE_EXCEPTIONS = False
LOGIN_REDIRECT_URL='/'
LOGOUT_REDIRECT_URL='/accaunts/login'
SOCIAL_AUTH_URL_NAMESPACE='social'

SOCIAL_AUTH_GOOGLE_OAUTH2_KEY = "451037572532-6os8isu7d6bj8mhhnaqp5u7njvhro0kq.apps.googleusercontent.com"
SOCIAL_AUTH_GOOGLE_OAUTH2_SECRET ='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'
# Static files (CSS, JavaScript, Images)
# https://docs.djangoproject.com/en/4.1/howto/static-files/

STATIC_URL = 'static/'
if PROD:
    STATIC_ROOT=BASE_DIR / 'static'
else:
    STATICFILES_DIRS=[
    BASE_DIR / 'static'
   ]
MEDIA_ROOT = os.path.join(BASE_DIR, 'media')
MEDIA_URL = '/media/'


EMAIL_BACKEND = 'django.core.mail.backends.smtp.EmailBackend'
EMAIL_HOST = 'smtp.gmail.com'
EMAIL_USE_TLS = True
EMAIL_PORT = 587
EMAIL_HOST_USER ='bashirov.farid.1997@gmail.com'
EMAIL_HOST_PASSWORD = 'qgsdsywofqhgutkf'

# Default primary key field type
# https://docs.djangoproject.com/en/4.1/ref/settings/#default-auto-field
# DEBUG= False
DEFAULT_AUTO_FIELD = 'django.db.models.BigAutoField'