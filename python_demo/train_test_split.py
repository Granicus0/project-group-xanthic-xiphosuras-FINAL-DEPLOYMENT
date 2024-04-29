# this is used to split a complete dataset into training sets and testing sets
import sys
import os
import json
import pandas as pd
from io import StringIO 
import pandas as pd
from modules.parser import parse_arguments,parse_csv
from sklearn.model_selection import train_test_split

import warnings
warnings.simplefilter('ignore')

# Script format: python splite_dataset.py -p <dataset path name> -l <dataset label column name> 
#                                        [-tr <training set size>] -te <testing set size>

if __name__ == "__main__":
    arguments = parse_arguments(sys.argv)
    df=parse_csv(arguments)
    if "tr" not in arguments:
        arguments["tr"]=None
    train_X,test_X,train_Y,test_Y=train_test_split(df.drop(arguments["l"],axis=1),df[arguments["l"]],
                                                   train_size=float(arguments["tr"]),test_size=float(arguments["te"]))
    train=pd.concat([train_X,train_Y],axis=1)
    train.to_csv(f"Dataset/{arguments['n']}_train.csv")
    test=pd.concat([test_X,test_Y],axis=1)
    test.to_csv(f"Dataset/{arguments['n']}_test.csv")