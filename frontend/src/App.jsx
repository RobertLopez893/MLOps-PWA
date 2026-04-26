import { useState, useEffect } from 'react';

function App() {
  // --- ESTADOS (La memoria de la interfaz) ---
  const [dataset, setDataset] = useState('sintetico_10k');
  const [modelo, setModelo] = useState('SVM');
  const [status, setStatus] = useState({ visible: false, tipo: '', mensaje: '' });
  const [isTraining, setIsTraining] = useState(false);
  const [leaderboard, setLeaderboard] = useState([]);

  // --- LÓGICA DE RED (Conexión con FastAPI) ---
  const API_URL = 'http://127.0.0.1:8000/api';

  const fetchLeaderboard = async () => {
    try {
      const response = await fetch(`${API_URL}/leaderboard`);
      const data = await response.json();
      setLeaderboard(data.leaderboard || []);
    } catch (error) {
      console.error("Error al obtener Leaderboard:", error);
    }
  };

  // Se ejecuta automáticamente al abrir la página
  useEffect(() => {
    fetchLeaderboard();
  }, []);

  const handleEntrenar = async (e) => {
    e.preventDefault();
    setIsTraining(true);
    setStatus({ visible: true, tipo: 'alert-warning', mensaje: `Orquestando ${modelo}... Esperando al clúster.` });

    try {
      const response = await fetch(`${API_URL}/entrenar`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ dataset, modelo })
      });
      
      const data = await response.json();

      if (data.status === "EXITO") {
        setStatus({ visible: true, tipo: 'alert-success', mensaje: `¡${modelo} procesado correctamente!` });
        fetchLeaderboard(); // Refresca la tabla automáticamente
      }
    } catch (error) {
      setStatus({ visible: true, tipo: 'alert-danger', mensaje: 'Error crítico de red. ¿FastAPI está encendido?' });
    } finally {
      setIsTraining(false);
    }
  };

  // --- INTERFAZ VISUAL (JSX) ---
  return (
    <div className="container mt-5">
      <header className="mb-4 text-center">
        <h1 className="display-5 fw-bold text-primary">Plataforma MLOps Distribuida</h1>
        <p className="text-muted">PWA Frontend en React + Vite</p>
      </header>

      <div className="row">
        {/* PANEL DE CONTROL (Izquierda) */}
        <div className="col-md-4">
          <div className="card shadow-sm border-0 mb-3">
            <div className="card-header bg-dark text-white">
              <h5 className="mb-0">Configuración del Job</h5>
            </div>
            <div className="card-body">
              <form onSubmit={handleEntrenar}>
                <div className="mb-3">
                  <label className="form-label fw-bold">Dataset</label>
                  <select className="form-select" value={dataset} onChange={(e) => setDataset(e.target.value)}>
                    <option value="sintetico_10k">Sintético Base (10k)</option>
                    <option value="sintetico_100k">Alta Dimensionalidad (100k)</option>
                  </select>
                </div>
                <div className="mb-3">
                  <label className="form-label fw-bold">Modelo</label>
                  <select className="form-select" value={modelo} onChange={(e) => setModelo(e.target.value)}>
                    <option value="SVM">SVM</option>
                    <option value="Random Forest">Random Forest</option>
                    <option value="MLP">Red Neuronal (MLP)</option>
                    <option value="Regresión Logística">Regresión Logística</option>
                  </select>
                </div>
                <div className="d-grid mt-4">
                  <button type="submit" className="btn btn-primary btn-lg" disabled={isTraining}>
                    {isTraining ? 'Procesando...' : 'Desplegar Entrenamiento'}
                  </button>
                </div>
              </form>
            </div>
          </div>

          {/* Consola de Estado */}
          {status.visible && (
            <div className={`alert ${status.tipo} mt-3 shadow-sm`} role="alert">
              {status.mensaje}
            </div>
          )}
        </div>

        {/* LEADERBOARD (Derecha) */}
        <div className="col-md-8">
          <div className="card shadow-sm border-0">
            <div className="card-header bg-success text-white">
              <h5 className="mb-0">🏆 Leaderboard Global</h5>
            </div>
            <div className="card-body p-0">
              <table className="table table-hover table-striped mb-0 text-center">
                <thead className="table-light">
                  <tr>
                    <th>Rango</th>
                    <th>Modelo</th>
                    <th>Precisión</th>
                    <th>Tiempo</th>
                  </tr>
                </thead>
                <tbody>
                  {leaderboard.length === 0 ? (
                    <tr><td colSpan="4" className="text-muted py-4">No hay resultados en la red.</td></tr>
                  ) : (
                    leaderboard.map((item, index) => (
                      <tr key={index}>
                        <td><strong>#{index + 1}</strong></td>
                        <td>{item.modelo}</td>
                        <td><span className="badge bg-success">{item.accuracy}</span></td>
                        <td>{item.tiempo} s</td>
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
  );
}

export default App;
