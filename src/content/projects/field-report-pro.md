---
title: "Field Report Pro"
logo: "/project-logos/field-report-pro.svg"
tagline: "App Android offline-first de reportes de incidencias"
tagline_en: "Offline-first Android field incident reporting app"
type: "Personal"
type_en: "Personal"
category: "mobile"
year: "2026"
summary: "App Android nativa para reportes de incidencias en campo con almacenamiento offline-first, fotos con anotaciones, cola de sincronización y screenshots deterministas con Paparazzi."
summary_en: "Native Android app for field incident reports with offline-first storage, photo annotations, sync queue and deterministic screenshots via Paparazzi."
problem: "Operarios en campo trabajan sin cobertura constante. Necesitan crear reportes, adjuntar fotos (cámara o galería) con posibilidad de anotar (círculos/flechas/rectángulos), guardar todo localmente y sincronizar cuando vuelve la conectividad — sin perder ningún dato y con feedback claro de progreso."
problem_en: "Field workers do not have continuous coverage. They need to create reports, attach photos from camera or gallery, annotate them, store everything locally and synchronise when connectivity returns—without losing data and with clear progress feedback."
build: "Android nativo con Kotlin. Almacenamiento Room para reports/attachments/timeline, DataStore para settings, WorkManager para la cola de sync con progreso visible. Hasta 3 fotos por reporte con anotación que guarda PNG anotado. Arquitectura MVVM + Repository. Pipeline de screenshots determinista con Paparazzi para QA visual."
build_en: "A native Kotlin Android app. Room stores reports, attachments and timelines; DataStore manages settings; WorkManager runs the sync queue with visible progress. Up to three photos per report can be annotated and saved as a marked-up PNG. MVVM plus Repository architecture, with a deterministic Paparazzi screenshot pipeline for visual QA."
stack: ["Kotlin", "Android", "Room", "DataStore", "WorkManager", "Paparazzi", "MVVM"]
cover: "../../assets/projects/field-home_light.png"
gallery:
  - "../../assets/projects/field-home_light.png"
  - "../../assets/projects/field-form.png"
  - "../../assets/projects/field-detail.png"
  - "../../assets/projects/field-sync.png"
  - "../../assets/projects/field-annotate_dark.png"
  - "../../assets/projects/field-settings_dark.png"
  - "../../assets/projects/field-home_dark.png"
  - "../../assets/projects/field-empty_state.png"
accent: "#14b8a6"
accent2: "#0f766e"
repo: "https://github.com/albertogalvez-dev/field-report-pro"
logoIcon: "clipboard"
order: 11
---

App nativa Android con CI en GitHub Actions. Diseñada para entornos sin cobertura: todo se guarda local primero, luego se sincroniza automáticamente. Tests visuales deterministas, soporte light/dark, anotación in-app sobre las fotos.
