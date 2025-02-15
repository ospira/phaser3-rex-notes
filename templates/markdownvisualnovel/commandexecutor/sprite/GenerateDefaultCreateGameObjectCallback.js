import { TransitionImagePack } from '../../../ui/ui-components.js';
import AddViewportCoordinateProperties from '../../../../plugins/behaviors/viewportcoordinate/AddViewportCoordinateProperties.js';

var GenerateDefaultCreateGameObjectCallback = function (
    style,
    {
        viewport
    } = {}
) {

    var defaultKey = style.key;
    var defaultFrameDelimiter = style.frameDelimiter || '-';

    return function (
        scene,
        config
    ) {

        var {
            key = defaultKey,
            name, expression,
            frameDelimiter = defaultFrameDelimiter
        } = config;

        var isFrameNameMode = !!key;
        if (isFrameNameMode) {
            if (name && expression) {
                config.frame = name + frameDelimiter + expression;
            }
        } else {
            config.key = name;
            config.frame = expression;
        }

        var gameObject = new TransitionImagePack(scene, config);
        gameObject.setOrigin(0.5, 1);  // Align to bottom

        scene.add.existing(gameObject);

        gameObject.isFrameNameMode = isFrameNameMode;
        gameObject.frameDelimiter = frameDelimiter;

        AddViewportCoordinateProperties(gameObject, viewport);

        var { vpx = 0.5, vpy = 1 } = config;
        gameObject.vpx = vpx;
        gameObject.vpy = vpy;

        return gameObject;
    }
}

export default GenerateDefaultCreateGameObjectCallback;