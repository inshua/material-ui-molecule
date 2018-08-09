import keycode from '/jslib/keycode/index.js';
import ownerWindow from '../utils/ownerWindow.js';
import createRippleHandler from './createRippleHandler.js';
import {ReactComponent} from '../../fake-react.js'
import {attachJss, defaultTheme} from '../../jss.js'
import deepmerge from '/jslib/deepmerge/dist/umd.js'; 

const DURATION = 550;
export const DELAY_RIPPLE = 80;

export const styles = theme => ({
    /* Styles applied to the root element. */
    root: {
        display: 'block',
        position: 'absolute',
        overflow: 'hidden',
        borderRadius: 'inherit',
        width: '100%',
        height: '100%',
        left: 0,
        top: 0,
        pointerEvents: 'none',
        zIndex: 0,
    },
    /* Styles applied to the internal `Ripple` components `ripple` class. */
    ripple: {
        width: 50,
        height: 50,
        left: 0,
        top: 0,
        opacity: 0,
        position: 'absolute',
    },
    /* Styles applied to the internal `Ripple` components `rippleVisible` class. */
    rippleVisible: {
        opacity: 0.3,
        transform: 'scale(1)',
        animation: `mui-ripple-enter ${DURATION}ms ${theme.transitions.easing.easeInOut}`,
    },
    /* Styles applied to the internal `Ripple` components `ripplePulsate` class. */
    ripplePulsate: {
        animationDuration: `${theme.transitions.duration.shorter}ms`,
    },
    /* Styles applied to the internal `Ripple` components `child` class. */
    child: {
        opacity: 1,
        display: 'block',
        width: '100%',
        height: '100%',
        borderRadius: '50%',
        backgroundColor: 'currentColor',
    },
    /* Styles applied to the internal `Ripple` components `childLeaving` class. */
    childLeaving: {
        opacity: 0,
        animation: `mui-ripple-exit ${DURATION}ms ${theme.transitions.easing.easeInOut}`,
    },
    /* Styles applied to the internal `Ripple` components `childPulsate` class. */
    childPulsate: {
        position: 'absolute',
        left: 0,
        top: 0,
        animation: `mui-ripple-pulsate 2500ms ${theme.transitions.easing.easeInOut} 200ms infinite`,
    },
    '@keyframes mui-ripple-enter': {
        '0%': {
            transform: 'scale(0)',
            opacity: 0.1,
        },
        '100%': {
            transform: 'scale(1)',
            opacity: 0.3,
        },
    },
    '@keyframes mui-ripple-exit': {
        '0%': {
            opacity: 1,
        },
        '100%': {
            opacity: 0,
        },
    },
    '@keyframes mui-ripple-pulsate': {
        '0%': {
            transform: 'scale(1)',
        },
        '50%': {
            transform: 'scale(0.92)',
        },
        '100%': {
            transform: 'scale(1)',
        },
    },
});


const  defaultClasses = attachJss(styles(defaultTheme), 'MuiTouchRipple', 'MuiTouchRipple')

export default class TouchRipple extends ReactComponent {
    constructor(el) {
        super(el)

        // Used to filter out mouse emulated events on mobile.
        this.ignoringMouseDown = false;

        // We use a timer in order to only show the ripples for touch "click" like events.
        // We don't want to display the ripple for touch scroll events.
        this.startTimer = null;

        // This is the hook called once the previous timeout is ready.
        this.startTimerCommit = null;

        this.state = {
            ripples: [],
        };

        if(this.constructor == TouchRipple){
            this.handlePropsChanged()
        }
    }

    mixProps(props){
        super.mixProps(deepmerge(TouchRipple.defaultProps, props));
    }
    
    prepareClasses(){
        this.props.classes = defaultClasses;
    }

    render(){
        let className = classNames(this.props.classes.root, this.props.className)
        this.el.className = className;
    }

    dispose() {
        debugger;
        clearTimeout(this.startTimer);
    }

