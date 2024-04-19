# This module contains different settings of training and evaluating the models, the script will retrieve relevant method with 
# process_type encoding from arguments 

def get_process(process_type):
    if process_type=="once":
        return oneshot

def oneshot(model,train_X,train_Y,eval,*args):
    real_model=model(*args)
    real_model.fit(train_X,train_Y)
    pred_Y=real_model.predict(train_X)
    result=eval(train_Y,pred_Y)
    return real_model, result

