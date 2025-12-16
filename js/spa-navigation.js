class Navegacion {
    constructor({ enlaces = '#menu', inicio = 'inicio', duracionTransicion = 500 } = {}) {
        this.enlaces = enlaces;
        this.inicio = inicio;
        this.duracionTransicion = duracionTransicion;

        this.establecerEstilos();
        this.ocultarTodo();
        this.navegar();
        this.cargarDesdeURL();
    }

    establecerEstilos() {
        let estilos = document.querySelector('head style');
        if (!estilos) {
            estilos = document.createElement('style');
            document.head.appendChild(estilos);
        }
        estilos.innerHTML += `
            .pg {
                min-height: 100vh;
                transition: opacity ${this.duracionTransicion}ms ease;
            }
        `;
    }

    ocultarTodo() {
        document.querySelectorAll('.pg').forEach(el => {
            el.style.display = 'none';
            el.style.opacity = 0;
        });
    }

    navegar() {
        const links = document.querySelectorAll(`${this.enlaces} a`);

        links.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();

                const targetId = link.getAttribute('href').replace('#', '');
                this.mostrarSeccion(targetId);

                history.pushState({}, '', `#${targetId}`);
            });
        });

        window.addEventListener('popstate', () => {
            this.cargarDesdeURL();
        });
    }

    cargarDesdeURL() {
        const hash = window.location.hash.replace('#', '') || this.inicio;
        this.mostrarSeccion(hash);
    }

    mostrarSeccion(id) {
        const section = document.getElementById(id);
        if (!section) return;

        this.ocultarTodo();

        section.style.display = 'block';
        requestAnimationFrame(() => {
            section.style.opacity = 1;
        });

        document.body.className = '';
        document.body.classList.add(id);

        console.log('Sección activa:', id);
    }
}

document.addEventListener('DOMContentLoaded', () => {
    new Navegacion({
        enlaces: '#menu',
        inicio: 'inicio',
        duracionTransicion: 500
    });
});
