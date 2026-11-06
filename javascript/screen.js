function buildScreenUI(screen, isOn, viewMode, mediaItems, currentPage, focusIndex) {
    if (!isOn) {
        screen.setAttribute('visible', 'false');
        screen.innerHTML = '';
        return;
    }

    screen.setAttribute('visible', 'true');
    screen.innerHTML = '';

    let bg = document.createElement('a-plane');
    bg.setAttribute('width', '6.5');
    bg.setAttribute('height', '3.8');
    bg.setAttribute('material', 'color: #add8e6; shader: flat');
    screen.appendChild(bg);

    if (viewMode === 'gallery') {
        let totalPages = Math.ceil(mediaItems.length / 4);
        
        let title = document.createElement('a-text');
        title.setAttribute('value', `Galeria`);
        title.setAttribute('position', '0 1.6 0.05');
        title.setAttribute('align', 'center');
        title.setAttribute('scale', '1.3 1.3 1.3');
        title.setAttribute('font', 'exo2bold');
        title.setAttribute('color', '#000000');
        screen.appendChild(title);

        const coords = [
            {x: -1.5, y: 0.7},
            {x: 1.5, y: 0.7},
            {x: -1.5, y: -0.5},
            {x: 1.5, y: -0.5},
            {x: -1.5, y: -1.5},
            {x: 1.5, y: -1.5}
        ];

        let border = document.createElement('a-plane');
        border.setAttribute('width', focusIndex >= 4 ? '2.2' : '2.1'); 
        border.setAttribute('height', focusIndex >= 4 ? '0.5' : '1.0');
        border.setAttribute('position', `${coords[focusIndex].x} ${coords[focusIndex].y} 0.04`);
        border.setAttribute('color', '#fd61c9');
        border.setAttribute('shader', 'flat');
        screen.appendChild(border);

        let startIndex = currentPage * 4;
        for (let i = 0; i < 4; i++) {
            let globalIndex = startIndex + i;
            if (globalIndex < mediaItems.length) {
                let item = mediaItems[globalIndex];
                let x = coords[i].x;
                let y = coords[i].y;

                let itemGroup = document.createElement('a-entity');
                screen.appendChild(itemGroup);

                if (item.type === 'image') {
                    let thumbImg = document.createElement('a-image');
                    thumbImg.setAttribute('src', item.src);
                    thumbImg.setAttribute('width', '2.0');
                    thumbImg.setAttribute('height', '0.9');
                    thumbImg.setAttribute('position', `${x} ${y} 0.05`);
                    thumbImg.setAttribute('material', 'shader: flat');
                    itemGroup.appendChild(thumbImg);

                } else if (item.type === 'video') {
                    let vidBox = document.createElement('a-image');
                    vidBox.setAttribute('src', item.poster);
                    vidBox.setAttribute('width', '2.0');
                    vidBox.setAttribute('height', '0.9');
                    vidBox.setAttribute('position', `${x} ${y} 0.05`);
                    vidBox.setAttribute('color', '#ffffff');
                    vidBox.setAttribute('material', 'shader: flat');
                    itemGroup.appendChild(vidBox);

                    let vidIcon = document.createElement('a-image');
                    vidIcon.setAttribute('src', 'Images/play.png');
                    vidIcon.setAttribute('position', `${x} ${y} 0.08`);
                    vidIcon.setAttribute('width', '0.3');
                    vidIcon.setAttribute('height', '0.3');
                    vidIcon.setAttribute('material', 'shader: flat; transparent: true');
                    itemGroup.appendChild(vidIcon);
                }

                let nameText = document.createElement('a-text');
                nameText.setAttribute('value', item.name);
                nameText.setAttribute('align', 'center');
                nameText.setAttribute('position', `${x} ${y - 0.55} 0.05`);
                nameText.setAttribute('scale', '0.4 0.4 0.4');
                nameText.setAttribute('color', '#000000');
                nameText.setAttribute('font', 'exo2bold');
                itemGroup.appendChild(nameText);
            }
        }

        if (currentPage > 0) {
            let btnPrev = document.createElement('a-plane');
            btnPrev.setAttribute('width', '2.0');
            btnPrev.setAttribute('height', '0.4');
            btnPrev.setAttribute('position', `${coords[4].x} ${coords[4].y} 0.045`);
            btnPrev.setAttribute('color', focusIndex === 4 ? '#95b3f9' : '#ffffff');
            btnPrev.setAttribute('shader', 'flat');
            
            let textPrev = document.createElement('a-text');
            textPrev.setAttribute('value', '<< Anterior');
            textPrev.setAttribute('align', 'center');
            textPrev.setAttribute('position', '0 0 0.01');
            textPrev.setAttribute('scale', '0.4 0.4 0.4');
            textPrev.setAttribute('color', '#000000');
            textPrev.setAttribute('font', 'exo2bold');
            btnPrev.appendChild(textPrev);
            screen.appendChild(btnPrev);
        }

        if (currentPage < totalPages - 1) {
            let btnNext = document.createElement('a-plane');
            btnNext.setAttribute('width', '2.0');
            btnNext.setAttribute('height', '0.4');
            btnNext.setAttribute('position', `${coords[5].x} ${coords[5].y} 0.045`);
            btnNext.setAttribute('color', focusIndex === 5 ? '#95b3f9' : '#ffffff');
            btnNext.setAttribute('shader', 'flat');

            let textNext = document.createElement('a-text');
            textNext.setAttribute('value', 'Proximo >>');
            textNext.setAttribute('align', 'center');
            textNext.setAttribute('position', '0 0 0.01');
            textNext.setAttribute('scale', '0.4 0.4 0.4');
            textNext.setAttribute('color', '#000000');
            textNext.setAttribute('font', 'exo2bold');
            btnNext.appendChild(textNext);
            screen.appendChild(btnNext);
        }

    } else if (viewMode === 'fullscreen') {
        let globalIndex = (currentPage * 4) + focusIndex;
        let currentItem = mediaItems[globalIndex];
        
        if (currentItem.type === 'image') {
            let img = document.createElement('a-image');
            img.setAttribute('src', currentItem.fullSrc || currentItem.src);
            img.setAttribute('width', '5.5');
            img.setAttribute('height', '2.8');
            img.setAttribute('position', '0 0.2 0.05');
            screen.appendChild(img);
        } else if (currentItem.type === 'video') {
            let videoAssetId = 'dyn-vid-' + globalIndex;
            let assetsEl = document.querySelector('a-assets');
            
            if (!document.getElementById(videoAssetId)) {
                let videoEl = document.createElement('video');
                videoEl.setAttribute('id', videoAssetId);
                videoEl.setAttribute('src', currentItem.src);
                videoEl.setAttribute('autoplay', 'true');
                videoEl.setAttribute('loop', 'true');
                videoEl.setAttribute('crossorigin', 'anonymous');
                assetsEl.appendChild(videoEl);
            }

            let vidScreen = document.createElement('a-video');
            vidScreen.setAttribute('src', '#' + videoAssetId);
            vidScreen.setAttribute('width', '5.5');
            vidScreen.setAttribute('height', '2.8');
            vidScreen.setAttribute('position', '0 0.2 0.05');
            screen.appendChild(vidScreen);
        }
    }
}