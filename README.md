# MLOps Command Center - PWA

![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![FastAPI](https://img.shields.io/badge/FastAPI-005571?style=for-the-badge&logo=fastapi)
![Docker](https://img.shields.io/badge/Docker-2496ED?style=for-the-badge&logo=docker&logoColor=white)
![Scikit-learn](https://img.shields.io/badge/scikit--learn-%23F7931E.svg?style=for-the-badge&logo=scikit-learn&logoColor=white)

## 📌 Descripción del Proyecto
Este proyecto consiste en una aplicación web progresiva (PWA) y una API Gateway orientada a **MLOps** (Machine Learning Operations). Permite la orquestación y entrenamiento distribuido de múltiples algoritmos de Machine Learning sobre diferentes datasets sintéticos, presentando los resultados y el rendimiento (accuracy y tiempo de ejecución) en un Leaderboard global sincronizado en tiempo real.

Desarrollado para la materia de **Sistemas Distribuidos (7CM1)** en la **Escuela Superior de Cómputo (ESCOM) - Instituto Politécnico Nacional**.

## 🧑‍💻 Autor
* **José Roberto López Reyes**

## ✨ Características
* **Interfaz Web PWA:** Frontend responsivo construido con React 19, Vite y Bootstrap 5.
* **Entrenamiento de Modelos de ML:** Soporte para SVM, Random Forest, MLP (Red Neuronal Multicapa), Regresión Logística, Árboles de Decisión, Naive Bayes, KNN, Gradient Boosting y AdaBoost.
* **Datasets Escalables:** Opciones de generación de datasets sintéticos base (10k muestras) y de alta dimensionalidad (100k muestras).
* **Leaderboard Global:** Tabla de posiciones en memoria compartida que registra el *accuracy* y la latencia (tiempo de ejecución) de cada entrenamiento.
* **Contenedorización:** Infraestructura completa orquestada con Docker Compose, aislando el Frontend y Backend en una red compartida.

## 🏗️ Arquitectura y Tecnologías

### Frontend (`/frontend`)
* **Framework:** React 19 + Vite
* **Estilos:** Bootstrap 5.3 + CSS personalizado (Glassmorphism)
* **PWA:** Vite PWA Plugin

### Backend (`/backend`)
* **Framework:** FastAPI (Python)
* **Machine Learning:** Scikit-learn
* **CORS:** Habilitado para comunicación transparente con el frontend.

### Infraestructura (`docker-compose.yml`)
* **Docker:** Imágenes individuales construidas vía Dockerfile para frontend y backend.
* **Docker Compose:** Red en puente (`mlops-network`) para intercomunicación, exponiendo los puertos `80` para el cliente y `8000` para la API.

## 🚀 Guía de Instalación y Ejecución

### Prerrequisitos
* [Docker](https://www.docker.com/) y [Docker Compose](https://docs.docker.com/compose/) instalados en tu entorno local.

### Despliegue con Docker
1. Clona el repositorio y navega al directorio raíz del proyecto:
   ```bash
   git clone https://github.com/RobertLopez893/MLOps-PWA
   cd MLOps-PWA-main
   ```
2. Construye y levanta los contenedores en segundo plano:
   ```bash
   docker-compose up --build -d
   ```
3. Accede a los servicios desde tu navegador:
   * **Frontend (App Web):** [http://localhost](http://localhost)
   * **Backend API:** [http://localhost:8000](http://localhost:8000)
   * **Documentación Interactiva (Swagger):** [http://localhost:8000/docs](http://localhost:8000/docs)

## 📡 Endpoints de la API

| Método | Endpoint | Descripción | Body / Params |
|--------|----------|-------------|---------------|
| `POST` | `/api/entrenar` | Entrena un modelo seleccionado con el dataset especificado y calcula su precisión. | `{ "dataset": "sintetico_10k", "modelo": "SVM" }` |
| `GET`  | `/api/leaderboard` | Devuelve la tabla de posiciones con los modelos registrados y ordenados por *accuracy*. | N/A |

## 📄 Licencia
Proyecto desarrollado con fines académicos.
