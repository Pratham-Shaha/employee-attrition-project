from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import pickle
import pandas as pd


app = FastAPI()

# Enable CORS for React frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# Load trained ML pipeline
with open("attrition_pipeline.pkl", "rb") as file:
    pipeline = pickle.load(file)


# Pydantic model
class Employee(BaseModel):
    Age: int
    Department: str
    JobRole: str
    MonthlyIncome: int
    OverTime: str
    JobSatisfaction: int
    WorkLifeBalance: int
    YearsAtCompany: int
    DistanceFromHome: int
    BusinessTravel: str


# Prediction endpoint
@app.post("/predict")
def predict(employee: Employee):

    # Convert Pydantic object to dictionary
    employee_data = employee.model_dump()

    # Let us convert dictionary to DataFrame
    df = pd.DataFrame([employee_data])

    # Make prediction
    prediction = pipeline.predict(df)[0]

    # Get probability
    probability = pipeline.predict_proba(df)[0][1]

    return {
        "prediction": int(prediction),
        "attrition": "Yes" if prediction == 1 else "No",
        "probability": float(probability)
    }
