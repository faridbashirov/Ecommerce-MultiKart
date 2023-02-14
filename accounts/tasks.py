
from django.conf import settings
from django.core.mail import EmailMultiAlternatives
from django.contrib.sites.shortcuts import get_current_site
from django.shortcuts import render, redirect
from django.utils.encoding import force_bytes
from django.utils.http import urlsafe_base64_encode
from django.template.loader import render_to_string
from .tokens import account_activation_token

def send_confirmation_mail(user,current_site):
    message=render_to_string('activation.html', {
                'user': user,
                'domain': current_site.domain,
                'uid': urlsafe_base64_encode(force_bytes(user.pk)),
                'token': account_activation_token.make_token(user),
            })
    subject="please confitm your account"
    mail= EmailMultiAlternatives(subject=subject,body=message,from_email=settings.EMAIL_HOST_USER,to=[user.email,])
    mail.content_subtype='html'
    settings.EMAIL_HOST_USER
    
    mail.send()