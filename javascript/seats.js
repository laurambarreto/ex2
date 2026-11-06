// Função para adicionar as cadeiras do cenário à sala
AFRAME.registerComponent('cinema-seats', {
    schema: {
      startZ: { type: 'number', default: -9.7 }
    },
    init: function (){
        var el = this.el;
        var data = this.data;
        var xs = [-8.5, -6.0, -3.5, -1.0, 1.5, 4];
        var spacing = 1.05;
        var rows = 8;
        var riseY = 0.40;

        for (var r = 0; r < rows; r++){
            var y = riseY;
            var z = data.startZ + (r * spacing);
            for (var i = 0; i < xs.length; i++){
                y = (xs.length - i - 1) * riseY;
                var chair = document.createElement('a-entity');
                document.createElement ('a-entity');
                chair.setAttribute('gltf-model', '#cadeira');
                chair.setAttribute('position', xs[i] + ' ' + y + ' ' + z);
                chair.setAttribute('rotation', '0 180 0');
                chair.setAttribute('scale', '0.01 0.01 0.01');
                chair.setAttribute('static-body', '');
                el.appendChild(chair);
            }
        }

    }
});