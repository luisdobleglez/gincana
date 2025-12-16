class Navegacion {
    constructor({ enlaces = '#menu', inicio = 'inicio', duracionTransicion = 500 } = {}) {
        this.enlaces = enlaces;
        this.inicio = inicio;
        this.duracionTransicion = duracionTransicion;
        this.establecerEstilos();
        this.navegar();
        this.cargarDesdeURL(); // Carga inicial basada en la URL
    }

    establecerEstilos() {
        const estilos = document.querySelector('head style') || document.createElement('style');
        estilos.innerHTML += '.pg { min-height: 100vh; transition: all ' + this.duracionTransicion + 'ms ease; }';
        if (!estilos.parentNode) document.head.appendChild(estilos);
    }

    navegar() {
        const links = document.querySelectorAll(`${this.enlaces} a`);

        const resetear = () => {
            document.querySelectorAll('.pg').forEach(element => {
                element.style.display = 'none';
                element.style.opacity = 0;
            });
        };

        links.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();

                const targetId = link.getAttribute('href').replace('#', '');
                const targetElement = document.getElementById(targetId);

                if (targetElement) {
                    resetear();
                    targetElement.style.display = 'block';
                    targetElement.style.opacity = 1;

                    document.body.className = "";
                    document.body.classList.add(targetId);

                    // Actualizar la URL sin #
                    history.pushState({}, "", `/#${targetId}`);
                    console.log('Elemento mostrado: ' + targetId);
                }
            });
        });

        // Escuchar los cambios de historial (botón atrás/adelante del navegador)
        window.addEventListener("popstate", () => {
            this.cargarDesdeURL();
        });
    }

    cargarDesdeURL() {
        let path = window.location.pathname.replace('/', '') || this.inicio; // Obtener ruta sin "/"

        const section = document.getElementById(path);
        if (section) {
            document.querySelectorAll('.pg').forEach(el => el.style.display = 'none');
            section.style.display = 'block';
            section.style.opacity = 1;
        }
    }
}

document.addEventListener("DOMContentLoaded", () => {
    new Navegacion({ enlaces: '#menu', inicio: 'inicio' });
});
