from django.db import models

class Answers(models.Model):
    created_at = models.DateTimeField(auto_now_add=True)
    answers = models.JSONField()
    score = models.IntegerField()

    def __str__(self):
        return f"Answer {self.id} - {self.created_at}"