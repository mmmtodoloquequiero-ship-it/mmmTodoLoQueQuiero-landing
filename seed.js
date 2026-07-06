import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://drrycneiuxpmwgscipil.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRycnljbmVpdXhwbXdnc2NpcGlsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODEyMjkyNjksImV4cCI6MjA5NjgwNTI2OX0.kn0KlFISQNxdHQgfNEK1qa0txmuT9XaQzihvxxS1NM8';

const supabase = createClient(supabaseUrl, supabaseKey);

async function seed() {
  console.log('Fetching existing apps...');
  const { data: existingApps } = await supabase.from('landing_apps').select('*');
  
  const appsToInsert = [
    {
      name: 'MMM Todo Lo Que Quiero Comprar',
      tagline: 'Modernizá tu Kiosco o Negocio',
      description: 'Llevá tu kiosco o almacén al mundo digital. Tus clientes pueden pedirte desde su casa, pagar con el celular, escanear productos y hasta llevar un control de "fiado" (cuenta corriente) 100% transparente y automático. Eliminá el cuaderno y vendé más.',
      logo_url: '',
      apk_url: '',
      web_url: ''
    },
    {
      name: '5inco',
      tagline: 'Supermercados sin Colas',
      description: 'Terminá con la frustración de las colas en tu supermercado. Una herramienta fácil que permite a tus clientes escanear y pagar sus productos mientras recorren las góndolas. Aprovechá para mostrarles ofertas en tiempo real mientras compran, aumentando el ticket promedio.',
      logo_url: '',
      apk_url: '',
      web_url: ''
    },
    {
      name: 'Cont Agent',
      tagline: 'Tu Agencia de Redes Sociales Automatizada',
      description: 'Olvidate de pensar qué publicar todos los días. Nuestro sistema utiliza IA para crear, programar y publicar contenido atractivo para tu negocio en redes sociales de forma 100% automática. Crecé online sin esfuerzo.',
      logo_url: '',
      apk_url: '',
      web_url: ''
    }
  ];

  for (const app of appsToInsert) {
    const exists = existingApps?.find(a => a.name === app.name);
    if (!exists) {
      console.log(`Inserting app: ${app.name}`);
      const { data: newApp, error } = await supabase.from('landing_apps').insert([app]).select();
      
      if (error) {
        console.error('Error inserting app:', error);
        continue;
      }

      const appId = newApp[0].id;
      let features = [];

      if (app.name === 'MMM Todo Lo Que Quiero Comprar') {
        features = [
          { app_id: appId, order_index: 1, title: 'Ventas desde Casa (Delivery / Retiro)', description: 'Tus vecinos pueden ver tu stock y hacerte pedidos por WhatsApp o directo en tu web para retirar luego o que se los envíes.', icon_name: 'Globe' },
          { app_id: appId, order_index: 2, title: 'Cuenta Corriente ("Fiado") Digital', description: 'Olvidate del cuaderno. Llevá las cuentas de tus clientes habituales de forma transparente, con recordatorios de pago automáticos.', icon_name: 'Users' },
          { app_id: appId, order_index: 3, title: 'Escaneo de Productos con Celular', description: 'Usá la cámara del celular como lector de código de barras para cobrar rápido, sin comprar hardware caro.', icon_name: 'Smartphone' },
          { app_id: appId, order_index: 4, title: 'Control de Stock en Tiempo Real', description: 'Sabé siempre qué te falta comprar al proveedor antes de quedarte sin mercadería.', icon_name: 'Package' }
        ];
      } else if (app.name === '5inco') {
        features = [
          { app_id: appId, order_index: 1, title: 'Escaneo Autónomo', description: 'El cliente escanea los códigos de barra con su celular mientras guarda los productos en su changuito.', icon_name: 'Smartphone' },
          { app_id: appId, order_index: 2, title: 'Ofertas Contextuales (Cross-Selling)', description: 'Si escanean fideos, la app les ofrece un descuento en la salsa de tomate que está a 5 metros.', icon_name: 'Timer' },
          { app_id: appId, order_index: 3, title: 'Pago Sin Pasar por Caja', description: 'El cliente paga desde la app con tarjeta o billetera virtual y se retira mostrando un QR de seguridad en la puerta.', icon_name: 'CreditCard' },
          { app_id: appId, order_index: 4, title: 'Implementación Inmediata', description: 'No requiere cambiar tus sistemas actuales, funciona mediante una simple suscripción y código QR en los pasillos.', icon_name: 'CheckCircle' }
        ];
      } else if (app.name === 'Cont Agent') {
        features = [
          { app_id: appId, order_index: 1, title: 'Generación de Posts con IA', description: 'Crea textos, imágenes y hashtags adaptados a tu marca automáticamente.', icon_name: 'Sparkles' },
          { app_id: appId, order_index: 2, title: 'Calendario de Publicación Automático', description: 'Programa todo un mes de contenido en un solo clic y olvidate.', icon_name: 'Calendar' },
          { app_id: appId, order_index: 3, title: 'Respuestas a Comentarios Inteligentes', description: 'Interactúa con tus seguidores respondiendo preguntas frecuentes de forma automática.', icon_name: 'Phone' }
        ];
      }

      if (features.length > 0) {
        await supabase.from('landing_features').insert(features);
        console.log(`Inserted features for ${app.name}`);
      }
    } else {
      console.log(`App ${app.name} already exists. Skipping.`);
    }
  }

  // Update Restaurant features
  console.log('Updating Restaurant features...');
  const restaurant = existingApps?.find(a => a.name === 'MMM Todo Lo Que Quiero Comer');
  if (restaurant) {
    const { data: restFeatures } = await supabase.from('landing_features').select('*').eq('app_id', restaurant.id);
    const hasMuro = restFeatures?.find(f => f.title.includes('Muro Interactivo'));
    const hasPuntos = restFeatures?.find(f => f.title.includes('Puntos'));

    if (hasMuro) {
      await supabase.from('landing_features').update({ 
        description: 'Convertí tu local en una comunidad (Tinder Gastronómico). Los clientes pueden conectar entre mesas, compartir fotos de sus platos, unirse a mesas por afinidades y temáticas, logrando que no solo vayan a comer, sino a vivir una experiencia social única.' 
      }).eq('id', hasMuro.id);
    }
    
    if (!hasPuntos) {
      await supabase.from('landing_features').insert([{
        app_id: restaurant.id,
        order_index: 12,
        title: 'Sistema de Puntos y Retención',
        description: 'Fidelizá a tus clientes recompensando sus compras con puntos canjeables. Asegurate de que vuelvan siempre a tu restaurante en lugar de ir a la competencia.',
        icon_name: 'Coins'
      }]);
    }
    
    // Also mention waiters saving time
    const qrMenu = restFeatures?.find(f => f.title.includes('Menú QR'));
    if (qrMenu) {
      await supabase.from('landing_features').update({
        description: 'El cliente se sienta, escanea el código y hace su pedido directamente. Ahorrá en tiempos de los mozos, eliminá las esperas que generan malestar, y mejorá la calidad de la atención al cliente de forma drástica.'
      }).eq('id', qrMenu.id);
    }
  }

  console.log('Seeding completed!');
}

seed();
