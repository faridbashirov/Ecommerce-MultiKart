from rest_framework.generics import ListAPIView,ListCreateAPIView,RetrieveUpdateDestroyAPIView
from products.models import Product
from .serializer import ProductSerializer
from django.shortcuts import get_object_or_404
import django_filters.rest_framework
import django_filters


class ProductFilter(django_filters.FilterSet):
    price = django_filters.NumberFilter()
    price__gt = django_filters.NumberFilter(field_name='price', lookup_expr='gt')
    price__lt = django_filters.NumberFilter(field_name='price', lookup_expr='lt')
    category_name = django_filters.CharFilter(field_name='category__parent_id__slug')
    class Meta:
        model = Product
        fields = ["value","vendor","category"] 
class ProductListApi(ListAPIView):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer
    filter_backends=[django_filters.rest_framework.DjangoFilterBackend]
    # filterset_fields=["category","value","vendor","price","category_slug"]
    filterset_class = ProductFilter
    ordering_fields = (
        'price',
    )
class ProductRetrieveUpdateDestroyAPIView(RetrieveUpdateDestroyAPIView):
  queryset = Product.objects.all()
  serializer_class = ProductSerializer
  
  def get_object(self):
        """
        Returns the object the view is displaying.

        You may want to override this if you need to provide non-standard
        queryset lookups.  Eg if objects are referenced using multiple
        keyword arguments in the url conf.
        """
        queryset = self.filter_queryset(self.get_queryset())
        
        # Perform the lookup filtering.
        lookup_url_kwarg = self.lookup_url_kwarg or self.lookup_field

        assert lookup_url_kwarg in self.kwargs, (
            'Expected view %s to be called with a URL keyword argument '
            'named "%s". Fix your URL conf, or set the `.lookup_field` '
            'attribute on the view correctly.' %
            (self.__class__.__name__, lookup_url_kwarg)
        )

        filter_kwargs = {self.lookup_field: self.kwargs[lookup_url_kwarg]}
        print(filter_kwargs)
        obj = get_object_or_404(queryset, **filter_kwargs)

        # May raise a permission denied
        self.check_object_permissions(self.request, obj)

        return obj