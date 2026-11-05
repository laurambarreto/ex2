document.addEventListener ("DOMContentLoaded", function(){
    const container = document.getElementById ('light-grid');

    const x = [-5, 5];
    const z = [-5, 0, 5];
    const y = 4.9;

    x.forEach(x => {
        z.forEach (z => {
            const entity = document.createElement ('a-entity');
            entity.setAttribute('position', `${x} ${y} ${z}`);

            const sphere = document.createElement ('a-sphere');
            sphere.setAttribute('radius', '0.15');
            sphere.setAttribute('material', 'color: #ffaa33; emissive: #ffaa33; emissiveIntensity: 2.5');

            const light = document.createElement ('a-light');
            light.setAttribute ('type', 'point');
            light.setAttribute('color', '#ffaa33');
            light.setAttribute('intensity', '1.8');
            light.setAttribute('distance', '14');
            light.setAttribute('decay', '2');

            entity.appendChild (sphere);
            entity.appendChild (light);
            container.appendChild (entity);
        })
    })
});