import pandas as pd
from sklearn.preprocessing import MinMaxScaler, OrdinalEncoder
from pandas.api.types import is_numeric_dtype, is_string_dtype

def create_preprocess(df, column, type):
    if type=="numeric":
        if not is_numeric_dtype(df[column]):
            raise ValueError(f"Dataset's column {column} should be 'numeric', but it contains string values")
        return numeric(df,column)
    elif type=="catalogue":
        #if  len(df[column].unique())>30 and is_numeric_dtype(df[column]):
            #raise ValueError(f"There are too many uniques numbers for dataset's column {column}. You may confuse it with numeric column")
        return catalogue(df,column)
    else:
        raise TypeError(f"Dataset's column {column} get a unknown type '{type}'")

def numeric(df, column):
    mms=MinMaxScaler()
    df[column]=mms.fit_transform(df[[column]])
    return mms

def catalogue(df,column):
    ode=OrdinalEncoder(handle_unknown="use_encoded_value",unknown_value=-1)

    """For columns that contain both numbers and strings [1, 2, "Hi"], we will still treat it as a catalogue
    But before we do this, we have to convert it to make sure that there are no numbers in this line
    """
    data = df[[column]]
    if not is_string_dtype(df[column]):
        data = df[[column]].astype(str)
    df[column]=ode.fit_transform(data) 
    return ode


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