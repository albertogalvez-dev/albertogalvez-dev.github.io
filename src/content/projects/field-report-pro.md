---
title: "Field Report Pro"
tagline: "App Android offline-first de reportes de incidencias"
tagline_en: "Offline-first Android field incident reporting app"
type: "Personal"
type_en: "Personal"
category: "mobile"
year: "2026"
summary: "App Android nativa para reportes de incidencias en campo con almacenamiento offline-first, fotos con anotaciones, cola de sincronización y screenshots deterministas con Paparazzi."
summary_en: "Native Android app for field incident reports with offline-first storage, photo annotations, sync queue and deterministic screenshots via Paparazzi."
problem: "Operarios en campo trabajan sin cobertura constante. Necesitan crear reportes, adjuntar fotos (cámara o galería) con posibilidad de anotar (círculos/flechas/rectángulos), guardar todo localmente y sincronizar cuando vuelve la conectividad — sin perder ningún dato y con feedback claro de progreso."
build: "Android nativo con Kotlin. Almacenamiento Room para reports/attachments/timeline, DataStore para settings, WorkManager para la cola de sync con progreso visible. Hasta 3 fotos por reporte con anotación que guarda PNG anotado. Arquitectura MVVM + Repository. Pipeline de screenshots determinista con Paparazzi para QA visual."
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
order: 9
---

App nativa Android con CI en GitHub Actions. Diseñada para entornos sin cobertura: todo se guarda local primero, luego se sincroniza automáticamente. Tests visuales deterministas, soporte light/dark, anotación in-app sobre las fotos.
