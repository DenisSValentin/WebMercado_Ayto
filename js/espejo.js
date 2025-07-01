const video = document.getElementById('video');
const canvas = document.getElementById('canvas');
const descargar = document.getElementById('descargar');
const botonesIniciales = document.getElementById('botones-iniciales');
const botonesFoto = document.getElementById('botones-foto');

let stream = null;

async function iniciarCamara() {
    try {
        stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: "user" }, audio: false });
        video.srcObject = stream;

        // Invertir el vídeo
        video.style.transform = 'scaleX(-1)';

        video.onloadedmetadata = () => {
            video.play();
        };
    } catch (err) {
        alert('Error al acceder a la cámara: ' + err.message);
        console.error(err);
    }
}

function tomarFoto() {
    const contexto = canvas.getContext('2d');
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;

    // Guardamos el estado original del contexto.
    contexto.save();
    
    // Invertimos el eje horizontal para el efecto espejo.
    contexto.scale(-1, 1);
    
    // Movemos el lienzo para que la imagen no se dibuje fuera de la vista.
    contexto.translate(-canvas.width, 0);

    // Dibujamos la imagen del video, que ahora se renderizará invertida.
    contexto.drawImage(video, 0, 0, canvas.width, canvas.height);

    // Restauramos el contexto a su estado original para no afectar futuros dibujos.
    contexto.restore();

    // Ocultamos el video y mostramos el canvas con la foto.
    video.classList.add('d-none');
    canvas.classList.remove('d-none');
    
    // Ocultamos los botones iniciales y mostramos los de la foto.
    botonesIniciales.classList.add('d-none');
    botonesFoto.classList.remove('d-none');

    // Creamos la URL para poder descargar la imagen.
    // canvas.toBlob(blob => {
    //     const url = URL.createObjectURL(blob);
    //     descargar.href = url;
    // }, 'image/png');

    // Obtenemos la imagen como una URL de datos (Base64)
    const dataUrl = canvas.toDataURL('image/png');
    const enlaceEmail = document.getElementById('enviar-email');

    // Definimos los parámetros del email
    const destinatario = "correo@ejemplo.com"; // <-- CAMBIA ESTO por el email de destino
    const asunto = "¡Mira la foto que he tomado!";
    
    // Creamos el cuerpo del email con la imagen incrustada
    // Usamos encodeURIComponent para asegurar que los caracteres especiales funcionen
    const cuerpo = encodeURIComponent(
        `Hola,\n\nAdjunto la foto que he tomado con el tótem.\n\n` +
        `<img src="${dataUrl}" alt="Foto tomada" width="400" />`
    );

    // Asignamos todos los datos al enlace 'mailto:'
    enlaceEmail.href = `mailto:${destinatario}?subject=${asunto}&body=${cuerpo}`;
}

function repetirFoto() {
    video.classList.remove('d-none');
    canvas.classList.add('d-none');
    botonesIniciales.classList.remove('d-none');
    botonesFoto.classList.add('d-none');
}

// Iniciar cámara al cargar
window.addEventListener('DOMContentLoaded', iniciarCamara);
