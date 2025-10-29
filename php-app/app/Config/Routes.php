<?php

use CodeIgniter\Router\RouteCollection;

/**
 * @var RouteCollection $routes
 */
$routes->get('/', 'Home::index');
$routes->get('taskers', 'Taskers::index');
$routes->get('taskers/(:segment)', 'Taskers::show/$1');
