import { useState, useEffect } from 'react';

function App() {
  const [dataset, setDataset] = useState('sintetico_10k');
  const [modelo, setModelo] = useState('SVM');
  const [status, setStatus] = useState({ visible: false, tipo: '', mensaje: '' });
  const [isTraining, setIsTraining] = useState(false);
  const [leaderboard, setLeaderboard] = useState([]);

  const API_URL = 'http://34.69.194.205:8000/api';

  const fetchLeaderboard = async () => {
    try {
      const response = await fetch(`${API_URL}/leaderboard`);
      const data = await response.json();
      setLeaderboard(data.leaderboard || []);
    } catch (error) {
      console.error("Error al obtener Leaderboard:", error);
    }
  };

  useEffect(() => {
    fetchLeaderboard();
  }, []);

  const handleEntrenar = async (e) => {
    e.preventDefault();
    setIsTraining(true);
    setStatus({ visible: true, tipo: 'alert-info border-info text-info', mensaje: `Orquestando ${modelo}... Transmitiendo matrices de datos al clúster.` });

    try {
      const response = await fetch(`${API_URL}/entrenar`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ dataset, modelo })
      });
      
      const data = await response.json();

      if (data.status === "EXITO") {
        setStatus({ visible: true, tipo: 'alert-success border-success text-success', mensaje: `¡${modelo} procesado! Sincronización de memoria exitosa.` });
        fetchLeaderboard();
      }
    } catch (error) {
      setStatus({ visible: true, tipo: 'alert-danger border-danger text-danger', mensaje: 'Error crítico de red. Desconexión del Orquestador.' });
    } finally {
      setIsTraining(false);
    }
  };

  return (
    <div className="container mt-5 py-4">
      {/* HEADER */}
      <header className="mb-5 text-center fade-in">
        <h1 className="display-4 fw-bolder text-transparent bg-clip-text" style={{ background: 'linear-gradient(90deg, #fff, #0dcaf0)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
          MLOps Command Center
        </h1>
        <p className="lead" style={{ color: '#a0aabc' }}>Orquestación Distribuida y Servicios Web</p>
      </header>

      <div className="row g-4">
        {/* PANEL DE CONTROL (Izquierda) */}
        <div className="col-md-4">
          <div className="card glass-card mb-4">
            <div className="card-header glass-header">
              <h5 className="mb-0 fw-bold d-flex align-items-center">
                <span className="me-2">⚙️</span> Parámetros de Inferencia
              </h5>
            </div>
            <div className="card-body">
              <form onSubmit={handleEntrenar}>
                <div className="mb-4">
                  <label className="form-label fw-semibold" style={{ color: '#0dcaf0' }}>Dataset de Entrenamiento</label>
                  <select className="form-select glass-input" value={dataset} onChange={(e) => setDataset(e.target.value)}>
                    <option value="sintetico_10k">Sintético Base (10,000 muestras)</option>
                    <option value="sintetico_100k">Alta Dimensionalidad (100,000 muestras)</option>
                  </select>
                </div>
                <div className="mb-4">
                  <label className="form-label fw-semibold" style={{ color: '#0dcaf0' }}>Algoritmo Matemático</label>
                  <select className="form-select glass-input" value={modelo} onChange={(e) => setModelo(e.target.value)}>
                    {/* Clásicos */}
                    <option value="SVM">Máquina de Soporte Vectorial (SVM)</option>
                    <option value="Random Forest">Random Forest</option>
                    <option value="MLP">Red Neuronal Multicapa (MLP)</option>
                    <option value="Regresión Logística">Regresión Logística</option>
                    <option value="Árbol de Decisión">Árbol de Decisión</option>
                    <option value="Naive Bayes">Naive Bayes (Gaussiano)</option>
                    {/* Nuevos Adicionales */}
                    <option value="KNN">K-Nearest Neighbors (KNN)</option>
                    <option value="Gradient Boosting">Gradient Boosting</option>
                    <option value="AdaBoost">AdaBoost Classifier</option>
                  </select>
                </div>
                <div className="d-grid mt-4">
                  <button type="submit" className="btn btn-lg pulse-btn text-white fw-bold shadow" disabled={isTraining}>
                    {isTraining ? (
                      <>
                        <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                        Ejecutando Workers...
                      </>
                    ) : 'Desplegar Entrenamiento'}
                  </button>
                </div>
              </form>
            </div>
          </div>

          {/* CONSOLA DE ESTADO */}
          {status.visible && (
            <div className={`alert ${status.tipo} glass-card fade-in d-flex align-items-center`} style={{ background: 'rgba(0,0,0,0.4)' }} role="alert">
              <span className="me-2">{isTraining ? '📡' : (status.tipo.includes('success') ? '✅' : '❌')}</span>
              <small>{status.mensaje}</small>
            </div>
          )}
        </div>

        {/* LEADERBOARD (Derecha) */}
        <div className="col-md-8">
          <div className="card glass-card h-100">
            <div className="card-header glass-header d-flex justify-content-between align-items-center">
              <h5 className="mb-0 fw-bold">🏆 Leaderboard Global</h5>
              <span className="badge bg-primary rounded-pill">Sincronizado</span>
            </div>
            <div className="card-body p-4">
              <div className="table-responsive">
                <table className="table table-custom align-middle text-center mb-0">
                  <thead>
                    <tr>
                      <th className="border-0 text-uppercase" style={{ color: '#a0aabc' }}>Rank</th>
                      <th className="border-0 text-uppercase" style={{ color: '#a0aabc' }}>Modelo</th>
                      <th className="border-0 text-uppercase" style={{ color: '#a0aabc' }}>Accuracy</th>
                      <th className="border-0 text-uppercase" style={{ color: '#a0aabc' }}>Latency</th>
                    </tr>
                  </thead>
                  <tbody>
                    {leaderboard.length === 0 ? (
                      <tr>
                        <td colSpan="4" className="py-5 text-muted border-0">
                          <div className="d-flex flex-column align-items-center">
                            <span style={{ fontSize: '2rem' }}>💤</span>
                            <span className="mt-2">El clúster está en reposo. No hay modelos registrados.</span>
                          </div>
                        </td>
                      </tr>
                    ) : (
                      leaderboard.map((item, index) => (
                        <tr key={index}>
                          <td className="border-0">
                            <h5 className="mb-0">
                              <span className={`badge ${index === 0 ? 'bg-warning text-dark' : 'bg-secondary'}`}>
                                #{index + 1}
                              </span>
                            </h5>
                          </td>
                          <td className="border-0 fw-semibold">{item.modelo}</td>
                          <td className="border-0">
                            <span className="badge neon-badge fs-6 px-3 py-2">{item.accuracy}</span>
                          </td>
                          <td className="border-0 font-monospace text-info">{item.tiempo}s</td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* FOOTER */}
      <footer className="mt-5 pt-4 pb-2 text-center fade-in">
        <hr style={{ borderColor: 'rgba(255, 255, 255, 0.1)' }} />
        <p className="mb-1" style={{ color: '#a0aabc' }}>
          Desarrollado por <strong>José Roberto López Reyes</strong> | Sistemas Distribuidos | 7CM1
        </p>
        <small style={{ color: '#6c757d' }}>
          Escuela Superior de Cómputo (ESCOM) - Instituto Politécnico Nacional &copy; 2026
        </small>
      </footer>
    </div>    
  );
}

export default App;
