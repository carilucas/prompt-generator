# 10 Prompt Generator

Aplicación web para generar y gestionar prompts para LinkedIn. Construida con Next.js, Prisma y PostgreSQL.

## Requisitos Previos

- Node.js 20+
- Docker y Docker Compose
- PostgreSQL (local o cloud)

## Configuración del Entorno

1. Clonar el repositorio:

```bash
git clone <repo-url>
cd 10-prompt-generator
```

2. Instalar dependencias:

```bash
npm install
```

3. Configurar variables de entorno:

```bash
cp .env.example .env
```

Edita `.env` con tus valores:

```env
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/promptgenerator"
NEXT_PUBLIC_API_URL="http://localhost:3000"
RESEND_API_KEY="tu_api_key_de_resend"
```

## Desarrollo

### 1. Iniciar la base de datos (Docker)

```bash
docker-compose up -d
```

Esto inicia un contenedor PostgreSQL en el puerto 5432.

### 2. Ejecutar migraciones de Prisma

```bash
npx prisma migrate dev --name init
```

### 3. Iniciar el servidor de desarrollo

```bash
npm run dev
```

La aplicación estará disponible en: http://localhost:3000

## Construcción (Build)

### Desarrollo

```bash
npm run build
```

### Producción

1. Generar el cliente de Prisma:

```bash
npx prisma generate
```

2. Construir la aplicación:

```bash
npm run build
```

3. Iniciar en producción:

```bash
npm run start
```

## Despliegue

### Render / VPS

1. Configurar variables de entorno en el proveedor:
   - `DATABASE_URL`: URL de PostgreSQL (Render, Supabase, Neon, etc.)
   - `RESEND_API_KEY`: Clave de API de Resend

2. Ejecutar migraciones:

```bash
npx prisma migrate deploy
```

3. Construir y iniciar:

```bash
npm run build
npm run start
```

### Vercel (Recomendado)

1. Conectar el repositorio a Vercel
2. Configurar las variables de entorno en el panel de Vercel
3. Deploy automático en cada push a main

## Comandos Disponibles

| Comando             | Descripción                    |
| ------------------- | ------------------------------ |
| `npm run dev`       | Iniciar servidor de desarrollo |
| `npm run build`     | Construir aplicación           |
| `npm run start`     | Iniciar en producción          |
| `npm run lint`      | Ejecutar linter                |
| `npx prisma studio` | Abrir GUI de Prisma            |

## Estructura del Proyecto

```
├── prisma/              # Schema y migraciones de BD
├── src/
│   ├── app/             # App Router de Next.js
│   ├── components/      # Componentes React
│   ├── lib/            # Utilidades y lógica de negocio
│   └── data.ts         # Datos estáticos
├── docker-compose.yml  # Configuración de PostgreSQL
└── package.json        # Dependencias del proyecto
```

## Licencia

MIT

## Test user

```
user: test@test1.com
pass: 123456

```
