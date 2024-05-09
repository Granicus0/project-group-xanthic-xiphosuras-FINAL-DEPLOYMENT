import sys
import os
import json
import pandas as pd
import pickle
from modules.preprocess import apply_preprocess
from modules.evaluation import get_evaluate
from modules.parser import path, parse_arguments, get_metadata, parse_csv
from io import StringIO
import warnings
warnings.simplefilter('ignore')

# The main body of scripts when called. I am not sure whether python code can be embedded in Javascript environment,
# so I assume we use command line call to execute the script. The script will process the argument passed by backend
# and create a json file recording the results. 

# For comminucation to frontend that the script have finished executing, I am also not sure what will work
# One way to do is for the script to make a response call to frontend (or backend?) that the script have finished exceuting,
# notifying the frontend to load the model's result contained in metadata.
# The other way is for the frontend repeatedly make call to backend to check whether the model file and metadata file exisit. If
# so the frontend request those files from backend. If we choose this method, we need to first create a new Model entity when user
# first upload the dataset instead of when training the models

# python testing.py [-csvp <Dataset file path> | -csv <Dataset data>] -id <model id>

#example:
# python testing.py -csvp 'Dataset/adult_test.csv' -id 82b8389e60270007121854410f1ec4e6

if __name__ == "__main__":
    args = parse_arguments(sys.argv)
    dirname = os.getcwd()
    model_id = args["id"]
    metadata=get_metadata(model_id,dirname, auto_generate=False)
    if metadata == None:
        raise KeyError(f"model {model_id} not exsit, please train the model before test")

    schema = metadata["schema"]
    label = metadata["_label"]
    
    row_df = parse_csv(args)
    df = row_df.copy()
    # if the df do not have label, we only make pred, do not evaluate the model
    df_have_label = label in df.columns

    if not df_have_label:
        schema.pop(label)
    
    df=df[schema.keys()]
    with open(path(dirname,f"binary/{args['id']}/preprocess.pickle"), "rb") as f:
        preprocess = pickle.load(f)

    for column, type in schema.items():
        if type=="redundant":
            df=df.drop(columns=column)
        else:
            apply_preprocess(df,column, type,preprocess)

    with open(path(dirname,f"binary/{args['id']}/model.pickle"), "rb") as f:
        model = pickle.load(f)
    pred = None
    if df_have_label:
        pred=model.predict(df.drop(columns=label))
    else:
        pred=model.predict(df)
    
    if df_have_label:
        evaluate_result = get_evaluate(df[label],pred, schema[label])
        metadata["test_result"][f"test_{metadata['version']}"] = evaluate_result
        with open(path(dirname,f"binary/{args['id']}/metadata.json"), 'w', encoding='utf-8') as f:
            json.dump(metadata, f, ensure_ascii=False, indent=4)


    # postprocess pred result 
    pred = preprocess[label].inverse_transform(pd.DataFrame({"pred": pred})).flatten()
    row_df["Pred_" + label] = pred
    
    if schema[label] == 'numeric':

        row_df["Pred_" + label]=row_df["Pred_" + label].round(3)

    if df_have_label: 
        print("Evaluation:")
        for key, value in evaluate_result.items(): 
            print(f"{key}: {value}")
    
    csv_string_buffer = StringIO()
    row_df.to_csv(csv_string_buffer, index=False)
    csv_string = csv_string_buffer.getvalue()
    print("Result:")
    print(csv_string)


    