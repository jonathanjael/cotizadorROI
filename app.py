from flask import Flask, render_template, request, jsonify

app = Flask(__name__)

# Función para calcular el Retorno de Inversión (ROI)
def calcular_roi(monto, tasa_anual, anos):
    # Fórmula para calcular ROI
    retorno = monto * (1 + tasa_anual) ** anos
    return retorno

# Ruta principal de la aplicación (para renderizar la página HTML)
@app.route('/')
def home():
    return render_template('index.html')

# Ruta de la API para calcular el ROI
@app.route('/api/calcular_roi', methods=['POST'])
def calcular_roi_api():
    # Obtener datos de la solicitud
    data = request.get_json()

    # Validar si los datos están presentes
    if 'monto' not in data or 'tasa_anual' not in data or 'anos' not in data:
        return jsonify({"error": "Faltan datos necesarios"}), 400

    monto = data['monto']
    tasa_anual = data['tasa_anual']
    anos = data['anos']

    # Calcular el ROI
    resultado = calcular_roi(monto, tasa_anual, anos)

    # Devolver el resultado en formato JSON
    return jsonify({"retorno_inversion": resultado})

# Iniciar el servidor Flask
if __name__ == '__main__':
    app.run(debug=True)
