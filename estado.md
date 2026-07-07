# Estado del Proyecto: Landing Page "MMM Todo Lo Que Quiero"

## Contexto y Propósito
El usuario busca automatizar su proceso de ventas mediante landing pages altamente persuasivas que convierten visitas en clientes potenciales (lead generation). El usuario valora la eficiencia extrema y la reducción de fricción tecnológica. La landing page actúa como el catálogo de todo su ecosistema de aplicaciones (Comer, Comprar, 5inco, Cont Agent).

## Hitos Completados
1. **App Comer (Restaurantes)**
   - Se implementó un funnel con estructura Problema-Solución (Antes/Después).
   - Se conectaron testimoniales en un carrusel dinámico.
   - Se definieron 4 planes de precios, cada uno con características clave (Menú QR, Tinder Gastronómico, Facturación AFIP, Hardware Zero).
   - Imágenes de IA creadas e integradas.

2. **App Comprar (Kioscos, Almacenes y Tiendas de Ropa)**
   - Se implementó el funnel siguiendo la misma lógica, enfocado a pequeños minoristas.
   - Funciones estrella integradas: Veraz de Barrio, Stock y Lotes, Pedidos desde Casa, POS con Voz, Delegación Segura.
   - Plan Único Todo Incluido de $45.000 ARS.

3. **App 5inco (Fila Virtual para Supermercados y Locales)**
   - Se implementó el funnel con estructura Problema-Solución (Antes/Después) orientada a la pérdida de ventas por largas filas y estrés de cajeros.
   - 9 imágenes de IA generadas para supermercados.
   - Plan Único Fila Virtual de $45.000 ARS.

4. **Administrador de Embudos (Dinámico)**
   - Se modificó `AdminPanel.tsx` para permitir que la estructura Problema/Solución (incluyendo imágenes Antes/Después) sea editada dinámicamente desde el dashboard para **cualquier app** (Comer, Comprar, 5inco, Cont Agent, etc.).
   - Se agregó una lógica de *fallback inteligente* en `SalesFunnelView.tsx` para asegurar que el sistema siga utilizando los copys pre-creados hasta que el usuario decida migrar todo al formato dinámico.
   - El botón CTA al pie de las características de la app redirige ahora automáticamente a la propiedad `web_url` de la app.

## Tareas Pendientes o Por Usuario
- Ejecutar el script SQL en Supabase (`actualizar_base_datos.sql`) para agregar los campos a la base de datos `landing_features`.
- Terminar el desarrollo de "Cont Agent" (Tu Agencia de Redes Sociales Automatizada).

## Arquitectura General
- React + Vite + Supabase (Para carga dinámica de aplicaciones y embudos).
- Componente clave: `SalesFunnelView.tsx` (Renderiza el embudo persuasivo dependiendo de la app activa y de los bloques que vienen desde Supabase).
- Origen de datos híbrido: BD Supabase (para características y apps) con fallback a `src/data/funnels.ts` (para precios, faqs, testimonios).



## Actualización Reciente
- Se agregó el campo playstore_url a la base de datos (requiere ejecutar el script en Supabase).
- En la vista principal y debajo de cada bloque de embudo, ahora aparecen dinámicamente los botones de 'Descargar APK' y 'Ver en Play Store' si los enlaces están cargados.
