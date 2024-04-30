import pandas as pd
from pandas.api.types import is_numeric_dtype

"""
We will try to ignore some potential tags that don't need to be used for training
For example, id is unique, it has no real meaning, and therefore cannot be used to train the model
"""
redundant_tags = ["id"]

def get_default_schemas(df):
    columns = df.columns
    if len(columns)<2:
        raise ValueError("df has fewer than 2 columns, cannot be used for machine learning")

    _label = columns[-1] 
    schema = {}
    for column in columns:
        if column.lower() in redundant_tags:
            schema[column] = "redundant"
        if is_numeric_dtype(df[column]):
            schema[column] = "numeric"
        else:
            schema[column] = "catalogue"
    return  {"schema": schema, "_label": _label}
        

    
