function convertir() {
    var name = $('#nombre').val();
    $('#nombre2').val(jsonParser(name));
    var value = $('#nombreLargo').val();
    $('#nombreLargo2').val(jsonParser(value));

    value = $('#descripcion').val();
    $('#descripcion2').val(jsonParser(value));

    var marca = $('#marca').val();
    var categoria = $('#categoria').val();

    $('#productUrlEs').val(getUrl(categoria, marca, name));


    value = $('#ventajas').val();
    $('#ventajas2').val(getVentajas(value));


    value = $('#especificaciones').val();
    $('#especificaciones2').val(generarTabla(value, marca));
    $('#featuredSpecifications').val(getFeatured(value, marca));


    value = $('#caracteristicas').val();
    $('#caracteristicas2').val(getCaracteristicas(value));
}
function jsonParser(texto) {
    if (texto == "") { return; }
    const resultado = {
        "en_GB": "",
        "es_ES": texto
    };
    return JSON.stringify(resultado);
}
function getUrl(categoria, marca, name) {
    return toUrl(categoria) + "-" + toUrl(marca) + "-" + toUrl(name)
}

function toUrl(texto) {
    if (texto == "") { return ""; }
    // Convertir todo a minúsculas
    texto = texto.toLowerCase();

    // Reemplazar espacios por guiones
    texto = texto.replace(/\s+/g, '-');

    // Eliminar caracteres especiales (quitar cualquier cosa que no sea letra, número o guion)
    texto = texto.replace(/[^\w\-]+/g, '');

    return texto;
}

function getVentajas(texto) {
    if (texto == "") { return; }
    // Dividir el texto por saltos de línea
    const partes = texto.split(/\r?\n/);

    // Envolver cada parte en un elemento <p>
    const parrafos = partes.map(parte => `<p>${parte}</p>`).join('\n');

    // Retornar las secciones con los párrafos en la parte de "es_ES"
    return `<section class="en_GB">   
</section>
<section class="es_ES">
${parrafos}
</section>`;
}

function generarTabla(texto, marca) {
    if (texto == "") { return; }
    // Dividir el texto en líneas (filas)
    const filas = texto.split(/\r?\n/);

    // Construir las filas de la tabla
    let filasHTML = filas.map(fila => {
        // Dividir cada fila en celdas usando tabuladores
        const celdas = fila.split(/\t/);

        // Generar el HTML para cada fila de la tabla
        return `                    <tr>
                        <td>${celdas[0]}</td>
                        <td>${celdas[1]}</td>
                    </tr>`;
    }).join('\n');

    // Retornar el HTML completo con la tabla
    return `<section class="en_GB">   
</section>
<section class="es_ES">
    <div class="accordion show-ac">
        <div class="accordion-title df pr-10 cp aic bb-gray2">
            <h4>Especificaciones</h4>
        </div>

        <div class="accordion-content">
            <table>
                <tbody>
${filasHTML}
                </tbody>
            </table>
        </div>
    </div>
</section>`;
}
function getFeatured(texto, marca) {
    if (texto == "") { return; }
    // Dividir el texto en líneas (filas)
    const filas = texto.split(/\r?\n/);

    // Limitar a las primeras 3 filas
    const filasLimitadas = filas.slice(0, 3);

    // Construir el HTML para las filas
    let contenidoHTML = filasLimitadas.map(fila => {
        // Dividir cada fila en campos usando tabuladores
        const campos = fila.split(/\t/);

        // Generar el HTML para cada fila
        return `     <div class="dfc sb mt-5 mb-5 grid-2 gap-10">
         <p class="name">${campos[0]}</p>
         <p class="value mt-0 bold tar">${campos[1]}</p>
     </div>`;
    }).join('\n');

    // Retornar el HTML completo con las secciones
    return `<section class="en_GB">   
</section>
<section class="es_ES">
 <div class="c-info font-14 c-neutral900">
     ${contenidoHTML}
 </div>
</section>`;
}

function getCaracteristicas(texto) {
    if (texto == "") { return; }
    // Verificar si el texto incluye el marcador [Imagen]
    const incluyeImagen = texto.includes('[Imagen]');

    // Extraer el texto sin el marcador [Imagen]
    const textoSinImagen = texto.replace('[Imagen]', '').trim();

    // Construir el HTML de la imagen si se incluye el marcador
    const imgSectionHTML = incluyeImagen ? `
                <div class="img-section">
                    <div class="img-content">
                        <p>FEATURE_IMAGE</p>
                    </div>
                </div>` : '';

    // Construir la sección HTML
    return `
<section class="en_GB">
</section>
<section class="es_ES">
    <div class="feature-nav">
        <div class="selected" id="data-feature-1">
            <h4>Caracteristicas</h4>
        </div>
    </div>

    <div class="feature-content">
        <div class="feature" id="feature-1">
            <div class="features-container">
                ${imgSectionHTML}
                <div>
                    <p>${textoSinImagen}</p>
                </div>
            </div>
        </div>
    </div>
</section>`;

}