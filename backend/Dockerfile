# Usa una imagen oficial de Python ligera
FROM python:3.11-slim

# Establece el directorio de trabajo dentro del contenedor
WORKDIR /app

# Copia los requerimientos y los instala
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Copia el código fuente de la API
COPY api.py .

# Expone el puerto donde correrá Uvicorn
EXPOSE 8000

# Comando para encender el servidor
CMD ["uvicorn", "api:app", "--host", "0.0.0.0", "--port", "8000"]
