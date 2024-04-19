# Demo for Python Script required to train and test Machine Learning Models

This folder contains the relevant python modules required for training and testing ML models. Currently I am focusing on building up a workable skeleton and add new feature by extending the script or custom modules.

# Structure

## **training.py** and **testing.py**

They are the main scripts that handles training models and testing models

The main body of scripts when called. I am not sure whether python code can be embedded in Javascript environment, so I assume we use command line call to execute the script. The script will process the argument passed by backendand create pickle files and json files at relavent positions. 

For comminucation to frontend that the script have finished executing, I am also not sure what will work:
- One way to do is for the script to make a response call to frontend (or backend?) that the script have finished exceuting, notifying the frontend to load the model's result contained in metadata.
- The other way is for the frontend repeatedly make call to backend to check whether the model file and metadata file exisit. If so the frontend request those files from backend.

## **model.py**, **training_process.py**, **evaluation.py**

They contain various ML models, training process and evaluation methods we support. These are mapped with encodings and are passed between frontend and backend.

The mapping between encoding and methods can be seen in *get_model_class*, *get_process* and *get_evalute* methods

There might be more modules that I need to be added, so the numbers of extra modules are not definitive.

## ***Dataset*** and **split_dataset.py**

The folder contain readily available datasets, which are used to test the trainig and testing scripts. **split_dataset.py** is the Python script I used to perform training and testing set splits on them.

## **requirements.txt** and **dev_requirements.txt**

**requirements.txt** record python libraries that are required to support the training and testing scripts. They are **required** to installed in the server for the functionality to work

**dev_requirements.txt** record python libraries that are required for me to develop the scripts. They are **not required** to installed in the server for the functionality to work. The only difference between this and **requirements.txt** is that I install jupyter notebook for better debugging.
