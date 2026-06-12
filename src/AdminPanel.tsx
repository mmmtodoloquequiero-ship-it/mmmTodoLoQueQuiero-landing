import React, { useState } from 'react';
import { supabase } from './supabase';
import { Lock, Upload, CheckCircle, Video, X, Plus, Save, Trash2, ChevronLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import './App.css';

export default function AdminPanel() {
  const navigate = useNavigate();
  const [password, setPassword] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  
  const [activeTab, setActiveTab] = useState<'apps' | 'socials'>('apps');
  const [selectedAppId, setSelectedAppId] = useState<string | null>(null);
  
  // Data
  const [config, setConfig] = useState<any>(null);
  const [apps, setApps] = useState<any[]>([]);
  const [features, setFeatures] = useState<any[]>([]);
  const [socials, setSocials] = useState<any[]>([]);
  
  const [loading, setLoading] = useState(true);
  const [uploadingId, setUploadingId] = useState<string | null>(null);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === 'maxadmin252026') {
      setIsAuthenticated(true);
      fetchData();
    } else {
      alert('Contraseña incorrecta');
    }
  };

  const fetchData = async () => {
    setLoading(true);
    try {
      const { data: configData } = await supabase.from('landing_config').select('*').single();
      if (configData) setConfig(configData);

      const { data: appsData, error: appsError } = await supabase.from('landing_apps').select('*').order('created_at', { ascending: true });
      if (appsError) {
        alert('Error conectando a Supabase. ¿Ejecutaste el script SQL? Detalle: ' + appsError.message);
        setLoading(false);
        return;
      }

      let currentApps = appsData || [];
      
      // AUTO-SEED LOGIC: Si no hay ninguna app, insertamos la app original y sus 11 características
      if (currentApps.length === 0) {
        const { data: newApp, error: insertError } = await supabase.from('landing_apps').insert([{
          name: 'MMM Todo Lo Que Quiero Comer', 
          tagline: 'El Sistema Definitivo para Gastronomía',
          description: 'Transformá la manera en que administras tu local. Olvidate del desorden, los papeles perdidos y los errores de caja con nuestro ecosistema 100% digital.',
          logo_url: '',
          apk_url: '',
          web_url: ''
        }]).select();
        
        if (!insertError && newApp && newApp.length > 0) {
          currentApps = newApp;
          const appId = newApp[0].id;
          
          const defaultFeatures = [
            { app_id: appId, order_index: 1, title: 'Menú QR Inteligente', description: 'El cliente se sienta, escanea el código en la mesa y hace su pedido sin esperar a que se desocupe un mozo.', icon_name: 'Smartphone' },
            { app_id: appId, order_index: 2, title: 'Gestor de Reservas con Seña', description: 'Tus clientes pueden reservar mesas desde cualquier lugar. El sistema permite cobrar una seña automáticamente por MercadoPago.', icon_name: 'Calendar' },
            { app_id: appId, order_index: 3, title: 'Control de Stock y Vencimientos', description: 'Llevá el control exacto de tus ingredientes por lotes. El sistema te avisa cuando un producto está por vencer.', icon_name: 'Package' },
            { app_id: appId, order_index: 4, title: 'Diferenciado Inteligente: Barra y Cocina', description: 'El sistema sabe automáticamente qué preparar en cada lugar. Las bebidas van a la pantalla de la barra y los platos a la cocina.', icon_name: 'SplitSquareVertical' },
            { app_id: appId, order_index: 5, title: 'Muro Interactivo (Social Dining)', description: 'Convertí tu local en una comunidad. Los clientes pueden ver fotos de los platos de otras mesas y compartir su experiencia.', icon_name: 'Users' },
            { app_id: appId, order_index: 6, title: 'Ofertas Automáticas', description: 'Creá promociones y configuralas para que empiecen y terminen automáticamente a una hora y fecha exacta.', icon_name: 'Timer' },
            { app_id: appId, order_index: 7, title: 'Caja Rápida y Facturación AFIP', description: 'Cobrá en un solo click con tarjeta o MercadoPago. Genera facturas AFIP automáticamente.', icon_name: 'CreditCard' },
            { app_id: appId, order_index: 8, title: 'Pantalla Inteligente para Cocina (KDS)', description: 'Los cocineros ven todos los pedidos ordenados en una pantalla por orden de llegada.', icon_name: 'ChefHat' },
            { app_id: appId, order_index: 9, title: 'Delivery Integrado', description: 'Administrá todos los pedidos de teléfono o WhatsApp en el mismo lugar.', icon_name: 'Bike' },
            { app_id: appId, order_index: 10, title: 'Liquidación Automática de Propinas', description: 'El sistema anota las propinas que recibe cada mozo para que la liquidación sea un trámite rápido.', icon_name: 'Coins' },
            { app_id: appId, order_index: 11, title: 'Landing Page Propia para tu Local', description: 'El sistema te genera automáticamente una página web profesional para tu restaurante.', icon_name: 'Globe' }
          ];
          await supabase.from('landing_features').insert(defaultFeatures);
        }
      }

      setApps(currentApps);

      const { data: featuresData } = await supabase.from('landing_features').select('*').order('order_index', { ascending: true });
      if (featuresData) setFeatures(featuresData);
      
      const { data: socialsData } = await supabase.from('landing_socials').select('*').order('created_at', { ascending: true });
      if (socialsData) setSocials(socialsData);
      
    } catch (e: any) {
      alert('Hubo un error de red: ' + e.message);
    } finally {
      setLoading(false);
    }
  };

  // ---------------- MEDIA UPLOAD ----------------
  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>, type: 'feature' | 'bg' | 'app_logo' | 'app_apk', entityId?: string) => {
    const file = event.target.files?.[0];
    if (!file) return;

    try {
      if (entityId) setUploadingId(`${type}_${entityId}`);
      else setUploadingId(type);

      const fileExt = file.name.split('.').pop();
      const fileName = `${Math.random()}.${fileExt}`;
      const filePath = `${type}/${fileName}`;

      const { error: uploadError } = await supabase.storage.from('landing_media').upload(filePath, file);
      if (uploadError) throw uploadError;

      const { data: publicUrlData } = supabase.storage.from('landing_media').getPublicUrl(filePath);
      const publicUrl = publicUrlData.publicUrl;

      // Update DB
      if (type === 'feature' && entityId) {
        await supabase.from('landing_features').update({ media_url: publicUrl }).eq('id', entityId);
        setFeatures(features.map(f => f.id === entityId ? { ...f, media_url: publicUrl } : f));
      } else if (type === 'app_logo' && entityId) {
        await supabase.from('landing_apps').update({ logo_url: publicUrl }).eq('id', entityId);
        setApps(apps.map(a => a.id === entityId ? { ...a, logo_url: publicUrl } : a));
      } else if (type === 'app_apk' && entityId) {
        await supabase.from('landing_apps').update({ apk_url: publicUrl }).eq('id', entityId);
        setApps(apps.map(a => a.id === entityId ? { ...a, apk_url: publicUrl } : a));
      } else if (type === 'bg') {
        await supabase.from('landing_config').update({ bg_image_url: publicUrl }).eq('id', config.id);
        setConfig({ ...config, bg_image_url: publicUrl });
      }
      alert('Archivo subido con éxito!');
    } catch (error: any) {
      alert('Error subiendo archivo: ' + error.message);
    } finally {
      setUploadingId(null);
    }
  };

  // ---------------- CRUD APPS ----------------
  const addNewApp = async () => {
    const newApp = { 
      name: 'Nueva App', 
      tagline: 'Tu frase principal acá', 
      description: 'Descripción detallada de la App',
      web_url: '' 
    };
    const { data, error } = await supabase.from('landing_apps').insert([newApp]).select();
    if (error) alert('Error creando App: ' + error.message);
    else if (data) setApps([...apps, data[0]]);
  };

  const saveApp = async (app: any) => {
    const { id, name, tagline, description, web_url } = app;
    const { error } = await supabase.from('landing_apps').update({ name, tagline, description, web_url }).eq('id', id);
    if (error) alert('Error al guardar: ' + error.message);
    else alert('App guardada correctamente');
  };

  const deleteApp = async (id: string) => {
    if(!window.confirm('¿Seguro que querés eliminar toda la App y sus características?')) return;
    const { error } = await supabase.from('landing_apps').delete().eq('id', id);
    if (!error) {
      setApps(apps.filter(a => a.id !== id));
      if(selectedAppId === id) setSelectedAppId(null);
    }
  };

  // ---------------- CRUD FEATURES ----------------
  const handleUpdateFeature = (id: string, field: string, value: string) => {
    setFeatures(features.map(f => f.id === id ? { ...f, [field]: value } : f));
  };

  const saveFeature = async (feature: any) => {
    const { id, title, description } = feature;
    const { error } = await supabase.from('landing_features').update({ title, description }).eq('id', id);
    if (error) alert('Error al guardar: ' + error.message);
    else alert('Guardado correctamente');
  };

  const addNewFeature = async (appId: string) => {
    const appFeatures = features.filter(f => f.app_id === appId);
    const newOrderIndex = appFeatures.length > 0 ? Math.max(...appFeatures.map(f => f.order_index)) + 1 : 1;
    
    const newFeature = {
      app_id: appId,
      order_index: newOrderIndex,
      title: 'Nueva Característica',
      description: 'Descripción breve de la nueva característica...'
    };

    const { data, error } = await supabase.from('landing_features').insert([newFeature]).select();
    if (error) alert('Error creando característica: ' + error.message);
    else if (data) setFeatures([...features, data[0]]);
  };

  const deleteFeature = async (id: string) => {
    if(!window.confirm('¿Seguro que querés eliminar esta característica?')) return;
    const { error } = await supabase.from('landing_features').delete().eq('id', id);
    if (!error) setFeatures(features.filter(f => f.id !== id));
  };

  // ---------------- CRUD SOCIALS ----------------
  const addNewSocial = async () => {
    const newSocial = { type: 'link', label: 'Nuevo Contacto', url: 'https://...' };
    const { data, error } = await supabase.from('landing_socials').insert([newSocial]).select();
    if (error) alert('Error creando contacto: ' + error.message);
    else if (data) setSocials([...socials, data[0]]);
  };

  const saveSocial = async (social: any) => {
    const { id, type, label, url } = social;
    const { error } = await supabase.from('landing_socials').update({ type, label, url }).eq('id', id);
    if (error) alert('Error al guardar: ' + error.message);
    else alert('Contacto guardado');
  };

  const deleteSocial = async (id: string) => {
    const { error } = await supabase.from('landing_socials').delete().eq('id', id);
    if (!error) setSocials(socials.filter(s => s.id !== id));
  };

  // ---------------- RENDERS ----------------

  if (!isAuthenticated) {
    return (
      <div className="landing-wrapper" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div className="landing-bg"></div>
        <div style={{ background: 'rgba(0,0,0,0.8)', padding: '3rem', borderRadius: '24px', border: '1px solid rgba(234, 179, 8, 0.4)', textAlign: 'center', maxWidth: '400px', width: '90%' }}>
          <Lock size={48} className="text-yellow-500" style={{ margin: '0 auto 1.5rem auto' }} />
          <h2 className="text-yellow-500" style={{ marginBottom: '1.5rem', fontFamily: 'var(--font-title)' }}>Panel de Control</h2>
          <form onSubmit={handleLogin}>
            <input 
              type="password" 
              placeholder="Contraseña..." 
              value={password}
              onChange={e => setPassword(e.target.value)}
              style={{ width: '100%', padding: '1rem', borderRadius: '12px', border: '1px solid #333', background: '#111', color: '#fff', marginBottom: '1rem' }}
            />
            <button type="submit" className="btn-primary" style={{ width: '100%', justifyContent: 'center' }}>Ingresar</button>
          </form>
        </div>
      </div>
    );
  }

  // APP DETAIL VIEW
  if (selectedAppId) {
    const app = apps.find(a => a.id === selectedAppId);
    if (!app) return null;
    const appFeatures = features.filter(f => f.app_id === selectedAppId).sort((a,b) => a.order_index - b.order_index);

    return (
      <div className="landing-wrapper" style={{ padding: '2rem 5%' }}>
        <div className="landing-bg"></div>
        
        <div style={{ background: 'rgba(0,0,0,0.85)', padding: '2rem', borderRadius: '24px', border: '1px solid rgba(234, 179, 8, 0.4)', marginBottom: '2rem', position: 'relative' }}>
          <button 
            onClick={() => setSelectedAppId(null)} 
            style={{ position: 'absolute', top: '1.5rem', left: '1.5rem', background: 'transparent', border: 'none', color: '#fff', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '1.1rem' }}
          >
            <ChevronLeft /> Volver al Catálogo
          </button>
          
          <h1 className="text-yellow-500" style={{ fontFamily: 'var(--font-title)', margin: '3rem 0 2rem 0', fontSize: '2rem', textAlign: 'center' }}>
            Editando: {app.name}
          </h1>

          {/* APP GENERAL DATA */}
          <div style={{ background: 'rgba(255,255,255,0.05)', padding: '2rem', borderRadius: '16px', marginBottom: '3rem', border: '1px solid #444' }}>
            <h2 style={{ color: '#eab308', marginBottom: '1.5rem', fontSize: '1.4rem' }}>Datos Generales de la App</h2>
            
            <div style={{ display: 'grid', gap: '1.5rem', gridTemplateColumns: '1fr 2fr' }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', alignItems: 'center', background: '#111', padding: '1rem', borderRadius: '12px' }}>
                <img src={app.logo_url || '/logo-landing.jpg'} alt="logo" style={{ width: '120px', height: '120px', objectFit: 'cover', borderRadius: '16px', border: '2px solid #555' }} />
                <label className="btn-secondary" style={{ cursor: 'pointer', padding: '0.5rem 1rem', width: '100%', textAlign: 'center' }}>
                  {uploadingId === `app_logo_${app.id}` ? 'Subiendo...' : 'Subir Logo'} 
                  <input type="file" accept="image/*" style={{ display: 'none' }} onChange={(e) => handleFileUpload(e, 'app_logo', app.id)} />
                </label>
              </div>
              
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <input 
                  placeholder="Nombre de la App"
                  value={app.name} 
                  onChange={(e) => setApps(apps.map(a => a.id === app.id ? { ...a, name: e.target.value } : a))} 
                  style={{ width: '100%', padding: '0.8rem', background: 'rgba(0,0,0,0.5)', color: '#fff', border: '1px solid #555', borderRadius: '8px', fontSize: '1.2rem', fontWeight: 'bold' }} 
                />
                <input 
                  placeholder="Frase Principal (Ej: El Sistema Definitivo...)"
                  value={app.tagline || ''} 
                  onChange={(e) => setApps(apps.map(a => a.id === app.id ? { ...a, tagline: e.target.value } : a))} 
                  style={{ width: '100%', padding: '0.8rem', background: 'rgba(0,0,0,0.5)', color: '#eab308', border: '1px solid #555', borderRadius: '8px', fontSize: '1.1rem' }} 
                />
                <textarea 
                  placeholder="Descripción ampliada"
                  value={app.description} 
                  onChange={(e) => setApps(apps.map(a => a.id === app.id ? { ...a, description: e.target.value } : a))} 
                  style={{ width: '100%', padding: '0.8rem', background: 'rgba(0,0,0,0.5)', color: '#ccc', border: '1px solid #555', borderRadius: '8px', minHeight: '80px', fontFamily: 'inherit' }} 
                />
              </div>
            </div>

            <div style={{ marginTop: '2rem', padding: '1.5rem', background: '#111', borderRadius: '12px', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <h3 style={{ color: '#fff', fontSize: '1.2rem' }}>Enlaces de Acción (CTA)</h3>
              <p style={{ color: '#aaa', fontSize: '0.9rem', margin: 0 }}>Estos botones aparecerán debajo de cada característica en la página.</p>
              
              <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                <label style={{ color: '#4ade80', width: '120px', fontWeight: 'bold' }}>Archivo APK:</label>
                <input type="text" readOnly value={app.apk_url || 'No hay APK subido'} style={{ flex: 1, padding: '0.8rem', background: '#222', color: '#fff', border: '1px solid #444', borderRadius: '8px' }} />
                <label className="btn-secondary" style={{ cursor: 'pointer', padding: '0.8rem 1.5rem' }}>
                  {uploadingId === `app_apk_${app.id}` ? 'Subiendo...' : <><Upload size={16} style={{ display: 'inline', marginRight: '8px' }}/> Subir .APK</>}
                  {/* Note: accept=".apk" is ideal, but let's allow all just in case */}
                  <input type="file" style={{ display: 'none' }} onChange={(e) => handleFileUpload(e, 'app_apk', app.id)} />
                </label>
              </div>

              <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                <label style={{ color: '#60a5fa', width: '120px', fontWeight: 'bold' }}>Link Web:</label>
                <input 
                  placeholder="https://tu-app-web.com"
                  value={app.web_url || ''} 
                  onChange={(e) => setApps(apps.map(a => a.id === app.id ? { ...a, web_url: e.target.value } : a))} 
                  style={{ flex: 1, padding: '0.8rem', background: '#222', color: '#fff', border: '1px solid #444', borderRadius: '8px' }} 
                />
              </div>
            </div>

            <div style={{ marginTop: '1.5rem', display: 'flex', justifyContent: 'flex-end' }}>
              <button onClick={() => saveApp(app)} className="btn-primary" style={{ padding: '0.8rem 2rem' }}><Save size={20} style={{ marginRight: '8px' }}/> Guardar Datos de la App</button>
            </div>
          </div>

          {/* APP FEATURES */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem', paddingTop: '2rem', borderTop: '1px solid #333' }}>
            <h2 style={{ color: '#eab308', fontSize: '1.4rem' }}>Características de esta App</h2>
            <button onClick={() => addNewFeature(app.id)} className="btn-primary" style={{ padding: '0.5rem 1rem' }}><Plus size={16} /> Nueva Característica</button>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            {appFeatures.map((feature) => (
              <div key={feature.id} style={{ display: 'flex', flexDirection: 'column', padding: '1.5rem', background: '#111', borderRadius: '16px', borderLeft: '4px solid #eab308', gap: '1rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '1rem' }}>
                  <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                    <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
                      <span style={{ color: '#eab308', fontWeight: 'bold' }}>{feature.order_index}.</span>
                      <input 
                        value={feature.title} 
                        onChange={(e) => handleUpdateFeature(feature.id, 'title', e.target.value)} 
                        style={{ flex: 1, padding: '0.5rem', background: '#222', color: '#fff', border: '1px solid #444', borderRadius: '8px', fontWeight: 'bold' }} 
                      />
                    </div>
                    
                    <textarea 
                      value={feature.description} 
                      onChange={(e) => handleUpdateFeature(feature.id, 'description', e.target.value)} 
                      style={{ width: '100%', padding: '0.5rem', background: '#222', color: '#ccc', border: '1px solid #444', borderRadius: '8px', minHeight: '60px', fontFamily: 'inherit' }} 
                    />
                  </div>
                  
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                    <button onClick={() => saveFeature(feature)} className="btn-primary" style={{ padding: '0.6rem' }} title="Guardar Textos"><Save size={18} /></button>
                    <button onClick={() => deleteFeature(feature.id)} style={{ background: 'rgba(239, 68, 68, 0.2)', color: '#f87171', border: 'none', padding: '0.6rem', borderRadius: '12px', cursor: 'pointer' }} title="Eliminar"><Trash2 size={18} /></button>
                  </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '1rem', background: '#222', borderRadius: '12px' }}>
                  {feature.media_url ? (
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#4ade80', fontSize: '0.9rem' }}>
                      <CheckCircle size={16} /> Media Actual: <a href={feature.media_url} target="_blank" rel="noreferrer" style={{ color: '#4ade80', textDecoration: 'underline' }}>Ver archivo</a>
                    </div>
                  ) : (
                    <span style={{ color: '#f87171', fontSize: '0.9rem' }}>Sin imagen/video explicativo</span>
                  )}
                  
                  <label className="btn-secondary" style={{ cursor: 'pointer', padding: '0.5rem 1rem', fontSize: '0.85rem' }}>
                    {uploadingId === `feature_${feature.id}` ? 'Subiendo...' : <><Video size={16} style={{ marginRight: '5px', display: 'inline' }} /> Subir Video/Img Explicativo</>}
                    <input type="file" accept="video/*,image/*" style={{ display: 'none' }} onChange={(e) => handleFileUpload(e, 'feature', feature.id)} disabled={uploadingId !== null} />
                  </label>
                </div>
              </div>
            ))}
            {appFeatures.length === 0 && <p style={{ color: '#aaa', textAlign: 'center', padding: '2rem' }}>No hay características para esta app todavía.</p>}
          </div>

        </div>
      </div>
    );
  }

  // MAIN DASHBOARD (APPS LIST & SOCIALS)
  return (
    <div className="landing-wrapper" style={{ padding: '2rem 5%' }}>
      <div className="landing-bg"></div>
      
      <div style={{ background: 'rgba(0,0,0,0.85)', padding: '2rem', borderRadius: '24px', border: '1px solid rgba(234, 179, 8, 0.4)', marginBottom: '2rem', position: 'relative' }}>
        <button 
          onClick={() => navigate('/')} 
          style={{ position: 'absolute', top: '1.5rem', right: '1.5rem', background: 'transparent', border: 'none', color: '#fff', cursor: 'pointer' }}
          title="Cerrar Panel"
        >
          <X size={32} />
        </button>
        
        <h1 className="text-yellow-500" style={{ fontFamily: 'var(--font-title)', marginBottom: '1rem', fontSize: '2rem' }}>Panel de Administración</h1>
        
        {/* TAB NAVIGATION */}
        <div style={{ display: 'flex', gap: '1rem', marginBottom: '2rem', borderBottom: '1px solid rgba(255,255,255,0.1)', paddingBottom: '1rem' }}>
          <button onClick={() => setActiveTab('apps')} style={{ background: activeTab === 'apps' ? '#eab308' : 'transparent', color: activeTab === 'apps' ? '#000' : '#fff', padding: '0.5rem 1rem', borderRadius: '8px', border: 'none', cursor: 'pointer', fontWeight: 'bold' }}>Catálogo de Apps</button>
          <button onClick={() => setActiveTab('socials')} style={{ background: activeTab === 'socials' ? '#eab308' : 'transparent', color: activeTab === 'socials' ? '#000' : '#fff', padding: '0.5rem 1rem', borderRadius: '8px', border: 'none', cursor: 'pointer', fontWeight: 'bold' }}>Redes y Contacto</button>
        </div>

        {loading ? <p className="text-yellow-500">Cargando...</p> : (
          <>
            {/* ------------ TAB APPS LIST ------------ */}
            {activeTab === 'apps' && (
              <div>
                {/* Global Background */}
                <div style={{ marginBottom: '3rem', padding: '1.5rem', background: '#111', borderRadius: '16px', border: '1px solid #333' }}>
                  <h2 style={{ color: '#fff', marginBottom: '1rem', fontSize: '1.2rem' }}>Fondo Global de la Web</h2>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                    <img src={config?.bg_image_url || '/bg-landing.jpg'} alt="bg" style={{ height: '60px', borderRadius: '8px' }} />
                    <label className="btn-secondary" style={{ cursor: 'pointer', padding: '0.5rem 1rem' }}>
                      {uploadingId === 'bg' ? 'Subiendo...' : <Upload size={16} />}
                      <input type="file" accept="image/*" style={{ display: 'none' }} onChange={(e) => handleFileUpload(e, 'bg')} />
                    </label>
                  </div>
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                  <h2 style={{ color: '#fff', fontSize: '1.5rem' }}>Mis Aplicaciones</h2>
                  <button onClick={addNewApp} className="btn-primary" style={{ padding: '0.5rem 1rem' }}><Plus size={16} /> Crear Nueva App</button>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '1.5rem' }}>
                  {apps.map((app) => (
                    <div key={app.id} style={{ background: '#111', padding: '1.5rem', borderRadius: '16px', border: '1px solid #333', display: 'flex', flexDirection: 'column', gap: '1rem', cursor: 'pointer', transition: 'all 0.2s', position: 'relative' }} className="app-card-hover">
                      <img src={app.logo_url || '/logo-landing.jpg'} alt="logo" style={{ width: '60px', height: '60px', objectFit: 'cover', borderRadius: '12px' }} />
                      <div>
                        <h3 style={{ color: '#fff', margin: '0 0 0.5rem 0' }}>{app.name}</h3>
                        <p style={{ color: '#aaa', fontSize: '0.9rem', margin: 0, display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>{app.description}</p>
                      </div>
                      
                      <div style={{ marginTop: 'auto', display: 'flex', gap: '0.5rem' }}>
                        <button onClick={() => setSelectedAppId(app.id)} className="btn-primary" style={{ flex: 1, padding: '0.5rem', justifyContent: 'center' }}>Editar Detalles y Características</button>
                        <button onClick={(e) => { e.stopPropagation(); deleteApp(app.id); }} style={{ background: 'rgba(239, 68, 68, 0.2)', color: '#f87171', border: 'none', padding: '0.5rem', borderRadius: '8px', cursor: 'pointer' }}><Trash2 size={18} /></button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* ------------ TAB SOCIALS ------------ */}
            {activeTab === 'socials' && (
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
                  <h2 style={{ color: '#fff', fontSize: '1.5rem' }}>Datos de Contacto y Redes</h2>
                  <button onClick={addNewSocial} className="btn-primary" style={{ padding: '0.5rem 1rem' }}><Plus size={16} /> Añadir Contacto</button>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                  {socials.map((social) => (
                    <div key={social.id} style={{ display: 'flex', gap: '1rem', alignItems: 'center', background: '#111', padding: '1.5rem', borderRadius: '16px', border: '1px solid #333', flexWrap: 'wrap' }}>
                      <select 
                        value={social.type} 
                        onChange={(e) => setSocials(socials.map(s => s.id === social.id ? { ...s, type: e.target.value } : s))}
                        style={{ padding: '0.8rem', background: '#222', color: '#fff', border: '1px solid #444', borderRadius: '8px', minWidth: '150px' }}
                      >
                        <option value="instagram">Instagram</option>
                        <option value="whatsapp">WhatsApp</option>
                        <option value="email">Email</option>
                        <option value="phone">Teléfono</option>
                        <option value="link">Otro Link</option>
                      </select>
                      
                      <input 
                        value={social.label} 
                        onChange={(e) => setSocials(socials.map(s => s.id === social.id ? { ...s, label: e.target.value } : s))} 
                        placeholder="Texto a mostrar (Ej: @tu_instagram)"
                        style={{ flex: 1, minWidth: '200px', padding: '0.8rem', background: '#222', color: '#fff', border: '1px solid #444', borderRadius: '8px' }} 
                      />
                      
                      <input 
                        value={social.url} 
                        onChange={(e) => setSocials(socials.map(s => s.id === social.id ? { ...s, url: e.target.value } : s))} 
                        placeholder="Enlace Real (Ej: https://...)"
                        style={{ flex: 2, minWidth: '250px', padding: '0.8rem', background: '#222', color: '#fff', border: '1px solid #444', borderRadius: '8px' }} 
                      />
                      
                      <button onClick={() => saveSocial(social)} className="btn-primary" style={{ padding: '0.8rem' }}><Save size={20} /></button>
                      <button onClick={() => deleteSocial(social.id)} style={{ background: 'rgba(239, 68, 68, 0.2)', color: '#f87171', border: 'none', padding: '0.8rem', borderRadius: '12px', cursor: 'pointer' }}><Trash2 size={20} /></button>
                    </div>
                  ))}
                  {socials.length === 0 && <p style={{ color: '#aaa' }}>No tenés agregadas redes sociales todavía.</p>}
                </div>
              </div>
            )}
            
          </>
        )}
      </div>
    </div>
  );
}
