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

        // Asegúrate de que el video se reproduzca
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
    contexto.drawImage(video, 0, 0, canvas.width, canvas.height);

    video.classList.add('d-none');
    canvas.classList.remove('d-none');
    botonesIniciales.classList.add('d-none');
    botonesFoto.classList.remove('d-none');

    canvas.toBlob(blob => {
        const url = URL.createObjectURL(blob);
        descargar.href = url;
    });
}

function repetirFoto() {
    video.classList.remove('d-none');
    canvas.classList.add('d-none');
    botonesIniciales.classList.remove('d-none');
    botonesFoto.classList.add('d-none');
}

// Iniciar cámara al cargar
window.addEventListener('DOMContentLoaded', iniciarCamara);
