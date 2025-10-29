<?php

namespace App\Controllers;

use CodeIgniter\HTTP\ResponseInterface;
use Config\Brixo;
use CodeIgniter\Exceptions\PageNotFoundException;
use function view;

class Taskers extends BaseController
{
    public function index(): string
    {
        $categories = Brixo::categories();
        $taskers = Brixo::taskers();

        $active = $this->request->getGet('cat');
        if ($active) {
            $taskers = array_values(array_filter($taskers, static function (array $tasker) use ($active) {
                return in_array($active, $tasker['skills'], true);
            }));
        }

    return \view('taskers/index', [
            'title' => 'Explora profesionales',
            'categories' => $categories,
            'taskers' => $taskers,
            'activeCategory' => $active,
        ]);
    }

    public function show(string $id)
    {
        $tasker = null;
        foreach (Brixo::taskers() as $item) {
            if ($item['id'] === $id) {
                $tasker = $item;
                break;
            }
        }

        if (! $tasker) {
            throw PageNotFoundException::forPageNotFound();
        }

    return \view('taskers/show', [
            'title' => $tasker['name'] . ' - Perfil Tasker',
            'tasker' => $tasker,
        ]);
    }
}
