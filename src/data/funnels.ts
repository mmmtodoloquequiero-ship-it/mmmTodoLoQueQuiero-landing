export interface Testimonial {
  id: string;
  name: string;
  role: string;
  content: string;
  tone: 'formal' | 'informal';
  before: string;
  after: string;
}

export interface FeatureDetail {
  name: string;
  description: string;
}

export interface PricingTier {
  id: string;
  name: string;
  price: string;
  period: string;
  description: string;
  features: FeatureDetail[];
  exclusiveFeatures?: FeatureDetail[];
  notIncluded?: string[];
  recommended?: boolean;
}

export interface FunnelData {
  appName: string;
  hero: {
    title: string;
    subtitle: string;
    painPoint: string;
  };
  differentiator: {
    title: string;
    subtitle: string;
    description: string;
    imageCaption: string;
    quote?: string;
    image?: string;
  };
  interleavedFeatures: {
    id: string;
    stat: string;
    problemDesc: string;
    solutionTitle: string;
    solutionDesc: string;
    iconName: string;
    imageBefore?: string;
    imageAfter?: string;
  }[];
  testimonials: Testimonial[];
  pricing: PricingTier[];
  faqs: { q: string; a: string }[];
  impactImage?: string;
  impactCaption?: string;
}

export const funnels: Record<string, FunnelData> = {
  'MMM Todo Lo Que Quiero Comer': {
    appName: 'MMM Todo Lo Que Quiero Comer',
    hero: {
      title: 'Dejá de perder clientes por demoras y mesas vacías',
      subtitle: 'La única plataforma TODO EN UNO que transforma tu restaurante en una red social interactiva, automatiza pagos y acelera tu rentabilidad.',
      painPoint: '¿Sabías que el 40% de los clientes no vuelve si la atención fue lenta o impersonal?'
    },
    differentiator: {
      title: 'El "Tinder Gastronómico": Tu Ventaja Desleal',
      subtitle: 'Mucho más que un Menú QR.',
      description: 'Mientras tu competencia ofrece un PDF aburrido, tu restaurante ofrece una Experiencia Social. Los clientes pueden ver quién está en otras mesas, mandarse mensajes, invitar tragos, e interactuar en tiempo real bajo tu moderación. El local pasa de ser "un lugar para comer" a "el lugar para estar".',
      imageCaption: 'Antes: mesas aisladas. Después: local lleno, interactuando y vibrante.',
      quote: 'El 70% de nuestros clientes se queda una hora extra consumiendo gracias al muro interactivo.',
      image: '/restaurant_interactive_wall.png'
    },
    interleavedFeatures: [
      {
        id: 'f1',
        stat: '¿Sabías que el 70% de la gente elige salir a comer por la experiencia social y no solo por la comida?',
        problemDesc: 'Si tu local es aburrido, los clientes no vuelven, por más rica que sea la comida. Miran sus teléfonos y se van rápido a buscar un lugar con más "onda".',
        solutionTitle: 'Social Dining (El Muro Interactivo)',
        solutionDesc: 'Transformamos tu menú en una red social interna. La gente chatea, pide música e invita tragos a otras mesas. Todo moderado por tu staff para un ambiente seguro. Tu bar se vuelve magnético.',
        iconName: 'MessageSquare',
        imageBefore: '/restaurant_bored_before.png',
        imageAfter: '/restaurant_social_after.png'
      },
      {
        id: 'f2',
        stat: '¿Sabías que muchos locales tiran su dinero pagando un software para delivery, otro para el menú y otro para facturar?',
        problemDesc: 'Pagar 3 o 4 sistemas distintos no solo es caro, sino que te hace perder tiempo pasando datos de un lado a otro.',
        solutionTitle: 'Ecosistema Todo En Uno',
        solutionDesc: 'Tenés Delivery, Menú Digital, Landing Page propia, Cobros y AFIP en una sola plataforma. Dejás de perder plata y tiempo saltando entre sistemas.',
        iconName: 'Smartphone',
        imageBefore: '/owner_tired_calculating.png',
        imageAfter: '/owner_focused_counter.png'
      },
      {
        id: 'f3',
        stat: '¿Sabías que el mayor peligro para tu negocio no es la competencia, sino el miedo al cambio y no adaptarte a cómo consume la gente hoy?',
        problemDesc: 'Quedarte en el molde con procesos antiguos ahuyenta a los clientes modernos que buscan rapidez y comodidad. Los locales que no se adaptan terminan vacíos y con el personal cruzado de brazos.',
        solutionTitle: 'Digitalización Sin Fricciones (Súper Intuitiva)',
        solutionDesc: 'Un cambio rápido y sin estrés. Nuestra interfaz es tan sencilla como mandar un WhatsApp. Tu staff aprende a usarla en 15 minutos y gestionás todo tu negocio directamente desde tu celular, estés donde estés.',
        iconName: 'Sparkles',
        imageBefore: '/empty_restaurant_bored_staff.png',
        imageAfter: '/owner_mobile_office_clean.png'
      },
      {
        id: 'f4',
        stat: '¿Sabías que los errores manuales al cobrar o la falta de facturación rápida pueden comerse hasta el 15% de tu rentabilidad?',
        problemDesc: 'Tickets que se pierden, mozos que cobran mal, y facturas que tardan horas en generarse.',
        solutionTitle: 'Pagos Directos desde la Mesa y Facturación AFIP',
        solutionDesc: 'El cliente escanea y paga directamente desde la mesa con Mercado Pago, y el sistema emite la factura electrónica de AFIP (A, B o C) automáticamente al instante.',
        iconName: 'Coins',
        imageBefore: '/waiter_stressed_notepad.png',
        imageAfter: '/customer_scanning_qr_table.png'
      },
      {
        id: 'f5',
        stat: '¿Sabías cuánta plata perdés por "No-Shows" (gente que reserva y no va) o por reservas que perdiste por responder tarde?',
        problemDesc: 'Tomar reservas por WhatsApp es lento. A veces tardás en responder y el cliente se va a otro lado. Y cuando reservan, a veces no aparecen, dejándote la mesa vacía.',
        solutionTitle: 'Motor de Reservas con Seña Automática',
        solutionDesc: 'Tus clientes reservan online 24/7 dejando una seña. El sistema les manda un código único que se descuenta solo al pagar la cuenta final. Eliminamos el "No-Show".',
        iconName: 'Calendar',
        imageBefore: '/owner_pointing_empty_tables.png',
        imageAfter: '/split_reservation_full.png'
      },
      {
        id: 'f6',
        stat: '¿Sabías que conseguir un cliente nuevo cuesta 5 veces más que hacer volver a uno que ya te compró?',
        problemDesc: 'La mayoría de los locales gasta fortunas en publicidad, pero no hace nada para retener a los clientes que ya entraron por la puerta.',
        solutionTitle: 'Sistema de Fidelización y Puntos',
        solutionDesc: 'Cada consumo suma puntos canjeables para su próxima visita. Obligamos sutilmente al cliente a elegirte de nuevo frente a la competencia.',
        iconName: 'Star',
        imageBefore: '/owner_exhausted_computer.png',
        imageAfter: '/customer_celebrating_discount.png'
      },

      {
        id: 'f8',
        stat: '¿Sabías que la mayoría de los sistemas te obligan a comprar computadoras o terminales costosas que se rompen fácil?',
        problemDesc: 'El costo inicial de hardware de los sistemas tradicionales es altísimo y su mantenimiento es un dolor de cabeza.',
        solutionTitle: 'Hardware Zero (Funciona offline)',
        solutionDesc: 'No necesitás equipos especiales. Tus mozos usan su celular. Además, el sistema puede seguir funcionando offline de forma limitada desde tu dispositivo, sincronizando todo al volver internet.',
        iconName: 'Smartphone',
        imageBefore: '/expensive_pos_equipment.png',
        imageAfter: '/owner_controlling_smartphone.png'
      },
      {
        id: 'f9',
        stat: '¿Sabías que al abrir sucursales, el dueño promedio pierde el 30% del control del negocio?',
        problemDesc: 'No poder estar físicamente en cada local genera mermas, robos y descontrol en la gestión operativa.',
        solutionTitle: 'Consola Corporativa (CEO) para Franquicias',
        solutionDesc: 'Auditá ventas, mermas, modificá precios y gestioná todas tus sucursales desde el sillón de tu casa, en un solo panel centralizado.',
        iconName: 'Check',
        imageBefore: '/accounting_chaos.png',
        imageAfter: '/owner_dashboard_pc.png'
      },
      {
        id: 'f10',
        stat: '¿Sabías que en sistemas tradicionales cualquier empleado puede ver tus finanzas o modificar tickets?',
        problemDesc: 'La falta de seguridad permite fugas de información, robos de caja y desorganización interna.',
        solutionTitle: 'Seguridad de Grado Bancario (Roles y Supabase RLS)',
        solutionDesc: 'Acceso restringido en capas (Mozo, Caja, Cocina, Dueño). Cada empleado ve únicamente lo que su rol le permite. Tus datos están aislados y seguros en la nube.',
        iconName: 'AlertCircle'
      }
    ],
    testimonials: [
      {
        id: 't1',
        name: 'Roberto M.',
        role: 'Dueño de Restobar',
        tone: 'informal',
        before: 'Cobrábamos todo a mano y el mozo se volvía loco yendo y viniendo. Perdíamos mucha plata en errores de caja.',
        after: 'Me salvó las papas mal. Ahora el cliente paga directo desde la mesa, la plata entra a Mercado Pago al instante y la AFIP se hace sola. Una locura.',
        content: 'Me salvó las papas mal. Ahora el cliente paga directo desde la mesa, la plata entra a Mercado Pago al instante y la AFIP se hace sola. Una locura.'
      },
      {
        id: 't2',
        name: 'Lic. Mariana Gómez',
        role: 'Gerente de Franquicias, "La Estancia"',
        tone: 'formal',
        before: 'Teníamos 4 sucursales y usábamos 3 softwares distintos. Era imposible cruzar datos o auditar la rentabilidad en tiempo real.',
        after: 'El Ecosistema Todo En Uno y la Consola Corporativa nos permitieron unificar operaciones. Redujimos costos operativos un 25% al consolidar proveedores de software.',
        content: 'El Ecosistema Todo En Uno y la Consola Corporativa nos permitieron unificar operaciones. Redujimos costos operativos un 25% al consolidar proveedores de software.'
      },
      {
        id: 't3',
        name: 'Julián',
        role: 'Encargado de Cervecería',
        tone: 'informal',
        before: 'Los fines de semana la gente venía, tomaba una birra y se iba rápido buscando algo más divertido.',
        after: 'Pusimos el Tinder Gastronómico y el bar es un fuego. Las mesas se mandan tragos, piden música por el chat y se quedan 2 horas más consumiendo. La rentabilidad explotó.',
        content: 'Pusimos el Tinder Gastronómico y el bar es un fuego. Las mesas se mandan tragos, piden música por el chat y se quedan 2 horas más consumiendo. La rentabilidad explotó.'
      }
    ],
    pricing: [
      {
        id: 'p1',
        name: 'Plan Básico',
        price: '29.900',
        period: 'mes',
        description: 'Ideal para Foodtrucks, Kioscos, Rotiserías y locales pequeños sin mesas.',
        features: [
          { name: 'Menú Digital (Delivery / Takeaway)', description: 'Tus clientes pueden ver tus productos, armar un carrito y hacer pedidos para envío o retiro desde su celular.' },
          { name: 'Control de Stock (Básico)', description: 'Evitá vender lo que no tenés. Marcá productos como agotados automáticamente cuando el stock llega a cero.' },
          { name: 'Landing Page del Local', description: 'Tu propia página web profesional (ej. tudominio.com/tulocal) con fotos, horarios, ubicación y enlace a tu menú.' },
          { name: 'Monitor de Cocina (KDS) Básico', description: 'Una pantalla digital para que tus cocineros vean los pedidos entrantes sin usar papel. Al cargar productos, van obligatoriamente a esta pantalla.' },
          { name: 'Pasarela de Pago (Mercado Pago)', description: 'Cobrá los pedidos directamente a tu cuenta sin intermediarios ni comisiones extra.' },
          { name: 'Soporte Estándar', description: 'Ayuda por chat y correo electrónico.' },
          { name: 'Cuentas de Personal Base', description: 'Incluye acceso para 1 Administrador, Cajero, Cocina y Delivery.' }
        ],
        notIncluded: [
          'Gestión de Mesas y Salón (Códigos QR)',
          'Facturación Electrónica (AFIP)',
          'División de Comandas (Cocina vs Barra)',
          'Social Dining (Muro Interactivo)'
        ]
      },
      {
        id: 'p2',
        name: 'Plan Intermedio',
        price: '59.900',
        period: 'mes',
        description: 'Para restaurantes con mesas, cafeterías y pizzerías tradicionales.',
        features: [
          { name: 'Menú Digital (Salón y Delivery)', description: 'Dos menús operando juntos. El de salón usa Códigos QR en cada mesa para enviar comandas directas a cocina con número de mesa.' },
          { name: 'Gestión de Mesas y Roles (Hasta 6 cuentas)', description: 'Mapa de mesas libres/ocupadas. Podés crear hasta 6 cuentas separadas para tu personal (ej. mozos, cajeros).' },
          { name: 'Facturación AFIP', description: 'Emití facturas A, B y C legales de forma automática con cada pedido, sin salir de la plataforma.' },
          { name: 'Códigos de Descuento y Ofertas', description: 'Creá cupones ("PROMO10") o programá Happy Hours automáticos que cambian los precios solos a cierta hora.' },
          { name: 'Balance Financiero y Contabilidad', description: 'Panel completo para ver tus ingresos, gastos, rentabilidad diaria y mensual de forma gráfica y fácil.' },
          { name: 'Documentos Exportables', description: 'Descargá tus balances, ventas y listado de productos en Excel o PDF para tu contador.' },
          { name: 'Reseñas de Clientes (Filtro Inteligente)', description: 'Recibí calificaciones de tus clientes. Quedate con las quejas en privado y enviá a los felices a Google Maps.' }
        ],
        notIncluded: [
          'División de Comandas (Cocina vs Barra)',
          'Social Dining (Muro Interactivo)',
          'Portal de Franquicias'
        ],
        recommended: true
      },
      {
        id: 'p3',
        name: 'Plan Avanzado',
        price: '90.000',
        period: 'mes',
        description: 'Para restobares, cervecerías y locales de moda con alta rotación.',
        features: [
          { name: 'Control de Productos Vencidos (Stock Avanzado)', description: 'Control estricto de fechas de caducidad. El sistema te avisa qué insumos están por vencer para evitar desperdicios.' },
          { name: 'Soporte Prioritario', description: 'Fila rápida de atención por WhatsApp para resolver dudas al instante.' },
          { name: 'Más Cuentas de Personal', description: 'Ampliamos el límite de cuentas para staff según la necesidad de tu local.' }
        ],
        exclusiveFeatures: [
          { name: 'División Inteligente de Comandas', description: 'El sistema separa pedidos automáticamente: hamburguesas a cocina y tragos a la barra. Habilita Rol de Barra.' },
          { name: 'Social Dining (Muro Interactivo Base)', description: 'Convierte tu local en una red social. Los clientes ven un muro en vivo donde envían mensajes de texto entre mesas.' },
          { name: 'Reservas de Mesas (con Seña Automática)', description: 'Tus clientes reservan online dejando seña. Se les genera un código de descuento que se descuenta de su cuenta final.' }
        ],
        notIncluded: [
          'Multimedia en Muro Social',
          'Portal de Franquicias'
        ]
      },
      {
        id: 'p4',
        name: 'Plan Pro',
        price: '150.000',
        period: 'mes',
        description: 'La experiencia definitiva para franquicias, cadenas y clubes nocturnos.',
        features: [
          { name: 'Programa de Fidelización (Puntos)', description: 'Tus clientes suman puntos con cada compra que luego pueden canjear por premios. La mejor forma de asegurar que vuelvan.' },
          { name: 'Portal de Franquicias (Multi-Sucursal)', description: 'Si tenés varias sucursales, controlá el stock, los balances y los menús de todas desde un solo panel maestro.' },
          { name: 'Cuentas Ilimitadas', description: 'Creá todos los usuarios de staff que necesites sin restricciones.' },
          { name: 'Soporte VIP 24/7', description: 'Asistencia directa las 24 horas del día con un gerente de cuenta asignado.' }
        ],
        exclusiveFeatures: [
          { name: 'Multimedia y Regalos en Muro Social', description: 'Los clientes suben fotos, usan reacciones e invitan tragos/postres de regalo entre mesas desde el celular.' }
        ]
      }
    ],
    faqs: [
      { q: '¿Qué tengo que hacer para adquirir el sistema?', a: 'Es súper simple. Solo tenés que registrarte con un correo electrónico. Vas a recibir 14 días completamente GRATIS para probar todas las funciones, sin necesidad de ingresar tarjeta de crédito. Luego, si decidís continuar, ingresás tu tarjeta y por los siguientes 30 días disfrutarás del plan más alto al precio del plan básico.' },
      { q: '¿Es difícil pasarme desde mi sistema actual?', a: 'Para nada. La transición es cero estrés. En 15 minutos tu equipo sabrá cómo usarlo. El proceso de instalación se hace directo desde tu celular sin frenar tus operaciones. Y si tenés cualquier duda, un miembro de nuestro equipo te va a guiar paso a paso.' },
      { q: '¿Qué medios de pago aceptan para la suscripción mensual?', a: 'Aceptamos todas las tarjetas de crédito y débito a través de un cobro recurrente automático y transparente (Preapproval API de Mercado Pago). No tenés que preocuparte por hacer transferencias manuales.' },
      { q: '¿Qué pasa si me quedo sin internet en el local?', a: 'El sistema está preparado. Sigue funcionando de forma offline en tu dispositivo principal con algunas limitaciones. En cuanto la conexión a internet regrese, el sistema sincronizará de forma automática todo lo que ocurrió durante ese tiempo sin perder ningún dato.' },
      { q: '¿Cuentan con soporte técnico?', a: '¡Por supuesto! Vas a contar con soporte técnico vía chat en vivo con operadores reales, además de un Centro de Ayuda completo con videos y tutoriales para resolver cualquier duda al instante.' },
      { q: '¿Necesito comprar hardware costoso?', a: 'No. Nuestra filosofía es "Hardware Zero". El sistema corre al 100% en la nube y todo tu equipo puede operar desde sus propios celulares o cualquier PC que ya tengas en el local.' },
      { q: '¿Quién modera el Muro Interactivo (Tinder Gastronómico)?', a: 'Lo modera tu propio staff y nuestro sistema automático. Permite un ambiente seguro donde los comensales pueden pedir música, interactuar y hasta enviar regalos a otras mesas, siempre bajo las reglas de tu local.' }
    ],
    impactImage: '/restaurant_empty_vs_full.png',
    impactCaption: 'El impacto real de optimizar la atención de tu restaurante.'
  },
  'MMM Todo Lo Que Quiero Comprar': {
    appName: 'MMM Todo Lo Que Quiero Comprar',
    hero: {
      title: 'Dejá de perder plata por el descontrol del "fiado" y los productos vencidos',
      subtitle: 'La plataforma TODO EN UNO que transforma tu comercio, automatiza tus cobros, organiza el stock y atrae más vecinos sin hacer filas.',
      painPoint: '¿Sabías que los comercios de barrio pierden hasta un 20% de sus ganancias por olvidos, errores al anotar fiados y falta de control de stock?'
    },
    differentiator: {
      title: 'El "Veraz de Barrio": Cuentas Claras, Conserva la Amistad',
      subtitle: 'Mucho más que un simple punto de venta (POS).',
      description: 'El miedo a cobrar y la vergüenza de reclamar pagos destruyen tu negocio. Nuestro sistema automatiza el "fiado": si un cliente no paga a principio de mes, el sistema lo bloquea automáticamente sin que vos tengas que dar la cara. Además, comparte el historial de deudores con otros comercios de la red para que no le des crédito a malos pagadores.',
      imageCaption: 'Antes: clientes haciendo fila y stock desconocido. Después: clientes pidiendo desde su casa y retirando sin esperas.',
      quote: '¿Sabías que el 70% de las personas hoy prefiere comprar de manera online que ir físicamente al local? Con nuestro sistema, tus clientes te pueden pedir desde casa, ahorrando tiempo en cola y yendo solo a buscar la mercadería.',
      image: '/customer_ordering_sofa.png'
    },
    interleavedFeatures: [
      {
        id: 'c8',
        stat: '¿Sabías que el dueño promedio de un negocio de barrio trabaja más de 12 horas al día porque siente que si no está físicamente en el local, el negocio no funciona?',
        problemDesc: 'El miedo a que los empleados te roben caja, lleven mal las cuentas, no sepan cobrar o no se conozcan los precios te convierte en esclavo de tu propio local, impidiéndote delegar y tener tiempo libre.',
        solutionTitle: 'Control y Delegación Total (No seas esclavo de tu local)',
        solutionDesc: 'Con el sistema podés delegar con tranquilidad absoluta. La aplicación restringe permisos según roles, calcula los totales automáticamente y te muestra las ventas en tiempo real en tu celular. Cualquiera puede cobrar sin cometer errores y vos recuperás tu vida.',
        iconName: 'Users',
        imageBefore: '/kiosk_owner_exhausted.png',
        imageAfter: '/owner_relaxed_delegating.png'
      },
      {
        id: 'c1',
        stat: '¿Sabías que el mayor peligro para tu negocio no es el supermercado grande, sino el miedo al cambio y no adaptarte a cómo compra tu barrio hoy?',
        problemDesc: 'Seguir cobrando solo en efectivo y anotando todo a mano te hace perder ventas de clientes que quieren pagar con celular o pedir por WhatsApp.',
        solutionTitle: 'Digitalización Sin Estrés',
        solutionDesc: 'Nuestro sistema es tan fácil de usar como mandar un mensaje. Controlás tu negocio con tu celular o tablet, sin gastar en equipos caros ni instalaciones complicadas.',
        iconName: 'Smartphone',
        imageBefore: '/kiosk_owner_stressed.png',
        imageAfter: '/kiosk_owner_relaxed.png'
      },
      {
        id: 'c2',
        stat: '¿Sabías que la vergüenza a cobrar le cuesta a los dueños de negocios barriales miles de pesos al mes en "fiados" que nunca se recuperan?',
        problemDesc: 'Anotar en un cuaderno genera errores y momentos incómodos. Terminas perdiendo plata y peleándote con los vecinos.',
        solutionTitle: 'Fiado Digital y "Veraz de Barrio"',
        solutionDesc: 'A principio de mes el sistema muestra exactamente quién debe. Bloquea a los morosos para no darles más crédito hasta que paguen. El sistema hace el "trabajo sucio" por vos. Además, al compartir datos en la red, sabés si un cliente nuevo le debe a otro negocio.',
        iconName: 'AlertCircle',
        imageBefore: '/messy_notebook_debts.png',
        imageAfter: '/app_blocked_debtor.png'
      },
      {
        id: 'c3',
        stat: '¿Sabías que perder el control de qué productos te faltan o se vencen hace que tires plata a la basura todos los días?',
        problemDesc: 'Mirar las góndolas a ojo para ver qué pedirle al proveedor te lleva a quedarte sin stock de lo que más se vende o tirar mercadería vencida.',
        solutionTitle: 'Control de Stock y Vencimientos',
        solutionDesc: 'Sabé exactamente qué entra y qué sale de tu negocio. Además, podés cargar lotes por vencimiento y el sistema te avisa antes de que un producto se venza para que puedas ponerlo en oferta y no perder la inversión.',
        iconName: 'Package',
        imageBefore: '/throwing_expired_food.png',
        imageAfter: '/app_expiration_alert.png'
      },
      {
        id: 'c4',
        stat: '¿Sabías que el 30% de la gente abandona su compra o decide ir a otro lado si ve que hay mucha fila en tu local o no sabe si tenés el producto?',
        problemDesc: 'Tus clientes están cansados de ir, hacer cola y cuando les toca, enterarse de que no tenés lo que buscaban.',
        solutionTitle: 'Pedidos desde Casa (Cero Colas)',
        solutionDesc: 'Tus clientes pueden ver tu stock real desde su celular, pedir desde su casa y simplemente pasar a retirar la bolsa armada. Ahorran tiempo y vos ganás clientes felices.',
        iconName: 'Timer',
        imageBefore: '/long_queue_minimarket.png',
        imageAfter: '/customer_ordering_sofa.png'
      },
      {
        id: 'c5',
        stat: '¿Sabías que hasta el 20% de las pérdidas en los comercios de barrio se deben a errores de cálculo en la calculadora o a no recordar los precios actualizados?',
        problemDesc: 'Equivocarse al sumar apurado mientras el cliente espera o no actualizar los precios por inflación te hace perder dinero todos los días.',
        solutionTitle: 'Caja POS Inteligente y Suma por Voz',
        solutionDesc: 'Escaneá los productos con tu cámara y el sistema te dará el precio y la suma automática al instante. Además, podés dictarle por voz: decile "sumame tal producto, sumame este" y la app hace la cuenta sola.',
        iconName: 'Coins',
        imageBefore: '/kiosk_calculation_error.png',
        imageAfter: '/kiosk_voice_sum.png'
      },
      {
        id: 'c6',
        stat: '¿Sabías que los sistemas de gestión tradicionales te exigen computadoras, lectoras de código de barras e impresoras carísimas?',
        problemDesc: 'Equipar un local con tecnología vieja cuesta fortunas y ocupa espacio que no tenés.',
        solutionTitle: 'Hardware Zero (Tu celular es tu herramienta)',
        solutionDesc: 'No necesitás equipos caros. Usá la cámara de tu celular o tablet como lector de códigos de barras mediante nuestra Inteligencia Artificial. Todo funciona 100% en la nube.',
        iconName: 'Smartphone',
        imageBefore: '/cluttered_kiosk_counter.png',
        imageAfter: '/clean_kiosk_smartphone.png'
      },
      {
        id: 'c7',
        stat: '¿Sabías que este sistema se adapta perfectamente a cualquier tipo de negocio barrial, no solo alimentos?',
        problemDesc: 'A veces los sistemas son tan específicos que si vendés ropa o artículos de limpieza no te sirven.',
        solutionTitle: 'Sistema Multi-Rubro',
        solutionDesc: 'No importa si tenés un kiosco, un almacén, una tienda de limpieza o de ropa. El control de stock, los fiados y el Veraz de Barrio funcionan igual de bien para potenciar tu rubro.',
        iconName: 'Globe'
      }
    ],
    testimonials: [
      {
        id: 't1',
        name: 'Carlos F.',
        role: 'Dueño de Kiosco',
        tone: 'informal',
        before: 'Me daba cosa decirle al vecino que me pague el fiado y terminaba perdiendo plata o enojándome.',
        after: 'Ahora el sistema lo bloquea solo si no paga. El tipo viene y le digo "fijate que el sistema no me deja fiarte más". Me saqué un peso de encima enorme.',
        content: 'Ahora el sistema lo bloquea solo si no paga. El tipo viene y le digo "fijate que el sistema no me deja fiarte más". Me saqué un peso de encima enorme.'
      },
      {
        id: 't2',
        name: 'Silvia',
        role: 'Dueña de Minimercado',
        tone: 'formal',
        before: 'Tirábamos mucha mercadería porque se nos vencían los lácteos sin darnos cuenta.',
        after: 'Las alertas de vencimiento en el celular son la gloria. Ahora ponemos las cosas en oferta días antes y no perdemos un peso. Además, los clientes aman pedir desde casa y pasar a buscar.',
        content: 'Las alertas de vencimiento en el celular son la gloria. Ahora ponemos las cosas en oferta días antes y no perdemos un peso. Además, los clientes aman pedir desde casa y pasar a buscar.'
      },
      {
        id: 't3',
        name: 'Marta y José',
        role: 'Dueños de Artículos de Limpieza',
        tone: 'informal',
        before: 'Estábamos re negados con la tecnología, usábamos cuaderno para todo. Un caos total.',
        after: 'Es re fácil, escaneamos todo con el celu. Lo mejor es el Veraz del barrio: vino una chica a pedir fiado y el sistema me avisó que le debía a la panadería de enfrente. ¡Zafamos!',
        content: 'Es re fácil, escaneamos todo con el celu. Lo mejor es el Veraz del barrio: vino una chica a pedir fiado y el sistema me avisó que le debía a la panadería de enfrente. ¡Zafamos!'
      }
    ],
    pricing: [
      {
        id: 'p_comprar_1',
        name: 'Plan Único Todo Incluido',
        price: '45.000',
        period: 'mes',
        description: 'Todo lo que tu comercio necesita en un solo plan, sin sorpresas ni costos ocultos.',
        recommended: true,
        features: [
          { name: 'Control de Stock y Vencimientos', description: 'Inventario inteligente con alertas tempranas para productos próximos a vencer.' },
          { name: 'Fiado Digital Automático', description: 'Gestión de cuentas corrientes con límites, donde el cliente ve su deuda desde el celular.' },
          { name: 'Veraz de Barrio (Bloqueo y Reputación)', description: 'Bloqueo automático de deudores y alertas de riesgo compartidas con otros comercios de la red.' },
          { name: 'Catálogo Online (Pedidos para Retirar)', description: 'Tus clientes ven qué tenés en stock desde sus casas y arman el pedido para pasar a buscar sin hacer filas.' },
          { name: 'Caja POS con IA y Voz', description: 'Sistema de cobro súper rápido: escaneá con la cámara de tu celular o agregá productos dictándolos por voz.' },
          { name: 'Soporte Prioritario', description: 'Atención personalizada para que nunca te quedes solo frente a un problema.' },
          { name: 'Ventas Fraccionadas (Por Peso)', description: 'Ideal para fiambrerías y verdulerías. Vendé en gramos o kilos sin complicaciones matemáticas.' }
        ]
      }
    ],
    faqs: [
      { q: '¿Qué tengo que hacer para adquirir el sistema?', a: 'Es súper simple. Solo tenés que registrarte con un correo electrónico. Vas a recibir 14 días completamente GRATIS para probar todas las funciones. Luego, la suscripción tiene un valor único de $45.000 por mes.' },
      { q: '¿Sirve para fiambrerías o si vendo por kilo?', a: '¡Sí! El sistema acepta ventas fraccionadas y por peso (gramos o kilogramos), por lo que es ideal para almacenes, verdulerías y fiambrerías.' },
      { q: '¿Cómo funciona exactamente lo del "Veraz de Barrio"?', a: 'Todos los comercios de la plataforma están conectados en una base de datos de deudores. Si un cliente no te paga y lo dejás marcado como moroso, cuando vaya a otro comercio a pedir fiado, el sistema alertará a ese dueño sobre la deuda. Vos también te beneficiás sabiendo si un cliente es mal pagador en otro lado.' },
      { q: '¿Mis clientes tienen que descargar alguna app para pedir?', a: 'No, ingresan a través de un link web que podés compartir por WhatsApp o Instagram. Ven tu stock, arman el pedido y a vos te llega la notificación para que lo prepares.' },
      { q: '¿Es difícil pasarme desde el cuaderno o mi sistema actual?', a: 'Para nada. Podés usar tu propio celular para escanear los códigos de barra de tus productos y cargarlos en segundos. En muy poco tiempo tenés todo digitalizado.' }
    ]
  },
  '5inco': {
    appName: '5inco',
    hero: {
      title: 'Terminá con la frustración de las colas físicas en tu supermercado o local',
      subtitle: 'La única plataforma de fila virtual que elimina la espera de pie, reduce el estrés de tus cajeros y permite a tus clientes seguir comprando mientras esperan su turno.',
      painPoint: '¿Sabías que hasta un 30% de los clientes abandonan su compra si ven una fila larga en las cajas?'
    },
    differentiator: {
      title: 'El "Ceder Turno" (Subasta): Espera Activa y Divertida',
      subtitle: 'Fricción Cero, Fila Virtual Activa.',
      description: 'Tus clientes escanean un QR y entran a la fila desde su propio celular, sin bajar apps ni crear cuentas. Si aún no terminaron de comprar, pueden poner su turno en "Subasta" para intercambiarlo con alguien que esté más atrás. El tiempo de espera se convierte en tiempo de compra y facturación.',
      imageCaption: 'Antes: clientes aburridos haciendo fila. Después: clientes relajados comprando más cosas mientras esperan su turno.',
      quote: '¿Sabías que el 80% de los clientes prefiere esperar recorriendo las góndolas antes que parados en una fila física? Con 5inco, la espera es productiva y cómoda.',
      image: '/market_waiting_relaxed.png'
    },
    interleavedFeatures: [
      {
        id: 'e1',
        stat: '¿Sabías que una persona parada en una fila física está perdiendo valioso tiempo que podría usar para seguir comprando?',
        problemDesc: 'Tener a tus clientes quietos esperando a ser atendidos bloquea tu salón de ventas y limita tu facturación. El tiempo que pasan en la fila es dinero que dejas de facturar.',
        solutionTitle: 'Fila Virtual Interactiva',
        solutionDesc: 'Al registrarse con un simple QR, los clientes esperan recorriendo el local. Siguen sumando productos al changuito hasta que son llamados automáticamente por WhatsApp o notificación en pantalla.',
        iconName: 'Smartphone',
        imageBefore: '/market_queue_boring.png',
        imageAfter: '/market_queue_buying.png'
      },
      {
        id: 'e2',
        stat: '¿Sabías que si un cliente olvida un producto, prefiere no llevarlo antes que perder su lugar en la fila física?',
        problemDesc: 'Darse cuenta de que falta un ingrediente clave cuando ya estás en la fila genera frustración. El cliente prefiere irse sin el producto para no volver a hacer la fila de cero.',
        solutionTitle: 'Libertad de Recorrido Sin Pérdida de Turno',
        solutionDesc: 'Como el turno está en su celular, los clientes pueden caminar libremente a buscar lo que olvidaron. Recuperamos esa venta perdida sin alterar el orden de atención.',
        iconName: 'Calendar',
        imageBefore: '/forgotten_item_regret.png',
        imageAfter: '/fetch_forgotten_item.png'
      },
      {
        id: 'e3',
        stat: '¿Sabías que las personas que van a comprar pocos artículos prefieren dejar la mercadería e irse si ven que la fila es muy larga?',
        problemDesc: 'El cliente rápido que va por cosas puntuales es el que más odia esperar. Ver una fila larga hace que deje los artículos en una góndola y se retire sin comprar.',
        solutionTitle: 'Fila Rápida Virtual sin Fricción',
        solutionDesc: 'El cliente escanea el QR, asegura su turno al instante, agarra sus productos con calma y va directamente a la caja asignada cuando el celular le vibra. Cero abandonos.',
        iconName: 'Timer',
        imageBefore: '/abandoned_cart_store.png',
        imageAfter: '/checkout_quick_happy.png'
      },
      {
        id: 'e4',
        stat: '¿Sabías que tener una fila de clientes impacientes mirándote reduce drásticamente la productividad de tus cajeros?',
        problemDesc: 'Trabajar bajo la mirada atenta e impaciente de una fila de personas genera un estrés laboral tremendo. Los empleados trabajan incómodos, se equivocan más y atienden de mal humor.',
        solutionTitle: 'Cajas Despejadas y Menos Estrés',
        solutionDesc: 'Al no haber fila física, el área de cajas está despejada. Los cajeros atienden a un cliente a la vez, con tranquilidad y sin la presión de la gente esperando detrás, mejorando el clima y la velocidad.',
        iconName: 'Users',
        imageBefore: '/cashier_stressed_crowd.png',
        imageAfter: '/cashier_relaxed_friendly.png'
      }
    ],
    testimonials: [
      {
        id: 't1',
        name: 'Gerente de Sucursal, Supermercado Delta',
        role: 'Gerente de Operaciones',
        tone: 'formal',
        before: 'En las horas pico las colas llegaban hasta la mitad de los pasillos, los clientes se quejaban y muchos dejaban las compras a mitad de hacer.',
        after: 'Instalamos el sistema QR en la entrada. Ahora los clientes siguen paseando y agregando cosas al changuito. Aumentamos el ticket promedio un 15% y las cajas están despejadas.',
        content: 'Instalamos el sistema QR en la entrada. Ahora los clientes siguen paseando y agregando cosas al changuito. Aumentamos el ticket promedio un 15% y las cajas están despejadas.'
      },
      {
        id: 't2',
        name: 'Carolina P.',
        role: 'Cliente Habitual',
        tone: 'informal',
        before: 'Odiaba ir a comprar tres pavadas después del trabajo porque sabía que iba a estar media hora parada en la cola aburriéndome.',
        after: 'Ahora entro, escaneo el código y voy eligiendo las cosas tranqui. Cuando me faltan dos personas me llega un WhatsApp, voy a la caja y pago al toque. Me devolvieron la vida.',
        content: 'Ahora entro, escaneo el código y voy eligiendo las cosas tranqui. Cuando me faltan dos personas me llega un WhatsApp, voy a la caja y pago al toque. Me devolvieron la vida.'
      },
      {
        id: 't3',
        name: 'Darío M.',
        role: 'Cajero Principal',
        tone: 'informal',
        before: 'Terminaba la jornada con dolor de cabeza por la cantidad de gente parada atrás mío viéndome cobrar. Sentía que me presionaban con la mirada.',
        after: 'Es un cambio total. Cobro mucho más relajado porque solo tengo a la persona que estoy atendiendo. No hay amontonamiento y puedo dar una mejor atención.',
        content: 'Es un cambio total. Cobro mucho más relajado porque solo tengo a la persona que estoy atendiendo. No hay amontonamiento y puedo dar una mejor atención.'
      }
    ],
    pricing: [
      {
        id: 'p_5inco_1',
        name: 'Plan Único Fila Virtual',
        price: '45.000',
        period: 'mes',
        description: 'Turnos virtuales ilimitados y alertas multicanal para erradicar las colas de tu local.',
        recommended: true,
        features: [
          { name: 'Onboarding Cero Fricción (QR)', description: 'Tus clientes escanean el código QR y entran a la fila desde el navegador, sin descargar apps.' },
          { name: 'Alertas Multi-Canal (Sonido y Push)', description: 'El sistema notifica visual y sonoramente al cliente cuando es su turno, sorteando el bloqueo de autoplay.' },
          { name: 'WhatsApp Integrado', description: 'Notificaciones automáticas directas al WhatsApp del cliente cuando es llamado por el cajero.' },
          { name: 'Modo Subasta UX (Ceder Turno)', description: 'Los clientes que aún no terminan de comprar pueden ceder su turno temporalmente a cambio de un puesto posterior.' },
          { name: 'Panel de Cajero "Mazo de Cartas"', description: 'Interfaz lúdica en 3D para que los cajeros llamen y gestionen turnos a la velocidad de la luz.' },
          { name: 'Panel de Administración (SaaS)', description: 'Personalizá colores, banners y logos de tu supermercado.' },
          { name: 'Soporte 24/7 y Actualizaciones', description: 'Atención prioritaria y mejoras constantes al sistema.' }
        ]
      }
    ],
    faqs: [
      { q: '¿Necesito instalar pantallas o tótems de turnos en mi local?', a: '¡No! Todo corre desde los celulares de los propios clientes mediante un escaneo QR en la entrada o pasillos. Cero gastos en hardware adicional.' },
      { q: '¿Cómo se evitan los robos o colados en las cajas?', a: 'El sistema llama a cada cliente por su número o nombre de fila virtual. El cajero verifica la comanda en pantalla para validar que sea la persona correspondiente antes de cobrar.' },
      { q: '¿Qué pasa si un cliente no está atento al celular?', a: '5inco envía notificaciones sonoras potentes, parpadeos de pantalla persistentes y notificaciones automáticas por WhatsApp para asegurar que el cliente note que es su turno.' },
      { q: '¿Puedo integrar 5inco a mis cajas actuales?', a: 'Sí, la plataforma del cajero es una interfaz web ultra-rápida e independiente que puede funcionar de manera complementaria en las terminales que ya tienen los cajeros.' }
    ]
  }
};
