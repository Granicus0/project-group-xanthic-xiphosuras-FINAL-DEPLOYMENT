import pandas as pd
from sklearn.preprocessing import MinMaxScaler, OrdinalEncoder
from pandas.api.types import is_string_dtype
from pandas.api.types import is_numeric_dtype

def preprocess(df,column, type):
    if type=="numeric":
        return numeric(df,column)
    if type=="catalogue" and is_string_dtype(df[column]):
        return catelogue(df,column)

def numeric(df, column):
    mms=MinMaxScaler()
    df[column]=mms.fit_transform(pd.DataFrame(df[column]))
    return mms

def catelogue(df,column):
    ode=OrdinalEncoder(handle_unknown="use_encoded_value",unknown_value=-1)
    df[column]=ode.fit_transform(pd.DataFrame(df[column]))
    return ode

