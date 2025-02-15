var Cross = function (
    gameObject,
    {
        key, frame,
        name, expression,
        duration, mode = 'crossFade',
        wait = true
    } = {},
    commandExecutor, eventSheetManager, eventSheet
) {

    if (gameObject.isFrameNameMode) {
        key = key || gameObject.texture.key;
        if (name || expression) {
            var frameDelimiter = gameObject.frameDelimiter;
            var tokens = gameObject.frame.name.split(frameDelimiter);
            name = name || tokens[0];
            expression = expression || tokens[1];
            frame = name + frameDelimiter + expression;
        }

    } else {
        key = name || gameObject.texture.key;
        frame = expression;

    }

    // Wait until transition complete
    if (wait) {
        commandExecutor.waitEvent(gameObject, 'complete');
    }

    var durationSave = gameObject.duration;
    if (duration !== undefined) {
        gameObject.setDuration(duration);
    }
    gameObject.transit(key, frame, mode);
    gameObject.setDuration(durationSave);
}

export default Cross;