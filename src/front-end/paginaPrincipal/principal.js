import React, { useEffect, useState, useRef, useCallback } from "react";
import '@fortawesome/fontawesome-free/css/all.min.css';
import { useNavigate } from "react-router-dom";
import logoSena from '../imagenes/logoSena.png';
import imagen2 from '../imagenes/ideas_tecnologia_colombia_sena.png';
import imagen3 from '../imagenes/componentes_innovacion_sena.png';
import imagen4 from '../imagenes/sensores.webp';
import imagen5 from '../imagenes/placas.webp';
import imagen6 from '../imagenes/maquinas.webp';
import imagen7 from '../imagenes/areas.webp';
import imagen8 from '../imagenes/Logo_TransforElectro.png';

// --- IMÁGENES DEL CARRUSEL ---
// Asegúrate de que estas rutas sean correctas y existan en tu proyecto.
// Si tienes más imágenes (Area5.jpeg, Area6.jpeg), impórtalas aquí:
import imagen9 from '../imagenes/Area1.jpeg';
import imagen10 from '../imagenes/Area2.jpeg';
import imagen11 from '../imagenes/Area3.jpeg';
import imagen12 from '../imagenes/Area4.jpeg';
// import imagen13 from '../imagenes/Area5.jpeg'; // Descomenta y ajusta la ruta si tienes más imágenes
// import imagen14 from '../imagenes/Area6.jpeg'; // Descomenta y ajusta la ruta si tienes más imágenes
// -----------------------------

import './principal.css'; // Importa el CSS mejorado

