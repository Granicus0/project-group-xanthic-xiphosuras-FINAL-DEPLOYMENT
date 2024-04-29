# This module contains different settings of training and evaluating the models, the script will retrieve relevant method with 
# process_type encoding from arguments 
import numpy as np
import pandas as pd
from modules.evaluation import get_evaluate
from sklearn.utils._testing import ignore_warnings
from sklearn.exceptions import ConvergenceWarning

def get_process(process_type):
    if process_type=="once":
        return oneshot
    if process_type=="cv5":
        return cross_validation_5
    if process_type=="cv10":
        return cross_validation_10
    
def oneshot(model,train_X,train_Y,**kwargs):
    result={"valid_result":{}}
    real_model=model(**kwargs)
    real_model.fit(train_X,train_Y)
    pred_Y=real_model.predict(train_X)
    result.update(get_evaluate(train_Y,pred_Y))
    return real_model, result

def cross_validation_5(model,train_X,train_Y,**kwargs):
    return cross_validation(model,train_X,train_Y,5,**kwargs)

def cross_validation_10(model,train_X,train_Y,**kwargs):
    return cross_validation(model,train_X,train_Y,5,**kwargs)

def cross_validation(model,train_X,train_Y,counts,**kwargs):
    folds_index=np.array_split(train_X.sample(frac=1).index,counts)
    result={"valid_result":{}}
    average_result={}
    for i in range(counts):
        fold_train_X,fold_test_X,fold_train_Y,fold_test_Y=get_fold_train_test(folds_index,train_X,train_Y,i)
        real_model=model(**kwargs)
        real_model.fit(fold_train_X,fold_train_Y)
        fold_pred_Y=real_model.predict(fold_test_X)
        valid_result=get_evaluate(fold_test_Y,fold_pred_Y)
        result["valid_result"][f"epoch_{i+1}"]=valid_result
        for key,value in valid_result.items():
            if key in average_result:
                average_result[key]+=value
            else:
                average_result[key]=value
    for key,value in average_result.items():
        average_result[key]/=counts
    result.update(average_result)
    real_model
    return real_model, result


def get_fold_train_test(folds_index, train_X, train_Y,fold_num):
    test_fold=folds_index[fold_num]
    train_index=pd.Index([])
    for f in [f for f in folds_index if f is not test_fold]:
        if len(train_index)<=0:
            train_index=f
        else:
            train_index=train_index.append(f)
    fold_train_X=train_X.loc[train_index]
    fold_test_X=train_X.loc[test_fold]
    fold_train_Y=train_Y.loc[train_index]
    fold_test_Y=train_Y.loc[test_fold]
    return fold_train_X,fold_test_X,fold_train_Y,fold_test_Y