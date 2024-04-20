# This module contains different settings of training and evaluating the models, the script will retrieve relevant method with 
# process_type encoding from arguments 
from modules.evaluation import get_evaluate

def get_process(process_type):
    if process_type=="once":
        return oneshot

def oneshot(model,train_X,train_Y,*args):
    real_model=model(*args)
    real_model.fit(train_X,train_Y)
    pred_Y=real_model.predict(train_X)
    result=get_evaluate(train_Y,pred_Y)
    return real_model, result

