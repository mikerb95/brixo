<?php

namespace Config;

class Brixo
{
    public static function categories(): array
    {
        return [
            ['slug' => 'obra', 'name' => 'Obra', 'description' => 'Construcción, acabados y remodelaciones.'],
            ['slug' => 'carpinteria', 'name' => 'Carpintería', 'description' => 'Muebles, puertas, armarios y más.'],
            ['slug' => 'plomeria', 'name' => 'Plomería', 'description' => 'Instalaciones y reparaciones de agua y gas.'],
            ['slug' => 'electricidad', 'name' => 'Electricidad', 'description' => 'Instalaciones eléctricas y mantenimiento.'],
            ['slug' => 'pintura', 'name' => 'Pintura', 'description' => 'Pintura interior y exterior.'],
            ['slug' => 'otros', 'name' => 'Otros', 'description' => 'Otros servicios para el hogar y negocio.'],
        ];
    }

    public static function taskers(): array
    {
        return [
            [
                'id' => 'tsk-001',
                'name' => 'Juan Pérez',
                'bio' => 'Especialista en plomería residencial y comercial con 10 años de experiencia.',
                'skills' => ['plomeria'],
                'hourlyRate' => 60000,
                'rating' => 4.8,
                'city' => 'Bogotá',
            ],
            [
                'id' => 'tsk-002',
                'name' => 'Carpintería Los Robles',
                'bio' => 'Fabricación e instalación de muebles a medida y restauración de madera.',
                'skills' => ['carpinteria'],
                'hourlyRate' => 75000,
                'rating' => 4.6,
                'city' => 'Medellín',
            ],
            [
                'id' => 'tsk-003',
                'name' => 'María Gómez',
                'bio' => 'Pintura interior/exterior con acabados finos y asesoría de color.',
                'skills' => ['pintura', 'obra'],
                'hourlyRate' => 65000,
                'rating' => 4.9,
                'city' => 'Cali',
            ],
            [
                'id' => 'tsk-004',
                'name' => 'Grupo Estructuras Andinas',
                'bio' => 'Cuadrilla completa para remodelaciones y obra gris.',
                'skills' => ['obra'],
                'hourlyRate' => 88000,
                'rating' => 4.7,
                'city' => 'Bogotá',
            ],
            [
                'id' => 'tsk-005',
                'name' => 'Electricistas 24/7',
                'bio' => 'Atención de emergencias y proyectos eléctricos comerciales.',
                'skills' => ['electricidad'],
                'hourlyRate' => 90000,
                'rating' => 4.9,
                'city' => 'Bogotá',
            ],
        ];
    }

    public static function testimonials(): array
    {
        return [
            ['quote' => 'Encontré un carpintero excelente y rápido. Todo quedó perfecto.', 'author' => 'Laura M.'],
            ['quote' => 'Reservé una pintora y en un día mi sala quedó como nueva.', 'author' => 'Carlos R.'],
            ['quote' => 'Súper práctico poder ver tarifas y calificaciones antes de reservar.', 'author' => 'Ana P.'],
        ];
    }
}
