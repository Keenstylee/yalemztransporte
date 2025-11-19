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

// Forzar apertura del calendario al hacer click en cualquier parte del input
document.querySelectorAll('input[type="date"]').forEach(input => {
    input.addEventListener('click', function() {
        this.showPicker(); // Abre el calendario en navegadores modernos
    });
});


// ======================
// Animaciones: entradas y visuales
// ======================
(function() {
    const observerOptions = { root: null, rootMargin: "0px 0px -10% 0px", threshold: 0.08 };

    const fadeTargets = document.querySelectorAll(
        ".hero-overlay, .main-content-wrapper, .search-form-section, .our-services-showcase, .service-card"
    );

    fadeTargets.forEach(el => {
        if (!el.classList.contains('fade-in')) el.classList.add('fade-in');
    });

    const io = new IntersectionObserver((entries, obs) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');

                if (entry.target.classList.contains('hero-overlay')) {
                    entry.target.classList.add('intro');
                }

                if (entry.target.classList.contains('service-card')) {
                    const parent = entry.target.parentElement;
                    const nodes = Array.from(parent.children);
                    const idx = nodes.indexOf(entry.target);
                    entry.target.style.transitionDelay = (idx * 80) + "ms";
                }

                obs.unobserve(entry.target);
            }
        });
    }, observerOptions);

    fadeTargets.forEach(t => io.observe(t));

    const primaryButtons = document.querySelectorAll('.search-btn, .reclamaciones-btn, .whatsapp-btn');
    primaryButtons.forEach((btn, i) => {
        setTimeout(() => btn.classList.add('btn-animate'), 220 + (i * 80));
    });

    const wa = document.querySelector('.whatsapp-btn');
    if (wa) {
        setTimeout(() => wa.classList.add('pulse'), 900);
    }

    function markInputError(el) {
        if (!el) return;
        el.classList.add('input-error');
        setTimeout(() => el.classList.remove('input-error'), 1200);
        try { el.focus(); } catch(e) {}
    }

    const busForm = document.querySelector('.bus-search-form');
    if (busForm) {
        busForm.addEventListener('submit', function(e){
            const origen = document.getElementById('origen');
            const destino = document.getElementById('destino');
            const salida = document.getElementById('salida');

            if (!origen.value) { markInputError(origen); }
            if (!destino.value) { markInputError(destino); }
            if (!salida.value) { markInputError(salida); }
        });
    }

    const libroForm = document.querySelector('.reclamaciones-form');
    if (libroForm) {
        libroForm.addEventListener('submit', function(e){
            const nombre = document.getElementById('nombre');
            const telefono = document.getElementById('telefono');
            const reclamacion = document.getElementById('reclamacion');

            if (!nombre.value.trim()) markInputError(nombre);
            if (!/^[0-9]{9}$/.test(telefono.value.trim())) markInputError(telefono);
            if (reclamacion.value.trim().length < 20) markInputError(reclamacion);
        });
    }

})();

    
});