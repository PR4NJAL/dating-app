import numpy as np
from sklearn.metrics.pairwise import cosine_similarity
from .models import Answers, User

def get_top_matches(user):
    user_answers = list(Answers.objects.filter(user=user).order_by('question_id').values_list('response', flat=True))

    if len(user_answers) < 100:
        return {"error": "User has not answered all questions."}

    other_users = User.objects.exclude(id=user.id)
    
    similarity_scores = []
    
    for other_user in other_users:
        other_user_answers = list(Answers.objects.filter(user=other_user).order_by('question_id').values_list('response', flat=True))

        if len(other_user_answers) < 100:
            continue  # Skip users who haven't answered all questions
        
        # Convert lists to numpy arrays
        user_vector = np.array(user_answers).reshape(1, -1)
        other_user_vector = np.array(other_user_answers).reshape(1, -1)
        
        # Compute similarity
        similarity = cosine_similarity(user_vector, other_user_vector)[0][0]
        similarity_scores.append((other_user, similarity))

    # Sort by highest similarity
    similarity_scores.sort(key=lambda x: x[1], reverse=True)
    
    # Return top 5 matches
    return [{"user_id": user.id, "username": user.username, "similarity": score} for user, score in similarity_scores[:5]]