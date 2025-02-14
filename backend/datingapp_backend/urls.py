from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import PurityTestResponseViewSet

router = DefaultRouter()
router.register(r'datingapp_backend', PurityTestResponseViewSet)

urlpatterns = [
    path('api/', include(router.urls)),
]