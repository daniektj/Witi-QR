const data = document.getElementById('data');
const desc = document.getElementById('desc');
const cpu = document.getElementById('cpu');
const pantalla = document.getElementById('pantalla');
const fecha = document.getElementById('fecha');
const fileInput = document.getElementById("archivo");
const downloadBtn = document.getElementById('downloadBtn');
// let ruta = '';

// Con este Listener actualizamos la Data
// si el usuario decidio agregar una imagen.
// fileInput.addEventListener('change', (event) => {

//     const file_box = document.getElementById('file_box');
//     file_box.innerHTML = event.target.files[0].name

//     // Obtenemos el archivo de imagen seleccionado
//     const imageFile = event.target.files[0];
//     ruta = new FileReader();

//     // Convertir el archivo de imagen a una cadena de texto
//     ruta.readAsDataURL(imageFile);
// });




let rutaBase64 = ''; // Variable para almacenar la imagen en Base64

// Cargar la imagen fija y convertirla a Base64
function loadImageToBase64(url, callback) {
    const img = new Image();
    img.crossOrigin = 'Anonymous'; // Esto es necesario para evitar problemas de CORS
    img.onload = function() {
        const canvas = document.createElement('canvas');
        canvas.width = img.width;
        canvas.height = img.height;
        const ctx = canvas.getContext('2d');
        ctx.drawImage(img, 0, 0);
        const dataURL = canvas.toDataURL('image/png');
        callback(dataURL);
    };
    img.src = url;
}


// Llamar a la función para cargar la imagen
loadImageToBase64('assets/images/witi-qr.png', function(base64Image) {
    rutaBase64 = base64Image;
});






formulario.addEventListener('submit', (e) => {
    e.preventDefault();
    codi()
})

function codi() {

    // Limpiamos el DIV
    var obj = document.getElementById("qrcode");
    obj.innerHTML = ""
    // Construimos el texto con saltos de línea
    /* let textData = `Código: ${data.value}\nDescripcion: ${desc.value}\nCPU: ${cpu.value}\nPantalla: ${cpu.value}\nFecha: ${fecha.value}`; */
    let textData = `Código: ${data.value}\nPantalla: ${pantalla.value}\nCPU: ${cpu.value}\nDescripcion: ${desc.value}\nFecha: ${fecha.value}` ;


    let options = {
        /* text: data.value ? data.value : "Daniek QR Generator", */
        text: textData,
        width: 1080,
        height: 1080,
        dotScale: 1,
        quietZone: 32,
        colorDark: "#000000",
        colorLight: "#ffffff",
        logo: rutaBase64,
        correctLevel: QRCode.CorrectLevel.H, // L, M, Q, H
    };
    // Crea el QRCode usando la libreria
    new QRCode(document.getElementById("qrcode"), options);

        // Muestra el botón de descarga
        downloadBtn.style.display = 'flex';

}

// Evento para descargar la imagen del QR
downloadBtn.addEventListener('click', () => {
    const qrCanvas = document.querySelector('#qrcode canvas');
    const qrImage = qrCanvas.toDataURL('image/png');
    const link = document.createElement('a');
    link.href = qrImage;
    link.download = 'qr_code.png';
    link.click();
});


