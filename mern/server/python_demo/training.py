import sys
import os
import json
import pandas as pd
from io import StringIO 
from modules.preprocess import preprocess
from modules.parser import path,parse_arguments,parse_csv,parse_json,get_metadata
from modules.training_process import get_process
from modules.models import get_model_class

import warnings
warnings.simplefilter('ignore')

# The main body of scripts when called. I am not sure whether python code can be embedded in Javascript environment,
# so I assume we use command line call to execute the script. The script will process the argument passed by backend
# and create a pickle file containing the model and a json file containing model's metadata. 

# For comminucation to frontend that the script have finished executing, I am also not sure what will work
# One way to do is for the script to make a response call to frontend (or backend?) that the script have finished exceuting,
# notifying the frontend to load the model's result contained in metadata.
# The other way is for the frontend repeatedly make call to backend to check whether the model file and metadata file exisit. If
# so the frontend request those files from backend. If we choose this method, we need to first create a new Model entity when user
# first upload the dataset instead of when training the models

# python training.py [-csvp <Dataset file path> | -csv <Dataset data>] [-schemap <schema file path> | -schema <schema data>]
#                     -id <model id> -l <dataset label column name> -p <training process type> -m <model types>

if __name__ == "__main__":
    args = parse_arguments(sys.argv)
    #print("Parsed arguments:", arguments)
    #data=[row.split(",") for row in arguments["csv"].split("\n")]
    dirname = os.getcwd()
    df=parse_csv(args)
    schema=parse_json(args,"schema",dirname)
    extra=parse_json(args,"extra",dirname)
    if extra is None:
        extra={}
    metadata=get_metadata(args["id"],dirname)
    metadata.update(schema)

    schema=metadata["schema"]
    label=metadata["_label"]
    
    df=df[[k for k in schema.keys() if k != "_label"]]
    preproessor={}
    for column, type in schema.items():
        if type=="redundant":
            df=df.drop(columns=column)
        preproessor[column]=preprocess(df,column,type)
        print(f"Preprocessing complete for column '{column}'.", flush=True)  

    process=get_process(args["p"])
    print("Starting model training...", flush=True)
    model, metadata["train_result"]=process(get_model_class(args["m"],schema[label]),df.drop(columns=label),df[label],**extra)
    if "test_result" in metadata:
        metadata["test_result"].clear()
    else:
        metadata["test_result"]={}
    if not os.path.exists(path(dirname,args["id"])):
        os.makedirs(path(dirname,args["id"]))
    pd.to_pickle(model,path(dirname,f"{args['id']}/model.pickle"))
    pd.to_pickle(preproessor,path(dirname,f"{args['id']}/preprocess.pickle"))
    with open(path(dirname,f"{args['id']}/metadata.json"), 'w', encoding='utf-8') as f:
        json.dump(metadata, f, ensure_ascii=False, indent=4)