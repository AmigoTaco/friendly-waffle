let player = {
  x: 0,
  y: 0,
  speed : 5,
  keypressed : [],
  moveX: function(t){
    this.x+=t;
  },
  moveY: function(t){
    this.y+=t;
  },
  draw: function(ctx){
    ctx.beginPath();
    ctx.arc(this.x, this.y, 20, 0, 2 * Math.PI);
    ctx.stroke();
  },
  logic : function () {
    for (let i = 0; i < this.keypressed.length; i++) {
      let key = this.keypressed[i];

      switch (key) {
        case 87: this.moveY(-1*this.speed);
        break;
        case 83: this.moveY(this.speed);
        break;
        case 65: this.moveX(-1*this.speed);
        break;
        case 68: this.moveX(this.speed);
        break;
      }
    }
  },
  keyDownListener : function (key){
    let index = this.keypressed.indexOf(key);
    if (index == -1) this.keypressed.push(key);
  },
  keyUpListener : function (key){
    let index = this.keypressed.indexOf(key);
    this.keypressed.splice(index, 1);
  }
}

let c = document.querySelector("#c");
let ctx = c.getContext("2d");

let game = {
  context : ctx,
  interval : 1,
  count : 0,
  interval_id : null,
  gameObjects : [],
  init : function () {
    document.querySelector("body").addEventListener("keydown", this.keyDownListener);
    document.querySelector("body").addEventListener("keyup", this.keyUpListener);
  },
  start : function () {
    window.game = this;
    this.gameObjects.push(player);
    this.interval_id = setInterval(this.loop, this.interval);
  },
  draw : function (gameObjects) {
    this.clearScreen();
    for (let i = 0; i < this.gameObjects.length; i++){
      this.gameObjects[i].draw(this.context);
    }
  },
  clearScreen : function () {
    this.context.fillStyle = "#FFFFFF";
    this.context.fillRect(0,0,800,600);
  },
  loop : function() {
    game = window.game;
    game.logic();
    game.draw();
  },
  stop : function () {
    clearInterval(game.interval_id);
  },
  logic: function () {
    for (let i = 0; i < this.gameObjects.length; i++){
      this.gameObjects[i].logic();
    }
  },
  keyDownListener: function (e) {
    game = window.game;
    //e.keyCode "81" | e.code "keyQ"  | e.key = "q"
    if ( e.keyCode == 27 ) game.stop();
    for (let i = 0; i < game.gameObjects.length; i++){
      game.gameObjects[i].keyDownListener(e.keyCode);
    }
  },
  keyUpListener: function (e) {
    game = window.game;
    for (let i = 0; i < game.gameObjects.length; i++){
      game.gameObjects[i].keyUpListener(e.keyCode);
    }
  }
}
game.init();
