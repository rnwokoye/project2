from dotenv import load_dotenv
import os
from flask import Flask, jsonify, render_template, redirect
from flask_cors import CORS, cross_origin
# import pymongo
import pandas as pd
from get_country_data import data_etl, load_data, client, db
from pymongo import MongoClient 




app = Flask(__name__)
CORS(app)

# Extract the data
# records = data_etl()

# # Transform and load to MongoDB
# mydata = load_data(records)


@app.route("/")
def index():

    return render_template("index.html")


@app.route("/data")
def get_data_from_database():

    countries = db.countries

    RESULTS = {'Country': [], "Stats": []}
    country_data = countries.find({'Year': 2017})
    data2 = [i for i in country_data]
    res2 = pd.DataFrame(data2).fillna(0).round(2)
    res3 = res2.to_dict('records')
    for j in res3:
        RESULTS['Country'].append({
            'Name': j.get('Country'),
            'code': str(j.get('Country_Code')),
            'Year': j.get('Year'),
            'QualityOfLife': j.get('IncomeAdjusted_LMY_Quality_Of_Life_Score'),
            'Education': j.get('IncomeAdjusted_LMY_Right_to_Education_Score'),
            'Health': j.get('IncomeAdjusted_LMY_Right_to_Health_Score'),
            'Housing': j.get('IncomeAdjusted_LMY_Right_to_Housing_Score'),
            'Food': j.get('IncomeAdjusted_LMY_Right_to_Food_Score'),
            'Work': j.get('IncomeAdjusted_LMY_Right_to_Work_Score'),
            'GDP': j.get('GDP_per_capita_(2011_PPP$)_for_Most_Recent_Observation_on_Net_Secondary_Enrollment')
        }),
        RESULTS['Stats'].append({
            'name': j.get('Country'),
            'quality_of_life_score': j.get('IncomeAdjusted_LMY_Quality_Of_Life_Score'),
            'education_score': j.get('IncomeAdjusted_LMY_Right_to_Education_Score'),
            'health_score': j.get('IncomeAdjusted_LMY_Right_to_Health_Score'),
            'housing_score': j.get('IncomeAdjusted_LMY_Right_to_Housing_Score'),
            'food_score': j.get('IncomeAdjusted_LMY_Right_to_Food_Score'),
            'work_score': j.get('IncomeAdjusted_LMY_Right_to_Work_Score'),
            'GDP_per_capita': j.get('GDP_per_capita_(2011_PPP$)_for_Most_Recent_Observation_on_Net_Secondary_Enrollment')
            
        })

    return jsonify(RESULTS)

if __name__ == "__main__":
    app.run()
