---
title: "QUEUE!"
tagline: "Healthcare Queue & Triage SaaS"
tagline_en: "Healthcare Queue & Triage SaaS"
type: "Personal"
type_en: "Personal"
category: "fullstack"
year: "2026"
summary: "Sistema de gestión de colas para centros sanitarios con ecosistema multi-rol (Kiosk, Operator, TV Display, Admin) y actualizaciones en tiempo real."
summary_en: "Healthcare queue management system with multi-role ecosystem (Kiosk, Operator, TV Display, Admin) and real-time updates."
problem: "Centros sanitarios necesitan gestionar colas con varios roles simultáneos: kiosko táctil para pacientes que sacan ticket con DNI, consola para operadores que llaman/atienden/terminan, pantalla TV de sala de espera con avisos por voz, panel admin con analítica. Todo en tiempo real, sin pausas perceptibles."
build: "Frontend Vite + TypeScript en arquitectura Multi-Page App (cada rol es una página independiente) con TailwindCSS. Backend ASP.NET Core 8 Minimal API + Entity Framework Core. PostgreSQL dockerizado. Server-Sent Events (SSE) para updates en tiempo real. Nginx como reverse proxy. Modo híbrido: arranca standalone (mocked) o integrado con API .NET. Tests E2E con Playwright + xUnit + GitHub Actions CI."
stack: ["TypeScript", "Vite", "TailwindCSS", "ASP.NET Core 8", "C#", "EF Core", "PostgreSQL", "Docker", "Nginx", "Playwright"]
cover: "../../assets/projects/queue-landing.png"
gallery:
  - "../../assets/projects/queue-landing.png"
  - "../../assets/projects/queue-kiosco.png"
  - "../../assets/projects/queue-operador.png"
  - "../../assets/projects/queue-tv.png"
  - "../../assets/projects/queue-analitica.png"
accent: "#6c5ce7"
accent2: "#4834d4"
repo: "https://github.com/albertogalvez-dev/QUEUE"
logoIcon: "users"
order: 10
---

Demo SaaS healthcare. Kiosk con reconocimiento de DNI y selección de servicio, operator console con triaje por prioridad, TV display con "ahora atendiendo" + voz, dashboard analítico con SSE en vivo. Arquitectura híbrida que corre con mocks o contra la API .NET real.
