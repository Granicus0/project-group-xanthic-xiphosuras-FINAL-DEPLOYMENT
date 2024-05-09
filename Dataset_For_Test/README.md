## In this folder is a collection of small tabular datasets that you can use to test the functionality of our website.

Each folder will contain its original dataset and derived datasets that are sampled from the original dataset. It is recommended to use the training datasets to train models and the test dataset to make predictions, as it is imperative to ensure that the data used for prediction does not involve the training process. Additionally, it will take a longer time for our website to process larger datasets, and the website's connection may become laggy.

The ``train_test_split.py`` file is used to split the original dataset into training and testing datasets with appropriate sizes.

Here are the descriptions of available datasets:

- **Adult**: It records personal and financial details of United States citizens in the 1950s. The recommended value to predict is "income," which means whether their income exceeds 50k.

- **COMPAS**: It consists of criminal history, jail and prison time, demographics, and COMPAS risk scores from Broward County. The recommended value to predict is "two_year_recid," which means whether they will commit an offense again during two years after release.
  
- **Diabetic**: It represents ten years (1999-2008) of clinical care at 130 US hospitals and integrated delivery networks. The recommended value to predict is "readmitted," which means whether the patient needs to be readmitted to the hospital.
  
- **Job**: It is a comprehensive collection of information regarding job applicants and their respective employability scores. The recommended value to predict is "Employed," which indicates whether they are currently employed.
  
- **OULAD**: It contains data about courses, students, and their interactions with the Virtual Learning Environment (VLE) for seven selected courses. The recommended value to predict is "final_result," which indicates the final grades of each student regarding their courses.
