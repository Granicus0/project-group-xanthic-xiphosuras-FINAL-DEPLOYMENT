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
    
    metadata=get_metadata(args["id"],dirname)
    
    df=parse_csv(args)
    df_have_label = metadata["_label"] in df.columns # if the df do not have label, we only make pred, do not evaluate the model

    if not df_have_label:
        metadata["schema"].pop(metadata["_label"])
    df=df[metadata["schema"].keys()]

    with open(path(dirname,f"{args['id']}/{args['id']}-preprocess.pickle"), "rb") as f:
        preprocess = pickle.load(f)

    for column, type in metadata["schema"].items():
        apply_preprocess(df,column, type,preprocess)

    with open(path(dirname,f"{args['id']}/{args['id']}.pickle"), "rb") as f:
        model = pickle.load(f)
    pred = None
    if df_have_label:
        pred=model.predict(df.drop(columns=metadata["_label"]))
    else:
        pred=model.predict(df)
    
    if df_have_label:
        evaluate_result = get_evaluate(df[metadata["_label"]],pred)
        metadata["test_result"][f"test_{metadata['version']}"] = evaluate_result
        with open(path(dirname,f"{args['id']}/metadata.json"), 'w', encoding='utf-8') as f:
            json.dump(metadata, f, ensure_ascii=False, indent=4)


    # postprocess pred result 
    pred = preprocess[metadata["_label"]].inverse_transform(pd.DataFrame({"pred": pred})).flatten()

    
    pred = pd.DataFrame({"pred": pred})
    csv_string = StringIO()
    pred.to_csv(csv_string, index=False)
    csv_string = csv_string.getvalue()
    print(csv_string)
    