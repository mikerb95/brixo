<?php /** @var array $tasker */ ?>

<?= $this->extend('layouts/main') ?>

<?= $this->section('content') ?>
  <div class="row gy-4">
    <div class="col-lg-8">
      <div class="card border-0 shadow-sm rounded-4 mb-4">
        <div class="card-body p-4">
          <a href="/taskers" class="text-decoration-none text-primary small">← Volver</a>
          <h1 class="h3 mt-2 mb-1"><?= htmlspecialchars($tasker['name'], ENT_QUOTES, 'UTF-8') ?></h1>
          <p class="text-muted mb-0">⭐ <?= number_format($tasker['rating'], 1) ?> · <?= htmlspecialchars($tasker['city'] ?? 'Colombia', ENT_QUOTES, 'UTF-8') ?></p>
        </div>
      </div>

      <div class="card border-0 shadow-sm rounded-4 mb-4">
        <div class="card-body p-4">
          <h2 class="h5 mb-3">Acerca de</h2>
          <p class="mb-0"><?= nl2br(htmlspecialchars($tasker['bio'], ENT_QUOTES, 'UTF-8')) ?></p>
        </div>
      </div>

      <div class="card border-0 shadow-sm rounded-4 mb-4">
        <div class="card-body p-4">
          <h2 class="h5 mb-3">Habilidades</h2>
          <div class="d-flex flex-wrap gap-2">
            <?php foreach ($tasker['skills'] as $skill): ?>
              <span class="badge bg-light text-dark border rounded-pill">
                <?= htmlspecialchars($skill, ENT_QUOTES, 'UTF-8') ?>
              </span>
            <?php endforeach; ?>
          </div>
        </div>
      </div>
    </div>

    <div class="col-lg-4">
      <div class="card border-0 shadow-sm rounded-4 mb-4">
        <div class="card-body p-4">
          <h2 class="h5 mb-3">Reserva en línea</h2>
          <p class="mb-1 small text-muted">Tarifa por hora</p>
          <p class="h4 mb-3">$<?= number_format($tasker['hourlyRate'], 0, ',', '.') ?> COP</p>
          <a class="btn btn-brand w-100 rounded-pill" href="/reservar/<?= urlencode($tasker['id']) ?>">Reservar ahora</a>
        </div>
      </div>

      <div class="card border-0 shadow-sm rounded-4">
        <div class="card-body p-4">
          <h2 class="h6 text-uppercase text-muted mb-3">¿Necesitas ayuda?</h2>
          <p class="small text-muted">Nuestro equipo puede ayudarte a definir tu proyecto y encontrar el tasker ideal.</p>
          <a class="btn btn-outline-secondary rounded-pill w-100" href="/contratar">Publicar tarea</a>
        </div>
      </div>
    </div>
  </div>
<?= $this->endSection() ?>
