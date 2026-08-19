# Employee Attrition Prediction

A full-stack Machine Learning web application that predicts whether an employee is likely to leave an organization based on various employee-related factors.

The project combines a Machine Learning model with a Python backend API and a modern frontend to provide an interactive employee attrition prediction system.

---

## Overview

Employee attrition is an important challenge for organizations because employee turnover can affect productivity, operational costs, and workforce planning.

This project uses Machine Learning to analyze employee information and predict the likelihood of employee attrition.

The application provides a simple web interface where users can enter employee details and receive a prediction from the trained Machine Learning model.

The project consists of three main components:

- **Machine Learning Model**
- **Backend API**
- **Frontend Web Application**

---

## Features

### Employee Attrition Prediction

The application allows users to:

- Enter employee-related information
- Submit the information for prediction
- Send the data to the backend API
- Get a Machine Learning-based attrition prediction
- View the prediction through an interactive web interface

### Web Application

The frontend provides:

- User-friendly interface
- Employee information input form
- Prediction functionality
- Responsive design
- Mobile-friendly experience

### Backend API

The backend:

- Receives employee information from the frontend
- Processes the input data
- Uses the trained Machine Learning model
- Returns the prediction to the frontend

---

## Technologies Used

### Frontend

- **React**
- **JavaScript**
- **HTML**
- **CSS**
- **Vercel**

### Backend

- **Python**
- **Flask**
- **REST API**
- **Render**

### Machine Learning

- **Python**
- **Scikit-learn**
- **Pandas**
- **NumPy**

### Development Tools

- **Git**
- **GitHub**
- **VS Code**

---

## Machine Learning

The project uses a trained Machine Learning classification model to predict employee attrition.

The model takes employee-related features as input and produces an attrition prediction as the output.

The general Machine Learning workflow includes:

1. Data preprocessing
2. Feature preparation
3. Model training
4. Model evaluation
5. Model saving
6. Integration with the backend API
7. Prediction through the web application

---

## Application Architecture

The project follows a simple full-stack architecture:

```text
User
  |
  v
React Frontend
  |
  v
Backend REST API
  |
  v
Machine Learning Model
  |
  v
Prediction
  |
  v
Frontend
