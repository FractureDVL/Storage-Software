import base64
import os
from django.utils.timezone import datetime
from apps.core.models.categoria import Categoria
from apps.core.models.historial import ProductoPedido
from apps.core.models.producto import Producto
from django.views.generic import View
from django.template import Context, Template
import pdfkit
import plotly.express as px
from django.http import FileResponse
class ReporteView(View):
    def get(self, request, *args, **kwargs):
        template_string = """
        <!DOCTYPE html>
        <html lang="es">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Informe</title>
            <style>
                h1 {
                    text-align: center;
                    font-size: 18px
                }
                h2 {
                    font-size: 18px;
                    align-text: center;
                }
                table {
                    width: 100%;
                    border-collapse: collapse;
                    margin-top: 20px;
                }

                th, td {
                    border: 1px solid #dddddd;
                    text-align: left;
                    padding: 8px;
                }

                th {
                    background-color: #f2f2f2;
                }
            </style>
        </head>
        <body>
            <h1>Reporte de categorías:</h1>
             <table>
                <thead>
                    <tr>
                        <th>Nombre categoria</th>
                        <th>Productos</th>
                        <th>Promedio/Precio</th>
                    </tr>
                </thead>
                <tbody>
                    {% for categoria in datos_categoria %}
                        <tr>
                            <td>{{ categoria.nombre }}</td>
                            <td>{{ categoria.cantidad }}</td>
                            <td>{{ categoria.precio_promedio }}</td>       
                        </tr>
                    {% endfor %}
                </tbody>
            </table>
            <h2 style='width:100%; text-align:center;'>Distribución de Categorías (Gráfico de Torta):</h2>
            <div style=''>
                <img style="width: 400px;display: block; margin-left: auto;margin-right: auto;width: 50%;" src="data:image/png;base64,{{ grafico_torta }}" alt="Gráfico de Torta">
            </div>
            <h2>Detalles de los productos</h2>
            <table>
                <thead>
                    <tr>
                        <th>Nombre del Producto</th>
                        <th>Precio</th>
                        <th>Cantidad vendida</th>
                    </tr>
                </thead>
                <tbody>
                    {% for producto in datos_productos %}
                        <tr>
                            <td>{{ producto.nombre }}</td>
                            <td>{{ producto.precio }}</td>     
                            <td>{{ producto.cantidad_vendida }}</td>     
                        </tr>
                    {% endfor %}
                </tbody>
            </table>
        </body>
        </html>
        """
        categorias = Categoria.objects.all()
        context_categoria =  []
        
        for categoria in categorias:
            productos_categoria = Producto.objects.filter(categoria=categoria, estado=True)
            if productos_categoria.count() > 0:
                precio_promedio = sum(producto.precio for producto in productos_categoria) / productos_categoria.count()
            else:
                precio_promedio = 0
            
            context_categoria.append({'nombre': categoria.nombre, 'cantidad': productos_categoria.count(),
                                    'precio_promedio': precio_promedio})
            # Crear el gráfico de torta con Plotly Express
        fig = px.pie(
            names=[categoria['nombre'] for categoria in context_categoria],
            values=[categoria['cantidad'] for categoria in context_categoria],
        )

        # Convertir el gráfico a formato base64
        grafico_torta_base64 = base64.b64encode(fig.to_image(format="png")).decode("utf-8")
        context_producto = []
        productos_pedido = ProductoPedido.objects.all()
        productos = Producto.objects.all()
        for producto in productos:
            context_producto.append({'nombre':producto.nombre,
                                     'precio':producto.precio, 
                                     'cantidad_vendida': productos_pedido.filter(producto=producto).count()})

        context_dict = {
            'datos_categoria': context_categoria,
            "datos_productos": context_producto,
            'grafico_torta':grafico_torta_base64
        }

        template = Template(template_string)
        context = Context(context_dict)
        rendered_string = template.render(context)
        time = f'{datetime.now()}'

        nombre_archivo = f'reporte-{time}.pdf'
        pdfkit.from_string(rendered_string, nombre_archivo)
        pdfkit.from_string(rendered_string, f'reporte-{time}.pdf')
        archivito =  FileResponse(open(f'reporte-{time}.pdf', 'rb'))
        os.remove(f'reporte-{time}.pdf')
        return archivito