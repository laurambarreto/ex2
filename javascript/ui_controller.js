AFRAME.registerComponent('ui-controller', {
    init: function () {
        let isOn = false; // Ecrã ligado ou desligado
        let viewMode = 'gallery'; // Modo atual
        let currentPage = 0;
        let focusIndex = 0;

        var mediaItems = [];
        var totalImages = 6;
        var totalVideos = 6;
        
        // Percorrer as várias imagens (fullSrc) e as suas thumbs (src) e meter na lista
        for (var i = 1; i <= totalImages; i++) {
            mediaItems.push({
            type: 'image',
            src: 'Images/image' + i + '.jpg',
            fullSrc: 'Images/image' + i + '.png',
            name: 'Imagem ' + i
            });
        }

        // Percorrer os vídeos e adicionar juntamente com a sua thumbnail à lista
        for (var i = 1; i <= totalVideos; i++) {
            mediaItems.push({type: 'video', src: 'Videos/video' + i + '.mp4', name: 'Video ' + i, poster: 'Images/thumb' + i + '.png'});
        }

        var screenEl = document.querySelector('#cinema-screen');
        var btnOk = document.querySelector('#btn-ok');
        var btnBack = document.querySelector('#btn-back');
        var wrapOnOff = document.querySelector('#on-off');
        var arrowUp = document.querySelector('#arrow-up');
        var arrowDown = document.querySelector('#arrow-down');
        var arrowLeft = document.querySelector('#arrow-left');
        var arrowRight = document.querySelector('#arrow-right');

        // Hover e clicks
        function setupButton(el, hoverScale, normalScale, onClickCallback) {
            if (!el) return;
            el.addEventListener('mouseenter', function () { el.setAttribute('scale', hoverScale); });
            el.addEventListener('mouseleave', function () { el.setAttribute('scale', normalScale); });
            if (onClickCallback) { el.addEventListener('click', onClickCallback); }
        }

        // Função que atualiza ecrã
        function updateScreen() {
            buildScreenUI(screenEl, isOn, viewMode, mediaItems, currentPage, focusIndex);
        }

        // Botão On/Off
        setupButton(wrapOnOff, '1.1 1.1 1.1', '1.0 1.0 1.0', function () {
            wrapOnOff.components.sound.playSound();
            isOn = !isOn;
            viewMode = 'gallery';
            currentPage = 0;
            focusIndex = 0;
            updateScreen();
        });

        // Botão Ok
        setupButton(btnOk, '1.1 1.1 1.1', '1.0 1.0 1.0', function () {
            btnOk.components.sound.playSound();
            if (!isOn) return;
            if (viewMode === 'gallery') {
                let totalPages = Math.ceil(mediaItems.length / 4);
                
                if (focusIndex < 4) {
                    let globalIndex = (currentPage * 4) + focusIndex;
                    if (globalIndex < mediaItems.length) { 
                        viewMode = 'fullscreen';
                        updateScreen();
                    }

                } else if (focusIndex === 4 && currentPage > 0) {
                    currentPage--;
                    focusIndex = 0;
                    updateScreen();
                } else if (focusIndex === 5 && currentPage < totalPages - 1) {
                    currentPage++;
                    focusIndex = 0;
                    updateScreen();
                }
            }
        });

        // Botão para voltar do ecrã inteiro para a galeria
        setupButton(btnBack, '1.1 1.1 1.1', '1.0 1.0 1.0', function () {
            btnBack.components.sound.playSound();
            if (!isOn) return;
            if (viewMode === 'fullscreen') {
                viewMode = 'gallery';
                updateScreen();
            }
        });

        // Botão seta para cima
        setupButton(arrowUp, '1.2 1.2 1.2', '1.0 1.0 1.0', function () {
            arrowUp.components.sound.playSound();
            if (!isOn || viewMode !== 'gallery') return;
            if (focusIndex >= 2) focusIndex -= 2;
            updateScreen();
        });

        // Botão seta para baixo
        setupButton(arrowDown, '1.2 1.2 1.2', '1.0 1.0 1.0', function () {
            arrowDown.components.sound.playSound();
            if (!isOn || viewMode !== 'gallery') return;
            if (focusIndex <= 3) focusIndex += 2;
            updateScreen();
        });

        // Botão seta para a esquerda
        setupButton(arrowLeft, '1.2 1.2 1.2', '1.0 1.0 1.0', function () {
            arrowLeft.components.sound.playSound();
            if (!isOn || viewMode !== 'gallery') return;
            if (focusIndex % 2 !== 0) focusIndex -= 1;
            updateScreen();
        });

        // Botão seta para a direita
        setupButton(arrowRight, '1.2 1.2 1.2', '1.0 1.0 1.0', function () {
            arrowRight.components.sound.playSound();
            if (!isOn || viewMode !== 'gallery') return;
            if (focusIndex % 2 === 0) focusIndex += 1;
            updateScreen();
        });
    }
});