from rest_framework import viewsets
from rest_framework.response import Response
from rest_framework import status
from rest_framework.views import APIView
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework.permissions import AllowAny
from .models import Answers
import json
from .serializers import AnswersSerializers, UserSerializer, MyTokenObtainPairSerializer

class PurityTestResponseViewSet(viewsets.ModelViewSet):
    queryset = Answers.objects.all()
    serializer_class = AnswersSerializers
    
    def create(self, request, *args, **kwargs):
        # Get the selected answers (question IDs)
        answers = request.data.get('answers', [])
        
        # Calculate score (100 - number of selected items)
        score = 100 - len(answers)
        
        # Create response data
        response_data = {
            'answers': answers,
            'score': score
        }
        
        serializer = self.get_serializer(data=response_data)
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)
        
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