    pulsate() {
        this.start({}, {
            pulsate: true
        });
    };

    start(event = {}, options = {}, cb) {
        const {
            pulsate = false,
            center = this.props.center || options.pulsate,
        } = options;

        if (event.type === 'mousedown' && this.ignoringMouseDown) {
            this.ignoringMouseDown = false;
            return;
        }

        if (event.type === 'touchstart') {
            this.ignoringMouseDown = true;
        }

        const element = this.element;
        const rect = element ?
            element.getBoundingClientRect() : {
                width: 0,
                height: 0,
                left: 0,
                top: 0,
            };

        // Get the size of the ripple
        let rippleX;
        let rippleY;
        let rippleSize;

        if (
            center ||
            (event.clientX === 0 && event.clientY === 0) ||
            (!event.clientX && !event.touches)
        ) {
            rippleX = Math.round(rect.width / 2);
            rippleY = Math.round(rect.height / 2);
        } else {
            const clientX = event.clientX ? event.clientX : event.touches[0].clientX;
            const clientY = event.clientY ? event.clientY : event.touches[0].clientY;
            rippleX = Math.round(clientX - rect.left);
            rippleY = Math.round(clientY - rect.top);
        }

        if (center) {
            rippleSize = Math.sqrt((2 * rect.width ** 2 + rect.height ** 2) / 3);

            // For some reason the animation is broken on Mobile Chrome if the size if even.
            if (rippleSize % 2 === 0) {
                rippleSize += 1;
            }
        } else {
            const sizeX =
                Math.max(Math.abs((element ? element.clientWidth : 0) - rippleX), rippleX) * 2 + 2;
            const sizeY =
                Math.max(Math.abs((element ? element.clientHeight : 0) - rippleY), rippleY) * 2 + 2;
            rippleSize = Math.sqrt(sizeX ** 2 + sizeY ** 2);
        }

        // Touche devices
        if (event.touches) {
            // Prepare the ripple effect.
            this.startTimerCommit = () => {
                this.startCommit({
                    pulsate,
                    rippleX,
                    rippleY,
                    rippleSize,
                    cb
                });
            };
            // Deplay the execution of the ripple effect.
            this.startTimer = setTimeout(() => {
                if (this.startTimerCommit) {
                    this.startTimerCommit();
                    this.startTimerCommit = null;
                }
            }, DELAY_RIPPLE); // We have to make a tradeoff with this value.
        } else {
            this.startCommit({
                pulsate,
                rippleX,
                rippleY,
                rippleSize,
                cb
            });
        }
    };

    startCommit(params) {
        const {
            pulsate,
            rippleX,
            rippleY,
            rippleSize,
            cb
        } = params;
        let ripple = $(document.createElement('span')).setAttrs({
            molecule: 'mui.Ripple',
            props: JSON.stringify({
                exitTimeout: DURATION,
                enterTimeout: DURATION,
                pulsate: pulsate,
                classes: this.props.classes,
                pulsate: pulsate,
                rippleX: rippleX,
                rippleY: rippleY,
                rippleSize: rippleSize
            })
        }).appendTo(this.el).molecule()
        this.state.ripples.push(ripple)
        if (cb) cb();
    };

    stop(event, cb){
        clearTimeout(this.startTimer);
        const {
            ripples
        } = this.state;

        // The touch interaction occurs too quickly.
        // We still want to show ripple effect.
        if (event.type === 'touchend' && this.startTimerCommit) {
            event.persist();
            this.startTimerCommit();
            this.startTimerCommit = null;
            this.startTimer = setTimeout(() => {
                this.stop(event, cb);
            }, 0);
            return;
        }

        this.startTimerCommit = null;

        if (ripples && ripples.length) {
            let ripple = this.state.ripples.shift()
            ripple.exit(cb);
        }
    };
}


TouchRipple.defaultProps = {
    classes: defaultClasses,
    center: false,
};