from rest_framework import viewsets
from rest_framework.response import Response
from rest_framework import status
from rest_framework.views import APIView
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework.permissions import AllowAny, IsAuthenticated
from django.http import JsonResponse
from django.views.decorators.http import require_POST
from django.contrib.auth.decorators import login_required
from .models import Answers
from .serializers import AnswersSerializers, UserSerializer, MyTokenObtainPairSerializer
import json
import numpy as np

class PurityTestResponseViewSet(viewsets.ModelViewSet):
    serializer_class = AnswersSerializers
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return Answers.objects.filter(user=self.request.user)
    
    def create(self, request):
        answers = request.data.get('answers', [])
        
        score = 100 - len(answers)
        
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
    def post(self, request):
        print("Raw Request Data:", json.dumps(request.data, indent=4))
        serializer = UserSerializer(data = request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        print("Validation Errors:", serializer.errors)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class SimilarityView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        current_user = request.user
        try:
            current_user_response = Answers.objects.get(user=current_user).answers
        except Answers.DoesNotExist:
            return Response({"error": "User response not found."}, status=status.HTTP_404_NOT_FOUND)

        all_responses = Answers.objects.exclude(user=current_user).values_list('user_id', 'answers')

        if not all_responses:
            return Response({"similar_users": []})

        similarity_scores = []
        current_user_array = np.array(current_user_response, dtype=bool).astype(int)

        for user_id, other_response in all_responses:
            other_user_array = np.array(other_response, dtype=bool).astype(int)
            similarity = self.calculate_cosine_similarity(current_user_array, other_user_array)
            similarity_scores.append((user_id, similarity))

        top_5_similar = sorted(similarity_scores, key=lambda x: x[1], reverse=True)[:5]

        similar_users = [{"user_id": user_id, "similarity": similarity} for user_id, similarity in top_5_similar]

        return Response({"similar_users": similar_users})

    def calculate_cosine_similarity(self, vec1, vec2):
        dot_product = np.dot(vec1, vec2)
        magnitude_vec1 = np.linalg.norm(vec1)
        magnitude_vec2 = np.linalg.norm(vec2)
        if magnitude_vec1 == 0 or magnitude_vec2 == 0:
            return 0
        return dot_product / (magnitude_vec1 * magnitude_vec2)