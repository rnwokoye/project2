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
mongo = PyMongo(app, uri="mongodb://localhost:27017/CountryData")


# index route
@app.route("/")
def index():
    return render_template("index.html")

# create route that renders index page
@app.route("/data")
def data():
    cur_data = mongo.db.countries.find({'Year': 2017})
    RESULTS = {'Country': []}
    data = [i for i in cur_data]
    res = pd.DataFrame(data).fillna(0)
    res2 = res.to_dict('records')
    for j in res2:
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
        })

    return jsonify(RESULTS)


if __name__ == "__main__":
    port = int(os.environ.get('PORT', 5000))
    app.run(host='0.0.0.0', port=port, debug=True)
