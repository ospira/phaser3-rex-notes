import phaser from 'phaser/src/phaser.js';
import UIPlugin from '../../templates/ui/ui-plugin.js';

const COLOR_MAIN = 0x4e342e;
const COLOR_LIGHT = 0x7b5e57;
const COLOR_DARK = 0x260e04;

class Demo extends Phaser.Scene {
    constructor() {
        super({
            key: 'examples'
        })
    }

    preload() {
    }

    create() {
        var print = this.add.text(0, 0, '');
        var clickButtonCallback = function (item) {
            print.text += `Click ${item.text}\n`;
        }

        this.input.topOnly = false;
        var panel = this.rexUI.add.scrollablePanel({
            x: 400, y: 300,
            width: 200, height: 300,

            scrollMode: 'y',

            panel: {
                child: CreatePanel(this, clickButtonCallback),
            },

            slider: {
                track: this.rexUI.add.roundRectangle({
                    width: 20, radius: 10,
                    color: COLOR_DARK
                }),
                thumb: this.rexUI.add.roundRectangle({
                    radius: 13,
                    color: COLOR_LIGHT,
                }),
            },

            scroller: true,

            space: {
                slider: 10,
            }
        })
            .layout()

    }

    update() { }
}

var CreatePanel = function (scene, clickButtonCallback) {
    var panel = scene.rexUI.add.sizer({
        orientation: 'y',
        space: { item: 5 }
    })

    for (var i = 0; i < 30; i++) {
        panel
            .add(
                CreateButton(scene, i.toString(), clickButtonCallback),
                { expand: true }
            )
    }

    return panel;
}

var CreateButton = function (scene, text, clickButtonCallback) {
    var button = scene.rexUI.add.label({
        height: 30,

        background: scene.rexUI.add.roundRectangle({
            radius: 10,
            color: COLOR_MAIN
        }),
        text: scene.add.text(0, 0, text),

        align: 'center'
    })
        .onClick(function () {
            clickButtonCallback(button)
        })

    // button
    //     .setInteractive()
    //     .on('pointerdown', function () {
    //         clickButtonCallback(button)
    //     })

    return button;
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
            key: 'rexUI',
            plugin: UIPlugin,
            mapping: 'rexUI'
        }]
    }
};

var game = new Phaser.Game(config);