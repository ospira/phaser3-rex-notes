import { CubismMatrix44 } from '../../framework/src/math/cubismmatrix44';

const Linear = Phaser.Math.Linear;

class CanvasMatrix extends CubismMatrix44 {
    constructor() {
        super();

        this.setSize(0, 0);
    }

    setSize(width, height) {
        var ratio = (height === 0) ? 0 : width / height;
        this.width = width;
        this.height = height;

        this.scale(1, ratio);

        return this;
    }

    toLocalX(x) {
        var t = (this.width === 0) ? 0 : (x / this.width);
        return (2 * t) - 1;
    }

    toLocalY(y) {
        var t = (this.height === 0) ? 0 : (y / this.height);
        return 1 - (2 * t);
    }
}

export default CanvasMatrix;