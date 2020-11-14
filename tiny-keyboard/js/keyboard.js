var num = 0;
var write = document.getElementById('write');

//abcd
var one = document.getElementById('one');
var one_hammer = new Hammer(one);
one_hammer.get('pan').set({direction: Hammer.DIRECTION_ALL});
one_hammer.on("tap", function(event){ 
    if (num == 0) {write.textContent = write.textContent + "a";}
    else {write.textContent = write.textContent + '"';}
});
one_hammer.on("pan", function(event){
    if (event.angle < 20 && event.angle > -90 ){
        if (num == 0) { one.style.backgroundImage = 'url(css/one/one_alpha_d.jpg)';}
        else {one.style.backgroundImage = 'url(css/one/one_num_d.jpg)';}
    }
    else if (event.angle >= 20 && event.angle < 70){
        if (num == 0) {one.style.backgroundImage = 'url(css/one/one_alpha_c.jpg)';}
        else {one.style.backgroundImage = 'url(css/one/one_num_c.jpg)';}
    }
    else if (event.angle >= 70 && event.angle < 120){
        if (num == 0) {one.style.backgroundImage = 'url(css/one/one_alpha_b.jpg)';}
        else {one.style.backgroundImage = 'url(css/one/one_num_b.jpg)';}
    }
    else {
        if (num == 0) {one.style.backgroundImage = 'url(css/one/one_alpha_a.jpg)';}
        else{one.style.backgroundImage = 'url(css/one/one_num_a.jpg)';}
    }
});
one_hammer.on("panend", function(event){
    one.style.backgroundImage = 'url(css/one/one_alpha.jpg)';
    two.style.backgroundImage = 'url(css/two/two_alpha.jpg)';
    three.style.backgroundImage = 'url(css/three/three_alpha.jpg)';
    four.style.backgroundImage = 'url(css/four/four_alpha.jpg)';
    five.style.backgroundImage = 'url(css/five/five_alpha.jpg)';
    six.style.backgroundImage = 'url(css/six/six_alpha.jpg)';

    if (event.angle < 20 && event.angle > -90 ){
        if (num == 0) {write.textContent = write.textContent + "d";}
        else {write.textContent = write.textContent + "$";}
    }
    else if (event.angle >= 20 && event.angle < 70){
        if (num == 0) {write.textContent = write.textContent + "c";}
        else {write.textContent = write.textContent + "&";}
    }
    else if (event.angle >= 70){
        if (num == 0) {write.textContent = write.textContent + "b";}
        else {write.textContent = write.textContent + "@";}
    }
    else {
        if (num == 0) {write.textContent = write.textContent + "a";}
        else {write.textContent = write.textContent + '"';}
    }

    num = 0;
});

//efghi 12345
var two = document.getElementById('two');
var two_hammer = new Hammer(two);
two_hammer.get('pan').set({direction: Hammer.DIRECTION_ALL});
two_hammer.on("pan", function(event){
    if (event.angle < 10 && event.angle > -90 ){
        if (num == 0) {two.style.backgroundImage = 'url(css/two/two_alpha_h.jpg)';}
        else {two.style.backgroundImage = 'url(css/two/two_num_h.jpg)';}
    }
    else if (event.angle >= 10 && event.angle < 65){ 
        if (num == 0) {two.style.backgroundImage = 'url(css/two/two_alpha_i.jpg)';}
        else {two.style.backgroundImage = 'url(css/two/two_num_i.jpg)';}
    }
    else if (event.angle >= 65 && event.angle < 115){ 
        if (num == 0) {two.style.backgroundImage = 'url(css/two/two_alpha_g.jpg)';}
        else {two.style.backgroundImage = 'url(css/two/two_num_g.jpg)';}
    }
    else if (event.angle >= 115 && event.angle < 170){ 
        if (num == 0) {two.style.backgroundImage = 'url(css/two/two_alpha_e.jpg)';}
        else {two.style.backgroundImage = 'url(css/two/two_num_e.jpg)';}
    }
    else if (event.angle >= 170 || event.angle <= -90){ 
        if (num == 0) {two.style.backgroundImage = 'url(css/two/two_alpha_f.jpg)';}
        else {two.style.backgroundImage = 'url(css/two/two_num_f.jpg)';}
    }
});
two_hammer.on("panend", function(event){
    if (num == 0) {two.style.backgroundImage = 'url(css/two/two_alpha.jpg)';}
    else {two.style.backgroundImage = 'url(css/two/two_num.jpg)';}

    if (event.angle < 10 && event.angle > -90 ){ 
        if (num == 0) {write.textContent = write.textContent + "h";}
        else {write.textContent = write.textContent + "4";}
    }
    else if (event.angle >= 10 && event.angle < 65){ 
        if (num == 0) {write.textContent = write.textContent + "i";}
        else {write.textContent = write.textContent + "5";}
    }
    else if (event.angle >= 65 && event.angle < 115){ 
        if (num == 0) {write.textContent = write.textContent + "g";}
        else {write.textContent = write.textContent + "3";}
    }
    else if (event.angle >= 115 && event.angle < 170){ 
        if (num == 0) {write.textContent = write.textContent + "e";}
        else {write.textContent = write.textContent + "1";}
    }
    else if (event.angle >= 170 || event.angle <= -90){ 
        if (num == 0) {write.textContent = write.textContent + "f";}
        else {write.textContent = write.textContent + "2";}
    }
});

