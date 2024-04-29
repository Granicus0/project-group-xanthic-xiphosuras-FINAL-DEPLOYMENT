# This module contains different evaluations methods we support, the script will retrieve relevant method with 
# eval_type encoding from arguments 
from sklearn.metrics import precision_recall_curve, roc_curve, precision_score, recall_score, f1_score

def get_evaluate(ground_truth, predict):
    result={}
    result['accuracy']=(ground_truth==predict).sum()/ground_truth.shape[0]
    result['precision']=precision_score(ground_truth,predict)
    result['recall_score']=recall_score(ground_truth,predict)
    result['f1']=f1_score(ground_truth,predict)
    return result