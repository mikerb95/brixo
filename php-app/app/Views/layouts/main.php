<!doctype html>
<html lang="es">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
  <title><?= htmlspecialchars($title ?? 'Brixo', ENT_QUOTES, 'UTF-8') ?></title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-QWTKZyjpPEjISv5WaRU9OFeRpok6YctnYmDr5pNlyT2bRjXh0JMhjY6hW+ALEwIH" crossorigin="anonymous">
    <link rel="stylesheet" href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css" integrity="sha256-o9N1j7kGStb6ZTdrx0Z0AhdpK7UJY1+1f9dS+5LEeJo=" crossorigin="">
    <style>
      body {
        font-family: "Inter", "Segoe UI", system-ui, -apple-system, sans-serif;
        background-color: #f8fafc;
        color: #1f2937;
      }
      .navbar-brand {
        font-weight: 800;
        letter-spacing: -0.025em;
      }
      .btn-brand {
        background-color: #0ea5e9;
        border-color: #0ea5e9;
        color: #fff;
      }
      .btn-brand:hover {
        background-color: #0284c7;
        border-color: #0284c7;
        color: #fff;
      }
      footer {
        background-color: rgba(255, 255, 255, 0.92);
        backdrop-filter: blur(12px);
        border-top: 1px solid rgba(148, 163, 184, 0.25);
      }
    </style>
    <?= $this->renderSection('head') ?>
  </head>
  <body>
    <header class="sticky-top shadow-sm bg-white/90" style="backdrop-filter: blur(10px); border-bottom: 1px solid rgba(148,163,184,0.25);">
      <nav class="navbar navbar-expand-lg py-3">
        <div class="container">
          <a class="navbar-brand text-primary" href="/">Brixo</a>
          <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarMain" aria-controls="navbarMain" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
          </button>
          <div class="collapse navbar-collapse" id="navbarMain">
            <ul class="navbar-nav me-auto mb-2 mb-lg-0">
              <li class="nav-item">
                <a class="nav-link" href="/taskers">Explorar</a>
              </li>
              <li class="nav-item">
                <a class="nav-link" href="/mapa">Explorar mapa</a>
              </li>
              <li class="nav-item">
                <a class="nav-link" href="/profesionales">Ser Tasker</a>
              </li>
            </ul>
            <div class="d-flex gap-2">
              <a class="btn btn-outline-secondary rounded-pill d-flex align-items-center gap-2" href="/login">
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M12 12a4 4 0 1 0 0-8 4 4 0 0 0 0 8Z"/>
                  <path d="M6 20v-1c0-2.21 2.686-4 6-4s6 1.79 6 4v1"/>
                </svg>
                Iniciar sesión
              </a>
              <a class="btn btn-outline-primary rounded-pill" href="/contratar">Publicar tarea</a>
            </div>
          </div>
        </div>
      </nav>
    </header>

    <main class="py-5">
      <div class="container">
        <?= $this->renderSection('content') ?>
      </div>
    </main>

    <footer class="pt-5 pb-4">
      <div class="container">
        <div class="row gy-4">
          <div class="col-6 col-md-3">
            <h6 class="fw-semibold text-uppercase text-muted">Categorías</h6>
            <ul class="list-unstyled small">
              <li><a class="link-body-emphasis" href="/taskers?cat=obra">Obra</a></li>
              <li><a class="link-body-emphasis" href="/taskers?cat=carpinteria">Carpintería</a></li>
              <li><a class="link-body-emphasis" href="/taskers?cat=plomeria">Plomería</a></li>
              <li><a class="link-body-emphasis" href="/taskers?cat=electricidad">Electricidad</a></li>
              <li><a class="link-body-emphasis" href="/taskers?cat=pintura">Pintura</a></li>
            </ul>
          </div>
          <div class="col-6 col-md-3">
            <h6 class="fw-semibold text-uppercase text-muted">Descubrir</h6>
            <ul class="list-unstyled small">
              <li><a class="link-body-emphasis" href="/taskers">Explorar profesionales</a></li>
              <li><a class="link-body-emphasis" href="/contratar">Publicar tarea</a></li>
              <li><a class="link-body-emphasis" href="/profesionales">Ser Tasker</a></li>
              <li><a class="link-body-emphasis" href="/servicios">Servicios predefinidos</a></li>
            </ul>
          </div>
          <div class="col-6 col-md-3">
            <h6 class="fw-semibold text-uppercase text-muted">Soporte</h6>
            <ul class="list-unstyled small">
              <li><a class="link-body-emphasis" href="/faq">Preguntas frecuentes</a></li>
              <li><a class="link-body-emphasis" href="/contacto">Contacto</a></li>
              <li><a class="link-body-emphasis" href="/checkout">Pagos (demo)</a></li>
            </ul>
          </div>
          <div class="col-6 col-md-3">
            <h6 class="fw-semibold text-uppercase text-muted">Empresa</h6>
            <ul class="list-unstyled small">
              <li><a class="link-body-emphasis" href="/about">Acerca de</a></li>
              <li><a class="link-body-emphasis" href="/legal">Términos</a></li>
              <li><a class="link-body-emphasis" href="/legal/privacidad">Privacidad</a></li>
              <li><a class="link-body-emphasis" href="/legal/limitaciones">Limitaciones de responsabilidad</a></li>
            </ul>
          </div>
        </div>
        <hr class="my-4">
        <div class="d-flex flex-column flex-md-row align-items-center justify-content-between small text-muted">
          <p class="mb-0">© <?= date('Y') ?> Brixo</p>
          <div class="d-flex gap-3">
            <a class="link-secondary" href="/legal">Términos</a>
            <a class="link-secondary" href="/legal/privacidad">Privacidad</a>
            <a class="link-secondary" href="/legal/limitaciones">Limitaciones</a>
          </div>
        </div>
      </div>
    </footer>

    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js" integrity="sha384-YvpcrYf0tY3lHB60NNkmXc5s9fDVZLESaAA55NDzOxhy9GkcIdslK1eN7N6jIeHz" crossorigin="anonymous"></script>
    <?= $this->renderSection('scripts') ?>
  </body>
</html>