//jklm
var three = document.getElementById('three');
var three_hammer = new Hammer(three);
three_hammer.get('pan').set({direction: Hammer.DIRECTION_ALL});
three_hammer.on("tap", function(event){ 
    if (num == 0) {write.textContent = write.textContent + "k";}
    else {write.textContent = write.textContent + "?";}
});
three_hammer.on("pan", function(event){
    if (event.angle < -90 || event.angle >= 160){
        if (num == 0) { three.style.backgroundImage = 'url(css/three/three_alpha_j.jpg)';}
        else {three.style.backgroundImage = 'url(css/three/three_num_j.jpg)';}
    }
    else if (event.angle >= 110 && event.angle < 160){
        if (num == 0) { three.style.backgroundImage = 'url(css/three/three_alpha_l.jpg)';}
        else {three.style.backgroundImage = 'url(css/three/three_num_l.jpg)';}
    }
    else if (event.angle >= 70 && event.angle < 110){
        if (num == 0) { three.style.backgroundImage = 'url(css/three/three_alpha_m.jpg)';}
        else {three.style.backgroundImage = 'url(css/three/three_num_m.jpg)';}
    }
    else {
        if (num == 0) { three.style.backgroundImage = 'url(css/three/three_alpha_k.jpg)';}
        else {three.style.backgroundImage = 'url(css/three/three_num_k.jpg)';}
    }
});
three_hammer.on("panend", function(event){
    one.style.backgroundImage = 'url(css/one/one_alpha.jpg)';
    two.style.backgroundImage = 'url(css/two/two_alpha.jpg)';
    three.style.backgroundImage = 'url(css/three/three_alpha.jpg)';
    four.style.backgroundImage = 'url(css/four/four_alpha.jpg)';
    five.style.backgroundImage = 'url(css/five/five_alpha.jpg)';
    six.style.backgroundImage = 'url(css/six/six_alpha.jpg)';

    if (event.angle < -90 || event.angle >= 160){
        if (num == 0) {write.textContent = write.textContent + "j";}
        else {write.textContent = write.textContent + "(";}
    }
    else if (event.angle >= 110 && event.angle < 160){
        if (num == 0) {write.textContent = write.textContent + "l";}
        else {write.textContent = write.textContent + ")";}
    }
    else if (event.angle >= 70 && event.angle < 110){
        if (num == 0) {write.textContent = write.textContent + "m";}
        else {write.textContent = write.textContent + "!";}
    }
    else {
        if (num == 0) {write.textContent = write.textContent + "k";}
        else {write.textContent = write.textContent + "?";}
    }

    num = 0;
});

