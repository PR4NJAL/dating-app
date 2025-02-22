from django.db import models
from django.contrib.auth.models import AbstractUser

class Answers(models.Model):
    user = models.ForeignKey('User', on_delete=models.CASCADE, related_name="answers")
    created_at = models.DateTimeField(auto_now_add=True)
    answers = models.JSONField()
    score = models.IntegerField()

    def __str__(self):
       return f"Answer {self.id} - {self.email}"
    
class User(AbstractUser):
    email = models.EmailField(unique=True)

    groups = models.ManyToManyField(
        'auth.Group',
        related_name='custom_user_set',
        blank=True,
        help_text='Specific permissions for this user.',
        verbose_name='user permissions',
    )

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['username']

#python manage.py makemigrations --empty your_app_name