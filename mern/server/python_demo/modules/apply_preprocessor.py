import pandas as pd
from pandas.api.types import is_numeric_dtype, is_string_dtype

def apply_preprocess(df,column,type,preprosses):
    if type=="redundant":
        df.drop(columns=column,inplace=True)
        return

    data = df[[column]]
    if type=="numeric" and not is_numeric_dtype(df[column]):
        raise ValueError(f"Dataset's column {column} should be 'numeric', but it contains string values")
    elif type=="catelogue":
        if not is_string_dtype(df[column]):
            data = data.astype(str)

    #apply preprocessors
    df[column]=preprosses[column].transform(data)