# -*- coding: utf-8 -*-
"""
Created on Mon Apr 16 23:15:50 2018

@author: fitiavana
"""

import os

from werkzeug.utils import secure_filename
from flask import Flask, request, jsonify

from dtmodel import DTModel
# -----------------
app = Flask(__name__)
model = DTModel()
# -----------------
# Routes definition

@app.route('/')
def r_index():
    return 'This is the default route, nothing yet'

@app.route('/loadfile', methods=['POST'])
def r_load_file():
    # getting file
    csv_file = request.files['csv_file']
    csv_filename = secure_filename(csv_file.filename)
    csv_filepath = os.path.join('uploaded', csv_filename) 
    csv_file.save(csv_filepath)
    
    # loading the file
    columnList = model.loadFile(csv_filepath)
    
    # return the column list
    return jsonify(columnList)

@app.route('/trainmodel', methods=['POST'])
def r_train_model():
    # getting data
    post_values = request.get_json()
    inlist = post_values['inlist']
    output = post_values['output']
    
    # training the model
    model.trainModel(inlist, output)
    
    # temp result
    return 'Success'

@app.route('/predict', methods=['POST'])
def r_predict():
    # getting data
    post_values = request.get_json()
    invalues = post_values['invalues']
    
    # predicting
    result = model.predict_one(invalues)
    
    # send the result
    return str(result)

# -----------------
# Running the app

if __name__ == '__main__':
    app.run()