 

import React, { useState, useEffect, useRef, useCallback } from "react";
import '@fortawesome/fontawesome-free/css/all.min.css';
import logoSena from '../imagenes/logoSena.png';
import imagen8 from '../imagenes/Logo_TransforElectro.png'; // Logo TransforElectro
import imagen1 from '../imagenes/Hakko FM-206.jpeg';
import imagen2 from '../imagenes/Hakko FX-951.jpeg';
import imagen3 from '../imagenes/Horno.jpeg';
import imagen4 from '../imagenes/LPKF ProtoMat S63.jpeg';
import imagen5 from '../imagenes/Madell Quick 702.jpeg';
import imagen6 from '../imagenes/Madell Quick 857D.jpeg';
import imagen7 from '../imagenes/Maquina_ProtoPlace.jpeg';
import imagen9 from '../imagenes/Microscopio.jpeg';
import imagen10 from '../imagenes/Voltera.jpeg';
import imagen11 from '../imagenes/X-Tronic 5040-XTS.jpeg';
import imagen12 from '../imagenes/guillotina.jpeg';
import maquinaPresentacion from '../imagenes/Maquina_Presentacion.jpg';
import './maquinas.css'; // Importa el CSS mejorado para Placas

function Maquinas() {
  

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
            BIENVENIDO AL APARTADO DE MÁQUINAS.
          </p>
        </section>

        {/* Media section - Imagen principal estática de las placas */}
        <section className="media-placeholder animate-on-scroll" id="media-section">
          <div className="placeholder-content">
            <img src={maquinaPresentacion} alt="Imagen principal de placas" className="placa-presentacion-img" />
          </div>
        </section>

        {/* Texto secundario de la página */}
        <section className="textoSecundario-container">
          <p className="texto-secundario animate-on-scroll" id="secondary-text">
           Las máquinas son el pilar de la electrónica moderna, esenciales para transformar ideas y diseños en dispositivos funcionales. 
           Su principal utilidad radica en automatizar, precisar y escalar procesos de fabricación, prueba y prototipado, que de otro modo serían imposibles, 
           extremadamente lentos o propensos a errores si se hicieran manualmente. Permiten el ensamblaje de componentes microscópicos con alta exactitud,
            garantizan la consistencia en la producción masiva y han hecho posible la miniaturización y complejidad de la tecnología actual.
          </p>
        </section>

        {/* Título de la sección de tipos de placas */}
        <section className="apartados-container">
          <p className="texto-apartados animate-on-scroll" id="tools-title">
            TIPOS DE MÁQUINAS
          </p>
        </section>

        {/* Apartado 1 */}
        <section className="content-section reverse animate-on-scroll">
          <div className="image-wrapper">
            <img
              src={imagen1}
              alt="maquina Hakko FM-206"
              className="media-content2"
              onMouseEnter={(e) => handleImageHover(e, true)}
              onMouseLeave={(e) => handleImageHover(e, false)}
            />
          </div>
          <div className="text-content" id="placa-una-cara-text">
            <h3>Hakko FM-206</h3>
            <div className="green-underline"></div>
            <p>Es una estación de retrabajo (rework station) que ofrece múltiples funciones en una sola unidad compacta, incluyendo soldadura, desoldadura y retrabajo SMD</p>
            <button
              onClick={() =>
                abrirPopup(
                  "Hakko FM-206",
                  "Es una estación de retrabajo de sobremesa compacta y versátil que permite conectar hasta tres herramientas simultáneamente (soldador, desoldador, aire caliente), facilitando la soldadura, desoldadura y retrabajo de componentes de montaje superficial (SMD) con gran eficiencia en laboratorios de I+D, producción de bajo volumen y talleres de reparación."
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

        {/* Apartado 2 */}
        <section className="content-section animate-on-scroll">
          <div className="text-content">
            <h3>Hakko FX-951</h3>
            <div className="green-underline"></div>
            <p>Es una estación de soldadura de alto rendimiento, conocida por su rapidez en la recuperación de la temperatura de la punta.</p>
            <button
              onClick={() =>
                abrirPopup(
                  "Hakko FX-951",
                  "Esta estación de soldadura manual de alto rendimiento se enfoca en proporcionar una soldadura rápida y precisa mediante su tecnología de calentamiento eficiente. Es una herramienta estándar en la fabricación de productos electrónicos, el ensamblaje de componentes sensibles y los laboratorios de prototipado."
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
              src={imagen2}
              alt="HAKKO FX-951"
              className="media-content2"
              onMouseEnter={(e) => handleImageHover(e, true)}
              onMouseLeave={(e) => handleImageHover(e, false)}
            />
          </div>
        </section>

        {/* Apartado 3 */}
        <section className="content-section reverse animate-on-scroll">
          <div className="image-wrapper">
            <img
              src={imagen3}
              alt="Horno TWS"
              className="media-content2"
              onMouseEnter={(e) => handleImageHover(e, true)}
              onMouseLeave={(e) => handleImageHover(e, false)}
            />
          </div>
          <div className="text-content">
            <h3>Horno TWS</h3>
            <div className="green-underline"></div>
            <p>se utilizan para soldar componentes de montaje superficial (SMD) a placas de circuito impreso (PCB) mediante la aplicación de pasta de soldadura.</p>
            <button
              onClick={() =>
                abrirPopup(
                  "Horno TWS",
                  "Este horno de reflujo es indispensable para soldar múltiples componentes SMD a una PCB de manera simultánea y controlada, siguiendo perfiles de temperatura específicos. Se utiliza en líneas de ensamblaje de PCBs, la producción en masa de dispositivos electrónicos y laboratorios de prototipado."
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
            <h3>LPKF ProtoMat S63</h3>
            <div className="green-underline"></div>
            <p> máquina fresadoras de precisión que permiten a los ingenieros y desarrolladores crear placas de circuito impreso en sus propios laboratorios.</p>
            <button
              onClick={() =>
                abrirPopup(
                  "LPFK ProtoMat S63",
                  "Esta fresadora de alta precisión está diseñada para la fabricación rápida de prototipos de placas de circuito impreso (PCB) directamente en el laboratorio, fresando pistas, perforando orificios y cortando el contorno de la placa a partir de diseños digitales. Es esencial en laboratorios de I+D, universidades y centros de diseño electrónico para prototipar rápidamente."
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
              alt="LPKF ProtoMat S63"
              className="media-content2"
              onMouseEnter={(e) => handleImageHover(e, true)}
              onMouseLeave={(e) => handleImageHover(e, false)}
            />
          </div>
        </section>

        {/* Apartado 5 */}
        <section className="content-section reverse animate-on-scroll">
          <div className="image-wrapper">
            <img
              src={imagen5}
              alt="Madell Quick 702"
              className="media-content2"
              onMouseEnter={(e) => handleImageHover(e, true)}
              onMouseLeave={(e) => handleImageHover(e, false)}
            />
          </div>
          <div className="text-content" id="placa-flexible-text">
            <h3>Madell Quick 702</h3>
            <div className="green-underline"></div>
            <p>son herramientas esenciales en la electrónica para el desoldado y soldado de componentes SMD.</p>
            <button
              onClick={() =>
                abrirPopup(
                  "Madell Quick 702",
                  "Es una estación de retrabajo combinada que integra una pistola de aire caliente y un cautín de soldadura en una sola unidad. Se utiliza para desoldar y soldar componentes SMD con aire caliente y componentes de orificio pasante con el cautín, siendo muy popular en talleres de reparación, montaje de prototipos y labores de mantenimiento."
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

        {/* Apartado 6  */}
        <section className="content-section animate-on-scroll">
          <div className="text-content">
            <h3>Madell Quick 857D</h3>
            <div className="green-underline"></div>
            <p>son muy populares para la soldadura y desoldadura de componentes SMD (Surface Mount Device) utilizando aire caliente controlado. </p>
            <button
              onClick={() =>
                abrirPopup(
                  "Madell Quick 857D",
                  "Esta estación de aire caliente se dedica a proporcionar un flujo de aire caliente controlado con precisión para soldar y desoldar componentes de montaje superficial (SMD) sin dañar la placa. Es un estándar en talleres de reparación de dispositivos electrónicos (móviles, consolas, placas base) y en la creación de prototipos o producción de bajo volumen."
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
              src={imagen6}
              alt="Madell Quick 857D"
              className="media-content2"
              onMouseEnter={(e) => handleImageHover(e, true)}
              onMouseLeave={(e) => handleImageHover(e, false)}
            />
          </div>
        </section>

        {/* Apartado 7   */}
        <section className="content-section reverse animate-on-scroll">
          <div className="image-wrapper" id="placa-ceramica-image">
            <img
              src={imagen7}
              alt="LPKF ProtoPlace S"
              className="media-content2"
              onMouseEnter={(e) => handleImageHover(e, true)}
              onMouseLeave={(e) => handleImageHover(e, false)}
            />
          </div>
          <div className="text-content">
            <h3>LPKF ProtoPlace S</h3>
            <div className="green-underline"></div>
            <p> máquina de montaje manual de componentes de montaje superficial (SMD) para prototipos y series pequeñas de PCBs.</p>
            <button
              onClick={() =>
                abrirPopup(
                  "LPKF ProtoPlace S",
                  "Es una estación de montaje manual de componentes de montaje superficial (SMD) que asiste al operario en la colocación precisa de estos componentes sobre una PCB. Se utiliza en laboratorios de I+D y empresas que fabrican prototipos o series cortas de PCBs, mejorando la velocidad y precisión del montaje manual"
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

        {/* Apartado 8  */}
        <section className="content-section animate-on-scroll">
          <div className="text-content">
            <h3>Dispensador de Pasta de Soldadura Automático</h3>
            <div className="green-underline"></div>
            <p> se utilizan en la fabricación y retrabajo de PCBs para aplicar con precisión pequeñas cantidades de pasta de soldadura (o adhesivo) en los pads de los componentes SMD. </p>
            <button
              onClick={() =>
                abrirPopup(
                  "Dispensador de Pasta de Soldadura Automático",
                  "Esta herramienta de precisión se encarga de dispensar con alta exactitud pequeñas cantidades de pasta de soldadura (u otros fluidos) sobre los pads de una PCB. Es crucial en la fabricación de PCBs con tecnología SMD, tanto en líneas de producción automatizadas como en prototipado y retrabajo, donde el control del material es estricto."
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
              src={imagen9}
              alt="Dispensador de Pasta de Soldadura Automático"
              className="media-content2"
              onMouseEnter={(e) => handleImageHover(e, true)}
              onMouseLeave={(e) => handleImageHover(e, false)}
            />
          </div>
        </section>

        {/* Apartado 9   */}
        <section className="content-section reverse animate-on-scroll">
          <div className="image-wrapper">
            <img
              src={imagen10}
              alt="Dispensador de Pasta de Soldadura Automático"
              className="media-content2"
              onMouseEnter={(e) => handleImageHover(e, true)}
              onMouseLeave={(e) => handleImageHover(e, false)}
            />
          </div>
          <div className="text-content">
            <h3>Voltera V-One</h3>
            <div className="green-underline"></div>
            <p>impresora de PCB (Printed Circuit Board) y ensambladora de componentes de escritorio, diseñada para la creación rápida de prototipos electrónicos.</p>
            <button
              onClick={() =>
                abrirPopup(
                  "Voltera V-One",
                  "Esta innovadora impresora de PCB de escritorio es una herramienta multifuncional que permite imprimir pistas conductoras, dispensar pasta de soldadura y realizar el proceso de soldadura por reflujo. Es ideal para ingenieros, estudiantes y makers que necesitan un prototipado rápido y flexible de PCBs, desde el diseño hasta el ensamblaje básico, en su propio espacio de trabajo."
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

        {/* Apartado 10  */}
        <section className="content-section animate-on-scroll">
          <div className="text-content">
            <h3>X-Tronic 5040-XTS</h3>
            <div className="green-underline"></div>
            <p>Es un equipo versátil diseñado para la reparación y ensamblaje de componentes electrónicos.</p>
            <button
              onClick={() =>
                abrirPopup(
                  "X-Tronic 5040-XTS",
                  "Es una estación de retrabajo completa que integra capacidades de soldadura con cautín, desoldado con aire caliente y, a menudo, una placa de precalentamiento infrarrojo para PCBs. Es una solución versátil para talleres de reparación, centros de formación técnica y laboratorios que requieren un equipo todo-en-uno para tareas complejas de retrabajo electrónico."
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
              src={imagen11}
              alt="X-Tronic 5040-XTS"
              className="media-content2"
              onMouseEnter={(e) => handleImageHover(e, true)}
              onMouseLeave={(e) => handleImageHover(e, false)}
            />
          </div>
        </section>

        {/* Apartado 11  */}
        <section className="content-section reverse animate-on-scroll">
          <div className="image-wrapper" >
            <img
              src={imagen12}
              alt="Guillotina Manual"
              className="media-content2"
              onMouseEnter={(e) => handleImageHover(e, true)}
              onMouseLeave={(e) => handleImageHover(e, false)}
            />
          </div>
          <div className="text-content" id="placa-metal-text">
            <h3>Guillotina Manual</h3>
            <div className="green-underline"></div>
            <p>Se utiliza para cortar con precisión los laminados de PCB al tamaño deseado durante el proceso de fabricación o prototipado.</p>
            <button
              onClick={() =>
                abrirPopup(
                  "Guillotina Manual",
                  "Esta herramienta es fundamental en la fase inicial de la fabricación de PCBs para cortar con precisión los laminados de cobre a las dimensiones exactas requeridas por el diseño del circuito. Es indispensable en laboratorios de prototipado y talleres de fabricación de PCBs a pequeña escala para preparar el material base."
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

export default Maquinas;