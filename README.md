# Gestor de Tareas (Frontend)

Este repositorio contiene la aplicación frontend de un “Gestor de Tareas” desarrollada con Vite, React, TypeScript y MUI. A continuación encontrarás una descripción de las tecnologías, la arquitectura, la estructura de carpetas y las instrucciones detalladas para levantar y testear el proyecto.

---

## 📦 Tecnologías

- **Vite** — Bundler y servidor de desarrollo ultrarrápido  
- **React 18** — Librería para construir interfaces de usuario  
- **TypeScript** — Superset de JavaScript con tipado estático  
- **MUI (Material-UI)** — Componentes React con estilo Material Design  
- **React Router DOM** — Enrutamiento declarativo  
- **Axios / fetch** — Cliente HTTP para consumo de API REST  

**Testing**  
- **Jest + ts-jest** — Framework de tests unitarios  
- **React Testing Library** — Testing de componentes React  
- **MSW (Mock Service Worker)** — Mocking de llamadas HTTP en tests  
- **Cypress** — Tests de integración (E2E)  

---

## 🏗 Arquitectura

1. **Pages**  
   - Carpeta `src/pages/` con cada vista principal (Login, TaskList, etc.).  
2. **Components**  
   - Carpeta `src/components/` para componentes reutilizables (formularios, botones, layouts).  
3. **Services**  
   - Carpeta `src/services/` que encapsula la lógica de llamadas a la API (`auth.ts`, `task.ts`).   
4. **Tests**  
   - **Unitarios** en `src/__tests__/`  
   - **E2E** en `cypress/e2e/`  

---

## 📁 Estructura de carpetas

```
/
├── public/                   # Archivos estáticos
├── src/
│   ├── components/           # Componentes reutilizables
│   ├── context/              # React Context (opcional)
│   ├── pages/                # Vistas principales (Login, TaskList, …)
│   ├── services/             # Llamadas a API (auth.ts, task.ts)
│   ├── __tests__/            # Tests unitarios con Jest + RTL
│   │   ├── Login.test.tsx
│   │   └── TaskList.test.tsx
│   ├── setupTests.ts         # Configuración Jest (jest-dom)
│   └── main.tsx              # Punto de entrada de la aplicación
├── cypress/
│   └── e2e/
│       └── app.cy.ts         # Tests de integración E2E
├── vite.config.ts            # Configuración de Vite
├── cypress.config.ts         # Configuración de Cypress
├── jest.config.ts            # Configuración de Jest + ts-jest
├── package.json
└── tsconfig.json
```

---

## ⚙️ Instalación y puesta en marcha

1. Clonar el repositorio  
   ```bash
   git clone <url-del-repo>.git
   cd <nombre-del-repo>
   ```

2. Instalar dependencias (Node ≥ 16.x)  
   ```bash
   npm install
   # o
   yarn install
   ```

3. Crear archivo de entorno (opcional)  
   ```env
   # .env
   VITE_API_BASE_URL=http://localhost:8080/api
   ```

4. Iniciar servidor de desarrollo  
   ```bash
   npm run dev
   # o
   yarn dev
   ```

5. Abrir en el navegador  
   ```
   http://localhost:5173
   ```

> **Nota:** Asegúrate de que el backend (Java 21) esté corriendo y exponiendo los endpoints `/auth/login` y `/tareas` en la URL definida en `VITE_API_BASE_URL`.

---

## 🧪 Testing

### 1. Tests unitarios (Jest + React Testing Library)

```bash
npm run test
# o
yarn test
```

- Busca archivos `*.test.tsx` en `src/__tests__/`.
- Mockea servicios HTTP con Jest y MSW.

### 2. Tests de integración (Cypress E2E)

- **Abrir interfaz de Cypress**  
  ```bash
  npm run cy:open
  # o
  yarn cy:open
  ```
- **Ejecutar en modo headless**  
  ```bash
  npm run cy:run
  # o
  yarn cy:run
  ```

Los specs E2E se encuentran en `cypress/e2e/` y simulan flujos reales de usuario (login → ver tareas).

---

## 📦 Construcción para producción

```bash
npm run build
# o
yarn build
```

- Genera la carpeta `dist/` optimizada para deploy.
- Puedes servirla con cualquier servidor estático o integrarla al backend Java.

---

## 🤝 Contribuir

1. Hacer un _fork_ del proyecto.  
2. Crear una rama con tu feature:  
   ```bash
   git checkout -b feature/nombre-feature
   ```
3. Hacer commits claros y descriptivos.  
4. Abrir un _pull request_ describiendo los cambios.

---

## 📄 Licencia

Este proyecto está bajo la [MIT License](LICENSE).
