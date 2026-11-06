AFRAME.registerComponent('finger-touch', {
init: function () {
    this.lastPressedBtn = null;
    this.tip = null;
},
tick: function () {
    if (!this.tip) {
    this.tip = this.el.querySelector('.a-hand-tracking-joint[data-joint="index-finger-tip"]');
    return;
    }

    var tipPos = new THREE.Vector3();
    this.tip.object3D.getWorldPosition(tipPos);

    var clickables = document.querySelectorAll('.clickable');
    var touchedBtn = null;

    for (var i = 0; i < clickables.length; i++) {
    var btn = clickables[i];
    var btnPos = new THREE.Vector3();
    btn.object3D.getWorldPosition(btnPos);

    if (tipPos.distanceTo(btnPos) < 0.06) {
        touchedBtn = btn;
        break;
    }
    }

    if (touchedBtn) {
    if (this.lastPressedBtn !== touchedBtn) {
        this.lastPressedBtn = touchedBtn;
        
        touchedBtn.emit('mouseenter');
        touchedBtn.emit('mousedown');
        touchedBtn.emit('click');
    }
    } else {
    if (this.lastPressedBtn) {
        this.lastPressedBtn.emit('mouseup');
        this.lastPressedBtn.emit('mouseleave');
        this.lastPressedBtn = null;
    }
    }
}
});