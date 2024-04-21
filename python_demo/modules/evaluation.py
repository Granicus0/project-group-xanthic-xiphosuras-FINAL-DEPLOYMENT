# This module contains different evaluations methods we support, the script will retrieve relevant method with 
# eval_type encoding from arguments 

def get_evaluate(ground_truth, predict):
    result={}
    accuracy= (ground_truth==predict).sum()/ground_truth.shape[0]
    result['accuracy']=accuracy
    return result