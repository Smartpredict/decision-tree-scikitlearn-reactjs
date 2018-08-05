# -*- coding: utf-8 -*-
"""
Created on Sun Apr 15 21:48:40 2018

@author: fitiavana
"""

from dtmodel import DTModel

my_model = DTModel()

columns = my_model.loadFile("new_iris.csv")

columns_size = len(columns)

print(columns, "size :", columns_size)

inColumns = []
inColumns.append(columns[0])
inColumns.append(columns[1])
inColumns.append(columns[2])
inColumns.append(columns[3])

outColumn = columns[4]

my_model.trainModel(inColumns, outColumn)
print("Trained")

entry = [6.3, 3.3, 6.0, 2.5]
output = my_model.predict_one(entry)
print(output)
