# Cairo en los Andes — Festival Website

Sitio web del festival "Cairo en los Andes" con sistema de autenticación de participantes, integración con Google Sheets, y recuperación de contraseña.

## Tecnologías

- **Frontend:** React 19 + Vite + Tailwind CSS 4 + Wouter (router)
- **Backend:** Netlify Functions (serverless)
- **Base de datos:** Turso (SQLite en la nube)
- **Autenticación:** JWT con bcrypt
- **Datos:** Google Sheets API v4

## Estructura del proyecto

```
cairo-netlify/
├── client/                    # Frontend React
│   ├── src/
│   │   ├── pages/             # Páginas (Home, Maestros, MiCuenta, etc.)
│   │   ├── components/        # Componentes reutilizables
│   │   ├── contexts/          # Contextos React (idioma, tema)
│   │   ├── lib/               # API client, traducciones, utilidades
│   │   └── App.tsx            # Router principal
│   └── index.html
├── netlify/
│   └── functions/
│       ├── api.ts             # Función principal (maneja todas las rutas /api/*)
│       └── lib/               # Helpers del backend
│           ├── db.ts          # Conexión a Turso
│           ├── auth.ts        # JWT y cookies
│           ├── sheets.ts      # Google Sheets API
│           ├── participantDb.ts  # CRUD de participantes
│           ├── passwordReset.ts  # Tokens de recuperación
│           └── response.ts    # Helpers de respuesta HTTP
├── shared/                    # Constantes compartidas
├── netlify.toml               # Configuración de Netlify
├── vite.config.ts             # Configuración de Vite
└── package.json
```

## Despliegue en Netlify

### Paso 1: Subir a GitHub

```bash
# En tu computadora, cloná el repo vacío
git clone https://github.com/cairoandes/cairo-en-los-andes.git
cd cairo-en-los-andes

# Copiá todos los archivos del ZIP dentro de esta carpeta
# (asegurate de que netlify.toml quede en la raíz)

git add .
git commit -m "Initial commit - Cairo en los Andes"
git push origin main
```

### Paso 2: Conectar con Netlify

1. Andá a [app.netlify.com](https://app.netlify.com)
2. Hacé clic en **"Add new site" > "Import an existing project"**
3. Elegí **GitHub** y seleccioná el repo `cairoandes/cairo-en-los-andes`
4. Netlify detectará automáticamente la configuración del `netlify.toml`
5. Hacé clic en **"Deploy site"**

### Paso 3: Configurar variables de entorno

En Netlify, andá a **Site settings > Environment variables** y agregá:

| Variable | Valor |
|---|---|
| `TURSO_DATABASE_URL` | `libsql://cairo-festival-cairoandes.aws-us-east-1.turso.io` |
| `TURSO_AUTH_TOKEN` | Tu token de Turso |
| `JWT_SECRET` | Un string aleatorio largo (generá uno con `openssl rand -hex 32`) |
| `GOOGLE_API_KEY` | Tu API key de Google |
| `GOOGLE_SHEET_ID` | `1-Ml74ABa2UkFxiDr6NqNNEXoRJD-Fuzwk_TziMntLN0` |
| `GOOGLE_SHEET_NAME` | `06_INSCRIPCIONES` |

### Paso 4: Inicializar la base de datos

Después del primer deploy, visitá esta URL una sola vez para crear las tablas:

```
https://tu-sitio.netlify.app/api/init-db
```

Deberías ver: `{"success": true, "message": "Database tables created"}`

### Paso 5: Re-deploy

Después de configurar las variables de entorno, hacé un re-deploy desde el dashboard de Netlify:
**Deploys > Trigger deploy > Deploy site**

## Funcionalidades

### Mi Cuenta (Participantes)
- Registro con email y contraseña
- Login con sesión persistente (JWT en cookie)
- Dashboard con datos del Google Sheet (nombre, paquete, competencia, participaciones, pagado, saldo)
- Indicador visual de estado de pago (completo/parcial/pendiente)

### Recuperación de contraseña
- El participante solicita un reset desde "¿Olvidaste tu contraseña?"
- Se genera un enlace con token temporal (válido 1 hora)
- El enlace aparece en los logs de Netlify Functions (Functions > Logs)
- El administrador copia el enlace y se lo envía al participante por WhatsApp
- El participante abre el enlace y elige nueva contraseña

### Bilingüe
- Todo el sitio soporta Español e Inglés
- Selector de idioma flotante en la esquina inferior

## Desarrollo local

```bash
npm install
npm run dev
```

Para probar las funciones localmente, necesitás el CLI de Netlify:

```bash
npm install -g netlify-cli
netlify dev
```

Esto levanta el frontend en el puerto 8888 con las funciones disponibles en `/api/*`.

## API Endpoints

| Método | Ruta | Descripción |
|---|---|---|
| POST | `/api/register` | Registrar nueva cuenta |
| POST | `/api/login` | Iniciar sesión |
| GET | `/api/me` | Obtener sesión actual |
| POST | `/api/logout` | Cerrar sesión |
| GET | `/api/my-data` | Obtener datos del Google Sheet |
| POST | `/api/request-reset` | Solicitar reset de contraseña |
| GET | `/api/verify-reset?token=...` | Verificar token de reset |
| POST | `/api/reset-password` | Cambiar contraseña con token |
| GET | `/api/init-db` | Crear tablas (una sola vez) |
