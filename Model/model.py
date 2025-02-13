import numpy as np
from sklearn.metrics.pairwise import cosine_similarity
from sklearn.base import BaseEstimator, TransformerMixin
import joblib

class DatingRecommender(BaseEstimator, TransformerMixin):
    def __init__(self, top_n=5):
        self.top_n = top_n
        self.user_responses = None
        self.user_ids = None
    
    def fit(self, X, user_ids=None):
        """
        Fit the model with user responses
        
        Parameters:
        -----------
        X : array-like of shape (n_users, n_questions)
            Binary responses (0 or 1) for each user
        user_ids : array-like of shape (n_users,)
            Unique identifiers for each user
        """
        self.user_responses = np.array(X)
        self.user_ids = np.array(user_ids) if user_ids is not None else np.arange(len(X))
        return self
    
    def transform(self, X):
        """
        Transform does nothing but is required for sklearn compatibility
        """
        return X
    
    def get_recommendations(self, user_responses, user_id=None, exclude_self=True):
        """
        Get recommendations for a user based on their responses
        
        Parameters:
        -----------
        user_responses : array-like of shape (n_questions,)
            Binary responses (0 or 1) for the target user
        user_id : any, optional
            ID of the target user
        exclude_self : bool, default=True
            Whether to exclude the target user from recommendations
            
        Returns:
        --------
        list of tuples
            (user_id, similarity_score) pairs sorted by similarity
        """
        # Reshape input to 2D array
        user_vector = np.array(user_responses).reshape(1, -1)
        
        # Calculate cosine similarity
        similarities = cosine_similarity(user_vector, self.user_responses)[0]
        
        # Create list of (user_id, similarity) pairs
        recommendations = list(zip(self.user_ids, similarities))
        
        # Sort by similarity in descending order
        recommendations.sort(key=lambda x: x[1], reverse=True)
        
        # Exclude self if requested
        if exclude_self and user_id is not None:
            recommendations = [(uid, sim) for uid, sim in recommendations if uid != user_id]
        
        return recommendations[:self.top_n]
    
    def bulk_recommendations(self, exclude_self=True):
        """
        Generate recommendations for all users in the database
        
        Returns:
        --------
        dict
            Dictionary mapping user_ids to their top recommendations
        """
        all_recommendations = {}
        for i, user_id in enumerate(self.user_ids):
            recs = self.get_recommendations(
                self.user_responses[i],
                user_id=user_id,
                exclude_self=exclude_self
            )
            all_recommendations[user_id] = recs
        return all_recommendations

# Example usage and saving the model
if __name__ == "__main__":
    # Sample data
    n_users = 1000
    n_questions = 100
    
    # Generate random sample data (0s and 1s)
    sample_responses = np.random.randint(0, 2, size=(n_users, n_questions))
    sample_user_ids = [f"user_{i}" for i in range(n_users)]
    
    # Create and fit the model
    recommender = DatingRecommender(top_n=5)
    recommender.fit(sample_responses, sample_user_ids)
    
    # Save the model
    joblib.dump(recommender, 'dating_recommender.joblib')
    
    # Load the model (example)
    loaded_recommender = joblib.load('dating_recommender.joblib')
    
    # Get recommendations for a new user
    new_user_responses = np.random.randint(0, 2, size=n_questions)
    recommendations = loaded_recommender.get_recommendations(new_user_responses)
    print("Sample recommendations:", recommendations)