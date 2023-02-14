from django.conf import settings
from django.core.mail import EmailMultiAlternatives
from django.shortcuts import render, redirect
from celery import shared_task
from products.models import Product
from core.models import *
from django.template.loader import render_to_string

@shared_task
def send_subscirbers_mail():
    Products=Product.objects.all()
    email_list=Subscriber.objects.values_list("email",flat=True)
    message=render_to_string('email-subscribers.html', {
                "product": Products
            })
    
    subject="Our new Products"
    mail= EmailMultiAlternatives(subject=subject,body=message,from_email=settings.EMAIL_HOST_USER,to=["leman.miriyeva02@mail.ru"])
    mail.content_subtype='html'
    settings.EMAIL_HOST_USER
    
    mail.send()