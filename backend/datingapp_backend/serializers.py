from rest_framework import serializers
from .models import Answers

class AnswersSerializers(serializers.ModelSerializer):
    class Meta:
        model = Answers
        fields = ['id', 'created_at', 'answers', 'score'] 