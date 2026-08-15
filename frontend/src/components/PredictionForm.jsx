import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { PREDICT_ENDPOINT } from '../config'
import './PredictionForm.css'

const FORM_FIELDS = {
  Age: { label: 'Age', type: 'number', placeholder: 'e.g., 30', required: true },
  Department: {
    label: 'Department',
    type: 'select',
    options: ['Sales', 'Research & Development', 'Human Resources'],
    required: true,
  },
  JobRole: {
    label: 'Job Role',
    type: 'select',
    options: [
      'Manager',
      'Laboratory Technician',
      'Sales Representative',
      'Research Scientist',
      'Manufacturing Director',
      'Sales Executive',
      'Research Director',
      'Healthcare Representative',
      'Human Resources',
    ],
    required: true,
  },
  MonthlyIncome: {
    label: 'Monthly Income',
    type: 'number',
    placeholder: 'e.g., 5000',
    required: true,
  },
  OverTime: { label: 'Over Time', type: 'select', options: ['Yes', 'No'], required: true },
  JobSatisfaction: {
    label: 'Job Satisfaction',
    type: 'select',
    options: ['1', '2', '3', '4'],
    required: true,
  },
  WorkLifeBalance: {
    label: 'Work-Life Balance',
    type: 'select',
    options: ['1', '2', '3', '4'],
    required: true,
  },
  YearsAtCompany: {
    label: 'Years at Company',
    type: 'number',
    placeholder: 'e.g., 5',
    required: true,
  },
  DistanceFromHome: {
    label: 'Distance from Home',
    type: 'number',
    placeholder: 'e.g., 10',
    required: true,
  },
  BusinessTravel: {
    label: 'Business Travel',
    type: 'select',
    options: ['Travel_Rarely', 'Travel_Frequently', 'Non-Travel'],
    required: true,
  },
}

const FIELD_SECTIONS = [
  {
    title: 'Personal Information',
    keys: ['Age', 'Department', 'JobRole', 'BusinessTravel'],
  },
  {
    title: 'Work & Compensation',
    keys: ['MonthlyIncome', 'YearsAtCompany', 'DistanceFromHome', 'OverTime'],
  },
  {
    title: 'Employee Satisfaction',
    keys: ['JobSatisfaction', 'WorkLifeBalance'],
  },
]

const initialFormData = {
  Age: '',
  Department: '',
  JobRole: '',
  MonthlyIncome: '',
  OverTime: '',
  JobSatisfaction: '',
  WorkLifeBalance: '',
  YearsAtCompany: '',
  DistanceFromHome: '',
  BusinessTravel: '',
}

export default function PredictionForm() {
  const navigate = useNavigate()
  const [formData, setFormData] = useState(initialFormData)
  const [loading, setLoading] = useState(false)
  const [errors, setErrors] = useState({})
  const [apiError, setApiError] = useState('')

  const validateForm = () => {
    const newErrors = {}

    Object.keys(formData).forEach((key) => {
      if (!formData[key]) {
        newErrors[key] = 'This field is required'
      }
    })

    const numericFields = ['Age', 'MonthlyIncome', 'YearsAtCompany', 'DistanceFromHome']
    numericFields.forEach((field) => {
      if (formData[field] !== '') {
        if (isNaN(formData[field])) {
          newErrors[field] = 'Please enter a valid number'
        } else if (Number(formData[field]) < 0) {
          newErrors[field] = 'Value cannot be negative'
        }
      }
    })

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target
    const numericFields = ['Age', 'MonthlyIncome', 'YearsAtCompany', 'DistanceFromHome']

    if (numericFields.includes(name) && value !== '') {
      const numberValue = Number(value)
      if (numberValue < 0 || value.includes('-')) {
        return
      }
    }

    setFormData((prev) => ({ ...prev, [name]: value }))

    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }))
    }

    if (apiError) {
      setApiError('')
    }
  }

  const handleReset = () => {
    setFormData(initialFormData)
    setErrors({})
    setApiError('')
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!validateForm()) {
      return
    }

    setLoading(true)
    setApiError('')

    try {
      const payload = {
        Age: parseInt(formData.Age, 10),
        Department: formData.Department,
        JobRole: formData.JobRole,
        MonthlyIncome: parseInt(formData.MonthlyIncome, 10),
        OverTime: formData.OverTime,
        JobSatisfaction: parseInt(formData.JobSatisfaction, 10),
        WorkLifeBalance: parseInt(formData.WorkLifeBalance, 10),
        YearsAtCompany: parseInt(formData.YearsAtCompany, 10),
        DistanceFromHome: parseInt(formData.DistanceFromHome, 10),
        BusinessTravel: formData.BusinessTravel,
      }

      const response = await fetch(PREDICT_ENDPOINT, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      })

      if (!response.ok) {
        throw new Error(`API error: ${response.status}`)
      }

      const data = await response.json()
      navigate('/result', { state: { result: data, payload } })
    } catch (error) {
      console.error('Prediction error:', error)
      setApiError('Unable to connect to the prediction service. Please make sure the backend is running.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <form className="form-card" onSubmit={handleSubmit}>
      <div className="form-header">
        <h1>Employee Information</h1>
        <p className="form-intro">Enter employee details to assess their likelihood of attrition.</p>
      </div>

      {FIELD_SECTIONS.map((section) => (
        <div className="field-section" key={section.title}>
          <h2>{section.title}</h2>
          <div className="field-grid">
            {section.keys.map((key) => {
              const field = FORM_FIELDS[key]
              const hasError = !!errors[key]

              return (
                <div key={key} className={`form-group ${hasError ? 'error' : ''}`}>
                  <label htmlFor={key}>{field.label}</label>
                  {field.type === 'select' ? (
                    <select
                      id={key}
                      name={key}
                      value={formData[key]}
                      onChange={handleInputChange}
                      required={field.required}
                      className="select-field"
                    >
                      <option value="">Select {field.label}</option>
                      {field.options.map((option) => (
                        <option key={option} value={option}>
                          {option}
                        </option>
                      ))}
                    </select>
                  ) : (
                    <input
                      id={key}
                      type={field.type}
                      name={key}
                      placeholder={field.placeholder}
                      value={formData[key]}
                      onChange={handleInputChange}
                      required={field.required}
                      min={0}
                      step={1}
                      onKeyDown={(event) => {
                        if (field.type === 'number' && event.key === '-') {
                          event.preventDefault()
                        }
                      }}
                    />
                  )}
                  {hasError && <span className="error-message">{errors[key]}</span>}
                </div>
              )
            })}
          </div>
        </div>
      ))}

      {apiError && <div className="api-error">{apiError}</div>}

      <div className="button-row">
        <button type="button" className="secondary-btn" onClick={handleReset} disabled={loading}>
          Clear
        </button>
        <button type="submit" className="primary-btn" disabled={loading}>
          {loading ? (
            <>
              <span className="spinner" aria-hidden="true" />
              Predicting...
            </>
          ) : (
            'Predict Attrition'
          )}
        </button>
      </div>
    </form>
  )
}
