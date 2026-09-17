# 🎟️ Gestor de Rifa 00-99 (Mobile Web App & PWA)

Una aplicación móvil web progresiva (**PWA**) moderna, rápida y táctil, desarrollada con **React 19**, **Vite** y **Tailwind CSS v4**, diseñada específicamente para administrar, controlar y compartir sorteos y talonarios de 100 números (del **00 al 99**).

---

## 🚀 Características Principales

### 📱 Experiencia Mobile-First & Visualización Completa
* **Vista 10x10 (Talonario Global)**: Diseñada para ver los **100 números simultáneamente en la pantalla del celular sin hacer scroll**, organizados por filas de decenas (`00-09`, `10-19`, ..., `90-99`).
* **Vista 5 Columnas (Detallada)**: Casillas más amplias que muestran el nombre del comprador debajo de cada número vendido.
* **Filtros y Buscador en Tiempo Real**: Filtra rápidamente entre *Todos*, *Libres* y *Vendidos*, o busca por número o nombre de comprador.

### 🎨 Código Visual Claro e Intuitivo
* 🔴 **Rojo (`#dc2626`)**: Identifica de forma inmediata los números vendidos.
* 🔵 **Azul (`#2563eb`)**: Botones de acción principal, encabezados, selectores y controles.
* ⬜ **Blanco con borde nítido**: Casillas libres y disponibles para su venta.

### 💾 Persistencia de Datos Local (`localStorage`)
* Todos los cambios (ventas, nombres de compradores y liberaciones de números) se guardan automáticamente en el `localStorage` del navegador con la clave `'rifa_app_tickets_v1'`.
* **Seguridad ante cierres**: Si recargas la página, cierras el navegador o apagas el celular, tus datos no se pierden.
* **Manejo inmutable**: Actualizaciones de estado en React siguiendo las mejores prácticas de inmutabilidad (`prev.map(...)`).

### 📸 Compartir Imagen PNG en Alta Resolución (HTML5 Canvas 2D)
* Genera una **imagen PNG limpia y profesional** que contiene **únicamente la cuadrícula de números y su leyenda**, sin barras de navegación, botones ni controles de la pantalla.
* **Motor gráfico autónomo**: Dibuja directamente sobre un lienzo Canvas de 640×760 px, garantizando que el 100% de los números se vean nítidos y con sus colores exactos en cualquier teléfono.
* **Vista previa en vivo**: Muestra la imagen generada en pantalla antes de compartirla.
* **Envío nativo**: Usa la **Web Share API** en móviles para enviar la foto directamente a **WhatsApp**, Telegram o guardarla en la galería.

### 💬 Compartir Lista por WhatsApp
* Genera un mensaje formateado listo para enviar a grupos o clientes con los números disponibles, números vendidos y llamado a la acción.
* Botón de copiado rápido de números libres al portapapeles.

### 👥 Lista Resumida de Compradores
* Sección al pie de la grilla que agrupa automáticamente las ventas por cliente:
  > **Ejemplo**: *Juan: 03, 15, 99 (3 números)*
* Pastillas interactivas en rojo que permiten tocar cualquier número para ver o editar la venta.

### 📲 Instalación como App Nativa (PWA - Progressive Web App)
* **Android (Google Chrome)**: Banner automático emergente con el botón **"Instalar Ahora con 1 Toque"**, agregando la app a la pantalla de inicio.
* **iOS (iPhone / iPad en Safari)**: Detección inteligente con guía visual paso a paso (*Compartir ⎋ ➔ Agregar a pantalla de inicio ➕*).
* **Modo Standalone**: Se ejecuta a pantalla completa, sin la barra de direcciones del navegador.
* **Soporte Offline**: Service Worker configurado con caché de recursos para abrir la aplicación incluso sin conexión a internet.
* **Íconos oficiales incluidos**: Formatos PNG en 192×192 px, 512×512 px, Apple Touch Icon (180×180 px) y SVG vectorial adaptable.

---

## 📂 Estructura del Proyecto

```text
mi-app-movil/
├── public/
│   ├── favicon.svg              # Favicon estándar
│   ├── pwa-icon.svg             # Ícono vectorial oficial de la rifa
│   ├── pwa-192x192.png          # Ícono estándar PWA Android (192px)
│   ├── pwa-512x512.png          # Ícono splash screen PWA (512px)
│   ├── apple-touch-icon.png     # Ícono para iPhone / iPad iOS (180px)
│   ├── manifest.json            # Manifiesto Web PWA (standalone, colores, íconos)
│   └── sw.js                    # Service Worker con caché offline
├── src/
│   ├── assets/                  # Recursos gráficos adicionales
│   ├── components/
│   │   ├── Header.jsx           # Título, métricas de venta, progreso y reinicio
│   │   ├── TicketGrid.jsx       # Grilla (10x10 o 5 cols), buscador y filtros
│   │   ├── TicketItem.jsx       # Casilla individual de número (libre vs vendido)
│   │   ├── BuyerModal.jsx       # Modal táctil / Drawer para vender o liberar número
│   │   ├── BuyerList.jsx        # Resumen agrupado por comprador + copiar lista
│   │   ├── ShareModal.jsx       # Modal con vista previa y opciones para compartir
│   │   └── InstallBanner.jsx    # Banner automático de instalación PWA en celular
│   ├── hooks/
│   │   └── useRaffle.js         # Custom Hook con lógica de 100 números y localStorage
│   ├── utils/
│   │   └── generateRaffleImage.js # Generador Canvas 2D de la imagen PNG de la rifa
│   ├── App.jsx                  # Orquestador y layout principal Mobile-First
│   ├── index.css                # Importación y directivas base de Tailwind CSS v4
│   └── main.jsx                 # Punto de entrada React 19 y registro de Service Worker
├── generate-icons.js            # Script utilitario para regenerar íconos PNG con Sharp
├── index.html                   # HTML base con meta tags mobile y PWA
├── package.json                 # Dependencias y scripts de ejecución
└── vite.config.js               # Configuración de Vite con plugin Tailwind v4
```

