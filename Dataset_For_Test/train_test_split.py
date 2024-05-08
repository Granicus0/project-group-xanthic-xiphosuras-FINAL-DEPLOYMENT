# this is used to split a complete dataset into training sets and testing sets
import sys
import os
import json
import pandas as pd
from io import StringIO 
import pandas as pd
from sklearn.model_selection import train_test_split

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
        df=pd.read_csv(args["csvp"])
    elif "csv" in args:
        # fix the problem of output is inconsistent, input csvp get pd, input csv get "list[list[]]"
        csv_string = args["csv"]
        df = pd.read_csv(StringIO(csv_string))
    return df

# Script format: python splite_dataset.py -p <dataset path name> -l <dataset label column name> 
#                                        [-tr <training set size>] -te <testing set size>

if __name__ == "__main__":
    arguments = parse_arguments(sys.argv)
    df=parse_csv(arguments)
    tr=None
    if "tr" in arguments:
        tr=int(arguments["tr"])/df.shape[0]
    te=int(arguments["te"])/df.shape[0]
    train_X,test_X,train_Y,test_Y=train_test_split(df.drop(arguments["l"],axis=1),df[arguments["l"]],
                                                   train_size=tr,test_size=te)
    train=pd.concat([train_X,train_Y],axis=1)
    train.to_csv(f"{arguments['n']}_train.csv")
    test=pd.concat([test_X,test_Y],axis=1)
    test.to_csv(f"{arguments['n']}_test.csv")