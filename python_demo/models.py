# This module contains different models we support, the script will retrieve relevant method with 
# model_type encoding from arguments 
from sklearn.svm import SVC

def get_model_class(model_type):
    if model_type=="SVM":
        return SVC