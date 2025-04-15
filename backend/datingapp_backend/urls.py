from django.urls import path, include
from rest_framework.routers import DefaultRouter
from rest_framework_simplejwt.views import TokenRefreshView
from .views import PurityTestResponseViewSet, MyTokenObtainPairView, RegisterView, SimilarityView

router = DefaultRouter()
router.register(r'purity-tests', PurityTestResponseViewSet, basename='purity-tests')

urlpatterns = [
    path('', include(router.urls)),
    path('auth/register/', RegisterView.as_view(), name='auth_register'),
    path('auth/token/', MyTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('auth/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('similarity', SimilarityView.as_view(), name='similarity_view'),
]
