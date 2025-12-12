<?php

/**
 * Returns the importmap for this application.
 *
 * - "path" is a path inside the asset mapper system. Use the
 *     "debug:asset-map" command to see the full list of paths.
 *
 * - "entrypoint" (JavaScript only) set to true for any module that will
 *     be used as an "entrypoint" (and passed to the importmap() Twig function).
 *
 * The "importmap:require" command can be used to add new entries to this file.
 */
return [
    'app' => [
        'path' => './assets/app.js',
        'entrypoint' => true,
    ],
    '@hotwired/stimulus' => [
        'version' => '3.2.2',
    ],
    '@symfony/stimulus-bundle' => [
        'path' => './vendor/symfony/stimulus-bundle/assets/dist/loader.js',
    ],
    '@hotwired/turbo' => [
        'version' => '7.3.0',
    ],
    'bootstrap' => [
        'version' => '5.3.8',
    ],
    '@popperjs/core' => [
        'version' => '2.11.8',
    ],
    'bootstrap/dist/css/bootstrap.min.css' => [
        'version' => '5.3.8',
        'type' => 'css',
    ],
    'imask' => [
        'version' => '7.6.1',
    ],
    '@orchidjs/sifter' => [
        'version' => '1.1.0',
    ],
    '@orchidjs/unicode-variants' => [
        'version' => '1.1.2',
    ],
    'tom-select/dist/css/tom-select.default.min.css' => [
        'version' => '2.4.3',
        'type' => 'css',
    ],
    'choices.js' => [
        'version' => '11.1.0',
    ],
    'choices.js/public/assets/styles/choices.min.css' => [
        'version' => '11.1.0',
        'type' => 'css',
    ],
    'flatpickr' => [
        'version' => '4.6.13',
    ],
    'flatpickr/dist/flatpickr.min.css' => [
        'version' => '4.6.13',
        'type' => 'css',
    ],
    'flatpickr/dist/l10n/fr.js' => [
        'version' => '4.6.13',
    ],
    'codemirror/addon/edit/continuelist.js' => [
        'version' => '5.65.18',
    ],
    'codemirror/addon/display/fullscreen.js' => [
        'version' => '5.65.18',
    ],
    'codemirror/mode/markdown/markdown.js' => [
        'version' => '5.65.18',
    ],
    'codemirror/addon/mode/overlay.js' => [
        'version' => '5.65.18',
    ],
    'codemirror/addon/display/placeholder.js' => [
        'version' => '5.65.18',
    ],
    'codemirror/addon/display/autorefresh.js' => [
        'version' => '5.65.18',
    ],
    'codemirror/addon/selection/mark-selection.js' => [
        'version' => '5.65.18',
    ],
    'codemirror/addon/search/searchcursor.js' => [
        'version' => '5.65.18',
    ],
    'codemirror/mode/gfm/gfm.js' => [
        'version' => '5.65.18',
    ],
    'codemirror/mode/xml/xml.js' => [
        'version' => '5.65.18',
    ],
    'codemirror/lib/codemirror.min.css' => [
        'version' => '5.65.18',
        'type' => 'css',
    ],
];
