import DefaultTransitCallbacks from './DefaultTransitCallbacks.js';
import NOOP from '../../../../plugins/utils/object/NOOP.js';
import TransitionMode from './TransitionMode.js';

export default {    
    setDisplayTime(time) {
        this.displayTime = time;
        return this;
    },

    setTransitOutTime(time) {
        this.transitOutTime = time;
        return this;
    },

    setTransitInTime(time) {
        this.transitInTime = time;
        return this;
    },

    setTransitInCallback(callback) {
        if (typeof (callback) === 'string') {
            callback = TransitionMode[callback];
        }

        switch (callback) {
            case TransitionMode.popUp:
                callback = DefaultTransitCallbacks.popUp;
                break;
            case TransitionMode.fadeIn:
                callback = DefaultTransitCallbacks.fadeIn;
                break;
        }

        if (!callback) {
            callback = NOOP;
        }

        this.transitInCallback = callback;
        // callback = function(gameObject, duration) {}
        return this;
    },

    setTransitOutCallback(callback) {
        if (typeof (callback) === 'string') {
            callback = TransitionMode[callback];
        }

        switch (callback) {
            case TransitionMode.scaleDown:
                callback = DefaultTransitCallbacks.scaleDown;
                break;
            case TransitionMode.fadeOut:
                callback = DefaultTransitCallbacks.fadeOut;
                break;
        }

        if (!callback) {
            callback = NOOP;
        }

        this.transitOutCallback = callback;
        // callback = function(gameObject, duration) {}
        return this;
    },

}