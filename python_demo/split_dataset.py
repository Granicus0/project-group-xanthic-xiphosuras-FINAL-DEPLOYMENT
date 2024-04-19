# this is used to split a complete dataset into training sets and testing sets

import pandas as pd
from sklearn.model_selection import train_test_split

df=pd.read_csv("BCP.csv",index_col=0)
train_X,test_X,train_Y,test_Y=train_test_split(df.drop("Class",axis=1),df["Class"],test_size=0.3)
train=pd.concat([train_X,train_Y],axis=1)
train.to_csv("BCP_train.csv")
test=pd.concat([test_X,test_Y],axis=1)
test.to_csv("BCP_test.csv")