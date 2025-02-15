import { SimpleTextBox } from '../../../ui/ui-components.js';
import SetValue from '../../../../plugins/utils/object/SetValue.js';
import AddViewportCoordinateProperties from '../../../../plugins/behaviors/viewportcoordinate/AddViewportCoordinateProperties.js';

var GenerateDefaultCreateGameObjectCallback = function (
    style,
    {
        viewport
    } = {}
) {

    var defaultFrameDelimiter = style.frameDelimiter || '-';

    return function (
        scene,
        {
            vpw, vph,
            width = 0, height = 0,
            vpx = 0.5, vpy = 1,

            frameDelimiter = defaultFrameDelimiter
        } = {}
    ) {

        if (vpw !== undefined) {
            width = viewport.width * vpw;
        }

        if (vph !== undefined) {
            height = viewport.height * vph;
        }

        var wrapWidth = Math.max(0, width - 20);

        SetValue(style, 'text.fixedWidth', width);
        SetValue(style, 'text.fixedHeight', height);
        SetValue(style, 'text.wordWrap.width', wrapWidth)

        var gameObject = new SimpleTextBox(scene, style);

        gameObject
            .setMinSize(width, height)
            .setOrigin(0.5, 1)  // Align to bottom
            .layout();

        scene.add.existing(gameObject);

        gameObject
            .setInteractive()
            .on('pointerdown', function () {
                var icon = this.getElement('action');
                this.setChildAlpha(icon, 0);
                if (this.isTyping) {
                    this.stop(true);
                } else {
                    this.typeNextPage();
                }
            }, gameObject)
            .on('pageend', function () {
                if (this.isLastPage) {
                    return;
                }

                var icon = this.getElement('action');
                this.setChildAlpha(icon, 1);
                icon.y -= 30;
                var tween = scene.tweens.add({
                    targets: icon,
                    y: '+=30', // '+=100'
                    ease: 'Bounce', // 'Cubic', 'Elastic', 'Bounce', 'Back'
                    duration: 500,
                    repeat: 0, // -1: infinity
                    yoyo: false
                });
            }, gameObject)

        gameObject.frameDelimiter = frameDelimiter;

        AddViewportCoordinateProperties(gameObject, viewport);

        gameObject.vpx = vpx;
        gameObject.vpy = vpy;

        return gameObject;
    }
}

export default GenerateDefaultCreateGameObjectCallback;