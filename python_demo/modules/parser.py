import sys
import os
import json
import pandas as pd
from io import StringIO 
import pandas as pd
from sklearn.model_selection import train_test_split

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
    if "args" in parsed_args.keys():
        parsed_args=json.load(parsed_args["args"])
    return parsed_args

# Helper method to read csv file with -csvp option or read the whole csv out of the string
def parse_csv(args):
    df=None
    if "csvp" in args:
        df=pd.read_csv(args["csvp"],index_col=0)
    elif "csv" in args:
        df=[row.split(",") for row in args["csv"].split("\n")]
    return df

# Helper method to read csv file with -csvp option or read the whole csv out of the string
def parse_json(args,key,dirname):
    entity=None
    if key+"p" in args:
        with open(path(dirname,args[key+"p"]), 'r') as file:
            entity = json.load(file)
    elif key in args:
        entity=json.loads(args[key])
    return entity

def get_metadata(id,dirname):
    absolute_path=path(dirname,f"{id}/metadata.json")
    if os.path.exists(absolute_path):
        with open(absolute_path, 'r') as file:
            metadata = json.load(file)
            metadata["version"]+=1
        return metadata
    return { "version":0 }