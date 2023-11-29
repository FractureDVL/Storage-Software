
from rest_framework.viewsets import ModelViewSet
from apps.core.models.categoria import Categoria
from apps.core.serializers.categoria import CategoriaSerializer
from rest_framework.permissions import AllowAny
from django.shortcuts import render
from django.http import HttpResponse
import matplotlib.pyplot as plt
import io
import base64

class CategoriaViewSet(ModelViewSet):
    model = Categoria
    serializer_class = CategoriaSerializer
    permission_classes = [AllowAny]
    queryset = Categoria.objects.all()

    def mostrar_grafico(self, request, categoria_id):
        # Lógica para generar el gráfico (sustituye esto con tu propia lógica)
        data = [ 3, 7, 9, 5, 4 ]
        plt.plot(data)
        plt.xlabel('Etiquetas')
        plt.ylabel('Valores')
        
        # Convertir el gráfico a una cadena base64
        img_data = io.BytesIO()
        plt.savefig(img_data, format='png')
        img_data.seek(0)
        img_base64 = base64.b64encode(img_data.read()).decode('utf-8')

        # Renderizar la plantilla con el gráfico
        return render(request, 'mostrar_grafico.html', {'img_base64': img_base64})