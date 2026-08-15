import { BrowserRouter, Navigate, Route, Routes, useLocation, useNavigate } from 'react-router-dom'
import PredictionForm from './components/PredictionForm'
import ResultCard from './components/ResultCard'
import './App.css'

function PredictionPage() {
  return (
    <main className="page-shell">
      <div className="page-header">
        <h1>Employee Attrition AI</h1>
      </div>
      <section className="prediction-panel">
        <PredictionForm />
      </section>
    </main>
  )
}

function ResultPage() {
  const { state } = useLocation()
  const navigate = useNavigate()

  const result = state?.result
  const payload = state?.payload || {}

  if (!result) {
    return <Navigate to="/prediction" replace />
  }

  return (
    <main className="page-shell page-shell-result">
      <section className="result-panel">
        <ResultCard
          result={result}
          payload={payload}
          onBack={() => navigate('/prediction')}
        />
      </section>
    </main>
  )
}

export default function App() {
  return (
    <BrowserRouter>
      <div className="app-shell">
        <Routes>
          <Route path="/" element={<Navigate to="/prediction" replace />} />
          <Route path="/prediction" element={<PredictionPage />} />
          <Route path="/result" element={<ResultPage />} />
        </Routes>
      </div>
    </BrowserRouter>
  )
}
