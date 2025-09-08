import React, { useEffect, useState, useRef, useCallback } from "react";
import '@fortawesome/fontawesome-free/css/all.min.css';
import logoSena from '../imagenes/logoSena.png';
import imagen8 from '../imagenes/Logo_TransforElectro.png'; // Logo TransforElectro
import sensorLuz from '../imagenes/Sensor_luz.jpg';
import sensorTemperatura from '../imagenes/Sensor_temperatura.jpg';
import sensorPresion from '../imagenes/Sensor_presion.jpg';
import sensorProximidad from '../imagenes/Sensor_proximidad.jpg';
import sensorHumedad from '../imagenes/Sensor_humedad.png';
import sensorSonido from '../imagenes/Sensor_sonido.webp';
import otrosTipos from '../imagenes/Otros_tipos.jpg';
import sensorPresentacion from '../imagenes/presentacion_sensores.png'; // La imagen principal estática
import './sensores.css'; // Importa el CSS mejorado para Sensores

function Sensores() {


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
            BIENVENIDO AL APARTADO DE SENSORES.
          </p>
        </section>

        {/* Media section - Imagen principal estática de los sensores */}
        <section className="media-placeholder animate-on-scroll">
          <div className="placeholder-content">
            <img src={sensorPresentacion} alt="Imagen principal de sensores" className="sensor-presentacion-img" />
          </div>
        </section>

        {/* Texto secundario de la página */}
        <section className="textoSecundario-container">
          <p className="texto-secundario animate-on-scroll" id="secondary-text">
            "Los sensores son los ojos y oídos de la tecnología moderna. Son dispositivos inteligentes diseñados para percibir y responder a una amplia gama de
            señales y estímulos del mundo que nos rodea. Desde la luz que ilumina nuestras pantallas hasta la temperatura que regula nuestros hogares, los sensores están
            presentes en casi todos los aspectos de nuestra vida cotidiana, recopilando datos cruciales que permiten a los sistemas y dispositivos tomar decisiones inteligentes."
          </p>
        </section>

        {/* Título de la sección de tipos de sensores */}
        <section className="apartados-container">
          <p className="texto-apartados animate-on-scroll" id="tools-title">
            TIPOS DE SENSORES
          </p>
        </section>

        {/* Apartado 1 - SENSORES DE LUZ */}
        <section className="content-section reverse animate-on-scroll">
          <div className="image-wrapper" id="sensor-luz-image">
             <img
               src={sensorLuz}
               alt="Sensor de luz"
               className="media-content2"
               onMouseEnter={(e) => handleImageHover(e, true)}
               onMouseLeave={(e) => handleImageHover(e, false)}
             />
          </div>
          <div className="text-content" id="sensor-luz-text">
            <h3>SENSORES DE LUZ</h3>
            <div className="green-underline"></div>
            <p>Detecta la cantidad de luz en el ambiente.</p>
             <button
              onClick={() =>
                abrirPopup(
                  "Sensores de luz",
                  "Sirve para detectar y medir la cantidad de luz presente en un ambiente. Con esta información se pueden automatizar sistemas de iluminación, ajustar el brillo de pantallas o controlar el crecimiento de plantas en agricultura. Son muy comunes en cámaras fotográficas, lámparas inteligentes y celulares."
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

        {/* Apartado 2 - SENSORES DE TEMPERATURA */}
        <section className="content-section animate-on-scroll">
          <div className="text-content" id="sensor-temperatura-text">
            <h3>SENSORES DE TEMPERATURA</h3>
            <div className="green-underline"></div>
            <p>Mide la temperatura de un objeto o del ambiente.</p>
             <button
              onClick={() =>
                abrirPopup(
                  "Sensores de temperatura",
                  "Dispositivo electrónico que mide el calor o el frío (la temperatura) y lo convierte en una señal eléctrica para ser interpretada por un sistema electrónico. Los tipos más comunes incluyen los termopares, que generan un voltaje con los cambios de temperatura; las RTD y los termistores, que cambian su resistencia eléctrica en función de la temperatura. Su principio de funcionamiento se basa en las propiedades físicas de los materiales semiconductores o conductores que usan para detectar estas variaciones."
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
               src={sensorTemperatura}
               alt="Sensor de temperatura"
               className="media-content2"
               onMouseEnter={(e) => handleImageHover(e, true)}
               onMouseLeave={(e) => handleImageHover(e, false)}
             />
          </div>
        </section>

        {/* Apartado 3 - SENSORES DE PRESIÓN */}
        <section className="content-section reverse animate-on-scroll">
          <div className="image-wrapper" id="sensor-presion-image">
            <img
              src={sensorPresion}
              alt="Sensor de presión"
              className="media-content2"
              onMouseEnter={(e) => handleImageHover(e, true)}
              onMouseLeave={(e) => handleImageHover(e, false)}
            />
          </div>
          <div className="text-content" id="sensor-presion-text">
            <h3>SENSORES DE PRESIÓN</h3>
            <div className="green-underline"></div>
            <p>Mide la fuerza que un fluido (líquido o gas) ejerce sobre una superficie.</p>
             <button
              onClick={() =>
                abrirPopup(
                  "Sensores de presión",
                  "Su función es medir la presión ejercida por gases o líquidos. Estos sensores ayudan a controlar la seguridad en motores, sistemas hidráulicos, aviones y submarinos. También se usan en medicina, por ejemplo, para medir la presión arterial o en respiradores."
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

        {/* Apartado 4 - SENSORES DE PROXIMIDAD */}
        <section className="content-section animate-on-scroll">
          <div className="text-content" id="sensor-proximidad-text">
            <h3>SENSORES DE PROXIMIDAD</h3>
            <div className="green-underline"></div>
            <p>Detecta la presencia o ausencia de un objeto sin contacto físico.</p>
              <button
              onClick={() =>
                abrirPopup(
                  "Sensores de proximidad",
                  "Detecta objetos cercanos sin necesidad de contacto físico. Se encuentra en celulares para apagar la pantalla al acercarla al oído, en vehículos para asistencia al aparcamiento, en robots para evitar choques y en fábricas para procesos automatizados."
                )
              }
              className="conoce-mas-button"
              onMouseEnter={(e) => handleButtonHover(e, true)}
              onMouseLeave={(e) => handleButtonHover(e, false)}
            >
              SABER MÁS
            </button>
          </div>
          <div className="image-wrapper" id="sensor-proximidad-image">
            <img
              src={sensorProximidad}
              alt="Sensor de proximidad"
              className="media-content2"
              onMouseEnter={(e) => handleImageHover(e, true)}
              onMouseLeave={(e) => handleImageHover(e, false)}
            />
          </div>
        </section>

        {/* Apartado 5 - SENSORES DE HUMEDAD */}
        <section className="content-section reverse animate-on-scroll">
          <div className="image-wrapper" id="sensor-humedad-image">
            <img
              src={sensorHumedad}
              alt="Sensor de humedad"
              className="media-content2"
              onMouseEnter={(e) => handleImageHover(e, true)}
              onMouseLeave={(e) => handleImageHover(e, false)}
            />
          </div>
          <div className="text-content" id="sensor-humedad-text">
            <h3>SENSORES DE HUMEDAD</h3>
            <div className="green-underline"></div>
            <p>Mide la cantidad de vapor de agua en el aire.</p>
             <button
              onClick={() =>
                abrirPopup(
                  "Sensores de humedad",
                  "Mide la cantidad de vapor de agua en el aire o la humedad en materiales como el suelo. Es fundamental en agricultura para optimizar el riego, en meteorología para el pronóstico del clima y en edificios para controlar la calidad del aire. También se utiliza en sistemas de almacenamiento para evitar daños por humedad."
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
          <div className="text-content" id="sensor-sonido-text">
            <h3>SENSORES DE SONIDO</h3>
            <div className="green-underline"></div>
            <p>Capta vibraciones acústicas y las convierte en señales eléctricas.</p>
             <button
              onClick={() =>
                abrirPopup(
                  "Sensores de sonido",
                  "Convierte las ondas sonoras en señales eléctricas que pueden ser procesadas. Está presente en micrófonos, asistentes virtuales como Alexa o Siri, sistemas de seguridad que reaccionan a ruidos fuertes, y equipos de monitoreo ambiental para medir niveles de ruido."
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
              src={sensorSonido}
              alt="Sensor de sonido"
              className="media-content2"
              onMouseEnter={(e) => handleImageHover(e, true)}
              onMouseLeave={(e) => handleImageHover(e, false)}
            />
          </div>
        </section>

        {/* Apartado 7 - OTROS TIPOS */}
        <section className="content-section reverse animate-on-scroll">
          <div className="image-wrapper" id="otros-tipos-image">
             <img
               src={otrosTipos}
               alt="Otros tipos de sensores"
               className="media-content2"
               onMouseEnter={(e) => handleImageHover(e, true)}
               onMouseLeave={(e) => handleImageHover(e, false)}
             />
          </div>
          <div className="text-content" id="otros-tipos-text">
            <h3>OTROS TIPOS</h3>
            <div className="green-underline"></div>
            <p>Además, existen diversos tipos de sensores especializados, entre los cuales se incluyen los siguientes:</p>
             <button
              onClick={() =>
                abrirPopup(
                   "Otros tipos de sensores",
                  `Acelerómetro: Mide movimientos o vibraciones, Giroscopio: Detecta la rotación y orientación, GPS: Determina ubicación geográfica, Sensor magnético: Percibe campos magnéticos, Sensor de fuerza: Mide presión o fuerza aplicada, Sensor de gas: Detecta gases específicos en el ambiente, Sensor infrarrojo: Capta radiación IR, útil para proximidad o comunicación remota.`
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

export default Sensores;