---

## 🛠️ Tecnologías Utilizadas

* **[React 19](https://react.dev/)**: Biblioteca UI con hooks optimizados y arquitectura modular.
* **[Vite 8](https://vite.dev/)**: Entorno de compilación ultra rápido con Hot Module Replacement (HMR).
* **[Tailwind CSS v4](https://tailwindcss.com/)**: Motor de diseño utilitario configurado mediante `@tailwindcss/vite`.
* **HTML5 Canvas 2D API**: Para el renderizado exacto de la imagen PNG exportable.
* **Web Share API**: Para compartir archivos e imágenes directamente a WhatsApp y redes sociales.
* **Service Workers & Cache API**: Para el soporte PWA y funcionamiento sin conexión.

---

## ⚙️ Instalación y Puesta en Marcha

### Prerrequisitos
Tener instalado [Node.js](https://nodejs.org/) (versión 18 o superior recomendada).

### 1. Clonar o ingresar al proyecto
```powershell
cd mi-app-movil
```

### 2. Instalar dependencias
```powershell
npm install
```

### 3. Iniciar el servidor de desarrollo
Para probar la aplicación en tu computadora:
```powershell
npm run dev
```

Para probarla **directamente en tu celular conectado a la misma red Wi-Fi**:
```powershell
npm run dev -- --host
```
> La consola te mostrará una dirección de red local (ejemplo: `http://192.168.1.XX:5173`). Abre ese enlace en el navegador de tu celular (Google Chrome en Android o Safari en iPhone).

### 4. Compilar para producción
```powershell
npm run build
```
Genera la carpeta optimizada `dist/` lista para subir a cualquier hosting estático (**Vercel, Netlify, GitHub Pages, Firebase Hosting, Cloudflare Pages**, etc.).

### 5. Verificar código (Linter)
```powershell
npm run lint
```

---

## 📖 Guía de Uso

1. **Vender un número**: Toca cualquier número blanco en la grilla. Se abrirá el modal para escribir el nombre del comprador y presionar **"Guardar"**. El número cambiará automáticamente a rojo.
2. **Modificar o liberar un número vendido**: Toca un número rojo para ver los datos del comprador, cambiar su nombre o presionar **"Liberar este número"** si se canceló la compra.
3. **Cambiar la vista**: Usa el selector superior para alternar entre:
   * **📱 10x10 (Ver todos)**: Ideal para ver el panorama completo de los 100 números sin scroll.
   * **🔍 5 columnas**: Ideal para leer con comodidad los nombres de los compradores en cada número.
4. **Compartir el estado de la rifa**:
   * Presiona el botón azul **"Compartir"** en el encabezado.
   * Selecciona **"Descargar / Compartir Imagen"** para enviar la imagen PNG a WhatsApp con la vista limpia de los números libres y vendidos.
   * O selecciona **"Enviar Lista por WhatsApp"** para enviar el listado en formato texto.
5. **Instalar en el celular**:
   * En Android, toca **"Instalar Ahora con 1 Toque"** en el cartel que aparece abajo al entrar.
   * En iPhone, sigue la indicación en pantalla: toca el botón Compartir de Safari y selecciona *Agregar a pantalla de inicio*.
6. **Reiniciar la rifa**: Usa el botón circular de reinicio en el encabezado (requiere confirmación para evitar borrados accidentales).

---

## ❓ Preguntas Frecuentes (FAQ)

#### ¿Dónde se guardan los datos?
Los datos se almacenan en el `localStorage` del navegador del dispositivo donde se usa la aplicación. No requiere conexión a internet ni cuenta de usuario para guardarse.

#### Si le paso el link de la página a otra persona, ¿ve mis datos?
`localStorage` es privado y local para cada teléfono. Si otra persona abre el enlace en su propio celular, verá un talonario vacío. Por esta razón, la forma recomendada para mostrar el avance de la rifa a tus clientes es mediante el botón **"Compartir Imagen PNG"** o **"Enviar Lista por WhatsApp"**.

*(Si en el futuro deseas que varios administradores colaboren y sincronicen la misma rifa en tiempo real desde teléfonos distintos, se puede conectar a una base de datos en la nube como Firebase o Supabase).*

#### ¿Funciona sin internet?
**Sí.** Al instalarse como PWA, el Service Worker descarga los archivos en la memoria del celular, permitiendo abrir y utilizar la aplicación sin conexión de datos ni Wi-Fi.

---

Desarrollado con ❤️ para una gestión de rifas moderna, táctil y eficiente.
