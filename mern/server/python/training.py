import sys
import os
import json
import pandas as pd
from modules.preprocess import create_preprocess
from modules.parser import path,parse_arguments,parse_csv,parse_json,get_metadata
from modules.training_process import get_process
from modules.models import get_model_class
from modules.extras import get_default_extra
from modules.schemas import get_schemas

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

# python training.py [-csvp <Dataset file path> | -csv <Dataset data>]
#                     -id <model id> -l <dataset label column name> -p <training process type> -m <model types>
# example:
# python training.py -csvp 'Dataset/adult_train.csv' -id 82b8389e60270007121854410f1ec4e6 -m NN -p once
if __name__ == "__main__":
    args = parse_arguments(sys.argv)
    #print("Parsed arguments:", args)
    #data=[row.split(",") for row in arguments["csv"].split("\n")]
    dirname = os.getcwd()
    df=parse_csv(args)
    
    # get schema
    if "l" in args.keys():
        schema = get_schemas(df, args["l"])
    else:
        schema = get_schemas(df)
    


    metadata=get_metadata(args["id"],dirname)
    metadata.update(schema)

    schema=metadata["schema"]
    label=metadata["_label"]


    extra = get_default_extra(args["m"],schema[label])
    addition_extra = parse_json(args,"extra",dirname)
    if addition_extra is not None:
        extra.update(addition_extra)

    print("Starting data preprocessing...", flush=True)
    df=df[schema.keys()]
    preproessor={}
    for column, type in schema.items():
        if type=="redundant":
            df=df.drop(columns=column)
        else:
            preproessor[column]= create_preprocess(df,column,type)

    #Train Model
    process=get_process(args["p"])
    print("Starting model training...", flush=True)
    X_train, y_train = df.drop(columns=label), df[label]
    model, evaluate_result=process(get_model_class(args["m"],schema[label]),X_train, y_train, schema[label],**extra)
    metadata["train_result"] = evaluate_result
    metadata["test_result"]={} # clear the result of old model

    if not os.path.exists(path(dirname,f"binary/{args['id']}")):
        os.makedirs(path(dirname,f"binary/{args['id']}"))
    pd.to_pickle(model,path(dirname,f"binary/{args['id']}/model.pickle"))
    pd.to_pickle(preproessor,path(dirname,f"binary/{args['id']}/preprocess.pickle"))
    with open(path(dirname,f"binary/{args['id']}/metadata.json"), 'w', encoding='utf-8') as f:
        json.dump(metadata, f, ensure_ascii=False, indent=4)
    
    print("Evaluate Result: ")
    for key, value in evaluate_result.items():
        if not(key == "valid_result" and len(value)==0):
            print(f"    {key}: {round(value,4)}")

    