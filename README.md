# RinDoor

### Que es RinDoor? 
rindoor es una aplicacion donde los profecionales se suscriben y pueden acceder a trabajos publicados por clientes, estos clientes publican sus necesidades de forma gratuita y pueden escoger el profesional que deseen dentro de los que se postularon para el trabajo.

### Tecnologías Utilizadas
Nextjs, Tailwind, Javacript, SweetAlert2, React-responsive, OAuth 2.0, Context, Vercel.

###Instalación
- git clone https://github.com/leandromortarini2/Rindoor-2.0.git
- npm install

### Guía de Uso
npm run dev

### Estructura del Proyecto
.
├── public
├── src
│   ├── components
│   ├── assets
│   ├── styles
│   ├── App
│   ├── globals.css
│   ├── layout.js
│   └── page.js
└── package.json

### Deployment
https://rindoor-2-0.vercel.app/

### Contribución - Guía para Contribuidores
- clonar repositorio
- crear rama con nombre personal
- enviar pull requests.

#### Comandos para subir al repocitorio.
- git add .
- git commit -m "texto relacionado"
- git merge "nombre de la rama personal"
- git push origin "nombre de la rama personal"

### Herramientas Útiles
- JSDoc para generar documentación automáticamente a partir del código.
- README

### Codigo para obtener los datos del usuario desde el context
- import { useAuth } from "../context/Context";
- const { userData } = useAuth();
- console.log(userData)

### Codigo para obtener los datos del usuario desde OAuth.
- import { useSession } from "next-auth/react";
- const { data: session } = useSession();
- console.log(session);



