// Pretty circles on the homepage
(function(){
    var stage;
    var circles;
    var colors = [{r:253,g:253,b:253}];

    function init() {
        initStage();
        initCircles();
        moveCircles();
        animate();
    }

    function initStage() {
        stage = new createjs.Stage("circles");
        stage.canvas.width = window.innerWidth;
        stage.canvas.height = window.innerHeight;
    }

    function initCircles() {
        circles = [];
        var n = 30;
        for(var i=0; i<n; i++) {
            var circle = new createjs.Shape();
            var r = 2 + Math.random()*6;
            var x = Math.random()*stage.canvas.width;
            var y = Math.random()*stage.canvas.height;
            var color = colors[Math.floor(i%colors.length)];
            var alpha = 0.2 + Math.random()*0.5;
            circle.alpha = alpha;
            circle.radius = r;
            circle.graphics.beginFill('rgb('+color.r+','+color.g+','+color.b+')').drawCircle(0, 0, r);
            circle.x = x;
            circle.y = y;
            circles.push(circle);
            stage.addChild(circle);
        }
    }

    function animate() {
        /*createjs.Ticker.addEventListener("tick", handleTick);*/
        handleTick();
        requestAnimationFrame(animate);
        
    }

    function moveCircles() {
        for(var i= 0, l=circles.length; i<l; i++) {
            shiftCircle(circles[i]);
        }
    }

    function shiftCircle(c) {
        var x = -100 + Math.random()*200;
        var y = -100 + Math.random()*200;
        var delay = Math.random()*1.5;
        var radius = 2 + Math.random()*6;
        var scale = radius/c.radius;
        var a = 0.2 + Math.random()*0.5;
        TweenLite.to(c, 1.3, {x: c.x + x, y: c.y + y, scaleX: scale, scaleY: scale, alpha: a, ease:Quad.easeInOut,
            delay: delay, onComplete: function() {
            shiftCircle(c);
        }});
    }

    function handleTick(event) {
        stage.update();
    }

    window.onload = function() { init() };
})();