//nopq
var four = document.getElementById('four');
var four_hammer = new Hammer(four);
four_hammer.get('pan').set({direction: Hammer.DIRECTION_ALL});
four_hammer.on("tap", function(event){ 
    if (num == 0) {write.textContent = write.textContent + "o";}
    else {write.textContent = write.textContent + "-";}
});
four_hammer.on("pan", function(event){
    if (event.angle < -60  && event.angle > -110 ){ 
        if (num == 0) {four.style.backgroundImage = 'url(css/four/four_alpha_n.jpg)';}
        else {four.style.backgroundImage = 'url(css/four/four_num_n.jpg)';}
    }
    else if (event.angle >= -60 && event.angle < -30){ 
        if (num == 0) {four.style.backgroundImage = 'url(css/four/four_alpha_p.jpg)';}
        else {four.style.backgroundImage = 'url(css/four/four_num_p.jpg)';}
    }
    else if (event.angle >= -30 && event.angle <= 50){ 
        if (num == 0) {four.style.backgroundImage = 'url(css/four/four_alpha_q.jpg)';}
        else {four.style.backgroundImage = 'url(css/four/four_num_q.jpg)';}
    }
    else {
        if (num == 0) {four.style.backgroundImage = 'url(css/four/four_alpha_o.jpg)';}
        else {four.style.backgroundImage = 'url(css/four/four_num_o.jpg)';}
    }
});
four_hammer.on("panend", function(event){
    one.style.backgroundImage = 'url(css/one/one_alpha.jpg)';
    two.style.backgroundImage = 'url(css/two/two_alpha.jpg)';
    three.style.backgroundImage = 'url(css/three/three_alpha.jpg)';
    four.style.backgroundImage = 'url(css/four/four_alpha.jpg)';
    five.style.backgroundImage = 'url(css/five/five_alpha.jpg)';
    six.style.backgroundImage = 'url(css/six/six_alpha.jpg)';

    if (event.angle < -60 && event.angle > -110 ){
        if (num == 0) {write.textContent = write.textContent + "n";}
        else {write.textContent = write.textContent + ";";}
    }
    else if (event.angle >= -60 && event.angle < -30){
        if (num == 0) {write.textContent = write.textContent + "p";}
        else {write.textContent = write.textContent + ":";}
    }
    else if (event.angle >= -30 && event.angle <= 50){
        if (num == 0) {write.textContent = write.textContent + "q";}
        else {write.textContent = write.textContent + "/";}
    }
    else {
        if (num == 0) {write.textContent = write.textContent + "o";}
        else {write.textContent = write.textContent + "-";}
    }

    num = 0;
});

//rstuv 67890
var five = document.getElementById('five');
var five_hammer = new Hammer(five);
five_hammer.get('pan').set({direction: Hammer.DIRECTION_ALL});
five_hammer.on("pan", function(event){
    if (event.angle < 170 && event.angle > 90 ){ 
        if (num == 0) {five.style.backgroundImage = 'url(css/five/five_alpha_t.jpg)';}
        else {five.style.backgroundImage = 'url(css/five/five_num_t.jpg)';}
    }
    else if (event.angle >= -65 && event.angle < 10){ 
        if (num == 0) {five.style.backgroundImage = 'url(css/five/five_alpha_v.jpg)';}
        else {five.style.backgroundImage = 'url(css/five/five_num_v.jpg)';}
    }
    else if (event.angle >= -115 && event.angle < -65){ 
        if (num == 0) {five.style.backgroundImage = 'url(css/five/five_alpha_s.jpg)';}
        else {five.style.backgroundImage = 'url(css/five/five_num_s.jpg)';}
    }
    else if (event.angle >= 170 || event.angle < -115){ 
        if (num == 0) {five.style.backgroundImage = 'url(css/five/five_alpha_r.jpg)';}
        else {five.style.backgroundImage = 'url(css/five/five_num_r.jpg)';}
    }
    else if (event.angle >= 10 && event.angle <= 90){ 
        if (num == 0) {five.style.backgroundImage = 'url(css/five/five_alpha_u.jpg)';}
        else {five.style.backgroundImage = 'url(css/five/five_num_u.jpg)';}
    }
});
five_hammer.on("panend", function(event){
    if (num == 0) {five.style.backgroundImage = 'url(css/five/five_alpha.jpg)';}
    else {five.style.backgroundImage = 'url(css/five/five_num.jpg)';}

    if (event.angle < 170 && event.angle > 90 ){ 
        if (num == 0) {write.textContent = write.textContent + "t";}
        else {write.textContent = write.textContent + "7";}
    }
    else if (event.angle >= -65 && event.angle < 10){ 
        if (num == 0) {write.textContent = write.textContent + "v";}
        else {write.textContent = write.textContent + "0";}
    }
    else if (event.angle >= -115 && event.angle < -65){ 
        if (num == 0) {write.textContent = write.textContent + "s";}
        else {write.textContent = write.textContent + "8";}
    }
    else if (event.angle >= 170 || event.angle < -115){ 
        if (num == 0) {write.textContent = write.textContent + "r";}
        else {write.textContent = write.textContent + "6";}
    }
    else if (event.angle >= 10 && event.angle <= 90){ 
        if (num == 0) {write.textContent = write.textContent + "u";}
        else {write.textContent = write.textContent + "9";}
    }
});

