import React, { useState, useEffect, useRef, useCallback } from "react";
import '@fortawesome/fontawesome-free/css/all.min.css';
import logoSena from '../imagenes/logoSena.png';
import placaUnaCara from '../imagenes/Placa_Una_Cara.jpg';
import placaDoblecara from '../imagenes/Placa_Doble_Cara.webp';
import placaMulticapa from '../imagenes/Placa_Multicapa.jpg';
import placaRigida from '../imagenes/Placa_Rigida.jpg';
import placaFlexible from '../imagenes/Placa_Flexible.jpg';
import placaRigidoFlexible from '../imagenes/Placa_Rigida-Flexible.jpg';
import placaCeramica from '../imagenes/Placa_Ceramica.png';
import placaAluminio from '../imagenes/Placa_Aluminio.jpg';
import placaResina from '../imagenes/Placa_Resina.jpg';
import placaTeflon from '../imagenes/Placa_Teflon.jpg';
import placaMetal from '../imagenes/Placa_Metal.jpg';
import placaPresentacion from '../imagenes/Presentacion_placas.png'; // La imagen principal estática de placas
import imagen8 from '../imagenes/Logo_TransforElectro.png'; // Logo TransforElectro

import './placas.css'; // Importa el CSS mejorado para Placas

function Placas() {
  

  // Estados para UI y animaciones de la página
  const [isLoaded, setIsLoaded] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [showBackToTop, setShowBackToTop] = useState(false);

  // Estados para el Popup
  const [mostrarPopup, setMostrarPopup] = useState(false);
  const [contenidoPopup, setContenidoPopup] = useState({ titulo: "", texto: "" });

  // Referencia para el contenedor principal de la página
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
            entry.target.classList.add('is-visible');
          } else {
            // Opcional: Para que la animación se repita al salir de vista, descomenta la siguiente línea:
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
  }, []);

  const cerrarPopup = useCallback(() => {
    setMostrarPopup(false);
  }, []);

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
  }, [mostrarPopup]);

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
    <> {/* Fragmento para poder tener el popup como hermano directo del Principal-container */}
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
            BIENVENIDO AL APARTADO DE PLACAS.
          </p>
        </section>

        {/* Media section - Imagen principal estática de las placas */}
        <section className="media-placeholder animate-on-scroll" id="media-section">
          <div className="placeholder-content">
            <img src={placaPresentacion} alt="Imagen principal de placas" className="placa-presentacion-img" />
          </div>
        </section>

        {/* Texto secundario de la página */}
        <section className="textoSecundario-container">
          <p className="texto-secundario animate-on-scroll" id="secondary-text">
            En esencia, las placas electrónicas (PCB) son el "esqueleto" de cualquier dispositivo electrónico.
            Son placas que conectan y sostienen todos los componentes, permitiendo que la electricidad fluya y el dispositivo funcione.
            Sin ellas, los aparatos electrónicos serían imposibles de construir y usar.
          </p>
        </section>

        {/* Título de la sección de tipos de placas */}
        <section className="apartados-container">
          <p className="texto-apartados animate-on-scroll" id="tools-title">
            TIPOS DE PLACAS
          </p>
        </section>

        {/* Apartado 1 - PCB DE UNA CARA*/}
        <section className="content-section reverse animate-on-scroll">
          <div className="image-wrapper" id="placa-una-cara-image">
            <img
              src={placaUnaCara}
              alt="Placa de una cara"
              className="media-content2"
              onMouseEnter={(e) => handleImageHover(e, true)}
              onMouseLeave={(e) => handleImageHover(e, false)}
            />
          </div>
          <div className="text-content" id="placa-una-cara-text">
            <h3>PCB DE UNA CARA</h3>
            <div className="green-underline"></div>
            <p>Es una placa con componentes montados en un solo lado. Es la más simple y económica, ideal para circuitos básicos.</p>
            <button
              onClick={() =>
                abrirPopup(
                  "PCB de una cara",
                  "Estas placas solo tienen pistas de cobre en un lado y los componentes se montan en el lado opuesto. Son las más fáciles y económicas de fabricar, pero también las más limitadas en complejidad. Se usan en productos sencillos de bajo costo como radios, calculadoras, electrodomésticos pequeños y juguetes electrónicos, donde no se requiere un diseño compacto ni múltiples conexiones."
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

        {/* Apartado 2 - PCB DE DOBLE CARA  */}
        <section className="content-section animate-on-scroll">
          <div className="text-content" id="placa-doble-cara-text">
            <h3>PCB DE DOBLE CARA</h3>
            <div className="green-underline"></div>
            <p>Tiene componentes en ambas caras de la placa, lo que permite una mayor densidad de circuitos y conexiones más complejas.</p>
            <button
              onClick={() =>
                abrirPopup(
                  "PCB de doble cara",
                  "Cuentan con material conductor en ambos lados del sustrato, lo que permite mayor densidad de circuitos. Las conexiones entre caras se logran con orificios metalizados (vías). Representan un equilibrio entre costo y complejidad. Se utilizan en equipos de audio, sistemas de iluminación LED, controles industriales, impresoras y electrodomésticos más avanzados."
                )
              }
              className="conoce-mas-button"
              onMouseEnter={(e) => handleButtonHover(e, true)}
              onMouseLeave={(e) => handleButtonHover(e, false)}
            >
              SABER MÁS
            </button>
          </div>
          <div className="image-wrapper" id="placa-doble-cara-image">
            <img
              src={placaDoblecara}
              alt="Placa de doble cara"
              className="media-content2"
              onMouseEnter={(e) => handleImageHover(e, true)}
              onMouseLeave={(e) => handleImageHover(e, false)}
            />
          </div>
        </section>

        {/* Apartado 3 - PCB MULTICAPA*/}
        <section className="content-section reverse animate-on-scroll">
          <div className="image-wrapper" id="placa-multicapa-image">
            <img
              src={placaMulticapa}
              alt="Placa multicapa"
              className="media-content2"
              onMouseEnter={(e) => handleImageHover(e, true)}
              onMouseLeave={(e) => handleImageHover(e, false)}
            />
          </div>
          <div className="text-content" id="placa-multicapa-text">
            <h3>PCB MULTICAPA</h3>
            <div className="green-underline"></div>
            <p>Consiste en varias capas de circuitos interconectadas. Se utiliza en dispositivos avanzados donde el espacio es limitado y se requieren muchas conexiones.</p>
            <button
              onClick={() =>
                abrirPopup(
                  "PCB Multicapa",
                  "Están compuestas por cuatro o más capas conductoras separadas por dieléctricos y unidas mediante vías internas. Su gran ventaja es permitir circuitos muy complejos en un tamaño reducido, mejorando el rendimiento eléctrico y reduciendo interferencias. Son esenciales en dispositivos modernos de alta tecnología como computadores, smartphones, routers, servidores, satélites, dispositivos médicos de precisión y telecomunicaciones."
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

        {/* Apartado 4 - PCB RÍGIDO */}
        <section className="content-section animate-on-scroll">
          <div className="text-content" id="placa-rigida-text">
            <h3>PCB RÍGIDO</h3>
            <div className="green-underline"></div>
            <p>Hecha de materiales rígidos, es la más común en dispositivos electrónicos. Proporciona estabilidad y durabilidad.</p>
            <button
              onClick={() =>
                abrirPopup(
                  "PCB Rígido",
                  "Se fabrican con materiales sólidos como fibra de vidrio y resina epoxi (FR4). Son las más comunes por su resistencia mecánica, estabilidad y bajo costo. No se doblan ni flexionan, lo que las hace ideales para aplicaciones convencionales en televisores, computadores de escritorio, electrodomésticos, equipos de comunicación, sistemas de automoción y juguetes electrónicos."
                )
              }
              className="conoce-mas-button"
              onMouseEnter={(e) => handleButtonHover(e, true)}
              onMouseLeave={(e) => handleButtonHover(e, false)}
            >
              SABER MÁS
            </button>
          </div>
          <div className="image-wrapper" id="placa-rigida-image">
            <img
              src={placaRigida}
              alt="Placa rígida"
              className="media-content2"
              onMouseEnter={(e) => handleImageHover(e, true)}
              onMouseLeave={(e) => handleImageHover(e, false)}
            />
          </div>
        </section>

        {/* Apartado 5 - PCB FLEXIBLE*/}
        <section className="content-section reverse animate-on-scroll">
          <div className="image-wrapper" id="placa-flexible-image">
            <img
              src={placaFlexible}
              alt="Placa flexible"
              className="media-content2"
              onMouseEnter={(e) => handleImageHover(e, true)}
              onMouseLeave={(e) => handleImageHover(e, false)}
            />
          </div>
          <div className="text-content" id="placa-flexible-text">
            <h3>PCB FLEXIBLE</h3>
            <div className="green-underline"></div>
            <p>Fabricada con materiales flexibles, permite que la placa se doble o se adapte a diferentes formas, ideal para dispositivos portátiles.</p>
            <button
              onClick={() =>
                abrirPopup(
                  "PCB Flexible",
                  "Hechas con materiales como poliimida, que permiten que la placa se doble o pliegue sin dañar las pistas. Son más ligeras y ocupan menos espacio, pero su fabricación es más costosa. Se emplean en teléfonos móviles, relojes inteligentes, cámaras digitales, sensores médicos, dispositivos portátiles, sistemas aeroespaciales y militares donde el espacio y la ligereza son críticos."
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

        {/* Apartado 6 - PCB RIGIDO-FLEXIBLE */}
        <section className="content-section animate-on-scroll">
          <div className="text-content" id="placa-rigido-flexible-text">
            <h3>PCB RIGIDO-FLEXIBLE</h3>
            <div className="green-underline"></div>
            <p>Combina características de las placas rígidas y flexibles, permitiendo diseños compactos y complejos.</p>
            <button
              onClick={() =>
                abrirPopup(
                  "PCB Rígido-Flexible",
                  "Combinan secciones rígidas y flexibles en un mismo diseño. Esto reduce la necesidad de conectores y cables adicionales, aumentando la fiabilidad del sistema y permitiendo estructuras compactas y complejas. Se aplican en drones, cámaras de video, dispositivos portátiles, teléfonos móviles de gama alta, equipos médicos y tecnología militar."
                )
              }
              className="conoce-mas-button"
              onMouseEnter={(e) => handleButtonHover(e, true)}
              onMouseLeave={(e) => handleButtonHover(e, false)}
            >
              SABER MÁS
            </button>
          </div>
          <div className="image-wrapper" id="placa-rigido-flexible-image">
            <img
              src={placaRigidoFlexible}
              alt="Placa rígido-flexible"
              className="media-content2"
              onMouseEnter={(e) => handleImageHover(e, true)}
              onMouseLeave={(e) => handleImageHover(e, false)}
            />
          </div>
        </section>

        {/* Apartado 7 - PCB DE CERÁMICA  */}
        <section className="content-section reverse animate-on-scroll">
          <div className="image-wrapper" id="placa-ceramica-image">
            <img
              src={placaCeramica}
              alt="Placa de cerámica"
              className="media-content2"
              onMouseEnter={(e) => handleImageHover(e, true)}
              onMouseLeave={(e) => handleImageHover(e, false)}
            />
          </div>
          <div className="text-content" id="placa-ceramica-text">
            <h3>PCB DE CERÁMICA</h3>
            <div className="green-underline"></div>
            <p>Utiliza cerámica como material base, ideal para aplicaciones de alta temperatura y alta frecuencia.</p>
            <button
              onClick={() =>
                abrirPopup(
                  "PCB de cerámica",
                  "Fabricadas con alúmina o nitruro de aluminio, tienen excelente conductividad térmica, alta resistencia a la temperatura y baja expansión térmica. Son costosas, pero muy confiables en condiciones extremas. Se utilizan en módulos de potencia, circuitos de microondas, satélites, dispositivos aeroespaciales y equipos médicos de alta precisión."
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

        {/* Apartado 8 - PCB DE ALUMINIO */}
        <section className="content-section animate-on-scroll">
          <div className="text-content" id="placa-aluminio-text">
            <h3>PCB DE ALUMINIO</h3>
            <div className="green-underline"></div>
            <p>Tiene una base de aluminio que ayuda a disipar el calor, común en aplicaciones LED y de potencia.</p>
            <button
              onClick={() =>
                abrirPopup(
                  "PCB de aluminio",
                  "Tienen un núcleo de aluminio recubierto por una capa dieléctrica y una capa de cobre. Su ventaja principal es la disipación de calor, lo que prolonga la vida de los componentes. Se usan ampliamente en iluminación LED de alta potencia, fuentes de alimentación, automoción, telecomunicaciones y equipos electrónicos que generan calor excesivo."
                )
              }
              className="conoce-mas-button"
              onMouseEnter={(e) => handleButtonHover(e, true)}
              onMouseLeave={(e) => handleButtonHover(e, false)}
            >
              SABER MÁS
            </button>
          </div>
          <div className="image-wrapper" id="placa-aluminio-image">
            <img
              src={placaAluminio}
              alt="Placa de aluminio"
              className="media-content2"
              onMouseEnter={(e) => handleImageHover(e, true)}
              onMouseLeave={(e) => handleImageHover(e, false)}
            />
          </div>
        </section>

        {/* Apartado 9 - PCB DE RESINA  */}
        <section className="content-section reverse animate-on-scroll">
          <div className="image-wrapper" id="placa-resina-image">
            <img
              src={placaResina}
              alt="Placa de resina"
              className="media-content2"
              onMouseEnter={(e) => handleImageHover(e, true)}
              onMouseLeave={(e) => handleImageHover(e, false)}
            />
          </div>
          <div className="text-content" id="placa-resina-text">
            <h3>PCB DE RESINA</h3>
            <div className="green-underline"></div>
            <p>Hecha de resina epóxica, es resistente a la humedad y se utiliza en entornos difíciles.</p>
            <button
              onClick={() =>
                abrirPopup(
                  "PCB de resina",
                  "Se fabrican con resinas fenólicas o epóxicas, más económicas que la fibra de vidrio, pero con menor resistencia mecánica y térmica. Son adecuadas para equipos electrónicos de bajo costo donde no se exige alta durabilidad. Se encuentran en controles remotos, radios portátiles, juguetes, calculadoras y pequeños electrodomésticos."
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

        {/* Apartado 10 - PCB DE TEFLÓN */}
        <section className="content-section animate-on-scroll">
          <div className="text-content" id="placa-teflon-text">
            <h3>PCB DE TEFLÓN</h3>
            <div className="green-underline"></div>
            <p>Utilizada en aplicaciones de alta frecuencia, es muy estable y tiene excelentes propiedades eléctricas.</p>
            <button
              onClick={() =>
                abrirPopup(
                  "PCB de teflón",
                  "Construidas con politetrafluoroetileno (PTFE), tienen excelentes propiedades para trabajar en alta frecuencia y transmisión de señales. Su baja constante dieléctrica minimiza las pérdidas y distorsiones. Se aplican en telecomunicaciones, radares, antenas, estaciones base 5G, satélites y sistemas militares de microondas."
                )
              }
              className="conoce-mas-button"
              onMouseEnter={(e) => handleButtonHover(e, true)}
              onMouseLeave={(e) => handleButtonHover(e, false)}
            >
              SABER MÁS
            </button>
          </div>
          <div className="image-wrapper" id="placa-teflon-image">
            <img
              src={placaTeflon}
              alt="Placa de teflón"
              className="media-content2"
              onMouseEnter={(e) => handleImageHover(e, true)}
              onMouseLeave={(e) => handleImageHover(e, false)}
            />
          </div>
        </section>

        {/* Apartado 11 - PLACA DE CIRCUITO IMPRESO CON NÚCLEO DE METAL */}
        <section className="content-section reverse animate-on-scroll">
          <div className="image-wrapper" id="placa-metal-image">
            <img
              src={placaMetal}
              alt="Placa con núcleo de metal"
              className="media-content2"
              onMouseEnter={(e) => handleImageHover(e, true)}
              onMouseLeave={(e) => handleImageHover(e, false)}
            />
          </div>
          <div className="text-content" id="placa-metal-text">
            <h3>PLACA DE CIRCUITO IMPRESO CON NÚCLEO DE METAL</h3>
            <div className="green-underline"></div>
            <p>Utiliza un núcleo metálico para mejorar la disipación del calor, ideal para aplicaciones de alta potencia.</p>
            <button
              onClick={() =>
                abrirPopup(
                  "PCB con núcleo de metal",
                  "El sustrato está compuesto por metal (aluminio o cobre), lo que les da gran capacidad de disipación térmica y estabilidad mecánica. Son más resistentes y duraderas que las de FR4 tradicionales. Se usan en circuitos de potencia, lámparas LED industriales, fuentes de energía, automoción, electrónica de alto rendimiento y sistemas que manejan calor elevado."
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

export default Placas;