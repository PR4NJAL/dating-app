from rest_framework import viewsets
from rest_framework.response import Response
from rest_framework import status
from rest_framework.views import APIView
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.decorators import api_view, permission_classes
from .models import Answers
from .serializers import AnswersSerializers, UserSerializer, MyTokenObtainPairSerializer
from .utils import get_top_matches
import json

class PurityTestResponseViewSet(viewsets.ModelViewSet):
    serializer_class = AnswersSerializers
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return Answers.objects.filter(user=self.request.user)
    
    def create(self, request, *args, **kwargs):
        # Get the selected answers (question IDs)
        answers = request.data.get('answers', [])
        
        # Calculate score (100 - number of selected items)
        score = 100 - len(answers)
        
        # Create response data
        response_data = {
            'answers': answers,
            'score': score,
            'user': request.user.id
        }
        
        serializer = self.get_serializer(data=response_data)
        serializer.is_valid(raise_exception=True)
        serializer.save(user = request.user)
        
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    
class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer

class RegisterView(APIView):
    permission_classes = [AllowAny] 

    def post(self, request):
        print("Raw Request Data:", json.dumps(request.data, indent=4))
        serializer = UserSerializer(data = request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        print("Validation Errors:", serializer.errors)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
@api_view(['GET'])
@permission_classes([IsAuthenticated])
def top_matches(request):
    user = request.user
    matches = get_top_matches(user)
    return Response(matches)