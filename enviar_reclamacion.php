<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Obtener los datos del formulario
    $nombre = $_POST['nombre'];
    $email = $_POST['email'];
    $reclamacion = $_POST['reclamacion'];

    // Configurar los detalles del correo electrónico
    $to = "tucorreo@tudominio.com"; // Cambia esto por tu correo electrónico
    $subject = "Reclamación o Sugerencia de: $nombre";
    $message = "Nombre: $nombre\nEmail: $email\n\nReclamación/Sugerencia:\n$reclamacion";
    $headers = "From: $email";

    // Enviar el correo
    if (mail($to, $subject, $message, $headers)) {
        echo "¡Gracias por tu reclamación! Nos pondremos en contacto contigo pronto.";
    } else {
        echo "Hubo un error al enviar tu reclamación. Por favor, inténtalo de nuevo.";
    }
}
?>