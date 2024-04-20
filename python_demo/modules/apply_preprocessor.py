import pandas as pd
from pandas.api.types import is_string_dtype
from pandas.api.types import is_numeric_dtype

def apply_preprocess(df,column,type,preprosses):
    if type=="redundant":
        df=df.drop(columns=column)
        return
    preporcessor=None
    if column in preprosses.keys():
        preporcessor=preprosses[column]
    #schema validation
    if type=="numeric" and is_string_dtype(df[column]):
        raise ValueError(f"Dataset's column {column} should be 'numeric', but it contains string values")
    if type=="catelogue" and df["age"].unique().shape[0]>25 and is_numeric_dtype(df[column]):
        raise ValueError(f"There are too many uniques numbers for dataset's column {column}. You may confuse it with numeric column")
    #apply preprocessors
    df[column]=preporcessor.transform(pd.DataFrame(df[column]))