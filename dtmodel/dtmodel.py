# -*- coding: utf-8 -*-
"""
Created on Sun Apr 15 19:30:02 2018

@author: fitiavana
"""

import pandas as pd

from sklearn import tree

class DTModel:
    def __init__(self):
        self.classifier = tree.DecisionTreeClassifier()
    
    def loadFile(self, filepath):
        """
        Load a file,
        get the data from this file as a dataframe for the DTModel
        returns the columns list
        """        
        self.data_frame= pd.read_csv(filepath)
        columnList = list(self.data_frame.columns.values)
        return columnList
    
    def trainModel(self, inlist, outlist):
        X = self.data_frame[inlist]
        y = self.data_frame[outlist]
        self.classifier.fit(X,y)
    
    def predict_one(self, entry):
        entry_list = [entry]
        output = self.classifier.predict(entry_list)
        output = output[0]
        return output