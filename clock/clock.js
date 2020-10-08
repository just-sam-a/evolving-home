const HOUR_DEGREES = 360/12;
const MINUTE_DEGREES = 360/60;
const SECOND_DEGREES = 360/60;

class Clock {
    constructor(s_element, m_element, h_element) {
        this.time = 3590;
        this.hour = 0;
        this.minute = 0;
        this.second = 0;

        this.h_arm = h_element;
        this.m_arm = m_element;
        this.s_arm = s_element;

        this.update = this.update.bind(this);
    }

    update() {
        this.time++;
        this.hour = this.time / 3600;
        let seconds = this.time % 3600;
        this.minute = Math.floor(seconds/60);
        this.second = seconds % 60;

        this.h_arm.style.webkitTransform = 'rotate(' + this.hour * HOUR_DEGREES + 'deg)';
        this.m_arm.style.webkitTransform = 'rotate(' + this.minute * MINUTE_DEGREES + 'deg)';
        this.s_arm.style.webkitTransform = 'rotate(' + this.second * SECOND_DEGREES + 'deg)';
    }

    start(s = 0, m = 0, h = 0) {
        this.hour = h; this.minute = m; this.second = s;
        setInterval(this.update, 1000);
    }
}

let hour = document.getElementById("hour");
let minute = document.getElementById("minute");
let second = document.getElementById("second");

let newClock = new Clock(second, minute, hour);
newClock.start();