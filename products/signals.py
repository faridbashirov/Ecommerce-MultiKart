from django.dispatch import receiver
from django.db.models.signals import pre_save,post_save
from .models import Product,Category,Vendor
from slugify import slugify

    
    
@receiver(post_save, sender=Product)
def slug_generator_recipe(sender,instance,created,**kwargs):
    
     slug=slugify(instance.title+"-"+str(instance.id))
     if not slug == instance.slug:
       instance.slug=slug
       instance.save()
@receiver(post_save, sender=Category)
def slug_generator_recipe(sender,instance,created,**kwargs):
    
     slug=slugify(instance.name)
     if not slug == instance.slug:
       instance.slug=slug
       instance.save()
@receiver(post_save, sender=Vendor)
def slug_generator_recipe(sender,instance,created,**kwargs):
    
     slug=slugify(instance.name)
     if not slug == instance.slug:
       instance.slug=slug
       instance.save()