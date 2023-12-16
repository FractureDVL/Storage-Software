# Proyecto de Gestión de Almacenes - EasyStorage

Este proyecto utiliza Django y React para crear una aplicación de gestión de almacenes. Proporciona funcionalidades para administrar inventarios, realizar seguimiento de productos y gestionar pedidos.

## Configuración del entorno

### Requisitos previos

Asegúrate de tener instalado Python y Node.js en tu sistema.

### Configuración del entorno virtual (Python)

```bash
python -m venv venv
source venv/bin/activate  # En sistemas basados en Unix
# o
.\venv\Scripts\activate  # En sistemas Windows
Instalación de dependencias de Python
bash
Copy code
pip install -r requirements.txt
Configuración del entorno de desarrollo (Node.js)
bash
Copy code
cd frontend
npm install
Iniciar la aplicación
Backend (Django)
bash
Copy code
python manage.py migrate
python manage.py runserver
La aplicación estará disponible en http://localhost:8000/.

Frontend (React)
En otra terminal, desde la carpeta "frontend":

bash
Copy code
npm start
La interfaz estará disponible en http://localhost:3000/.

Versiones de las bibliotecas
Django: 4.0.5
djangorestframework: 3.14.0
django-cors-headers: 3.14.0
django-jazzmin: 2.6.0
djangorestframework-simplejwt: 5.2.2
django-filter: 23.1
django-simple-history: 3.3.0
daphne: 4.0.0
channels_redis: 4.1.0
requests: 2.31.0
pillow: 10.0.1
Faker: 19.11.0
drf-yasg: 1.21.7
matplotlib: 3.8.2
reportlab: 4.0.7
kaleido: 0.2.1
pdfkit: 1.0.0
plotly: 5.18.0
pandas: 2.1.3
