# This module contains different evaluations methods we support, the script will retrieve relevant method with 
# eval_type encoding from arguments 
from sklearn.metrics import precision_score, recall_score, f1_score, accuracy_score, mean_squared_error, mean_absolute_error, r2_score

def get_evaluate(ground_truth, predict, problem_type):
    result={}
    if problem_type == "catalogue":
        result['accuracy']=accuracy_score(ground_truth, predict)

        result['precision']=precision_score(ground_truth,predict,average="weighted")
        result['recall_score']=recall_score(ground_truth,predict,average="weighted")
        result['f1']=f1_score(ground_truth,predict, average="weighted")

    elif problem_type == "numeric":
        result['mean_squared_error'] = mean_squared_error(ground_truth,predict)
        result['mean_absolute_error'] = mean_absolute_error(ground_truth,predict)
        result['r2_score'] = r2_score(ground_truth, predict)
    return result