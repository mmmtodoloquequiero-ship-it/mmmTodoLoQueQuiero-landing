# Estado del Proyecto: Landing Page "MMM Todo Lo Que Quiero"

## Contexto y Propósito
El usuario busca automatizar su proceso de ventas mediante landing pages altamente persuasivas que convierten visitas en clientes potenciales (lead generation). El usuario valora la eficiencia extrema y la reducción de fricción tecnológica. La landing page actúa como el catálogo de todo su ecosistema de aplicaciones (Comer, Comprar, 5inco, Cont Agent).

## Hitos Completados
1. **App Comer (Restaurantes)**
   - Se implementó un funnel con estructura Problema-Solución (Antes/Después).
   - Se conectaron testimoniales en un carrusel dinámico.
   - Se definieron 4 planes de precios, cada uno con características clave (Menú QR, Tinder Gastronómico, Facturación AFIP, Hardware Zero).
   - Imágenes de IA creadas e integradas.
   - La imagen de impacto (Restaurante Vacío vs Lleno) con texto en inglés después de los comentarios se mantuvo solo para restaurantes haciéndola opcional en la estructura.

2. **App Comprar (Kioscos, Almacenes y Tiendas de Ropa)**
   - Se implementó el funnel siguiendo la misma lógica.
   - Se destacaron los siguientes "dolores" resueltos: El fiado manual, Miedo al cambio tecnológico, Control de Stock/Vencimientos, Colas largas, errores al cobrar y **el dolor de no poder delegar y ser esclavo del negocio**.
   - Funciones estrella integradas al copy:
     - **Veraz de Barrio** (Bloqueo automático de deudores, base compartida entre comercios).
     - **Stock y Lotes** (Alertas de vencimiento para poner ofertas).
     - **Pedidos desde Casa** (Eliminar colas y asegurar el stock antes de que el cliente vaya).
     - **POS con Voz:** Escaneo de productos y dictado por voz (ej. "sumame tal producto") para hacer la suma automática y evitar pérdidas de dinero (hasta un 20%) por olvidos o errores en la calculadora.
     - **Delegación Segura:** Sección añadida para atacar el dolor de trabajar +12 horas por no poder delegar la caja (miedo a robos, cuentas mal hechas o precios desconocidos). El sistema permite roles limitados, cobro exacto y visualización en tiempo real. **Esta sección fue posicionada al inicio de las características intercaladas, justo debajo del diferenciador de pedidos online, según la última solicitud del usuario.**
   - **Imágenes sin mezcla de rubros:** Se generaron imágenes específicas para el rubro minorista (kioscos, ropa, almacenes) para evitar mezclar fondos e imágenes de restaurantes. Se actualizaron las imágenes de "Hardware Zero", la característica de "Suma por Voz" y el módulo de "Delegación".
   - Se removió la imagen en inglés del restaurante de comida que salía después de los testimoniales (la sección se hizo condicional y solo se muestra en la app Comer).
   - Se estableció un **Plan Único Todo Incluido de $45.000 ARS**.
   - Se corrigió el bloque del diferenciador para que lea dinámicamente la cita y la imagen del modelo de datos, reemplazando la estadística y la imagen del "muro interactivo" de restaurantes por el dato de pedidos online y la imagen del cliente pidiendo desde casa.

3. **App 5inco (Fila Virtual para Supermercados y Locales)**
   - Se implementó el funnel con estructura Problema-Solución (Antes/Después).
   - Se abordaron los dolores solicitados por el usuario:
     - **Pérdida de ventas por espera física:** Personas paradas en cola que podrían estar comprando más cosas.
     - **Olvidar productos:** Clientes que no van a buscar productos olvidados por miedo a perder su lugar.
     - **Abandono de compras pequeñas:** Clientes con pocos artículos que se van sin comprar al ver una fila muy larga.
     - **Estrés en cajeros:** Reducción de la presión sobre el personal de caja al no tener multitudes esperando encima.
     - **Satisfacción y fidelidad del cliente:** Al mantenerlos contentos respetando su tiempo.
   - Copys comerciales y testimonios orientados a supermercados y clientes habituales.
   - **Imágenes de IA generadas:** 9 nuevas imágenes de IA (Antes/Después) representando las colas aburridas, compras relajadas, cajeros estresados vs felices y clientes con el sistema en el celular.
   - Se estableció un **Plan Único Fila Virtual de $35.000 ARS**, acorde con la suscripción mensual planificada para este SaaS.

## Funciones Postergadas (En `roadmap.md`)
- Integración de API de Google Maps/Reviews para testimonios reales.

## Arquitectura General
- React + Vite + Supabase (Para carga dinámica de aplicaciones y configuraciones básicas).
- Componente clave: `SalesFunnelView.tsx` (Renderiza el embudo persuasivo dependiendo de la app activa).
- Origen de datos (Copywriting): `src/data/funnels.ts`

