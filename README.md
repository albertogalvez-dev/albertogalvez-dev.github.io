# Portfolio de Alberto Gálvez

Portfolio personal construido con Astro y publicado en https://albertogalvez-dev.github.io/ mediante GitHub Pages.

## Desarrollo

Requiere Node.js 22.12 o posterior.

```sh
npm ci
npm run dev
```

La vista local se abre en `http://localhost:4321/`.

```sh
npm run build
npm run preview
```

## Contenido

- `src/content/projects/`: fichas de proyectos en español e inglés, tecnologías y enlaces.
- `src/components/ProjectCard.astro`: cards compactas con logo, nombre, acceso al detalle y web cuando está disponible.
- `src/components/PhotosCarousel.astro`: fotografías del fondo.
- `src/pages/index.astro`: portada sin scroll, filtros y navegación entre proyectos.
- `src/pages/projects/[slug].astro`: páginas de detalle y capturas.
- `src/assets/projects/`: capturas optimizadas por Astro.
- `public/project-logos/` y `public/photos/`: logos y fotografías.

Los repositorios privados no se enlazan desde las fichas. Las demos solo se incluyen cuando hay un enlace público disponible; los proyectos en revisión se identifican en su descripción.

## Publicación

Al integrar cambios en `main`, `.github/workflows/deploy.yml` instala las dependencias, actualiza el nivel de idioma en el CV español, compila el sitio y despliega `dist/` en GitHub Pages. Los archivos temporales, dependencias y compilaciones locales se excluyen de Git.
