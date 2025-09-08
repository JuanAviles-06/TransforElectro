import React, { useEffect, useState, useRef, useCallback } from "react";
import '@fortawesome/fontawesome-free/css/all.min.css';
import logoSena from '../imagenes/logoSena.png';
import imagen8 from '../imagenes/Logo_TransforElectro.png'; // Logo TransforElectro
import './areas.css'; // Importa el CSS mejorado para Sensores
import imagen1 from '../imagenes/Diseño y simulacion.jpeg';
import imagen2 from '../imagenes/Manufactura PCB.jpeg';
import imagen3 from '../imagenes/Maquina Botellas.jpeg';
import imagen4 from '../imagenes/Maquina de Garra.jpeg';
import imagen5 from '../imagenes/Proyecto1.jpeg';
import imagen6 from '../imagenes/Proyecto2.jpeg';
import AreaPrincipal from '../imagenes/AreaPrincipal.jpeg';

function Areas() {


  // Estados para UI y animaciones de la página
  const [isLoaded, setIsLoaded] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [showBackToTop, setShowBackToTop] = useState(false);

  // Estados para el Popup
  const [mostrarPopup, setMostrarPopup] = useState(false);
  const [contenidoPopup, setContenidoPopup] = useState({ titulo: "", texto: "" });

  // Referencias para elementos DOM (en este caso, solo el contenedor principal si fuera necesario)
  const containerRef = useRef(null);

  // Efecto de carga inicial de la página
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 100);
    return () => clearTimeout(timer);
  }, []);

  // Intersection Observer para animaciones de entrada de elementos al hacer scroll
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible'); // Añade una clase para activar animaciones CSS
          } else {
            // Opcional: Remover la clase si quieres que la animación se repita al re-entrar
            // entry.target.classList.remove('is-visible');
          }
        });
      },
      {
        threshold: 0.1, // El elemento debe ser 10% visible para activar la animación
        rootMargin: '0px 0px -50px 0px' // Reduce el margen inferior para que se active un poco antes de llegar al final de la pantalla
      }
    );

    const elementsToObserve = document.querySelectorAll('.animate-on-scroll');
    elementsToObserve.forEach(el => {
      observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  // Manejar hover en imágenes (para efectos visuales en CSS)
  const handleImageHover = useCallback((e, isEntering) => {
    if (isEntering) {
      e.target.classList.add('hovered');
    } else {
      e.target.classList.remove('hovered');
    }
  }, []);

  // Efecto de brillo en botones al hover (la animación se maneja en CSS)
  const handleButtonHover = useCallback((e, isEntering) => {
    // La lógica de brillo se ha trasladado completamente a CSS con pseudo-elementos.
    // Esta función se mantiene para la consistencia o si se necesita alguna otra lógica JS en el futuro para el hover.
  }, []);


  // Lógica para abrir y cerrar el popup
  const abrirPopup = useCallback((titulo, texto) => {
    setContenidoPopup({ titulo, texto });
    setMostrarPopup(true);
  }, []); // Se ejecuta una sola vez al montar

  const cerrarPopup = useCallback(() => {
    setMostrarPopup(false);
  }, []); // Se ejecuta una sola vez al montar

  // Hook para controlar el scroll del body cuando el popup está visible
  useEffect(() => {
    if (mostrarPopup) {
      const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
      document.body.style.setProperty('--scrollbar-width', `${scrollbarWidth}px`);
      document.body.classList.add("no-scroll");
    } else {
      document.body.classList.remove("no-scroll");
      document.body.style.removeProperty('--scrollbar-width');
    }
    // Función de limpieza para asegurar que el scroll se restaura si el componente se desmonta
    return () => {
      document.body.classList.remove("no-scroll");
      document.body.style.removeProperty('--scrollbar-width');
    };
  }, [mostrarPopup]); // Este efecto se ejecuta solo cuando `mostrarPopup` cambia

  // Progreso de scroll + botón volver arriba
  useEffect(() => {
    const onScroll = () => {
      const scrollTop = window.scrollY || document.documentElement.scrollTop;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
      setScrollProgress(progress);
      setShowBackToTop(scrollTop > 500); // Muestra el botón cuando el scroll supera 500px
    };
    window.addEventListener('scroll', onScroll, { passive: true }); // Usar { passive: true } para mejorar el rendimiento del scroll
    onScroll(); // Llama una vez al montar para inicializar el estado del botón
    return () => window.removeEventListener('scroll', onScroll); // Limpia el event listener al desmontar
  }, []);


  return (
    <> {/* Fragmento para poder tener el popup como hermano del Principal-container */}
      <div className={`Principal-container page-transition ${isLoaded ? 'loaded' : ''}`} ref={containerRef}>
        {/* Partículas flotantes de fondo */}
        <div className="floating-particles" aria-hidden="true">
          {Array.from({ length: 9 }).map((_, i) => (
            <div key={i} className={`particle particle-${i + 1}`}></div>
          ))}
        </div>

        {/* Barra de progreso de scroll en la parte superior */}
        <div className="scroll-progress" style={{ width: `${scrollProgress}%` }} aria-hidden="true"></div>

        {/* Barra verde superior institucional (decorativa) */}
        <div className="green-bar"></div>

        {/* Header institucional de la página */}
        <header className="header-container">
          <div className="logo-section animate-on-scroll" id="logo-section" role="banner">
            <img
              src={logoSena}
              alt="Logo SENA"
              className="sena-logo"
            />
            <div className="divider-line" aria-hidden="true"></div>
          </div>

          <div className="title-section animate-on-scroll" id="title-section">
            <h1 className="red-tecnoparque">
              Red Tecnoparque
            </h1>
            <h2 className="colombia">Colombia</h2>
          </div>

          <div className="logo-transfor animate-on-scroll" id="image-1">
            <img
              src={imagen8}
              alt="logo TransforElectro"
              className="logo-transforelectro"
            />
            <p className="texto-transfor">TRANSFORELECTRO</p>
          </div>
        </header>

        {/* Hero Section - Texto de Bienvenida con un fondo agradable */}
        <section className="presentation-container animate-on-scroll">
          <p className="texto-Presentacion" id="hero-text">
            BIENVENIDO AL APARTADO DE ÁREAS.
          </p>
        </section>

        {/* Media section - Imagen principal estática de los sensores */}
        <section className="media-placeholder animate-on-scroll">
          <div className="placeholder-content">
            <img src={AreaPrincipal} alt="Imagen principal de sensores" className="sensor-presentacion-img" />
          </div>
        </section>

        {/* Texto secundario de la página */}
        <section className="textoSecundario-container">
          <p className="texto-secundario animate-on-scroll" id="secondary-text">
            "Adéntrate en el verdadero corazón de nuestra innovación tecnológica: las áreas especializadas. Estos son nuestros laboratorios y talleres de última generación,
             meticulosamente diseñados y equipados para albergar toda la maquinaria electrónica que hace posible la transformación. Aquí, cada fase de un proyecto cobra vida, 
             desde la ideación y el diseño conceptual hasta el prototipado, el ensamble de componentes y las rigurosas pruebas finales. Son los espacios donde la creatividad 
             se une a la precisión, y donde cada proyecto se cultiva y perfecciona, marcando el pulso de nuestro avance en la electrónica."
          </p>
        </section>

        {/* Título de la sección de tipos de sensores */}
        <section className="apartados-container">
          <p className="texto-apartados animate-on-scroll" id="tools-title">
            TIPOS DE ÁREAS
          </p>
        </section>

        {/* Apartado 1 */}
        <section className="content-section reverse animate-on-scroll">
          <div className="image-wrapper">
             <img
               src={imagen1}
               alt="Diseño y simulacion"
               className="media-content2"
               onMouseEnter={(e) => handleImageHover(e, true)}
               onMouseLeave={(e) => handleImageHover(e, false)}
             />
          </div>
          <div className="text-content" id="sensor-luz-text">
            <h3>Diseño y simulacion</h3>
            <div className="green-underline"></div>
            <p>Espacio para crear y probar circuitos y placas (PCB) digitalmente con software, optimizando el diseño antes de la fabricación física.</p>
             <button
              onClick={() =>
                abrirPopup(
                  "Sensores de luz",
                  "Esta área es el punto de partida donde las ideas y conceptos electrónicos toman forma digital. Aquí se utilizan softwares especializados (CAD) para crear esquemas de circuitos, diseñar placas de circuito impreso (PCB) y simular su funcionamiento. Permite a los ingenieros y diseñadores prever el comportamiento del circuito, identificar posibles errores y optimizar el diseño antes de pasar a la fase de prototipado físico, ahorrando tiempo y recursos."
                )
              }
              className="conoce-mas-button"
              onMouseEnter={(e) => handleButtonHover(e, true)}
              onMouseLeave={(e) => handleButtonHover(e, false)}
            >
              SABER MÁS
            </button>
          </div>
        </section>

        {/* Apartado 2  */}
        <section className="content-section animate-on-scroll">
          <div className="text-content">
            <h3>Manufactura PCB</h3>
            <div className="green-underline"></div>
            <p>Taller donde se fabrican físicamente las placas de circuito impreso (PCB) a partir de diseños, utilizando maquinaria para corte, perforación y ensamblaje de componentes.</p>
             <button
              onClick={() =>
                abrirPopup(
                  "Manufactura PCB",
                  "Este espacio está dedicado a la materialización de los diseños de circuitos. Equipada con fresadoras, grabadoras, hornos de reflujo y estaciones de ensamblaje (Pick-and-Place), esta área se encarga de fabricar físicamente las placas de circuito impreso (PCB). Desde el corte del laminado virgen hasta la soldadura de componentes de montaje superficial (SMD), es donde el diseño digital se transforma en el esqueleto conductor de cualquier dispositivo electrónico."
                )
              }
              className="conoce-mas-button"
              onMouseEnter={(e) => handleButtonHover(e, true)}
              onMouseLeave={(e) => handleButtonHover(e, false)}
            >
              SABER MÁS
            </button>
          </div>
            <div className="image-wrapper" id="sensor-temperatura-image">
             <img
               src={imagen2}
               alt="Manufactura PCB"
               className="media-content2"
               onMouseEnter={(e) => handleImageHover(e, true)}
               onMouseLeave={(e) => handleImageHover(e, false)}
             />
          </div>
        </section>

        {/* Apartado 3*/}
        <section className="content-section reverse animate-on-scroll">
          <div className="image-wrapper">
            <img
              src={imagen3}
              alt="Contador de botellas"
              className="media-content2"
              onMouseEnter={(e) => handleImageHover(e, true)}
              onMouseLeave={(e) => handleImageHover(e, false)}
            />
          </div>
          <div className="text-content">
            <h3>Contador De Botellas</h3>
            <div className="green-underline"></div>
            <p>Sistema automatizado que utiliza sensores para detectar y contabilizar botellas en una línea de producción.</p>
             <button
              onClick={() =>
                abrirPopup(
                  "Contador de botellas",
                  "Este proyecto consiste en el desarrollo e implementación de un sistema electrónico automatizado capaz de detectar y contabilizar el número de botellas que pasan por un punto específico. Generalmente utiliza sensores de proximidad o infrarrojos conectados a un microcontrolador, mostrando el conteo en una pantalla. Su aplicación principal es en líneas de producción o embotelladoras para control de inventario y optimización de procesos."
                )
              }
              className="conoce-mas-button"
              onMouseEnter={(e) => handleButtonHover(e, true)}
              onMouseLeave={(e) => handleButtonHover(e, false)}
            >
              SABER MÁS
            </button>
          </div>
        </section>

        {/* Apartado 4  */}
        <section className="content-section animate-on-scroll">
          <div className="text-content">
            <h3>Máquina De Garra</h3>
            <div className="green-underline"></div>
            <p>Desarrollo de un juego electromecánico con control de garra y lógica de juego interactiva.</p>
              <button
              onClick={() =>
                abrirPopup(
                  "Máquina de garra",
                  "El proyecto de la Máquina de Garra implica diseñar y construir un sistema electromecánico y electrónico que emula la funcionalidad de una máquina de juegos recreativos. Incluye el control de motores (para el movimiento horizontal, vertical y de cierre de la garra), la lógica de juego (temporizadores, detección de monedas, premios), y una interfaz de usuario. Este proyecto es excelente para aplicar conocimientos de mecatrónica, programación de microcontroladores y diseño de interfaces."
                )
              }
              className="conoce-mas-button"
              onMouseEnter={(e) => handleButtonHover(e, true)}
              onMouseLeave={(e) => handleButtonHover(e, false)}
            >
              SABER MÁS
            </button>
          </div>

          <div className="image-wrapper">
            <img
              src={imagen4}
              alt="Maquina de garra"
              className="media-content2"
              onMouseEnter={(e) => handleImageHover(e, true)}
              onMouseLeave={(e) => handleImageHover(e, false)}
            />
          </div>
        </section>

        {/* Apartado 5  */}
        <section className="content-section reverse animate-on-scroll">
          <div className="image-wrapper">
            <img
              src={imagen5}
              alt="Sistema de riego de semillas"
              className="media-content2"
              onMouseEnter={(e) => handleImageHover(e, true)}
              onMouseLeave={(e) => handleImageHover(e, false)}
            />
          </div>
          <div className="text-content">
            <h3>Sistema De Riego De Semillas</h3>
            <div className="green-underline"></div>
            <p>Sistema automatizado con sensores de humedad para regar semillas o plantas eficientemente, optimizando el consumo de agua.</p>
             <button
              onClick={() =>
                abrirPopup(
                  "Sistema de riego de semillas",
                  "Este proyecto se centra en crear un sistema de riego automatizado y eficiente, especialmente diseñado para optimizar el crecimiento de semillas o plantas jóvenes. Utiliza sensores de humedad del suelo para monitorear las condiciones, y un microcontrolador que activa una bomba de agua solo cuando es necesario. El objetivo es proporcionar la cantidad justa de agua, reduciendo el desperdicio y mejorando las tasas de germinación y crecimiento."
                )
              }
              className="conoce-mas-button"
              onMouseEnter={(e) => handleButtonHover(e, true)}
              onMouseLeave={(e) => handleButtonHover(e, false)}
            >
              SABER MÁS
            </button>
          </div>
        </section>

        {/* Apartado 6 - SENSORES DE SONIDO */}
        <section className="content-section animate-on-scroll">
          <div className="text-content">
            <h3>Panel Solar</h3>
            <div className="green-underline"></div>
            <p>Desarrollo de la electrónica para optimizar la captación, conversión y gestión de la energía generada por paneles solares.</p>
             <button
              onClick={() =>
                abrirPopup(
                  "Panel Solar",
                  "El proyecto Panel Solar (en el contexto de electrónica y no fabricación del panel en sí) generalmente implica diseñar e implementar sistemas electrónicos para optimizar la recolección, conversión y gestión de energía solar. Esto puede incluir el desarrollo de circuitos para maximizar la potencia extraída del panel (MPPT), sistemas de almacenamiento de energía (baterías), circuitos de carga, o interfaces para monitorear el rendimiento energético. Es fundamental para soluciones de energía renovable y autosostenible."
                )
              }
              className="conoce-mas-button"
              onMouseEnter={(e) => handleButtonHover(e, true)}
              onMouseLeave={(e) => handleButtonHover(e, false)}
            >
              SABER MÁS
            </button>
          </div>
          <div className="image-wrapper" id="sensor-sonido-image">
            <img
              src={imagen6}
              alt="Panel solar"
              className="media-content2"
              onMouseEnter={(e) => handleImageHover(e, true)}
              onMouseLeave={(e) => handleImageHover(e, false)}
            />
          </div>
        </section>

        {/* Contact Section - Texto de contacto */}
        <section className="contactanos-container animate-on-scroll">
          <div className="contacto-texto" id="contact-section">
            <p className="texto-conocenos">
              ¿QUIERES CONOCERNOS MÁS?
              <br />
              CONTÁCTANOS
            </p>
            <div className="linea-verde"></div>
          </div>
        </section>

        {/* FOOTER SENA completo */}
        <footer className="sena-footer">
          <div className="footer-outer">
            <div className="footer-inner animate-on-scroll" id="footer-content">
              <div className="footer-text">
                <div className="header-sena">
                  <div>
                    <p className="footer-title">Servicio Nacional de Aprendizaje SENA</p>
                    <br />
                    <p className="footer-address">Dirección General</p>
                    <br />
                    <p>Calle 57 No. 8 – 69 Bogotá D.C. (Cundinamarca), Colombia</p>
                  </div>
                  <div className="footer-logo">
                    <img src={logoSena} alt="Logo SENA" />
                  </div>
                </div>
                <br />
                <p className="footer-note">
                  Debido a la emergencia sanitaria, los centros de formación profesional, puntos de atención o información
                  y demás <br /> espacios físicos destinados por el SENA para la atención presencial a los ciudadanos se encuentran cerrados.
                </p>
                <br />
                <div className="enlaces-footer">
                  <a href="https://www.sena.edu.co/es-co/transparencia/Paginas/mecanismosContacto.aspx" target="_blank" rel="noopener noreferrer">
                    Conozca aquí los puntos de atención
                  </a>
                </div>
                <br />
                <p className="footer-contact">• Conmutador Nacional (57 1) 5461500</p>
                <br />
                <p className="footer-contact">• Atención al ciudadano: Bogotá (57 1) 3430111</p>
                <br />
                <p className="footer-contact">• Línea gratuita 018000 910270</p>

                <div className="social-icons" aria-label="Redes sociales del SENA">
                  <a
                    href="https://www.facebook.com/SENA/"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Facebook"
                  >
                    <i className="fab fa-facebook-f"></i>
                  </a>
                  <a
                    href="https://x.com/SENAComunica"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="X (Twitter)"
                  >
                    <i className="fab fa-x-twitter"></i>
                  </a>
                  <a
                    href="https://www.instagram.com/senacomunica/"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Instagram"
                  >
                    <i className="fab fa-instagram"></i>
                  </a>
                  <a
                    href="https://www.youtube.com/user/SENATV"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="YouTube"
                  >
                    <i className="fab fa-youtube"></i>
                  </a>
                  <a
                    href="https://soundcloud.com/senacolombia"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="SoundCloud"
                  >
                    <i className="fab fa-soundcloud"></i>
                  </a>
                  <a
                    href="https://api.whatsapp.com/send/?phone=573168760255&text&app_absent=0"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="WhatsApp"
                  >
                    <i className="fab fa-whatsapp"></i>
                  </a>
                </div>
              </div>

              <div className="enlaces-footer">
                <a href="https://sciudadanos.sena.edu.co/SolicitudIndex.aspx" target="_blank" rel="noopener noreferrer">PQRS</a>
                <a href="https://www.sena.edu.co/es-co/ciudadano/Paginas/chat.aspx" target="_blank" rel="noopener noreferrer">Chat en línea</a>
                <a href="https://www.sena.edu.co/es-co/transparencia/Paginas/mecanismosContacto.aspx#notificacionesJudiciales" target="_blank" rel="noopener noreferrer">Notificaciones judiciales</a>
                <a href="mailto:servicioalciudadano@sena.edu.co" target="_blank" rel="noopener noreferrer">Correo: servicioalciudadano@sena.edu.co</a>
                <br />
                <a href="https://www.sena.edu.co/es-co/Paginas/politicasCondicionesUso.aspx#derechoAutor" target="_blank" rel="noopener noreferrer">Todos derechos 2017 SENA – Políticas de privacidad y condiciones uso</a>
                <a href="https://www.sena.edu.co/es-co/Paginas/politicasCondicionesUso.aspx" target="_blank" rel="noopener noreferrer">Portal Web SENA</a>
                <br />
                <a href="https://compromiso.sena.edu.co/mapa/descarga.php?id=3628" target="_blank" rel="noopener noreferrer">Política de Tratamiento para Protección de Datos Personales</a>
                <a href="https://compromiso.sena.edu.co/index.php?text=inicio&id=27" target="_blank" rel="noopener noreferrer">Política de seguridad y privacidad de la información</a>
                <a href="https://www.icontec.org/eval-conformidad/certificacion-iso-9001-sistema-de-gestion-de-calidad/" target="_blank" rel="noopener noreferrer">Certificación ISO 9001</a>
              </div>
            </div>
          </div>
        </footer>

        {/* Botón volver arriba */}
        <button
          className={`back-to-top ${showBackToTop ? 'visible' : ''}`}
          aria-label="Volver arriba"
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        >
          <i className="fas fa-arrow-up"></i>
        </button>
      </div>

      {/* --- POPUP GLOBAL MEJORADO (MOVIDO FUERA DEL Principal-container) --- */}
      {mostrarPopup && (
        <div
          className="popup-overlay"
          onClick={cerrarPopup} // Cierra al hacer clic en el fondo oscuro
        >
          <div
            className="popup"
            onClick={(e) => e.stopPropagation()} // Evita que el clic dentro del popup se propague al overlay
          >
            <h3>{contenidoPopup.titulo}</h3>
            <div className="popup-underline"></div> {/* Línea decorativa */}
            <p>{contenidoPopup.texto}</p>
            <button onClick={cerrarPopup} className="cerrar">
              Cerrar
            </button>
          </div>
        </div>
      )}
      {/* ----------------------------- */}
    </>
  );
}

export default Areas;