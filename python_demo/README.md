# Demo for Python Script required to train and test Machine Learning Models

This folder contains the relevant python modules required for training and testing ML models. Currently I am focusing on building up a workable skeleton and add new feature by extending the script or custom modules.

# Current support models, column data types, process type and metrics

## Models

- **"SVM"** : use ***sklearn.SVM.SVC*** for classification problem and ***sklearn.SVM.SVR*** for regression problem
- **NN** : use ***sklearn.neural_network.MLPClassifier*** for classification problem and ***sklearn.neural_network.MLPRegressor*** for regression problem
- **RF** : use ***sklearn.ensemble.RandomForestClassifier*** for classification problem and ***sklearn.ensemble.RandomForestRegressor*** for regression problem

## Column Data types:

- **"numeric"** 
    - represent continous numerical data. Will assign to columns with numeric dtype in default.
    - Will apply MinMaxScaler during preprocess phase of training. Will check whether the column contains strings value during testing.
- **"categlogue"** : 
    - represent discrete values, can be numbers or strings. Will assign to columns with object dtype in default.
    - Will apply OrdinalEncoder if column contains string values during preprocess phase of training. Will check whether the column contains more than 25 unique numeric values.
- **"redundant"** : 
    - represent values that are not helpful for training a ML models. Will assign to columns that contains a string value with length of at least 100
    - Will be ignored during training and testing

## Process types:

- **"once"** : Train the models with all of the training data once, and evaluate its predictions against label values of all training data
- **"cv5"** : Perform 5-fold cross validation on the training data, use average metrics to evaluate the model's performance
- **"cv10"** : Perform 10-fold cross validation on the training data, use average metrics to evaluate the model's performance

## Metrics:

The metrics includes **"accuracy"**, **precision**, **recall**, and **f1**, will include **ROC Curve**

# Structure

## **analyse.py**,**training.py**, **testing.py** and **train_test_split.py**

They are the main scripts for the project:
    - **analyse.py**: create the default dataset schema of the uploaded dataset, will send to backend to send to frontend to ask user to edit it before training
    - **train_test_split.py**: create training set and testing set of the uploaded dataset with given testing set size [0,1] and training set size [0,1], will send to backend to send to frontend to let user download them for training and testing use.
    -  **training.py**: training a model with given parameters, will save models, preprocessors at server and send its metadata (with results contained in it) to backend to send to frontend to display
    -  **testing.py**: training a model with given parameters,send its metadata (with results contained in it) to backend to send to frontend to display

The main body of scripts when called. I am not sure whether python code can be embedded in Javascript environment, so I assume we use command line call to execute the script. The script will process the argument passed by backendand create pickle files and json files at relavent positions. 

For comminucation to frontend that the script have finished executing, I am also not sure what will work:
- One way to do is for the script to make a response call to frontend (or backend?) that the script have finished exceuting, notifying the frontend to load the model's result contained in metadata.
- The other way is for the frontend repeatedly make call to backend to check whether the model file and metadata file exisit. If so the frontend request those files from backend.

### Command Format:

- **analyse.py** : python analyse.py -csvp \<dataset path name\> (-id \<model id to store schema, *will be deprecated*\>)
    - python analyse.py -csvp Dataset/adult.csv -csvp Dataset/adult.csv -id 3
- **train_test_split.py** : python train_test_split.py [-csvp \<Dataset file path\> | -csv \<Dataset data\>] (-l \<dataset label column name, will be deprecated\> -n \<created csv file name, *will be deprecated*\>) -tr \<the percentage size of training dataset, *optional*\> -te \<the percentage size of testing dataset\>
    - python train_test_split.py -csvp Dataset/BCP.csv -n BCP -tr 0.4 -te 0.4 -l Class
- **training.py** : python training.py [-csvp \<Dataset file path\> | -csv \<Dataset data\>] [-schemap \<schema file path\> | -schema \<schema data\>] -id \<model id\> -l \<dataset label column name\> -p \<training process type\> -m \<model types\>
    - python training.py -csvp Dataset/adult.csv -schemap 3/schema.json -id 3 -l income -p once -m RF
- **testing.py** : python training.py [-csvp \<Dataset file path\> | -csv \<Dataset data\>] -id \<model id\>
    - python testing.py -csvp Dataset/adult.csv -id 3


all the options can be expressed as a json entity following -args option

## **model.py**, **training_process.py**, **evaluation.py**, **apply_preprocessor.py**, **parser.py**, **preprocess.py**

They contain various Preprocessing, ML models, training process and evaluation methods we support. These are mapped with encodings and are passed between frontend and backend.

**parser.py** contains helper method to help intepret the command line options and load relevant dataset files and json files

The mapping between encoding and methods can be seen in *get_model_class*, *get_process* and *get_evalute* methods

There might be more modules that I need to be added, so the numbers of extra modules are not definitive.

## **requirements.txt**

**requirements.txt** record python libraries that are required to support the training and testing scripts. They are **required** to installed in the server for the functionality to work
