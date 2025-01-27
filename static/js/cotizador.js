// Añade un event listener al botón con el id "calcular-btn" que ejecuta la función cuando se hace clic en él.
document.getElementById("calcular-btn").addEventListener("click", function() {
    
    // Obtiene el valor ingresado por el usuario en el campo con id "inversion" y lo convierte a tipo número flotante (decimal).
    const monto = parseFloat(document.getElementById("inversion").value);
    
    // Obtiene el valor ingresado por el usuario en el campo con id "anos" y lo convierte a tipo número entero.
    const anos = parseInt(document.getElementById("anos").value);

    // Verifica si los valores ingresados son válidos (números positivos).
    // Si alguno no es válido, muestra un mensaje de error y termina la ejecución de la función.
    if (isNaN(monto) || isNaN(anos) || monto <= 0 || anos <= 0) {
        document.getElementById("resultado").innerHTML = `
            <div class="alert alert-danger">Por favor, ingresa valores válidos.</div>
        `;
        return;  // Termina la ejecución de la función si los valores no son válidos.
    }

    // Crea un objeto con los datos a enviar a la API.
    const data = {
        inversion: monto,
        tasa_anual: 0.10,  // Asumiendo una tasa anual del 10%
        anos: anos
    };

    // Realiza la solicitud POST a la API
    fetch('/api/calcular_roi', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
    .then(response => response.json())
    .then(data => {
        // Muestra el resultado de la API en el HTML
        let resultadoHTML = `<h4 class="text-center">Retorno de Inversión</h4>`;
        
        resultadoHTML += `<table class="table table-bordered mt-3">
            <thead>
                <tr>
                    <th>Año</th>
                    <th>Ganancia Estimada (MXN)</th>
                </tr>
            </thead>
            <tbody>`;

        // Itera sobre los años y muestra el resultado de la API
        for (let i = 1; i <= anos; i++) {
            // Usamos el retorno de inversión calculado por la API
            const ganancia = data.retorno_inversion * Math.pow(1.10, i);
            
            // Añade una fila a la tabla con el año y la ganancia estimada
            resultadoHTML += `
                <tr>
                    <td>${i}</td>
                    <td>${ganancia.toFixed(2)}</td>
                </tr>
            `;
        }

        // Cierra las etiquetas de la tabla y muestra el resultado
        resultadoHTML += `</tbody></table>`;
        document.getElementById("resultado").innerHTML = resultadoHTML;
    })
    .catch(error => {
        console.error('Error:', error);
        document.getElementById("resultado").innerHTML = `
            <div class="alert alert-danger">Hubo un error al calcular el retorno de inversión.</div>
        `;
    });
});
