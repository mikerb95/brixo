<?php /** @var array $categories */ ?>
<?php /** @var array $taskers */ ?>
<?php /** @var string|null $activeCategory */ ?>

<?= $this->extend('layouts/main') ?>

<?= $this->section('content') ?>
  <div class="row gy-4 align-items-center mb-5">
    <div class="col-lg-7">
      <h1 class="display-6 fw-bold mb-2">Explora profesionales</h1>
      <p class="text-muted mb-0">Filtra por categoría para encontrar el profesional ideal.</p>
    </div>
  </div>

  <div class="mb-4 d-flex flex-wrap gap-2">
    <a href="/taskers" class="btn btn-sm rounded-pill <?= $activeCategory ? 'btn-outline-secondary' : 'btn-brand' ?>">Todas</a>
    <?php foreach ($categories as $category): ?>
      <?php $active = $activeCategory === $category['slug']; ?>
      <a href="/taskers?cat=<?= urlencode($category['slug']) ?>" class="btn btn-sm rounded-pill <?= $active ? 'btn-brand' : 'btn-outline-secondary' ?>">
        <?= htmlspecialchars($category['name'], ENT_QUOTES, 'UTF-8') ?>
      </a>
    <?php endforeach; ?>
  </div>

  <?php if (count($taskers) === 0): ?>
    <div class="alert alert-info rounded-4">No encontramos taskers en esta categoría. Prueba con otra.</div>
  <?php endif; ?>

  <div class="row g-4">
    <?php foreach ($taskers as $tasker): ?>
      <div class="col-md-6 col-lg-4">
        <div class="card border-0 shadow-sm rounded-4 h-100">
          <div class="card-body d-flex flex-column gap-3">
            <div>
              <h3 class="h5 mb-1"><?= htmlspecialchars($tasker['name'], ENT_QUOTES, 'UTF-8') ?></h3>
              <p class="text-muted small mb-0"><?= htmlspecialchars($tasker['bio'], ENT_QUOTES, 'UTF-8') ?></p>
            </div>
            <div class="d-flex justify-content-between align-items-center small text-muted">
              <span>Tarifa: <strong>$<?= number_format($tasker['hourlyRate'], 0, ',', '.') ?>/h</strong></span>
              <span>⭐ <?= number_format($tasker['rating'], 1) ?></span>
            </div>
            <div class="d-flex justify-content-between align-items-center small text-muted">
              <span><?= htmlspecialchars($tasker['city'] ?? 'Colombia', ENT_QUOTES, 'UTF-8') ?></span>
              <a href="/taskers/<?= urlencode($tasker['id']) ?>" class="btn btn-sm btn-brand rounded-pill">Ver perfil</a>
            </div>
          </div>
        </div>
      </div>
    <?php endforeach; ?>
  </div>

  <div class="mt-5 p-4 rounded-4 border bg-white shadow-sm text-center">
    <h2 class="h5">¿No encontraste la solución que buscabas?</h2>
    <p class="text-muted small mb-3">Cuéntanos los detalles de tu requerimiento y nosotros nos encargaremos de conectarte con el tasker adecuado.</p>
    <a class="btn btn-outline-primary rounded-pill" href="/contratar">Publicar tarea</a>
  </div>
<?= $this->endSection() ?>
