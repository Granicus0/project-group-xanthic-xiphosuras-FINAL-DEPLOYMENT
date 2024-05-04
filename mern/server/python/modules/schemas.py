import pandas as pd
from pandas.api.types import is_numeric_dtype
import math
"""
We will try to ignore some potential tags that don't need to be used for training
For example, id is unique, it has no real meaning, and therefore cannot be used to train the model
"""
redundant_tags = ["id",""]

def get_schemas(df, label = None):
    x_count = 0
    columns = df.columns
    if len(columns)<2:
        raise ValueError("df has fewer than 2 columns, cannot be used for machine learning")
    if label == None:
        label = columns[-1] 
    elif label not in columns:
        raise TypeError(f"Did not find the column \"{label}\" in dataset {columns}")
    
    schema = {}
    for column in columns:
        if column != label and column.lower().strip() in redundant_tags:
            schema[column] = "redundant"
            print(f"[{column}] is redundant, because this name includes in our ignored list",flush=True)
        elif is_numeric_dtype(df[column]):
            schema[column] = "numeric"
            print(f"[{column}] is treated as numeric",flush=True)
        else:
            datas = df[column]
            unique_number= len(datas.unique())
            if unique_number<2:
                schema[column] = "redundant"
                print(f"[{column}] is redundant, because all value under this column are same",flush=True)
            elif  unique_number * max(2, math.sqrt(unique_number))>len(datas):
                schema[column] = "redundant"
                print(f"[{column}] is redundant, because there are too many uniques value in this column",flush=True)
            else:
                print(f"[{column}] is treated as catalogue", flush=True)
                schema[column] = "catalogue"
        if column == label:
            if schema[column] == "redundant":
                raise TypeError(f"The prediction label [{label}] is considered as \"redundant\" for some reason, so the model cannot be trained")
        elif schema[column] != "redundant":
            x_count+=1
    if x_count < 1:
        raise TypeError("The feature for training is 0, cannot train the model")
    
    return  {"schema": schema, "_label": label}
        

    
