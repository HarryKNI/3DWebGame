import Stats from 'https://unpkg.com/three@0.169.0/examples/jsm/libs/stats.module.js';

let stats

stats = new Stats();
document.body.appendChild( stats.dom );

export function stats()
{
    stats.update();
}