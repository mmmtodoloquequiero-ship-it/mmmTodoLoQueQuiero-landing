import React, { useState, useEffect } from 'react';
import { 
  CheckCircle, ArrowRight, Mail, Sparkles, Globe,
  Smartphone, CreditCard, ChefHat, Bike, Coins,
  Calendar, Package, SplitSquareVertical, Users, Timer,
  Download, ExternalLink, Camera, Phone
} from 'lucide-react';
import { supabase } from './supabase';
import './App.css';

export default function App() {
  const [emailInput, setEmailInput] = useState('');
  const [subscribed, setSubscribed] = useState(false);
  
  const [config, setConfig] = useState<any>(null);
  const [apps, setApps] = useState<any[]>([]);
  const [features, setFeatures] = useState<any[]>([]);
  const [socials, setSocials] = useState<any[]>([]);
  
  const [activeAppIndex, setActiveAppIndex] = useState(0);

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
          <video src={feature.media_url} autoPlay loop muted playsInline style={{ width: '100%', height: 'auto', borderRadius: '16px' }} />
        </div>
      );
    }

    return (
      <div className="golden-glow" style={{ borderRadius: '16px', overflow: 'hidden', flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <img src={feature.media_url} alt={feature.title} style={{ width: '100%', height: 'auto', borderRadius: '16px', objectFit: 'cover' }} />
      </div>
    );
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
        
        <div className="carousel-container">
          {displayApps.map((app, index) => {
            const isActive = activeAppIndex === index;
            return (
              <div 
                key={app.id} 
                onClick={() => setActiveAppIndex(index)}
                className={`carousel-card ${isActive ? 'active' : 'inactive'} ${app.isPlaceholder ? 'placeholder' : 'real'}`}
              >
                {app.logo_url ? (
                  <img src={app.logo_url} alt={app.name} className="carousel-logo" />
                ) : (
                  <div className="carousel-logo" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '100px', background: '#222', border: '1px solid #444', color: '#666' }}>
                    <Sparkles size={32} />
                  </div>
                )}
                <h3 className="carousel-title">{app.name}</h3>
                <span className="carousel-tagline">{app.tagline}</span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Área de la App Seleccionada */}
      {activeApp && (
        <section className="catalog-section animate-in fade-in duration-500" style={{ borderTop: '1px solid rgba(234, 179, 8, 0.2)', paddingTop: '4rem', marginTop: '1rem' }}>
          <div className="section-header" style={{ marginBottom: '4rem', background: 'rgba(0,0,0,0.7)', padding: '2rem', borderRadius: '24px', border: '1px solid rgba(234, 179, 8, 0.3)', backdropFilter: 'blur(10px)' }}>
            <h2 className="section-title text-yellow-500">{activeApp.name}</h2>
            <p className="section-desc" style={{ color: '#fff', fontSize: '1.2rem' }}>
              {activeApp.description}
            </p>

            {!activeApp.isPlaceholder && (
              <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '1rem', marginTop: '2rem' }}>
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
              </div>
            )}
          </div>

          {/* Características de la App Seleccionada */}
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
