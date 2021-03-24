import Base from './Base.js';
import StrokePathWebGL from '../../utils/render/StrokePathWebGL.js';
import FillStyleCanvas from '../../utils/render/FillStyleCanvas.js';
import LineStyleCanvas from '../../utils/render/LineStyleCanvas.js';

const Utils = Phaser.Renderer.WebGL.Utils;

class Triangle extends Base {
    constructor(x0, y0, x1, y1, x2, y2) {
        super();

        this.pathData = [];
        this.closePath = true;

        this.x0 = x0;
        this.y0 = y0;
        this.x1 = x1;
        this.y1 = y1;
        this.x2 = x2;
        this.y2 = y2;
    }

    updateData() {
        this.pathData.length = 0;
        this.pathData.push(this.x0, this.y0);
        this.pathData.push(this.x1, this.y1);
        this.pathData.push(this.x2, this.y2);
        this.pathData.push(this.x0, this.y0);
        return this;
    }

    webglRender(pipeline, calcMatrix, alpha, dx, dy) {
        if (this.isFilled) {
            var fillTintColor = Utils.getTintAppendFloatAlpha(this.fillColor, this.fillAlpha * alpha);

            var x0 = this.x0 - dx;
            var y0 = this.y0 - dy;
            var x1 = this.x1 - dx;
            var y1 = this.y1 - dy;
            var x2 = this.x2 - dx;
            var y2 = this.y2 - dy;

            var tx0 = calcMatrix.getX(x0, y0);
            var ty0 = calcMatrix.getY(x0, y0);
            var tx1 = calcMatrix.getX(x1, y1);
            var ty1 = calcMatrix.getY(x1, y1);
            var tx2 = calcMatrix.getX(x2, y2);
            var ty2 = calcMatrix.getY(x2, y2);

            pipeline.batchTri(tx0, ty0, tx1, ty1, tx2, ty2, fillTintColor, fillTintColor, fillTintColor);
        }

        if (this.isStroked) {
            StrokePathWebGL(pipeline, this, alpha, dx, dy);
        }
    }

    canvasRender(ctx, dx, dy) {
        var x1 = this.x1 - dx;
        var y1 = this.y1 - dy;
        var x2 = this.x2 - dx;
        var y2 = this.y2 - dy;
        var x3 = this.x3 - dx;
        var y3 = this.y3 - dy;

        ctx.beginPath();

        ctx.moveTo(x1, y1);
        ctx.lineTo(x2, y2);
        ctx.lineTo(x3, y3);

        ctx.closePath();

        if (this.isFilled) {
            FillStyleCanvas(ctx, this);
            ctx.fill();
        }

        if (this.isStroked) {
            LineStyleCanvas(ctx, this);
            ctx.stroke();
        }
    }
}

export default Triangle;