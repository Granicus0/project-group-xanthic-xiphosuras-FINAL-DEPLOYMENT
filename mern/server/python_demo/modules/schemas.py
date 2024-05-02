import pandas as pd
from pandas.api.types import is_numeric_dtype

"""
We will try to ignore some potential tags that don't need to be used for training
For example, id is unique, it has no real meaning, and therefore cannot be used to train the model
"""
redundant_tags = ["id",""]

def get_schemas(df, label = None):
    columns = df.columns
    if len(columns)<2:
        raise ValueError("df has fewer than 2 columns, cannot be used for machine learning")
    if label == None:
        label = columns[-1] 
    elif label not in columns:
        raise TypeError(f"Did not find the column {label} in dataset")
    
    schema = {}
    for column in columns:
        if column != label and column.lower().strip() in redundant_tags:
            schema[column] = "redundant"
            print(f"[{column}] is redundant, because this name includes in our ignored list",flush=True)
        if is_numeric_dtype(df[column]):
            schema[column] = "numeric"
            print(f"[{column}] is treated as numeric",flush=True)
        else:
            datas = df[column]
            if column != label and len(datas.unique())**2>len(datas):
                schema[column] = "redundant"
                print(f"[{column}] is redundant, because there are too many uniques value in this column",flush=True)
            else:
                print(f"[{column}] is treated as catalogue", flush=True)
                schema[column] = "catalogue"
    
    return  {"schema": schema, "_label": label}
        

    