function PaginaPrincipal() {
  const navigate = useNavigate();

  // Estados para animaciones
  const [isLoaded, setIsLoaded] = useState(false);

  // UI adicional
  const [scrollProgress, setScrollProgress] = useState(0);
  const [showBackToTop, setShowBackToTop] = useState(false);

  // Referencias para elementos DOM
  const containerRef = useRef(null);

  // --- ESTADO Y LÓGICA DEL CARRUSEL ---
  const [currentSlide, setCurrentSlide] = useState(0);
  const carouselRef = useRef(null); // Ref para el contenedor de imágenes del carrusel

  // Array de tus imágenes para el carrusel
  const carouselImages = [
    imagen9,
    imagen10,
    imagen11,
    imagen12,
    // imagen13, // Descomenta si importaste imagen13
    // imagen14, // Descomenta si importaste imagen14
  ];

  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev === carouselImages.length - 1 ? 0 : prev + 1));
  }, [carouselImages.length]);

  const prevSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev === 0 ? carouselImages.length - 1 : prev - 1));
  }, [carouselImages.length]);

  const goToSlide = useCallback((index) => {
    setCurrentSlide(index);
  }, []);

  // Efecto para scroll automático del carrusel y sincronización
  useEffect(() => {
    if (carouselRef.current) {
      // Asegúrate de que haya elementos antes de intentar acceder a children[0]
      if (carouselRef.current.children.length > 0) {
        const itemWidth = carouselRef.current.children[0].offsetWidth; // Ancho de un elemento del carrusel
        carouselRef.current.scrollTo({
          left: currentSlide * itemWidth,
          behavior: 'smooth',
        });
      }
    }

    const interval = setInterval(() => {
      nextSlide();
    }, 5000); // Cambia de slide cada 5 segundos

    return () => clearInterval(interval);
  }, [currentSlide, nextSlide]); // Dependencia actualizada para nextSlide

  // ----------------------------------

  // Efecto de carga inicial
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 100);
    return () => clearTimeout(timer);
  }, []);

  // Intersection Observer para animaciones de entrada
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
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px' // Ajuste para mayor visibilidad
      }
    );

    // Observar elementos con animación
    const elementsToObserve = document.querySelectorAll('.animate-on-scroll');
    elementsToObserve.forEach(el => {
      observer.observe(el);
    });

    return () => observer.disconnect();
  }, []); // Dependencia vacía para que se ejecute una sola vez al montar

  // Manejar hover en imágenes (lógica de JS, efectos visuales en CSS)
  const handleImageHover = useCallback((e, isEntering) => {
    if (isEntering) {
      e.target.classList.add('hovered');
    } else {
      e.target.classList.remove('hovered');
    }
  }, []);

  // Efecto brillo en botones al hover (lógica de JS, efectos visuales en CSS)
  const handleButtonHover = useCallback((e, isEntering) => {
    
    if (isEntering) {
      // La animación de shimmer se manejará puramente por CSS con pseudo-elementos
      // y la clase ':hover' para simplificar la lógica JS.
      // Se mantiene la función si se necesita alguna otra lógica JS en el futuro.
    }
  }, []);

  // Click + ripple + navegación
  const handleButtonClick = useCallback((e, navigateTo) => {
    e.preventDefault();
    const button = e.currentTarget;
    button.classList.add('clicked'); // Añadir clase para la animación de click
    
    // Crear el elemento ripple dinámicamente
    const ripple = document.createElement('div');
    ripple.classList.add('ripple-effect');
    
    // Posicionar el ripple en el punto del click
    const rect = button.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height) * 1.5; // Tamaño del ripple
    const x = e.clientX - rect.left - size / 2;
    const y = e.clientY - rect.top - size / 2;
    
    ripple.style.width = ripple.style.height = `${size}px`;
    ripple.style.left = `${x}px`;
    ripple.style.top = `${y}px`;
    
    button.appendChild(ripple);

    // Remover el ripple y navegar después de la animación
    ripple.addEventListener('animationend', () => {
      ripple.remove();
      button.classList.remove('clicked');
      navigate(navigateTo);
    });
    
  }, [navigate]);

  // Progreso de scroll + botón volver arriba
  useEffect(() => {
    const onScroll = () => {
      const scrollTop = window.scrollY || document.documentElement.scrollTop;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
      setScrollProgress(progress);
      setShowBackToTop(scrollTop > 500); // Ajuste el umbral para mostrar el botón
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll(); // Llama una vez para inicializar
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <div className={`Principal-container page-transition ${isLoaded ? 'loaded' : ''}`} ref={containerRef}>
      {/* Partículas flotantes (añadidas en CSS) */}
      <div className="floating-particles" aria-hidden="true">
        {Array.from({ length: 9 }).map((_, i) => (
          <div key={i} className={`particle particle-${i + 1}`}></div>
        ))}
      </div>

      {/* Barra de progreso de scroll */}
      <div className="scroll-progress" style={{ width: `${scrollProgress}%` }} aria-hidden="true"></div>

      {/* Barra verde superior institucional */}
      <div className="green-bar"></div>

      {/* Header institucional */}
      <header className="header-container"> {/* Cambiado a <header> semántico */}
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
          <p className="texto-transfor">TRANSFORELECTRO</p> {/* Cambiado a p semántico para el texto */}
        </div>

      </header>

      {/* Hero Section - Ahora con fondo de collage y a todo ancho */}
      <section className="presentation-container"> {/* Cambiado a <section> semántico */}
        <p className="texto-Presentacion animate-on-scroll" id="hero-text">
          SOMOS EL ÁREA DE PRODUCCIÓN Y TRANSFORMACIÓN, TE INVITAMOS A CONOCERNOS MÁS.
        </p>
      </section>

      {/* Media section (Carrusel de fotos) */}
      <section className="media-placeholder animate-on-scroll">
        <div className="carousel-container"> {/* Nuevo contenedor para el carrusel */}
          <div className="carousel-content-wrapper" ref={carouselRef}> {/* Este es el scroll-container en JS */}
            {carouselImages.map((image, index) => (
              <div key={index} className="carousel-item">
                <img src={image} alt={`Imagen del área ${index + 1}`} />
              </div>
            ))}
          </div>

          {/* Flechas de navegación */}
          <button className="carousel-control prev" onClick={prevSlide} aria-label="Imagen anterior">
            <i className="fas fa-chevron-left"></i>
          </button>
          <button className="carousel-control next" onClick={nextSlide} aria-label="Imagen siguiente">
            <i className="fas fa-chevron-right"></i>
          </button>

          {/* Puntos de paginación */}
          <div className="carousel-pagination">
            {carouselImages.map((_, index) => (
              <button
                key={index}
                className={`pagination-dot ${currentSlide === index ? 'active' : ''}`}
                onClick={() => goToSlide(index)}
                aria-label={`Ir a la imagen ${index + 1}`}
              ></button>
            ))}
          </div>
        </div>
      </section>

      {/* Texto secundario */}
      <section className="textoSecundario-container">
        <p className="texto-secundario animate-on-scroll" id="secondary-text">
          Nos especializamos en la producción y transformación de componentes electrónicos, ofreciendo soluciones eficientes y de alta calidad.
          Desde el diseño hasta la integración de sistemas, trabajamos para sectores educativos, comerciales e industriales, promoviendo
          la innovación y el desarrollo tecnológico en Colombia.
        </p>
      </section>

      {/* Primera sección con imagen y texto inspiracional */}
      <section className="content-section reverse">
        <div className="image-wrapper animate-on-scroll" id="image-1"> {/* Añadido wrapper para la imagen */}
          <img
            src={imagen2}
            alt="Conceptos de ideas y tecnología en Colombia"
            className="media-content2"
            onMouseEnter={(e) => handleImageHover(e, true)}
            onMouseLeave={(e) => handleImageHover(e, false)}
          />
        </div>
        <div className="text-content animate-on-scroll" id="text-1">
          <p>"Conectamos ideas, transformamos tecnologías y construimos el futuro digital de Colombia"</p>
        </div>
      </section>

      {/* Segunda sección con texto e imagen */}
      <section className="content-section"> {/* Eliminado 'reverse' para alternar orden */}
        <div className="text-content animate-on-scroll" id="text-2">
          <p>La Electrónica no solo construye circuitos, construye el futuro. Cada componente es una posibilidad, cada sistema es una solución que impulsa la innovación y el desarrollo tecnológico del país.</p>
        </div>
        <div className="image-wrapper animate-on-scroll" id="image-2">
          <img
            src={imagen3}
            alt="Componentes de innovación tecnológica"
            className="media-content2"
            onMouseEnter={(e) => handleImageHover(e, true)}
            onMouseLeave={(e) => handleImageHover(e, false)}
          />
        </div>
      </section>

      {/* Título de secciones de herramientas */}
      <section className="apartados-container">
        <p className="texto-apartados animate-on-scroll" id="tools-title">
          CONOCE TODAS NUESTRAS HERRAMIENTAS Y ÁREAS DONDE DESARROLLAMOS CADA UNO DE LOS PROYECTOS
        </p>
      </section>

      {/* Apartado 1 - Sensores */}
      <section className="content-section reverse"> {/* Añadido 'reverse' para alternar orden */}
        <div className="image-wrapper animate-on-scroll" id="sensores-image">
          <img
            src={imagen4}
            alt="Sensores modernos"
            className="media-content2"
            onMouseEnter={(e) => handleImageHover(e, true)}
            onMouseLeave={(e) => handleImageHover(e, false)}
          />
        </div>
        <div className="text-content animate-on-scroll" id="sensores-text">
          <h3>Sensores</h3>
          <div className="green-underline"></div> {/* Se quitaron estilos inline */}
          <p>Dispositivos de última generación que detectan cambios físicos como luz, temperatura, movimiento, humedad y presión, enviando señales eléctricas precisas para el control y monitoreo de sistemas automatizados inteligentes.</p>
          <button
            className="conoce-mas-button animate-on-scroll"
            id="sensores-button"
            onMouseEnter={(e) => handleButtonHover(e, true)}
            onMouseLeave={(e) => handleButtonHover(e, false)} // Asegúrate de manejar el leave
            onClick={(e) => handleButtonClick(e, '/sensores')}
          >
            CONOCE MÁS
          </button>
        </div>
      </section>

      {/* Apartado 2 - Placas */}
      <section className="content-section">
        <div className="text-content animate-on-scroll" id="placas-text">
          <h3>Placas</h3>
          <div className="green-underline"></div>
          <p>Tarjetas electrónicas avanzadas como Arduino, Raspberry Pi, ESP32 y microcontroladores especializados que controlan sensores y actuadores mediante programación de alto nivel y desarrollo de prototipos innovadores.</p>
          <button
            className="conoce-mas-button animate-on-scroll"
            id="placas-button"
            onMouseEnter={(e) => handleButtonHover(e, true)}
            onMouseLeave={(e) => handleButtonHover(e, false)}
            onClick={(e) => handleButtonClick(e, '/placas')}
          >
            CONOCE MÁS
          </button>
        </div>
        <div className="image-wrapper animate-on-scroll" id="placas-image">
          <img
            src={imagen5}
            alt="Placas y microcontroladores"
            className="media-content2"
            onMouseEnter={(e) => handleImageHover(e, true)}
            onMouseLeave={(e) => handleImageHover(e, false)}
          />
        </div>
      </section>

      {/* Apartado 3 - Máquinas */}
      <section className="content-section reverse">
        <div className="image-wrapper animate-on-scroll" id="maquinas-image">
          <img
            src={imagen6}
            alt="Máquinas y equipos de producción"
            className="media-content2"
            onMouseEnter={(e) => handleImageHover(e, true)}
            onMouseLeave={(e) => handleImageHover(e, false)}
          />
        </div>
        <div className="text-content animate-on-scroll" id="maquinas-text">
          <h3>Máquinas</h3>
          <div className="green-underline"></div>
          <p>Equipos especializados de última tecnología que realizan tareas mecánicas y automatizadas como corte láser de precisión, impresión 3D avanzada, ensamblaje robotizado y manufactura digital de componentes.</p>
          <button
            className="conoce-mas-button animate-on-scroll"
            id="maquinas-button"
            onMouseEnter={(e) => handleButtonHover(e, true)}
            onMouseLeave={(e) => handleButtonHover(e, false)}
            onClick={(e) => handleButtonClick(e, '/maquinas')}
          >
            CONOCE MÁS
          </button>
        </div>
      </section>

      {/* Apartado 4 - Áreas */}
      <section className="content-section">
        <div className="text-content animate-on-scroll" id="areas-text">
          <h3>Áreas y Proyectos</h3>
          <div className="green-underline"></div>
          <p>Espacios especializados que incluyen laboratorios de diseño electrónico, montaje de circuitos, programación de sistemas, ensamblaje mecánico de precisión, pruebas de calidad exhaustivas y documentación técnica profesional de proyectos.</p>
          <button
            className="conoce-mas-button animate-on-scroll"
            id="areas-button"
            onMouseEnter={(e) => handleButtonHover(e, true)}
            onMouseLeave={(e) => handleButtonHover(e, false)}
            onClick={(e) => handleButtonClick(e, '/areas')}
          >
            CONOCE MÁS
          </button>
        </div>
        <div className="image-wrapper animate-on-scroll" id="areas-image">
          <img
            src={imagen7}
            alt="Áreas de trabajo y laboratorios"
            className="media-content2"
            onMouseEnter={(e) => handleImageHover(e, true)}
            onMouseLeave={(e) => handleImageHover(e, false)}
          />
        </div>
      </section>

      {/* Contact Section */}
      <section className="contactanos-container">
        <div className="contacto-texto animate-on-scroll" id="contact-section">
          <p className="texto-conocenos">
            ¿QUIERES CONOCERNOS MÁS?
            <br />
            CONTÁCTANOS
          </p>
          <div className="linea-verde"></div>
        </div>
      </section>

      {/* FOOTER SENA institucional */}
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
  );
}

export default PaginaPrincipal;