//wxyz
var six = document.getElementById('six');
var six_hammer = new Hammer(six);
six_hammer.get('pan').set({direction: Hammer.DIRECTION_ALL});
six_hammer.on("tap", function(event){ 
    if (num == 0) {write.textContent = write.textContent + "z";}
    else {write.textContent = write.textContent + ",";}
});
six_hammer.on("pan", function(event){
    if (event.angle < -70 && event.angle > -120 ){ 
        if (num == 0) {six.style.backgroundImage = 'url(css/six/six_alpha_y.jpg)';}
        else {six.style.backgroundImage = 'url(css/six/six_num_y.jpg)';}
    }
    else if (event.angle > -160 && event.angle <= -120){ 
        if (num == 0) {six.style.backgroundImage = 'url(css/six/six_alpha_x.jpg)';}
        else {six.style.backgroundImage = 'url(css/six/six_num_x.jpg)';}
    }
    else if (event.angle <= -160 || event.angle > 150){ 
        if (num == 0) {six.style.backgroundImage = 'url(css/six/six_alpha_w.jpg)';}
        else {six.style.backgroundImage = 'url(css/six/six_num_w.jpg)';}
    }
    else {
        if (num == 0) {six.style.backgroundImage = 'url(css/six/six_alpha_z.jpg)';}
        else {six.style.backgroundImage = 'url(css/six/six_num_z.jpg)';}
    }
});
six_hammer.on("panend", function(event){
    one.style.backgroundImage = 'url(css/one/one_alpha.jpg)';
    two.style.backgroundImage = 'url(css/two/two_alpha.jpg)';
    three.style.backgroundImage = 'url(css/three/three_alpha.jpg)';
    four.style.backgroundImage = 'url(css/four/four_alpha.jpg)';
    five.style.backgroundImage = 'url(css/five/five_alpha.jpg)';
    six.style.backgroundImage = 'url(css/six/six_alpha.jpg)';

    if (event.angle < -70 && event.angle > -120 ){
        if (num == 0) {write.textContent = write.textContent + "y";}
        else {write.textContent = write.textContent + "'";}
    }
    else if (event.angle > -160 && event.angle < -120){
        if (num == 0) {write.textContent = write.textContent + "x";}
        else {write.textContent = write.textContent + "~";}
    }
    else if (event.angle <= -160 || event.angle > 150){
        if (num == 0) {write.textContent = write.textContent + "w";}
        else {write.textContent = write.textContent + ".";}
    }
    else {
        if (num == 0) {write.textContent = write.textContent + "z";}
        else {write.textContent = write.textContent + ",";}
    }

    num = 0;
});

//space-bar period comma 
var seven = document.getElementById('seven');

seven.addEventListener('touchmove', function(e) {
    e.preventDefault();
}, false);

var seven_hammer = new Hammer.Manager(seven);

var singleTap = new Hammer.Tap({event: 'singletap'});
var doubleTap = new Hammer.Tap({event: 'doubletap', taps: 2 });
var tripleTap = new Hammer.Tap({event: 'tripletap', taps: 3 });

seven_hammer.add([tripleTap, doubleTap, singleTap]);
seven_hammer.add(new Hammer.Swipe());

seven_hammer.get('swipe').set({ direction : Hammer.DIRECTION_ALL });

tripleTap.recognizeWith([doubleTap, singleTap]);
doubleTap.recognizeWith(singleTap);

doubleTap.requireFailure(tripleTap);
singleTap.requireFailure([tripleTap, doubleTap]);

seven_hammer.on("singletap", function(event){ 
    write.textContent = write.textContent + " ";
});
seven_hammer.on("doubletap", function(event){ 
    write.textContent = write.textContent + ".";
});
seven_hammer.on("tripletap", function(event){ 
    write.textContent = write.textContent + ",";
});

//switch to numeric keyboard
seven_hammer.on("swipeup swipedown", function(event){
    if (num == 0) { 
        num = 1;
        one.style.backgroundImage = 'url(css/one/one_num.jpg)';
        two.style.backgroundImage = 'url(css/two/two_num.jpg)';
        three.style.backgroundImage = 'url(css/three/three_num.jpg)';
        four.style.backgroundImage = 'url(css/four/four_num.jpg)';
        five.style.backgroundImage = 'url(css/five/five_num.jpg)';
        six.style.backgroundImage = 'url(css/six/six_num.jpg)';
    }
    else { 
        num = 0;
        one.style.backgroundImage = 'url(css/one/one_alpha.jpg)';
        two.style.backgroundImage = 'url(css/two/two_alpha.jpg)';
        three.style.backgroundImage = 'url(css/three/three_alpha.jpg)';
        four.style.backgroundImage = 'url(css/four/four_alpha.jpg)';
        five.style.backgroundImage = 'url(css/five/five_alpha.jpg)';
        six.style.backgroundImage = 'url(css/six/six_alpha.jpg)';
    }
});

seven_hammer.on("swipeleft", function(event){
    write.textContent = write.textContent.substring(0, write.textContent.length - 1);
});

//prevent zoom on double-tap
$(document).click(function(event) {
    element = document.elementFromPoint(event.clientX, event.clientY);
    if (document.contains(element)) {
        event.preventDefault();
    }
});