const video = document.getElementById('video');

async function iniciarCamara() {
    let stream = null;

    try {
        // Solicita acceso a la cámara del usuario (frontal)
        stream = await navigator.mediaDevices.getUserMedia({ 
            video: { facingMode: "user" }, 
            audio: false 
        });

        // Asigna el stream de video al elemento <video>
        video.srcObject = stream;

        // Invierte el vídeo horizontalmente para un efecto espejo
        video.style.transform = 'scaleX(-1)';
        
        // El atributo 'autoplay' en el HTML ya se encarga de reproducir,
        // pero podemos asegurarnos con .play() por compatibilidad.
        video.onloadedmetadata = () => {
            video.play();
        };

    } catch (err) {
        // Muestra un error en la consola si el acceso a la cámara falla
        console.error("Error al acceder a la cámara: ", err);
        // Podrías mostrar un mensaje al usuario en el body
        document.body.innerHTML = `<p style="color: white; text-align: center;">No se pudo acceder a la cámara. Por favor, revisa los permisos.</p>`;
    }
}

// Inicia la cámara tan pronto como el contenido de la página se haya cargado
window.addEventListener('DOMContentLoaded', iniciarCamara);