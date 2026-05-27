---
title: "Helpdesk MVP"
tagline: "B2B IT Remote Support Platform"
tagline_en: "B2B IT Remote Support Platform"
type: "Personal"
type_en: "Personal"
category: "fullstack"
year: "2026"
summary: "Plataforma multi-tenant de helpdesk para soporte IT B2B remoto. SLAs configurables, roles, tickets en tiempo real y portal de cliente self-service."
summary_en: "Multi-tenant helpdesk platform for remote B2B IT support. Configurable SLAs, role-based access, real-time tickets and self-service customer portal."
problem: "Los equipos de soporte IT B2B necesitan una herramienta moderna que aislé clientes por workspace (multi-tenant), permita roles (admin/agent/customer), gestione el ciclo completo del ticket con SLAs configurables y escalado automático, y separe la consola del agente del portal del cliente."
build: "FastAPI Python 3.11 como API REST (OpenAPI auto-docs) con módulos por feature (auth, tickets, sla, etc.). Frontend React 18 + Vite + TailwindCSS dividido en Agent Console y Customer Portal. PostgreSQL 15 como datastore principal, Redis 7 para sesiones + job queue (RQ), APScheduler para chequeos SLA periódicos. Todo dockerizado."
stack: ["Python", "FastAPI", "React", "Vite", "TypeScript", "TailwindCSS", "PostgreSQL", "Redis", "RQ", "Docker"]
cover: "../../assets/projects/helpdesk-agent-inbox.png"
gallery:
  - "../../assets/projects/helpdesk-agent-inbox.png"
  - "../../assets/projects/helpdesk-agent-admin-slas.png"
  - "../../assets/projects/helpdesk-agent-reports.png"
  - "../../assets/projects/helpdesk-agent-admin-users.png"
  - "../../assets/projects/helpdesk-home.png"
  - "../../assets/projects/helpdesk-login.png"
accent: "#c14515"
accent2: "#8c2a17"
repo: "https://github.com/albertogalvez-dev/helpdesk-mvp"
logoIcon: "ticket"
order: 7
---

Plataforma B2B con arquitectura multi-tenant para equipos de soporte IT que dan servicio a múltiples clientes desde un solo backoffice. SLAs configurables por workspace, alertas de escalado, portal de cliente self-service, agent console con bandeja unificada, reportes y analítica.
