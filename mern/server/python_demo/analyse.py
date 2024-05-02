import sys
import os
import json
import pandas as pd
import pickle
from modules.parser import parse_arguments, path, parse_csv

import warnings
warnings.simplefilter('ignore')

# The main body of scripts when called. I am not sure whether python code can be embedded in Javascript environment,
# so I assume we use command line call to execute the script. The script will process the argument passed by backend
# and create a json file of the default schema for the dataset. 

# For comminucation to frontend that the script have finished executing, I am also not sure what will work
# One way to do is for the script to make a response call to frontend (or backend?) that the script have finished exceuting,
# notifying the frontend to load the model's result contained in metadata.
# The other way is for the frontend repeatedly make call to backend to check whether the model file and metadata file exisit. If
# so the frontend request those files from backend. If we choose this method, we need to first create a new Model entity when user
# first upload the dataset instead of when training the models

# Script format:    python splite_dataset.py -p <dataset path name>
#                   python splite_dataset.py -p <dataset path name> -schema_file my_custom_schema.json 

if __name__ == "__main__":
    dirname = os.getcwd()
    arguments = parse_arguments(sys.argv)
    #print("Parsed arguments:", arguments)

    schema={}
    df=parse_csv(arguments)
    # Extract the schema file name
    schema_file_name = arguments.get('schema_file', 'schema.json')
    numeric_feautre_names=df.select_dtypes(include=["number"]).columns
    categorical_feature_names=df.select_dtypes(include=["object_"]).columns
    for nc in numeric_feautre_names:
        schema[nc] = "numeric"
    
    for cc in categorical_feature_names:
        if max([len(n) for n in df[cc]]) >= 100:
            schema[cc] = "redundant"
        else:
            schema[cc]="catalogue"
    
    json_data = {"schema":schema, "_label":categorical_feature_names[-1]}
    
    if not os.path.exists(path(dirname,f"{arguments['id']}")):
        os.makedirs(path(dirname,f"{arguments['id']}"))
    
    with open(path(dirname,f'{arguments["id"]}/{schema_file_name}'), 'w', encoding='utf-8') as f:
        json.dump(json_data, f, ensure_ascii=False, indent=4)
