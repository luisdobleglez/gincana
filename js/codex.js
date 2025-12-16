

const navegando = new Navegacion({
    enlaces: '#menu',
    inicio: '#inicio',
    duracionTransicion: 500
});


document.addEventListener('DOMContentLoaded', () => {

    const menu = document.querySelector("#menu ul");
    const botonMenu = document.querySelector("#menu button");
    for (let i = 0; i < 3; i++) {
        const u = document.createElement("u");
        botonMenu.appendChild(u);
    }
    function abreCierraMenu() {

        menu.classList.toggle("visible");
        botonMenu.children[0].classList.toggle('abierto')
        botonMenu.children[1].classList.toggle('oculto')
        botonMenu.children[2].classList.toggle('abierto')
    }


    botonMenu.addEventListener("click", abreCierraMenu);
    const losAesMenu = document.querySelectorAll("#menu a");
    for (let elA of losAesMenu) {
        elA.addEventListener('click', abreCierraMenu)
    }

   
    window.addEventListener("scroll", function () {
        let menu = document.querySelector("header");
        let contenido = document.querySelector("main");
        if (window.scrollY > 100) {
            menu.classList.add("pegajoso");
            contenido.classList.add("pegajoso");
        } else {
            menu.classList.remove("pegajoso");
            contenido.classList.remove("pegajoso");
        }
    });

   

    function crear(cosa) {
        if (document.querySelector('.criatura')) {
            document.querySelector('.criatura').remove()
        }
        const criatura = document.createElement('div');
        criatura.classList.add('criatura')
        criatura.style.width = cosa.offsetWidth + 'px';
        criatura.style.height = cosa.offsetHeight + 'px';
        criatura.style.top = cosa.offsetTop + 'px';
        criatura.style.left = cosa.offsetLeft + 'px';

        document.body.appendChild(criatura);


    }

    /*   const activos = document.querySelectorAll('h1,h2,h3');
      
      for (let activo of activos) {
          activo.addEventListener('mouseover', function(e) {
              e.stopPropagation(); // Por si el body está interfiriendo
              crear(activo);
            
              document.querySelector('output').innerHTML = e.target.tagName
          });
      }
      
      document.addEventListener('click', e => {
          console.log('click en', e.target.tagName);
      });
      
   */

})


