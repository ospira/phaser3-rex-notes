import TextPage from '../textpage/TextPage.js';
import TextTyping from '../texttyping/TextTyping.js';
import { TextType, TagTextType, BitmapTextType } from '../../../plugins/utils/text/GetTextObjectType.js';

const GetValue = Phaser.Utils.Objects.GetValue;

var TextBoxBase = function (GOClass, type) {
    if (type === undefined) {
        type = 'rexTextBox';
    }
    class TextBox extends GOClass {
        constructor(scene, config) {
            super(scene, config);
            this.type = type;

            // childrenMap must have 'text' element
            var text = this.childrenMap.text;
            this.setTypingMode(GetValue(config, 'typingMode', 'page'));
            this.page = new TextPage(text, GetValue(config, 'page', undefined));
            this.typing = new TextTyping(text, GetValue(config, 'typing', config.type));
            this.typing
                .on('complete', this.onTypingComplete, this)
                .on('type', this.onType, this)
                .on('typechar', this.onTypeChar, this)

            this.textWidth = text.width;
            this.textHeight = text.height;
        }

        setTypingMode(mode) {
            if (typeof (mode) === 'string') {
                mode = TypingMode[mode];
            }
            this.typingMode = mode;
            return this;
        }

        start(text, speed) {
            this.page.setText(text);
            if (speed !== undefined) {
                this.setTypingSpeed(speed);
            }
            this.emit('start');

            if (this.typingMode === 0) {
                // Typing page by page
                this.typeNextPage();
            } else {
                // Typing line by line
                this.typeNextLine();
            }
            return this;
        }

        typeNextPage() {
            if (!this.isLastPage) {
                var txt = this.page.getNextPage();
                this.typing.start(txt);

            } else {
                this.emit('complete');

            }
            return this;
        }

        typeNextLine() {
            if (!this.isLastLine) {
                var txt = this.page.getPageOfNextLine();

                var startLineIndex;
                if (this.isFirstLine) {
                    // Typing from 1st line
                    startLineIndex = 0;
                } else {
                    // Typing last line
                    startLineIndex = this.page.pageLinesCount - 1;
                }
                this.typing.startFromLine(txt, startLineIndex);

            } else {
                this.emit('complete');

            }
        }

        pause() {
            if (this.isTyping) {
                this.typing.pause();
                this.emit('pause');
            }
            return this;
        }

        resume() {
            if (!this.isTyping) {
                this.emit('resume');
                this.typing.resume();
            }
            return this;
        }

        stop(showAllText) {
            this.typing.stop(showAllText);
            return this;
        }

        showLastPage() {
            this.typing.stop();
            if (this.typingMode === 0) {
                this.page.showLastPage();
            } else {
                this.page.showLastLine();
            }
            this.emit('type');
            this.onTypingComplete();
            return this;
        }

        setTypeSpeed(speed) {
            this.typing.setTypingSpeed(speed);
            return this;
        }

        setTypingSpeed(speed) {
            this.typing.setTypingSpeed(speed);
            return this;
        }

        get isTyping() {
            return this.typing.isTyping;
        }

        get isLastPage() {
            return this.page.isLastPage;
        }

        get isFirstPage() {
            return this.page.isFirstPage;
        }

        get pageCount() {
            return this.page.pageCount;
        }

        get pageIndex() {
            return this.page.pageIndex;
        }

        get isLastLine() {
            return this.page.isLastLine;
        }

        get isFirstLine() {
            return this.page.isFirstLine;
        }

        get lineCound() {
            return this.page.totalLinesCount;
        }

        get startLineIndex() {
            return this.page.startLineIndex;
        }

        get endLineIndex() {
            return this.page.endLineIndex;
        }

        get typingSpeed() {
            return this.typing.speed;
        }

        onType() {
            var text = this.childrenMap.text;
            if ((this.textWidth !== text.width) || (this.textHeight !== text.height)) {
                this.textWidth = text.width;
                this.textHeight = text.height;
                this.getTopmostSizer().layout();
            }
            this.emit('type');
        }

        onTypeChar(char) {
            this.emit('typechar', char);
        }

        onTypingComplete() {
            if (this.typingMode === 0) {
                var isLastPage = this.isLastPage;

                this.emit('pageend');
                /*
                Might enter this method immediately, if invoking typeNextPage() in this 'pageend' event.
                */

                if (isLastPage) {
                    this.emit('complete');
                }

            } else {
                // Typing next line continually
                this.typeNextLine();

            }

        }

    }

    return TextBox;
}

const TypingMode = {
    page: 0,
    line: 1
}

export default TextBoxBase;