from django.urls import path, include
from django.contrib import admin
from rest_framework.routers import DefaultRouter
from .views import CakeViewSet, OrderViewSet, OrderCreateView

router = DefaultRouter()
router.register(r'cakes', CakeViewSet)
router.register(r'orders', OrderViewSet)

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include(router.urls)),
    path('orders/', OrderCreateView.as_view(), name='order-create'), # This is where OrderCreateView is handled
]