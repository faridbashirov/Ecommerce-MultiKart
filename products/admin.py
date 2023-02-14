from django.contrib import admin
from products.models import *

admin.site.register([Product,ProductImg,Vendor,Property,PropertyValues,Review,ProductSizeColor])


class CategoryInlineAdmin(admin.TabularInline):
    model=Category

@admin.register(Category)
class CategoryAdmin(admin.ModelAdmin):
    inlines=(CategoryInlineAdmin,)
    
