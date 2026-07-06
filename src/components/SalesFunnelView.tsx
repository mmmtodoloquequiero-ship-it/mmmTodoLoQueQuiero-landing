import { useState } from 'react';
import { 
  AlertCircle, ChevronDown, ChevronUp, ArrowRight,
  Smartphone, Calendar, Coins, Sparkles, MessageSquare, Star, Check, HelpCircle,
  ChevronLeft, ChevronRight, Users
} from 'lucide-react';
import type { FunnelData } from '../data/funnels';

interface SalesFunnelViewProps {
  funnel: FunnelData;
  onCTA: () => void;
}

export default function SalesFunnelView({ funnel, onCTA }: SalesFunnelViewProps) {
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);
  const [expandedFeatures, setExpandedFeatures] = useState<Record<string, boolean>>({});
  const [currentTestimonialIndex, setCurrentTestimonialIndex] = useState(0);

  const toggleFeature = (tierId: string, type: 'normal' | 'exclusive', index: number) => {
    const key = `${tierId}-${type}-${index}`;
    setExpandedFeatures(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  const nextTestimonial = () => {
    setCurrentTestimonialIndex((prev) => (prev + 1) % funnel.testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentTestimonialIndex((prev) => (prev - 1 + funnel.testimonials.length) % funnel.testimonials.length);
  };

  const getIcon = (iconName: string, size: number = 32) => {
    const icons: any = {
      Smartphone: <Smartphone size={size} className="text-yellow-500" />,
      Calendar: <Calendar size={size} className="text-yellow-500" />,
      Coins: <Coins size={size} className="text-yellow-500" />,
      Users: <Users size={size} className="text-yellow-500" />
    };
    return icons[iconName] || <Sparkles size={size} className="text-yellow-500" />;
  };

  return (
    <div className="sales-funnel-container" style={{ display: 'flex', flexDirection: 'column', gap: 'clamp(4rem, 8vw, 8rem)', marginTop: '2rem' }}>
      
      {/* 1. HERO / PAIN POINT */}
      <div style={{ background: 'linear-gradient(135deg, rgba(239,68,68,0.1) 0%, rgba(0,0,0,0) 100%)', border: '1px solid rgba(239,68,68,0.2)', padding: 'clamp(2rem, 5vw, 4rem)', borderRadius: '24px', textAlign: 'center' }}>
        <AlertCircle size={48} style={{ color: '#ef4444', margin: '0 auto 1.5rem auto' }} />
        <h2 style={{ fontSize: 'clamp(1.8rem, 4vw, 2.5rem)', color: '#fff', marginBottom: '1rem', fontWeight: 800 }}>{funnel.hero.title}</h2>
        <p style={{ color: '#fca5a5', fontSize: 'clamp(1.1rem, 3vw, 1.4rem)', marginBottom: '2rem', maxWidth: '800px', margin: '0 auto 2rem auto', fontWeight: 'bold' }}>
          {funnel.hero.painPoint}
        </p>
        <p style={{ color: '#ccc', fontSize: '1.1rem', maxWidth: '800px', margin: '0 auto', lineHeight: '1.6' }}>
          {funnel.hero.subtitle}
        </p>
      </div>

      {/* 2. DIFFERENTIATOR (Tinder Gastronómico) */}
      <div style={{ padding: 'clamp(1.5rem, 4vw, 3rem)', background: 'rgba(234, 179, 8, 0.05)', border: '1px solid rgba(234, 179, 8, 0.2)', borderRadius: '24px' }}>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', marginBottom: '2rem' }}>
          <Sparkles size={40} className="text-yellow-500" style={{ marginBottom: '1rem' }} />
          <h2 style={{ fontSize: 'clamp(1.5rem, 4vw, 2.2rem)', color: '#eab308', margin: 0, fontWeight: 900 }}>{funnel.differentiator.title}</h2>
          <h3 style={{ fontSize: '1.2rem', color: '#fff', marginTop: '0.5rem' }}>{funnel.differentiator.subtitle}</h3>
        </div>
        
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem', alignItems: 'center' }}>
          <div>
            <p style={{ color: '#ddd', fontSize: '1.1rem', lineHeight: '1.8', marginBottom: '1.5rem' }}>
              {funnel.differentiator.description}
            </p>
            {funnel.differentiator.quote && (
              <div style={{ background: 'rgba(0,0,0,0.4)', padding: '1.5rem', borderRadius: '12px', borderLeft: '4px solid #4ade80' }}>
                <p style={{ color: '#4ade80', margin: 0, fontStyle: 'italic', fontSize: '1rem' }}>
                  "{funnel.differentiator.quote}"
                </p>
              </div>
            )}
          </div>
          <div>
            <img 
              src={funnel.differentiator.image || "/restaurant_interactive_wall.png"} 
              alt={funnel.differentiator.title} 
              style={{ width: '100%', borderRadius: '16px', boxShadow: '0 10px 30px rgba(0,0,0,0.5)' }} 
            />
            <p style={{ textAlign: 'center', color: '#888', fontSize: '0.9rem', marginTop: '1rem' }}>
              {funnel.differentiator.imageCaption}
            </p>
          </div>
        </div>
      </div>

      {/* 3. INTERLEAVED FEATURES & STORYTELLING */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 'clamp(3rem, 6vw, 6rem)' }}>
        {funnel.interleavedFeatures.map((feat) => (
          <div key={feat.id} style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginBottom: '2rem' }}>
            
            {/* Red Box: The Problem */}
            <div style={{ background: 'linear-gradient(90deg, rgba(239, 68, 68, 0.1) 0%, rgba(0,0,0,0) 100%)', borderLeft: '4px solid #ef4444', padding: '1.5rem 2rem', borderRadius: '0 16px 16px 0' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
                <AlertCircle size={20} className="text-red-400" />
                <span style={{ color: '#ef4444', fontWeight: 'bold', textTransform: 'uppercase', fontSize: '0.8rem', letterSpacing: '1px' }}>El Problema</span>
              </div>
              <h4 style={{ color: '#fca5a5', fontSize: '1.2rem', marginBottom: '0.5rem' }}>{feat.stat}</h4>
              <p style={{ color: '#ccc', fontSize: '1rem', lineHeight: '1.6', margin: 0 }}>
                {feat.problemDesc}
              </p>
              {feat.imageBefore && (
                <div style={{ marginTop: '1.5rem', marginLeft: '1rem' }}>
                  <img src={feat.imageBefore} alt="Antes" style={{ width: '100%', maxWidth: '600px', borderRadius: '12px', boxShadow: '0 5px 15px rgba(0,0,0,0.5)', border: '1px solid rgba(239, 68, 68, 0.3)' }} />
                </div>
              )}
            </div>

            {/* Green Box: The Solution */}
            <div style={{ marginLeft: 'clamp(1rem, 5vw, 4rem)', background: 'linear-gradient(90deg, rgba(74, 222, 128, 0.1) 0%, rgba(0,0,0,0) 100%)', borderLeft: '4px solid #4ade80', padding: '1.5rem 2rem', borderRadius: '0 16px 16px 0' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
                {getIcon(feat.iconName, 20)}
                <span style={{ color: '#4ade80', fontWeight: 'bold', textTransform: 'uppercase', fontSize: '0.8rem', letterSpacing: '1px' }}>Nuestra Solución: {feat.solutionTitle}</span>
              </div>
              <p style={{ color: '#fff', fontSize: '1.1rem', lineHeight: '1.6', margin: 0 }}>
                {feat.solutionDesc}
              </p>
              {feat.imageAfter && (
                <div style={{ marginTop: '1.5rem', marginLeft: '1rem' }}>
                  <img src={feat.imageAfter} alt="Después" style={{ width: '100%', maxWidth: '600px', borderRadius: '12px', boxShadow: '0 5px 15px rgba(0,0,0,0.5)', border: '1px solid rgba(74, 222, 128, 0.3)' }} />
                </div>
              )}
            </div>

            {/* Micro CTA */}
            <div style={{ marginLeft: 'clamp(1rem, 5vw, 4rem)', marginTop: '0.5rem' }}>
               <button 
                  onClick={onCTA}
                  style={{ background: 'rgba(234, 179, 8, 0.1)', border: '1px solid #eab308', color: '#eab308', padding: '0.8rem 1.5rem', borderRadius: '50px', cursor: 'pointer', fontWeight: 'bold', display: 'inline-flex', alignItems: 'center', gap: '0.5rem', transition: 'all 0.3s ease' }}
                  onMouseEnter={(e) => { e.currentTarget.style.background = '#eab308'; e.currentTarget.style.color = '#000'; }}
                  onMouseLeave={(e) => { e.currentTarget.style.background = 'rgba(234, 179, 8, 0.1)'; e.currentTarget.style.color = '#eab308'; }}
               >
                  ¿Convencido? Iniciá tus 14 días gratis hoy <ArrowRight size={18} />
               </button>
            </div>

          </div>
        ))}
      </div>

      {/* 4. SOCIAL PROOF / TESTIMONIALS */}
      <div>
        <h2 style={{ textAlign: 'center', fontSize: 'clamp(1.8rem, 4vw, 2.5rem)', color: '#fff', marginBottom: '2rem', fontWeight: 800 }}>Casos Reales. Resultados Reales.</h2>
        
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '1rem', maxWidth: '800px', margin: '0 auto', position: 'relative' }}>
          {/* Left Arrow */}
          <button 
            onClick={prevTestimonial}
            style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', color: '#fff', width: '48px', height: '48px', borderRadius: '50%', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'all 0.3s ease', zIndex: 10, flexShrink: 0 }}
            onMouseEnter={(e) => { e.currentTarget.style.background = '#eab308'; e.currentTarget.style.color = '#000'; }}
            onMouseLeave={(e) => { e.currentTarget.style.background = 'rgba(255,255,255,0.05)'; e.currentTarget.style.color = '#fff'; }}
          >
            <ChevronLeft size={24} />
          </button>

          {/* Active Card */}
          <div style={{ flex: 1, minHeight: '260px', background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.1)', padding: '2rem', borderRadius: '24px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
            {(() => {
              const test = funnel.testimonials[currentTestimonialIndex];
              return (
                <>
                  <div>
                    <div style={{ display: 'flex', gap: '0.2rem', marginBottom: '1rem' }}>
                      {[...Array(5)].map((_, i) => <Star key={i} size={16} fill="#eab308" color="#eab308" />)}
                    </div>
                    <div style={{ marginBottom: '1.5rem' }}>
                      <p style={{ color: '#f87171', fontSize: '0.9rem', marginBottom: '0.5rem', fontStyle: 'italic' }}>Antes: "{test.before}"</p>
                      <p style={{ color: '#fff', fontSize: '1.1rem', lineHeight: '1.6' }}>"{test.after}"</p>
                    </div>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: '1rem' }}>
                    <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: '#333', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontWeight: 'bold' }}>
                      {test.name.charAt(0)}
                    </div>
                    <div>
                      <h4 style={{ color: '#fff', margin: 0, fontSize: '1rem' }}>{test.name}</h4>
                      <span style={{ color: '#888', fontSize: '0.8rem' }}>{test.role}</span>
                    </div>
                  </div>
                </>
              );
            })()}
          </div>

          {/* Right Arrow */}
          <button 
            onClick={nextTestimonial}
            style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', color: '#fff', width: '48px', height: '48px', borderRadius: '50%', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'all 0.3s ease', zIndex: 10, flexShrink: 0 }}
            onMouseEnter={(e) => { e.currentTarget.style.background = '#eab308'; e.currentTarget.style.color = '#000'; }}
            onMouseLeave={(e) => { e.currentTarget.style.background = 'rgba(255,255,255,0.05)'; e.currentTarget.style.color = '#fff'; }}
          >
            <ChevronRight size={24} />
          </button>
        </div>

      {funnel.impactImage && (
        <div style={{ marginTop: '3rem', textAlign: 'center' }}>
             <img 
                src={funnel.impactImage} 
                alt={funnel.impactCaption || "Impacto"} 
                style={{ width: '100%', maxWidth: '800px', borderRadius: '16px', boxShadow: '0 10px 30px rgba(0,0,0,0.5)', margin: '0 auto' }} 
              />
              {funnel.impactCaption && (
                <p style={{ color: '#888', fontSize: '0.9rem', marginTop: '1rem' }}>{funnel.impactCaption}</p>
              )}
          </div>
      )}
      </div>

      {/* 5. PRICING TIERS */}
      <div id="pricing-section">
        <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
          <h2 style={{ fontSize: 'clamp(1.8rem, 4vw, 2.5rem)', color: '#fff', marginBottom: '1rem', fontWeight: 800 }}>Planes que se adaptan a tu negocio</h2>
          <p style={{ color: '#ccc', fontSize: '1.1rem' }}>Sin comisiones por venta. Sin costos ocultos. Cancelás cuando quieras.</p>
        </div>
        
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem', alignItems: 'stretch' }}>
          {funnel.pricing.map((tier) => (
            <div key={tier.id} style={{ 
              background: tier.recommended ? 'linear-gradient(180deg, rgba(234,179,8,0.1) 0%, rgba(0,0,0,0.8) 100%)' : 'rgba(0,0,0,0.8)', 
              border: tier.recommended ? '2px solid #eab308' : '1px solid rgba(255,255,255,0.1)', 
              borderRadius: '24px', 
              padding: '2.5rem',
              position: 'relative',
              display: 'flex',
              flexDirection: 'column'
            }}>
              {tier.recommended && (
                <div style={{ position: 'absolute', top: '-15px', left: '50%', transform: 'translateX(-50%)', background: '#eab308', color: '#000', padding: '0.5rem 1.5rem', borderRadius: '20px', fontWeight: 'bold', fontSize: '0.9rem' }}>
                  Más Elegido
                </div>
              )}
              <h3 style={{ color: '#fff', fontSize: '1.5rem', marginBottom: '0.5rem' }}>{tier.name}</h3>
              <p style={{ color: '#888', fontSize: '0.9rem', marginBottom: '1.5rem', minHeight: '40px' }}>{tier.description}</p>
              
              <div style={{ marginBottom: '2rem' }}>
                <span style={{ color: '#fff', fontSize: '2.5rem', fontWeight: 900 }}>${tier.price}</span>
                <span style={{ color: '#888' }}>/{tier.period}</span>
              </div>
              
              <div style={{ flex: 1 }}>
                <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                  {tier.features.map((f, i) => {
                    const isExpanded = !!expandedFeatures[`${tier.id}-normal-${i}`];
                    return (
                      <li key={i} style={{ display: 'flex', flexDirection: 'column', gap: '0.3rem', color: '#fff', cursor: 'pointer' }} onClick={() => toggleFeature(tier.id, 'normal', i)}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem' }}>
                          <Check size={20} className="text-green-400" style={{ flexShrink: 0 }} />
                          <span style={{ fontSize: '0.95rem', lineHeight: '1.4', display: 'inline-flex', alignItems: 'center', gap: '0.4rem' }}>
                            {f.name} <HelpCircle size={14} style={{ color: '#666' }} />
                          </span>
                        </div>
                        {isExpanded && (
                          <div style={{ paddingLeft: '1.8rem', fontSize: '0.85rem', color: '#aaa', lineHeight: '1.4', borderLeft: '1px solid rgba(255,255,255,0.1)', marginLeft: '0.6rem', marginTop: '0.2rem' }}>
                            {f.description}
                          </div>
                        )}
                      </li>
                    );
                  })}
                  {tier.exclusiveFeatures?.map((f, i) => {
                    const isExpanded = !!expandedFeatures[`${tier.id}-exclusive-${i}`];
                    return (
                      <li key={`excl-${i}`} style={{ display: 'flex', flexDirection: 'column', gap: '0.3rem', color: '#fff', cursor: 'pointer' }} onClick={() => toggleFeature(tier.id, 'exclusive', i)}>
                        <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.8rem' }}>
                          <Sparkles size={20} className="text-yellow-500" style={{ flexShrink: 0, marginTop: '2px' }} />
                          <div style={{ display: 'flex', flexDirection: 'column' }}>
                            <span style={{ fontSize: '0.95rem', lineHeight: '1.4', fontWeight: 'bold', color: '#eab308', display: 'inline-flex', alignItems: 'center', gap: '0.4rem' }}>
                              {f.name} <HelpCircle size={14} style={{ color: '#ca8a04' }} />
                            </span>
                            <span style={{ fontSize: '0.75rem', color: '#ca8a04', textTransform: 'uppercase', letterSpacing: '0.5px' }}>★ Solo en nuestra app</span>
                          </div>
                        </div>
                        {isExpanded && (
                          <div style={{ paddingLeft: '1.8rem', fontSize: '0.85rem', color: '#ccc', lineHeight: '1.4', borderLeft: '1px solid rgba(234,179,8,0.3)', marginLeft: '0.6rem', marginTop: '0.2rem' }}>
                            {f.description}
                          </div>
                        )}
                      </li>
                    );
                  })}
                  {tier.notIncluded?.map((f, i) => (
                    <li key={`not-${i}`} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.8rem', color: '#666' }}>
                      <AlertCircle size={20} style={{ flexShrink: 0, marginTop: '2px' }} />
                      <span style={{ fontSize: '0.95rem', lineHeight: '1.4', textDecoration: 'line-through' }}>{f}</span>
                    </li>
                  ))}
                </ul>
              </div>
              
              <button 
                onClick={onCTA}
                style={{ 
                  marginTop: '2.5rem', 
                  width: '100%', 
                  padding: '1rem', 
                  borderRadius: '12px', 
                  border: 'none',
                  background: tier.recommended ? '#eab308' : '#333',
                  color: tier.recommended ? '#000' : '#fff',
                  fontWeight: 'bold',
                  fontSize: '1.1rem',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease'
                }}
              >
                Comenzar ahora
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* 6. FAQs */}
      <div style={{ background: 'rgba(0,0,0,0.3)', border: '1px solid rgba(255,255,255,0.05)', borderRadius: '24px', padding: 'clamp(2rem, 5vw, 4rem)' }}>
        <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
          <MessageSquare size={40} className="text-yellow-500" style={{ margin: '0 auto 1rem auto' }} />
          <h2 style={{ fontSize: 'clamp(1.8rem, 4vw, 2.5rem)', color: '#fff', fontWeight: 800 }}>Preguntas Frecuentes</h2>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', maxWidth: '800px', margin: '0 auto' }}>
          {funnel.faqs.map((faq, idx) => (
            <div key={idx} style={{ background: 'rgba(255,255,255,0.03)', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.1)', overflow: 'hidden' }}>
              <button 
                onClick={() => setOpenFaqIndex(openFaqIndex === idx ? null : idx)}
                style={{ width: '100%', padding: 'clamp(1rem, 3vw, 1.5rem)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'transparent', border: 'none', color: '#fff', cursor: 'pointer', fontSize: '1.1rem', fontWeight: 'bold', textAlign: 'left' }}
              >
                {faq.q}
                {openFaqIndex === idx ? <ChevronUp className="text-yellow-500" /> : <ChevronDown className="text-yellow-500" />}
              </button>
              {openFaqIndex === idx && (
                <div style={{ padding: '0 clamp(1rem, 3vw, 1.5rem) clamp(1rem, 3vw, 1.5rem)', color: '#ccc', lineHeight: '1.6' }}>
                  {faq.a}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* 7. FINAL CTA */}
      <div style={{ textAlign: 'center', padding: 'clamp(3rem, 6vw, 5rem) clamp(1rem, 3vw, 2rem)', background: 'radial-gradient(circle, rgba(234, 179, 8, 0.15) 0%, rgba(0,0,0,0) 70%)' }}>
        <h2 style={{ fontSize: 'clamp(2rem, 5vw, 3rem)', color: '#fff', marginBottom: '1.5rem', fontWeight: 900 }}>No pierdas más clientes hoy.</h2>
        <p style={{ color: '#ccc', fontSize: '1.2rem', marginBottom: '2.5rem', maxWidth: '600px', margin: '0 auto 2.5rem auto' }}>
          Agendá una demo gratuita o suscribite directamente. En menos de 48hs tu local está operando a máxima capacidad.
        </p>
        <button 
          onClick={onCTA}
          className="btn-primary pulse-anim" 
          style={{ fontSize: '1.3rem', padding: '1.2rem 3rem', background: 'linear-gradient(135deg, #eab308, #ca8a04)', boxShadow: '0 10px 25px rgba(234, 179, 8, 0.4)', border: 'none', borderRadius: '50px', color: '#000', fontWeight: 'bold', cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: '0.5rem' }}
        >
          Transformar mi local ahora <ArrowRight size={24} />
        </button>
      </div>

    </div>
  );
}
