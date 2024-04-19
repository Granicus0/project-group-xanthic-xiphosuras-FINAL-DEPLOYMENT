import sys
import os
import json
import pandas as pd
from io import StringIO 
import evaluation as eval
from evaluation import get_evaluate
from training_process import get_process
from models import get_model_class

# Helper method to deal with relative path
def path(file_path,relative_path):
    return os.path.join(file_path,relative_path)

# Helper method to parse command line arguments.
def parse_arguments(args):
    parsed_args = {}
    current_key = None

    for arg in args[1:]:
        if arg.startswith('-'):
            current_key = arg.lstrip('-')
            parsed_args[current_key] = None
        elif current_key:
            parsed_args[current_key] = arg
            current_key = None
        else:
            raise ValueError(f"Invalid argument format: {arg}")

    return parsed_args

# The main body of scripts when called. I am not sure whether python code can be embedded in Javascript environment,
# so I assume we use command line call to execute the script. The script will process the argument passed by backend
# and create a pickle file containing the model and a json file containing model's metadata. 

# For comminucation to frontend that the script have finished executing, I am also not sure what will work
# One way to do is for the script to make a response call to frontend (or backend?) that the script have finished exceuting,
# notifying the frontend to load the model's result contained in metadata.
# The other way is for the frontend repeatedly make call to backend to check whether the model file and metadata file exisit. If
# so the frontend request those files from backend

if __name__ == "__main__":
    #arguments = parse_arguments(sys.argv)
    #print("Parsed arguments:", arguments)
    #data=[row.split(",") for row in arguments["csv"].split("\n")]
    dirname = os.getcwd()
    df=pd.read_csv("Dataset\BCP_train.csv",index_col=0)
    process=get_process("once")
    eval=get_evaluate("acc")
    model, result=process(get_model_class("SVM"),df.drop(columns="Class"),df["Class"],eval)
    print(result["accuracy"])
    if not os.path.exists(path(dirname,"1")):
        os.makedirs(path(dirname,"1"))
    pd.to_pickle(model,path(dirname,"1/model.pickle"))
    with open(path(dirname,'1/metadata.json'), 'w', encoding='utf-8') as f:
        json.dump(result, f, ensure_ascii=False, indent=4)