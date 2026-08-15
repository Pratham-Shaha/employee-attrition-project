import './ResultCard.css'

export default function ResultCard({ result, payload = {}, onBack }) {
  const isAttrition = result.attrition === 'Yes'
  const probabilityPercent = (Number(result.probability) * 100).toFixed(2)
  const statusLabel = isAttrition ? 'ATTRITION LIKELY' : 'LOW ATTRITION RISK'
  const riskSummary = isAttrition
    ? 'Employees with similar characteristics may have a higher likelihood of leaving.'
    : 'Employees with similar characteristics appear to have a lower likelihood of leaving.'

  const summaryEntries = [
    ['Age', payload.Age],
    ['Department', payload.Department],
    ['Job Role', payload.JobRole],
    ['Monthly Income', payload.MonthlyIncome],
    ['Over Time', payload.OverTime],
    ['Job Satisfaction', payload.JobSatisfaction],
    ['Work-Life Balance', payload.WorkLifeBalance],
    ['Years at Company', payload.YearsAtCompany],
    ['Distance from Home', payload.DistanceFromHome],
    ['Business Travel', payload.BusinessTravel],
  ].filter(([, value]) => value !== undefined && value !== '')

  const ringStyle = {
    background: `conic-gradient(${isAttrition ? '#f59e0b' : '#22c55e'} ${Number(probabilityPercent)}%, rgba(148, 163, 184, 0.18) 0)`,
  }

  return (
    <div className={`result-card ${isAttrition ? 'risk-high' : 'risk-low'}`}>
      <div className="result-header">
        <div className="result-badge">Prediction Result</div>
        <div className={`result-status ${isAttrition ? 'status-high' : 'status-low'}`}>
          {statusLabel}
        </div>
      </div>

      <div className="result-overview">
        <div className="probability-panel">
          <div className="ring-wrap" style={ringStyle}>
            <div className="ring-inner">
              <span>{probabilityPercent}%</span>
            </div>
          </div>
        </div>

        <div className="risk-copy">
          <h2>Risk Assessment</h2>
          <p>{riskSummary}</p>
        </div>
      </div>

      <div className="summary-card">
        <div className="summary-header">
          <h3>Employee Summary</h3>
        </div>
        <div className="summary-grid">
          {summaryEntries.map(([label, value]) => (
            <div className="summary-item" key={label}>
              <span>{label}</span>
              <strong>{value}</strong>
            </div>
          ))}
        </div>
      </div>

      <div className="result-actions">
        <button type="button" className="secondary-btn" onClick={onBack}>
          Predict Another Employee
        </button>
      </div>
    </div>
  )
}
