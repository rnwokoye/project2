import os
from flask import Flask, jsonify, render_template, redirect
from flask_cors import CORS, cross_origin
from flask_pymongo import PyMongo
import pandas as pd
import numpy as np
from get_country_data import get_data, get_data2



# create Flask instance
app = Flask(__name__)
CORS(app)

# Use pyMongo to establish mongo database connection
mongo = PyMongo(app, uri="mongodb://localhost:27017/CountryData5")


# index route
@app.route("/")
def index():
    return render_template("index.html")

# create route that renders index page
@app.route("/data")
def data():
    RESULTS = {'Country': [], "Stats": []}
    country_data = mongo.db.countries.find({'Year': 2017})
    data2 = [i for i in country_data]

    res2 = pd.DataFrame(data2).fillna(0)
    res3 = res2.to_dict('records')
    for j in res3:
        RESULTS['Country'].append({
            'name': j.get('Country'),
            'id': str(j.get('Country_Code')),
            'year': j.get('Year'),
            'Income_Adjusted_QOL': j.get('IncomeAdjusted_LMY_Quality_Of_Life_Score'),
            'RT_EducationScore': j.get('IncomeAdjusted_LMY_Right_to_Education_Score'),
            'RT_HealthScore': j.get('IncomeAdjusted_LMY_Right_to_Health_Score'),
            'RT_HousingScore': j.get('IncomeAdjusted_LMY_Right_to_Housing_Score'),
            'RT_FoodScore': j.get('IncomeAdjusted_LMY_Right_to_Food_Score'),
            'RT_WorkScore': j.get('IncomeAdjusted_LMY_Right_to_Work_Score'),
            'GDP_per_capita_': j.get('GDP_per_capita_(2011_PPP$)_for_Most_Recent_Observation_on_Net_Secondary_Enrollment')
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
    port = int(os.environ.get('PORT', 5000))
    app.run(host='0.0.0.0', port=port, debug=True)