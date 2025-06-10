// Ruta a tu archivo PDF
const pdfPath = '/media/pdfs/descubre_pulpi.pdf';

// Configurar el worker de PDF.js
// IMPORTANTE: La ruta a pdf.worker.js debe ser correcta desde tu HTML

// Obtener el canvas y su contexto
const canvas = document.getElementById('pdfCanvas');
const ctx = canvas.getContext('2d');

let pdfDoc = null; // Variable para almacenar el documento PDF
let pageNum = 1;   // Página actual
let pageRendering = false; // Bandera para evitar renderizar varias páginas a la vez
let pageNumPending = null; // Página a la que ir si hay una renderización en curso

// Elementos de la interfaz (si los tienes)
const firstPageBtn = document.getElementById('firstPageBtn');
const prevPageBtn = document.getElementById('prevPage');
const nextPageBtn = document.getElementById('nextPage');
const pageNumberSpan = document.getElementById('pageNumber');
const totalPagesSpan = document.getElementById('totalPages');
const pdfNavButtons = document.getElementById('pdfNavButtons'); // El div con los botones

/**
 * Get page info from document, resize canvas accordingly, and render page.
 * @param num Page number.
 */
async function renderPage(num) {
    pageRendering = true;

    // Usar 'async' para el page.then() para que sea más legible
    try {
        const page = await pdfDoc.getPage(num);

        const viewport = page.getViewport({ scale: 1 }); // Escala inicial 1

        // Ajustar el tamaño del canvas al tamaño del contenedor, manteniendo la proporción del PDF
        const container = document.getElementById('pdf-viewer-container');
        let scale = Math.min(container.clientWidth / viewport.width, container.clientHeight / viewport.height);

        // Si el contenedor es más alto que ancho, o el PDF es más alto que ancho, ajustamos para que ocupe el ancho completo
        // Puedes ajustar esta lógica de escalado según cómo quieras que se vea el PDF
        // Por ejemplo, para que siempre ocupe el 100% del ancho del contenedor:
        scale = container.clientWidth / viewport.width;

        const scaledViewport = page.getViewport({ scale: scale });

        canvas.height = scaledViewport.height;
        canvas.width = scaledViewport.width;

        // Renderizar la página en el contexto del canvas
        const renderContext = {
            canvasContext: ctx,
            viewport: scaledViewport,
        };
        const renderTask = page.render(renderContext);

        // Esperar a que la renderización se complete
        await renderTask.promise;
        pageRendering = false;

        if (pageNumPending !== null) {
            // Nueva página solicitada mientras una renderización estaba en curso
            renderPage(pageNumPending);
            pageNumPending = null;
        }

        // Actualizar el número de página en la interfaz
        if (pageNumberSpan) pageNumberSpan.textContent = num;
        // Habilitar/Deshabilitar botones
        if (prevPageBtn) prevPageBtn.disabled = pageNum <= 1;
        if (nextPageBtn) nextPageBtn.disabled = pageNum >= pdfDoc.numPages;

    } catch (reason) {
        console.error('Error al renderizar la página:', reason);
        pageRendering = false;
    }
}

/**
 * If another page rendering in progress, waits until the rendering is
 * finished. Otherwise, executes rendering immediately.
 */
function queueRenderPage(num) {
    if (pageRendering) {
        pageNumPending = num;
    } else {
        renderPage(num);
    }
}

/**
 * Displays previous page.
 */
function onPrevPage() {
    if (pageNum <= 1) {
        return;
    }
    pageNum--;
    queueRenderPage(pageNum);
}

/**
 * Displays next page.
 */
function onNextPage() {
    if (pageNum >= pdfDoc.numPages) {
        return;
    }
    pageNum++;
    queueRenderPage(pageNum);
}

/**
 * Displays the first page.
 */
function onFirstPage() {
    pageNum = 1; // Asegurarse de que pageNum esté en 1
    queueRenderPage(pageNum);
}

// Asignar eventos a los botones (si existen)
if (firstPageBtn) firstPageBtn.addEventListener('click', onFirstPage);
if (prevPageBtn) prevPageBtn.addEventListener('click', onPrevPage);
if (nextPageBtn) nextPageBtn.addEventListener('click', onNextPage);

// Cargar el documento PDF
pdfjsLib.getDocument(pdfPath).promise.then(function(pdfDoc_) {
    pdfDoc = pdfDoc_;
    if (totalPagesSpan) totalPagesSpan.textContent = pdfDoc.numPages; // Actualizar número total de páginas

    // Ocultar los botones de navegación si quieres solo el PDF
    // Descomenta la siguiente línea para ocultarlos
    // if (pdfNavButtons) pdfNavButtons.style.display = 'none';

    renderPage(pageNum); // Renderizar la primera página
}).catch(function(reason) {
    // PDF loading error
    console.error('Error al cargar el PDF: ' + reason);
});

// Opcional: Ajustar el tamaño del PDF si la ventana cambia de tamaño
window.addEventListener('resize', () => {
    if (pdfDoc) {
        queueRenderPage(pageNum);
    }
});