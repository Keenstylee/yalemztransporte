document.addEventListener("DOMContentLoaded", function () {

    /* ===============================
       ACORDEONES
    =============================== */
    const headers = document.querySelectorAll('.accordion-header');

    headers.forEach(header => {
        header.addEventListener('click', function () {
            this.classList.toggle('active');
            const content = this.nextElementSibling;
            content.classList.toggle('expanded');
        });
    });

    /* ===============================
       FUNCIÓN UNIVERSAL DE ERROR (MODAL)
    =============================== */
    function mostrarError(texto) {
        const errorModal = document.getElementById("modalError");
        const errorTexto = document.getElementById("modalErrorTexto");

        errorTexto.innerHTML = texto;
        errorModal.style.display = "flex";
    }

    /* ===============================
       FORMULARIO DE VIAJES
    =============================== */
    const formViaje = document.getElementById("formViaje");

    if (formViaje) {
        formViaje.addEventListener("submit", function (e) {
            e.preventDefault();

            let origen = document.getElementById("origen").value;
            let destino = document.getElementById("destino").value;
            let salida = document.getElementById("salida").value;
            let retorno = document.getElementById("retorno").value;

            if (!origen || !destino || !salida) {
                mostrarError("⚠️ Complete todos los campos obligatorios.");
                return;
            }

            if (origen === destino) {
                mostrarError("🚫 El origen y destino no pueden ser iguales.");
                return;
            }

            if (retorno && retorno < salida) {
                mostrarError("⛔ La fecha de retorno no puede ser menor que la salida.");
                return;
            }

            const textoBusqueda = `
                <strong>Origen:</strong> ${origen}<br>
                <strong>Destino:</strong> ${destino}<br>
                <strong>Salida:</strong> ${salida}<br>
                <strong>Retorno:</strong> ${retorno || "Sin retorno"}
            `;

            document.getElementById("modalBusquedaTexto").innerHTML = textoBusqueda;
            document.getElementById("modalBusqueda").style.display = "flex";
        });
    }

    /* ===============================
       FORMULARIO DE RECLAMACIONES
    =============================== */
    const formReclamo = document.getElementById("formReclamo");

    if (formReclamo) {
        formReclamo.addEventListener("submit", function (e) {
            e.preventDefault();

            let nombre = document.getElementById("nombre").value.trim();
            let telefono = document.getElementById("telefono").value.trim();
            let reclamo = document.getElementById("reclamacion").value.trim();

            if (!nombre || !telefono || !reclamo) {
                mostrarError("⚠️ Complete todos los campos.");
                return;
            }

            if (!/^[0-9]{9}$/.test(telefono)) {
                mostrarError("📱 El teléfono debe tener exactamente 9 dígitos.");
                return;
            }

            if (reclamo.length < 20) {
                mostrarError("📝 El reclamo debe tener mínimo 20 caracteres.");
                return;
            }

            const modalTexto = document.getElementById("modalTexto");
            modalTexto.innerHTML = `
                <strong>Nombre:</strong> ${nombre}<br>
                <strong>Teléfono:</strong> ${telefono}<br>
                <strong>Reclamo:</strong> ${reclamo}
            `;

            document.getElementById("modalReclamo").style.display = "flex";
            formReclamo.reset();
        });
    }

    /* ===============================
       CERRAR MODALES
    =============================== */
    document.getElementById("cerrarModal")?.addEventListener("click", () => {
        document.getElementById("modalReclamo").style.display = "none";
    });

    document.getElementById("cerrarModalError")?.addEventListener("click", () => {
        document.getElementById("modalError").style.display = "none";
    });

    document.getElementById("cerrarModalBusqueda")?.addEventListener("click", () => {
        document.getElementById("modalBusqueda").style.display = "none";
    });

    document.querySelectorAll(".modal-overlay").forEach(overlay => {
        overlay.addEventListener("click", function (e) {
            if (e.target === overlay) overlay.style.display = "none";
        });
    });

    /* ===============================
       MENÚ HAMBURGUESA
    =============================== */
    const hamburger = document.getElementById("hamburger");
    const mobileNav = document.getElementById("mobile-nav");
    const overlay = document.getElementById("menu-overlay");

    // Abrir menú
    hamburger.addEventListener("click", () => {
        mobileNav.classList.add("open");
        overlay.style.display = "block";
    });

    // Cerrar menú tocando afuera
    overlay.addEventListener("click", () => {
        mobileNav.classList.remove("open");
        overlay.style.display = "none";
    });

    // Cerrar menú tocando un enlace
    document.querySelectorAll("#mobile-nav a").forEach(link => {
        link.addEventListener("click", () => {
            mobileNav.classList.remove("open");
            overlay.style.display = "none";
        });
    });

});