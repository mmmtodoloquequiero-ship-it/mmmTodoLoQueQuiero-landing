import React, { useState, useEffect, useRef } from 'react';
import { 
  CheckCircle, ArrowRight, Mail, Sparkles, Globe,
  Smartphone, CreditCard, ChefHat, Bike, Coins,
  Calendar, Package, SplitSquareVertical, Users, Timer,
  Download, ExternalLink, Camera, Phone,
  ChevronDown, ChevronUp, AlertCircle, CheckCircle2, TrendingUp, HelpCircle,
  ChevronLeft, ChevronRight
} from 'lucide-react';
import { supabase } from './supabase';
import SalesFunnelView from './components/SalesFunnelView';
import { funnels } from './data/funnels';
import './App.css';

export default function App() {
  const [emailInput, setEmailInput] = useState('');
  const [subscribed, setSubscribed] = useState(false);
  
  const [config, setConfig] = useState<any>(null);
  const [apps, setApps] = useState<any[]>([]);
  const [features, setFeatures] = useState<any[]>([]);
  const [socials, setSocials] = useState<any[]>([]);
  
  const [activeAppIndex, setActiveAppIndex] = useState(0);
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);

  const carouselRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const { data: configData } = await supabase.from('landing_config').select('*').single();
      if (configData) setConfig(configData);

      const { data: appsData } = await supabase.from('landing_apps').select('*').order('created_at', { ascending: true });
      if (appsData) setApps(appsData);

      const { data: featuresData } = await supabase.from('landing_features').select('*').order('order_index', { ascending: true });
      if (featuresData) setFeatures(featuresData);

      const { data: socialsData } = await supabase.from('landing_socials').select('*').order('created_at', { ascending: true });
      if (socialsData) setSocials(socialsData);

    } catch (err) {
      console.error(err);
    }
  };

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!emailInput.trim()) return;
    setSubscribed(true);
    setEmailInput('');
  };

  const centerApp = (index: number) => {
    setActiveAppIndex(index);
    const container = carouselRef.current;
    const card = cardRefs.current[index];
    if (container && card) {
      const scrollLeft = card.offsetLeft - container.offsetWidth / 2 + card.offsetWidth / 2;
      container.scrollTo({ left: scrollLeft, behavior: 'smooth' });
    }
  };

  const scrollLeft = () => {
    const totalItems = Math.max(apps.length, 5);
    if (activeAppIndex > 0) {
      centerApp(activeAppIndex - 1);
    } else {
      centerApp(totalItems - 1);
    }
  };

  const scrollRight = () => {
    // We always pad up to 5 items, so the total length is at least 5
    const totalItems = Math.max(apps.length, 5);
    if (activeAppIndex < totalItems - 1) {
      centerApp(activeAppIndex + 1);
    } else {
      centerApp(0);
    }
  };

  const getIcon = (iconName: string) => {
    const icons: any = {
      Smartphone: <Smartphone className="inline-icon text-yellow-500" />,
      Calendar: <Calendar className="inline-icon text-blue-400" />,
      Package: <Package className="inline-icon text-emerald-500" />,
      SplitSquareVertical: <SplitSquareVertical className="inline-icon text-purple-400" />,
      Users: <Users className="inline-icon text-pink-400" />,
      Timer: <Timer className="inline-icon text-red-500" />,
      CreditCard: <CreditCard className="inline-icon text-green-500" />,
      ChefHat: <ChefHat className="inline-icon text-orange-500" />,
      Bike: <Bike className="inline-icon text-blue-500" />,
      Coins: <Coins className="inline-icon text-yellow-400" />,
      Globe: <Globe className="inline-icon text-cyan-400" />
    };
    return icons[iconName] || <CheckCircle className="inline-icon text-yellow-500" />;
  };

  const getSocialIcon = (type: string) => {
    switch(type) {
      case 'instagram': return <Camera size={18} />;
      case 'whatsapp': return <Phone size={18} />;
      case 'phone': return <Phone size={18} />;
      case 'email': return <Mail size={18} />;
      default: return <Globe size={18} />;
    }
  };

  const LazyVideo = ({ src }: { src: string }) => {
    const videoRef = useRef<HTMLDivElement>(null);
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
            observer.disconnect();
          }
        },
        { rootMargin: '300px' } // Comienza a cargar 300px antes de que aparezca en pantalla
      );

      if (videoRef.current) {
        observer.observe(videoRef.current);
      }

      return () => observer.disconnect();
    }, []);

    return (
      <div ref={videoRef} style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        {isVisible ? (
          <video src={src} autoPlay loop muted playsInline style={{ width: '100%', height: 'auto', borderRadius: '16px' }} />
        ) : (
          <div style={{ width: '100%', height: '300px', background: 'rgba(234, 179, 8, 0.05)', borderRadius: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <span style={{ color: '#eab308', opacity: 0.5, fontSize: '0.9rem' }}>Cargando video...</span>
          </div>
        )}
      </div>
    );
  };

  const renderMedia = (feature: any) => {
    if (!feature.media_url) {
      return (
        <div className="tutorial-media-placeholder golden-glow">
          <span className="placeholder-label">[ ESPACIO PARA IMAGEN O VIDEO ]</span>
        </div>
      );
    }

    const isVideo = feature.media_url.match(/\.(mp4|webm|ogg)$/i);
    if (isVideo) {
      return (
        <div className="golden-glow" style={{ borderRadius: '16px', overflow: 'hidden', flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <LazyVideo src={feature.media_url} />
        </div>
      );
    }

    return (
      <div className="golden-glow" style={{ borderRadius: '16px', overflow: 'hidden', flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <img src={feature.media_url} alt={feature.title} loading="lazy" style={{ width: '100%', height: 'auto', borderRadius: '16px', objectFit: 'cover' }} />
      </div>
    );
  };

  const getMarketingData = (appName: string) => {
    if (appName.includes('Comer')) {
      return {
        pain: {
          title: '¿Cansado de perder clientes por demoras y mala atención?',
          desc: 'Los mozos tardan en tomar el pedido, la cocina se desorganiza y los clientes se impacientan. Ese malestar te cuesta dinero todos los días y evita que vuelvan.',
          story: 'Imaginá un salón donde tus clientes se sientan, piden inmediatamente desde su celular sin esperar al mozo y la orden llega a la cocina sin errores. Mientras tanto, chatean con otras mesas a través de nuestro exclusivo Muro Interactivo (Tinder Gastronómico) y ganan puntos por cada compra. Tu personal solo se enfoca en entregar los platos a tiempo con una sonrisa.'
        },
        comparison: {
          title: 'Lo que nos hace únicos en el mercado:',
          points: [
            { old: 'Sistemas Tradicionales: Solo sirven para cobrar y necesitas hardware caro.', new: 'Nuestra App: Es una red social gastronómica, menú inteligente y sistema de retención de clientes (puntos) todo en uno.' }
          ]
        },
        faq: [
          { q: '¿Necesito comprar tablets o pantallas especiales?', a: '¡No! Todo funciona desde los celulares de los clientes y los dispositivos que ya tengan los mozos o cocineros.' },
          { q: '¿Qué pasa si mis clientes no son tecnológicos?', a: 'El diseño es tan simple e intuitivo que cualquier persona puede pedir. Para casos extremos, el mozo puede tomar el pedido y el sistema sigue sincronizado.' },
          { q: '¿El muro interactivo puede traer problemas?', a: 'El muro está moderado y pensado exclusivamente para conectar personas con intereses en común, agregando un enorme valor a salir a comer.' }
        ],
        cta: 'Quiero Modernizar Mi Restaurante Hoy'
      };
    } else if (appName.includes('Comprar')) {
      return {
        pain: {
          title: '¿Tus clientes se van a otro lado porque no hacés envíos o tardás en cobrar?',
          desc: 'Anotar en un cuaderno el "fiado" (cuenta corriente) es un riesgo enorme. Se pierden hojas, cuentas mal hechas, y vergüenza al cobrar.',
          story: 'Llevá tu kiosco o minimercado al siglo XXI. Dale a tus vecinos la opción de ver tu stock y hacer pedidos desde el celular (para retiro o envío). Llevá el control del "fiado" de forma 100% digital y transparente con recordatorios automáticos. Todo mientras escaneas códigos de barra con tu propio celular.'
        },
        comparison: {
          title: '¿Por qué elegir MMM Todo Lo Que Quiero Comprar?',
          points: [
            { old: 'El Viejo Cuaderno: Desorden, pérdida de plata y fricción con el cliente habitual.', new: 'Nuestra App: Cuentas claras, tecnología móvil (usá tu cámara como lector) y ventas online sin comisiones gigantes.' }
          ]
        },
        faq: [
          { q: '¿Es difícil cargar mis productos?', a: 'Podés usar tu celular para escanear el código de barras y el sistema reconoce el producto al instante.' },
          { q: '¿Cómo funciona la venta desde casa?', a: 'Tus clientes entran a tu link, eligen qué comprar y te llega el pedido ordenado directo a tu WhatsApp o a la aplicación.' }
        ],
        cta: 'Digitalizar mi Negocio Ahora'
      };
    } else if (appName.includes('5inco')) {
      return {
        pain: {
          title: 'Las colas infinitas te están haciendo perder muchísimas ventas',
          desc: 'Los clientes entran, ven la fila larguísima en la caja, y se van sin comprar. Además, contratar más cajeros o instalar cajas de auto-cobro es costoso.',
          story: 'Con 5inco, tus pasillos se convierten en cajas. El cliente usa su celular, escanea el producto y lo guarda en su bolsa. Cuando termina, paga desde la app y sale mostrando un código de seguridad. Cero colas, cero frustración. Además, les mostramos ofertas en tiempo real mientras caminan por la góndola.'
        },
        comparison: {
          title: 'La Evolución del Self-Checkout:',
          points: [
            { old: 'Cajas Rápidas Tradicionales: Máquinas gigantes que cuestan miles de dólares, ocupan espacio valioso y se rompen.', new: '5inco: Cero inversión en hardware. El celular del cliente es su propia caja registradora inteligente.' }
          ]
        },
        faq: [
          { q: '¿Cómo evito los robos si no pasan por caja?', a: 'Nuestra tecnología cuenta con validaciones por IA y auditorías aleatorias al salir (escaneando un código QR en la puerta).' },
          { q: '¿Tengo que cambiar mi sistema actual?', a: 'No, 5inco puede integrarse fácilmente a tu stock o funcionar de manera independiente con tu catálogo.' }
        ],
        cta: 'Eliminar las Colas de mi Súper'
      };
    } else {
      // Cont Agent
      return {
        pain: {
          title: '¿Tus redes sociales están abandonadas por falta de tiempo?',
          desc: 'Pagarle a un Community Manager es caro, y pensar qué publicar todos los días te agota y te distrae de lo realmente importante: manejar tu negocio.',
          story: 'Cont Agent es tu propia Agencia de Marketing automatizada por Inteligencia Artificial. Ella piensa las ideas, diseña los posts, redacta y publica por vos todos los días. Sin excusas.'
        },
        comparison: {
          title: '¿Por qué usar Cont Agent en lugar de hacerlo vos mismo?',
          points: [
            { old: 'Canva u otras herramientas: Pasás horas diseñando un solo post para conseguir pocos likes.', new: 'Cont Agent: Le decís "Quiero contenido para mi marca", y te genera meses de posteos listos en segundos.' }
          ]
        },
        faq: [
          { q: '¿Qué redes sociales soporta?', a: 'Actualmente automatizamos Instagram y Facebook.' },
          { q: '¿Las imágenes se van a ver genéricas?', a: 'Nuestra IA analiza tu marca para crear diseños, textos y hashtags que se sientan 100% auténticos.' }
        ],
        cta: 'Dejar que la IA maneje mis Redes'
      };
    }
  };

  const displayApps = [...apps];
  while (displayApps.length < 5) {
    displayApps.push({ 
      id: `placeholder-${displayApps.length}`, 
      isPlaceholder: true, 
      name: 'Próximamente', 
      tagline: 'Nueva herramienta en desarrollo',
      description: 'Estamos trabajando en nuevas soluciones para potenciar tu negocio. ¡Mantenete atento!',
      logo_url: '' 
    });
  }

  const activeApp = displayApps[activeAppIndex];
  const appFeatures = activeApp?.isPlaceholder ? [] : features.filter(f => f.app_id === activeApp?.id).sort((a, b) => a.order_index - b.order_index);

  const bgImageUrl = config?.bg_image_url || '/bg-landing.jpg';

  return (
    <div className="landing-wrapper">
      <div className="landing-bg" style={{ backgroundImage: `url(${bgImageUrl})` }}></div>

      <div className="glow-blob blob-1" style={{ background: 'radial-gradient(circle, rgba(234, 179, 8, 0.4) 0%, transparent 70%)' }} />
      <div className="glow-blob blob-2" style={{ background: 'radial-gradient(circle, rgba(234, 179, 8, 0.2) 0%, transparent 70%)' }} />
      <div className="glow-blob blob-3" />

      {/* Barra de navegación */}
      <header className="navbar" style={{ background: 'rgba(0,0,0,0.6)', borderBottom: '1px solid rgba(234, 179, 8, 0.2)' }}>
        <a href="#" className="nav-logo">
          {/* Logo general de la marca. Si la primera app tiene logo, lo usamos como marca principal por ahora, o dejamos el de siempre */}
          <img src="/logo-app.jpg" alt="MMM Todo Lo Que Quiero" style={{ height: '40px', borderRadius: '8px' }} />
        </a>
        <nav>
          <ul className="nav-links">
            <li><a href="#catalogo-apps" className="nav-link">Catálogo de Apps</a></li>
          </ul>
        </nav>
        
        {/* Social Links on Navbar */}
        <div style={{ display: 'flex', gap: '1rem', alignItems: 'center', marginLeft: 'auto', marginRight: '2rem' }}>
          {socials.filter(s => s.type === 'instagram' || s.type === 'whatsapp').map(social => (
            <a key={social.id} href={social.url} target="_blank" rel="noreferrer" style={{ color: '#eab308', display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
              {getSocialIcon(social.type)}
            </a>
          ))}
        </div>

        <button 
          onClick={() => document.getElementById('contacto')?.scrollIntoView({ behavior: 'smooth' })}
          className="btn-contact-nav"
        >
          Escribirnos
        </button>
      </header>

      {/* Hero Section */}
      <section className="hero">
        <div className="hero-tag animate-in fade-in duration-700" style={{ background: 'rgba(0,0,0,0.6)', border: '1px solid rgba(234, 179, 8, 0.4)' }}>
          <Sparkles size={14} className="text-yellow-500" /> Soluciones Digitales Simples
        </div>
        <h1 className="hero-title animate-in fade-in slide-in-from-bottom-5 duration-700 delay-100">
          <span className="text-gradient">Tecnología que te facilita la vida y el negocio</span>
        </h1>
        <p className="hero-desc animate-in fade-in slide-in-from-bottom-5 duration-700 delay-200">
          En MMM Todo Lo Que Quiero desarrollamos herramientas pensadas para el día a día. Sin complicaciones técnicas, fáciles de usar y diseñadas para que ganes tiempo y dinero.
        </p>
        <div className="hero-actions animate-in fade-in slide-in-from-bottom-5 duration-700 delay-300">
          <a href="#catalogo-apps" className="btn-primary" style={{ background: 'linear-gradient(135deg, #eab308, #ca8a04)' }}>
            Descubrí nuestras apps <ArrowRight size={18} />
          </a>
        </div>
      </section>

      {/* Catálogo de Apps (Carrusel) */}
      <div id="catalogo-apps" style={{ paddingTop: '4rem', paddingBottom: '2rem', width: '100%', overflow: 'hidden' }}>
        <div style={{ textAlign: 'center', padding: '0 1rem' }}>
          <h2 className="text-yellow-500" style={{ fontSize: 'clamp(2rem, 5vw, 2.5rem)', marginBottom: '1rem', fontWeight: 800 }}>Nuestro Ecosistema</h2>
          <p style={{ color: '#ccc', marginBottom: '2rem', fontSize: 'clamp(0.9rem, 3vw, 1.1rem)' }}>Deslizá para explorar todas nuestras aplicaciones disponibles y futuras.</p>
        </div>
        
        <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
          <button 
            onClick={scrollLeft}
            className="carousel-nav-btn left"
          >
            <ChevronLeft size={32} />
          </button>

          <div className="carousel-container" ref={carouselRef}>
            {displayApps.map((app, index) => {
              const isActive = activeAppIndex === index;
              return (
                <div 
                  key={app.id}
                  ref={el => { cardRefs.current[index] = el; }}
                  onClick={() => centerApp(index)}
                  className={`carousel-card ${isActive ? 'active' : 'inactive'} ${app.isPlaceholder ? 'placeholder' : 'real'}`}
                >
                  {app.logo_url ? (
                    <img src={app.logo_url} alt={app.name} className="carousel-logo" />
                  ) : (
                    <div className="carousel-logo" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '100px', height: '100px', background: '#222', border: '1px solid #444', color: '#666', borderRadius: '16px' }}>
                      <Sparkles size={32} />
                    </div>
                  )}
                  <h3 className="carousel-title">{app.name}</h3>
                  <span className="carousel-tagline">{app.tagline}</span>
                </div>
              );
            })}
          </div>

          <button 
            onClick={scrollRight}
            className="carousel-nav-btn right"
          >
            <ChevronRight size={32} />
          </button>
        </div>
      </div>

      {/* Área de la App Seleccionada */}
      {activeApp && (
        <section className="catalog-section animate-in fade-in duration-500" style={{ borderTop: '1px solid rgba(234, 179, 8, 0.2)', paddingTop: '4rem', marginTop: '1rem' }}>
          <div className="section-header" style={{ marginBottom: '4rem', background: 'rgba(0,0,0,0.7)', padding: '2rem', borderRadius: '24px', border: '1px solid rgba(234, 179, 8, 0.3)', backdropFilter: 'blur(10px)' }}>
            <h2 className="section-title text-yellow-500">{activeApp.name}</h2>
            <p className="section-desc" style={{ color: '#fff', fontSize: '1.2rem', maxWidth: '800px', margin: '0 auto' }}>
              {activeApp.description}
            </p>

            {!activeApp.isPlaceholder && (
              <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '1rem', marginTop: '2.5rem' }}>
                {activeApp.apk_url && (
                  <a href={activeApp.apk_url} className="btn-primary" style={{ background: '#4ade80', color: '#000', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <Download size={20} /> Descargar APK
                  </a>
                )}
                {activeApp.web_url && (
                  <a href={activeApp.web_url} target="_blank" rel="noreferrer" className="btn-secondary" style={{ background: '#3b82f6', color: '#fff', borderColor: '#3b82f6', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <ExternalLink size={20} /> Utilizar Online
                  </a>
                )}
                {activeApp.playstore_url && (
                  <a href={activeApp.playstore_url} target="_blank" rel="noreferrer" className="btn-secondary" style={{ background: '#ec4899', color: '#fff', borderColor: '#ec4899', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <Smartphone size={20} /> Ver en Play Store
                  </a>
                )}
              </div>
            )}
          </div>

          {funnels[activeApp.name] && !activeApp.isPlaceholder ? (
            <SalesFunnelView 
              funnel={funnels[activeApp.name]} 
              dbFeatures={appFeatures}
              appWebUrl={activeApp.web_url}
              appApkUrl={activeApp.apk_url}
              appPlaystoreUrl={activeApp.playstore_url}
              onCTA={() => document.getElementById('contacto')?.scrollIntoView({ behavior: 'smooth' })} 
            />
          ) : (
            <>
              {/* Características de la App Seleccionada (Genérico) */}
              {!activeApp.isPlaceholder && (
                <div className="features-tutorial-container">
                  {appFeatures.map((feature, index) => (
                    <div key={feature.id} className={`tutorial-row ${index % 2 !== 0 ? 'reverse' : ''}`} style={{ marginBottom: '5rem' }}>
                      
                      <div className="tutorial-text" style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                        <div>
                          <h3>{getIcon(feature.icon_name)} {feature.order_index}. {feature.title}</h3>
                          <p>{feature.description}</p>
                        </div>

                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', marginTop: '1rem' }}>
                          {activeApp.apk_url && (
                            <a href={activeApp.apk_url} className="btn-primary" style={{ background: 'rgba(74, 222, 128, 0.1)', color: '#4ade80', border: '1px solid #4ade80', padding: '0.6rem 1rem', fontSize: '0.9rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                              <Download size={18} /> Descargar APK
                            </a>
                          )}
                          {activeApp.web_url && (
                            <a href={activeApp.web_url} target="_blank" rel="noreferrer" className="btn-secondary" style={{ background: 'rgba(59, 130, 246, 0.1)', color: '#60a5fa', border: '1px solid #3b82f6', padding: '0.6rem 1rem', fontSize: '0.9rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                              <ExternalLink size={18} /> Usar Online
                            </a>
                          )}
                        </div>
                      </div>

                      {renderMedia(feature)}
                    </div>
                  ))}
                </div>
              )}

              {/* Marketing Sections: Dolores, Comparison, FAQ, CTA (Genérico) */}
              {!activeApp.isPlaceholder && activeApp.name && (
            <div className="marketing-container" style={{ marginTop: '5rem' }}>
              {(() => {
                const mkt = getMarketingData(activeApp.name);
                return (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 'clamp(3rem, 6vw, 5rem)' }}>
                    
                    {/* El Problema (Dolor) */}
                    <div style={{ background: 'linear-gradient(135deg, rgba(239,68,68,0.1) 0%, rgba(0,0,0,0) 100%)', border: '1px solid rgba(239,68,68,0.2)', padding: 'clamp(1.5rem, 5vw, 3rem)', borderRadius: '24px', textAlign: 'center' }}>
                      <AlertCircle size={48} style={{ color: '#ef4444', margin: '0 auto 1.5rem auto' }} />
                      <h2 style={{ fontSize: 'clamp(1.5rem, 4vw, 2rem)', color: '#fff', marginBottom: '1rem', fontWeight: 800 }}>{mkt.pain.title}</h2>
                      <p style={{ color: '#fca5a5', fontSize: 'clamp(1rem, 3vw, 1.2rem)', marginBottom: '2rem', maxWidth: '800px', margin: '0 auto 2rem auto' }}>
                        {mkt.pain.desc}
                      </p>
                      
                      <div style={{ background: 'rgba(74, 222, 128, 0.05)', border: '1px solid rgba(74, 222, 128, 0.2)', padding: 'clamp(1.2rem, 4vw, 2rem)', borderRadius: '16px', marginTop: '2rem', textAlign: 'left' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem' }}>
                          <CheckCircle2 size={32} className="text-green-400" />
                          <h3 style={{ color: '#4ade80', fontSize: '1.5rem', margin: 0 }}>La Solución</h3>
                        </div>
                        <p style={{ color: '#fff', fontSize: '1.1rem', lineHeight: '1.8' }}>
                          {mkt.pain.story}
                        </p>
                      </div>
                    </div>

                    {/* Comparación (Diferenciador) */}
                    <div className="marketing-comparison" style={{ padding: 'clamp(1.5rem, 4vw, 2rem)', background: 'rgba(234, 179, 8, 0.05)' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.5rem' }}>
                        <TrendingUp size={32} className="text-yellow-500" />
                        <h2 style={{ fontSize: 'clamp(1.4rem, 3vw, 1.8rem)', color: '#eab308', margin: 0 }}>{mkt.comparison.title}</h2>
                      </div>
                      
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                        {mkt.comparison.points.map((point, idx) => (
                          <div key={idx} style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', background: 'rgba(0,0,0,0.4)', padding: 'clamp(1rem, 3vw, 1.5rem)', borderRadius: '12px' }}>
                            <div style={{ color: '#f87171', display: 'flex', alignItems: 'center', gap: '0.5rem' }}><AlertCircle size={16} className="inline-icon" /> <s>{point.old}</s></div>
                            <div style={{ color: '#4ade80', display: 'flex', alignItems: 'center', gap: '0.5rem', fontWeight: 'bold' }}><CheckCircle2 size={16} className="inline-icon" /> {point.new}</div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* FAQ */}
                    <div style={{ maxWidth: '800px', margin: '0 auto', width: '100%' }}>
                      <h2 style={{ fontSize: '2rem', color: '#fff', marginBottom: '2rem', textAlign: 'center', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '1rem' }}>
                        <HelpCircle className="text-yellow-500" /> Preguntas Frecuentes
                      </h2>
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                        {mkt.faq.map((faq, idx) => (
                          <div key={idx} style={{ background: 'rgba(255,255,255,0.05)', borderRadius: '12px', overflow: 'hidden', border: '1px solid rgba(255,255,255,0.1)' }}>
                            <button 
                              onClick={() => setOpenFaqIndex(openFaqIndex === idx ? null : idx)}
                              style={{ width: '100%', padding: 'clamp(1rem, 3vw, 1.5rem)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'transparent', border: 'none', color: '#fff', cursor: 'pointer', fontSize: '1.1rem', fontWeight: 'bold', textAlign: 'left' }}
                            >
                              {faq.q}
                              {openFaqIndex === idx ? <ChevronUp className="text-yellow-500 inline-icon" /> : <ChevronDown className="text-yellow-500 inline-icon" />}
                            </button>
                            {openFaqIndex === idx && (
                              <div style={{ padding: '0 clamp(1rem, 3vw, 1.5rem) clamp(1rem, 3vw, 1.5rem) clamp(1rem, 3vw, 1.5rem)', color: '#ccc', lineHeight: '1.6' }}>
                                {faq.a}
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* CTA Final */}
                    <div style={{ textAlign: 'center', padding: 'clamp(2.5rem, 5vw, 4rem) clamp(1rem, 3vw, 2rem)', background: 'radial-gradient(circle, rgba(234, 179, 8, 0.15) 0%, rgba(0,0,0,0) 70%)' }}>
                      <h2 style={{ fontSize: 'clamp(1.8rem, 4vw, 2.5rem)', color: '#fff', marginBottom: '2rem', fontWeight: 900 }}>¿Listo para el siguiente paso?</h2>
                      <button 
                        onClick={() => document.getElementById('contacto')?.scrollIntoView({ behavior: 'smooth' })}
                        className="btn-primary pulse-anim" 
                        style={{ fontSize: '1.2rem', padding: '1rem 2rem', background: 'linear-gradient(135deg, #eab308, #ca8a04)', boxShadow: '0 10px 25px rgba(234, 179, 8, 0.4)', flexWrap: 'wrap', justifyContent: 'center' }}
                      >
                        {mkt.cta} <ArrowRight size={24} className="inline-icon" />
                      </button>
                    </div>

                  </div>
                );
              })()}
            </div>
          )}
          </>
          )}

        </section>
      )}

      {/* Formulario de Contacto */}
      <section id="contacto" className="contact-section" style={{ background: 'transparent' }}>
        <div className="contact-container" style={{ background: 'rgba(0,0,0,0.8)', padding: '3rem', borderRadius: '30px', border: '1px solid rgba(234, 179, 8, 0.3)', backdropFilter: 'blur(10px)' }}>
          <h2 className="contact-title text-yellow-500">¿Querés sumar tu local al futuro?</h2>
          <p className="contact-desc" style={{ color: '#ddd' }}>
            Dejanos tu correo y nos ponemos en contacto para mostrarte cómo podemos transformar tu negocio.
          </p>
          
          {subscribed ? (
            <div style={{ 
              background: 'rgba(234, 179, 8, 0.1)', 
              border: '1px solid rgba(234, 179, 8, 0.3)', 
              color: '#fef08a',
              padding: '1.5rem',
              borderRadius: '20px',
              fontWeight: 700
            }}>
              <CheckCircle size={32} style={{ margin: '0 auto 0.5rem auto' }} />
              ¡Te has registrado con éxito! Te contactaremos a la brevedad.
            </div>
          ) : (
            <form onSubmit={handleSubscribe} className="contact-form" style={{ background: 'rgba(0,0,0,0.5)', border: '1px solid rgba(234, 179, 8, 0.4)' }}>
              <input 
                type="email" 
                required 
                placeholder="Ingresa tu correo electrónico..." 
                className="contact-input"
                value={emailInput}
                onChange={e => setEmailInput(e.target.value)}
              />
              <button type="submit" className="btn-submit" style={{ color: '#ca8a04', background: '#fff' }}>
                Contactame <Mail size={16} />
              </button>
            </form>
          )}

          {/* Render Socials on Contact Section */}
          {socials.length > 0 && (
            <div style={{ marginTop: '3rem', borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: '2rem' }}>
              <h3 style={{ color: '#fff', fontSize: '1.2rem', marginBottom: '1.5rem' }}>Otros Medios de Contacto</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', alignItems: 'center' }}>
                {socials.map(social => (
                  <a key={social.id} href={social.url} target="_blank" rel="noreferrer" style={{ display: 'flex', alignItems: 'center', gap: '0.8rem', color: '#eab308', textDecoration: 'none', background: 'rgba(234, 179, 8, 0.1)', padding: '0.8rem 1.5rem', borderRadius: '12px', width: 'fit-content' }}>
                    {getSocialIcon(social.type)} {social.label}
                  </a>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Footer */}
      <footer className="footer" style={{ background: 'rgba(0,0,0,0.9)', borderTop: '1px solid rgba(234, 179, 8, 0.2)' }}>
        <div className="footer-content">
          <div className="footer-brand">
            <img src="/logo-app.jpg" alt="MMM Todo Lo Que Quiero" style={{ height: '30px', borderRadius: '4px', marginBottom: '1rem' }} />
            <p className="footer-desc" style={{ color: '#aaa' }}>
              Soluciones tecnológicas simples y efectivas para el día a día.
            </p>
          </div>
        </div>
        
        <div className="footer-bottom" style={{ borderTop: '1px solid rgba(255,255,255,0.1)' }}>
          <p className="footer-copy">
            &copy; {new Date().getFullYear()} MMM Todo Lo Que Quiero. Todos los derechos reservados.
          </p>
        </div>
      </footer>
    </div>
  );
}
