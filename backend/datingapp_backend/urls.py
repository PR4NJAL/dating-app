from django.urls import path, include
from rest_framework.routers import DefaultRouter
from rest_framework_simplejwt.views import TokenRefreshView
from .views import PurityTestResponseViewSet, MyTokenObtainPairView, RegisterView

router = DefaultRouter()
router.register(r'datingapp_backend', PurityTestResponseViewSet)

urlpatterns = [
    path('api/', include(router.urls)),
    path('register/', RegisterView.as_view(), name='auth_register'),
    path('token/', MyTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
]