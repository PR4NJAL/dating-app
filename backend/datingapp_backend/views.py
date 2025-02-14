from rest_framework import viewsets
from rest_framework.response import Response
from rest_framework import status
from .models import Answers
from .serializers import AnswersSerializers

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