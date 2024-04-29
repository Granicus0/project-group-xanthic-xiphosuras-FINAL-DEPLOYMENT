# This module contains different models we support, the script will retrieve relevant method with 
# model_type encoding from arguments 
from sklearn.svm import SVC, SVR
from sklearn.neural_network import MLPClassifier, MLPRegressor
from sklearn.ensemble import RandomForestClassifier, RandomForestRegressor


def get_model_class(model_type,problem_type):
    if problem_type=="catelogue":
        if model_type=="SVM":
            return SVC
        if model_type=="NN":
            return MLPClassifier
        if model_type=="RF":
            return RandomForestClassifier
        raise ValueError("The model type is not supported")
    elif problem_type=="numeric":
        if model_type=="SVM":
            return SVR
        if model_type=="NN":
            return MLPRegressor
        if model_type=="RF":
            return RandomForestRegressor
        raise ValueError("The model type is not supported")
    else:
        raise ValueError("The dataset label desginated type should be either numeric or catelogue")