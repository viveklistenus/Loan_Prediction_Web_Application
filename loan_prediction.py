import sys
import pandas as pd
import joblib

# Load the saved model
model = joblib.load('model.joblib')

# Get the user input from command-line arguments
user_input = {
    'ApplicantIncome': [int(sys.argv[1])],
    'CoapplicantIncome': [int(sys.argv[2])],
    'LoanAmount': [int(sys.argv[3])],
    'Loan_Amount_Term': [int(sys.argv[4])],
    'Credit_History': [int(sys.argv[5])],
    'Gender_Male': [int(sys.argv[6])],
    'Married_Yes': [int(sys.argv[7])],
    'Dependents_1': [int(sys.argv[8])],
    'Dependents_2': [int(sys.argv[9])],
    'Dependents_3+': [int(sys.argv[10])],
    'Education_Not Graduate': [int(sys.argv[11])],
    'Self_Employed_Yes': [int(sys.argv[12])],
    'Property_Area_Semiurban': [int(sys.argv[13])],
    'Property_Area_Urban': [int(sys.argv[14])]
}

# Prepare the user input as a DataFrame
user_input_df = pd.DataFrame(user_input)

# Use the loaded model to make predictions on the user input
prediction = model.predict(user_input_df.values)

# Print the predicted output
print(prediction[0])
