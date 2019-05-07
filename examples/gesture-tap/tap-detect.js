import GesturesPlugin from '../../plugins/gestures-plugin.js';

class Demo extends Phaser.Scene {
    constructor() {
        super({
            key: 'examples'
        })
    }

    preload() { }

    create() {
        var print = this.add.text(0, 0, '')

        this.rexGestures.add.tap()
            .on('tap', function (tap) {
                print.text += tap.tapsCount + ' tap(s)\n';
            }, this)
            .on('tappingstart', function (tap) {
                print.text = '';
            })
            .on('tapping', function (tap) {
                print.text += tap.tapsCount + ' tapping\n';
            })

    }
}

var config = {
    type: Phaser.AUTO,
    parent: 'phaser-example',
    width: 800,
    height: 600,
    scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH,
    },
    scene: Demo,
    plugins: {
        scene: [{
            key: 'rexGestures',
            plugin: GesturesPlugin,
            mapping: 'rexGestures'
        }]
    }
};

var game = new Phaser.Game(config);