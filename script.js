let MAX_WIDTH = 800, SCREEN_RATIO = 1.3;
let colors = ['',
              '#000000',
              '#FFFFFF',
              '#515151', //Outline hoodie       3
              '#585858', //inner hoodie         4
              '#a98c5d', //Outline skin         5
              '#bfa375', //inner skin           6
              '#33313a', //Outline pants        7
              '#3b3942', //inner pants          8
              '#5e4f43', //shoes                9
            ];

function createCollider(x, y, width, height) {
  console.log("createCollider")
  let collider = {
    x : x,
    y : y,
    width : width,
    height: height,
    isCollision: function (object){
      return true;
    },
    draw : function (context) {
      //context.rect(this.x, this.y, this.width, this.height);
      //context.stroke();
    }
  }

  return collider;
}

let rooms = [
  {
    background : [
      [1,2,3,4,5,6,7,8,9],
      [1,2,3,4,5,6,7,8,9],
      [1,2,3,4,5,6,7,8,9],
      [1,2,3,4,5,6,7,8,9],
      [1,2,3,4,5,6,7,8,9]
    ],
    pixelWeight : 5,
    name : "Room",
    objects : [],
    init : function () {
      this.objects.push(createCollider(100,100,100,100))
    },
    logic :function () {

    },
    draw : function (context) {
      for (let i = 0; i < this.background.length; i++)
      for (let j = 0; j < this.background[i].length; j++) {
        if (this.background[i][j]!='') {
          context.fillStyle = colors[ this.background[i][j] ];
          context.fillRect(this.pixelWeight * j, this.pixelWeight * i, this.pixelWeight, this.pixelWeight);
        }
      }
    }
  }
]

rooms[0].init();

let player = {
  x: 0,
  y: 0,
  radius : 20,
  width: 40,
  height: 40,
  speed : 1,
  keypressed : [],
  facingLeft : false,
  sprite : [
    [   //Stand
      [0,0,0,3,3,3,3,3,3],
      [0,3,3,3,4,4,4,4,3],
      [0,3,4,4,4,4,3,3,0],
      [3,4,4,4,4,4,3,6,5],
      [3,4,4,4,4,4,3,6,5],
      [3,4,4,4,4,4,3,6,5],
      [0,3,4,4,4,4,3,6,5],
      [0,3,3,4,4,4,3,5,0],
      [0,0,0,3,3,3,3,0,0],
      [0,0,3,4,3,4,3,0,0],
      [0,0,3,4,3,4,3,0,0],
      [0,0,3,4,3,4,3,0,0],
      [0,0,3,4,3,4,3,0,0],
      [0,0,3,4,3,4,3,0,0],
      [0,0,3,4,3,4,3,0,0],
      [0,0,3,3,5,3,3,0,0],
      [0,0,7,8,8,8,7,0,0],
      [0,0,7,8,8,8,7,0,0],
      [0,0,0,7,8,7,0,0,0],
      [0,0,0,7,8,7,0,0,0],
      [0,0,0,7,8,7,0,0,0],
      [0,0,0,7,8,7,0,0,0],
      [0,0,0,7,7,7,0,0,0],
      [0,0,0,9,9,9,9,0,0],
    ],
    [   //Walk
      [0,0,0,3,3,3,3,3,3],
      [0,3,3,3,4,4,4,4,3],
      [0,3,4,4,4,4,3,3,0],
      [3,4,4,4,4,4,3,6,5],
      [3,4,4,4,4,4,3,6,5],
      [3,4,4,4,4,4,3,6,5],
      [0,3,4,4,4,4,3,6,5],
      [0,3,3,4,4,4,3,5,0],
      [0,0,0,3,3,3,3,0,0],
      [0,0,3,4,3,4,3,0,0],
      [0,0,3,4,3,4,3,0,0],
      [0,0,3,4,3,4,3,0,0],
      [0,0,3,4,3,4,3,0,0],
      [0,0,3,4,3,4,3,0,0],
      [0,0,3,4,3,4,3,0,0],
      [0,0,3,3,5,3,3,0,0],
      [0,0,7,8,8,8,7,0,0],
      [0,0,7,8,8,7,7,0,0],
      [0,0,7,8,7,8,7,0,0],
      [0,0,7,8,7,8,7,0,0],
      [0,0,7,7,0,7,7,0,0],
      [0,7,7,0,0,7,7,0,0],
      [9,7,0,0,0,7,7,0,0],
      [9,9,9,0,0,9,9,9,0],
    ]
  ],
  pixelWeight : 5,
  activeSprite: 0,
  animCount : 0,
  moveX: function(t){
    this.x+=t;
  },
  moveY: function(t){
    this.y+=t;
  },
  draw: function(ctx){
    for (let i = 0; i < this.sprite[this.activeSprite].length; i++)
    for (let j = 0; j < this.sprite[this.activeSprite][i].length; j++) {
      if (this.sprite[this.activeSprite][i][j]!='') {
        ctx.fillStyle = colors[ this.sprite[this.activeSprite][i][j] ];
        if (this.facingLeft)
          ctx.fillRect(this.x + (this.pixelWeight * (this.sprite[this.activeSprite][i].length - j)),
          this.y + (this.pixelWeight * i), this.pixelWeight, this.pixelWeight);
        else
          ctx.fillRect(this.x + (this.pixelWeight * j), this.y + (this.pixelWeight * i), this.pixelWeight, this.pixelWeight);
      }
    }
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

    if (this.keypressed.length > 0) this.animCount++; else this.animCount = 200;
    if (this.animCount>50) this.activeSprite = 1;
    if (this.animCount>100) {
      this.activeSprite = 0;
      this.animCount = 0;
    }
  },
  keyDownListener : function (key){
    let index = this.keypressed.indexOf(key);
    if (index == -1) this.keypressed.push(key);
    if (key == 65 || key == 68 ) {
      if (key == 65) this.facingLeft = true; else this.facingLeft = false;
    }
  },
  keyUpListener : function (key){
    let index = this.keypressed.indexOf(key);
    this.keypressed.splice(index, 1);
  },
  init : function () {
    this.radius = screen.width < MAX_WIDTH ? screen.width * this.radius / MAX_WIDTH  : this.radius;
    this.width = screen.width < MAX_WIDTH ? screen.width * this.width / MAX_WIDTH  : this.width;
    this.height = screen.width < MAX_WIDTH ? (screen.width / SCREEN_RATIO) * this.height / (MAX_WIDTH / SCREEN_RATIO)  : this.height;
    console.log(this)
  }
}

player.init()


let game = {
  context : '',
  interval : 1,
  count : 0,
  interval_id : null,
  gameObjects : [],
  rooms : rooms,
  activeRoom : 0,
  init : function () {
    let body = document.querySelector("body");
    body.addEventListener("keydown", this.keyDownListener);
    body.addEventListener("keyup", this.keyUpListener);
    let canvas =  document.createElement("canvas");
    canvas.id = "c";
    canvas.style ="margin:auto;display:block;border:1px solid";
    canvas.width = screen.width < MAX_WIDTH ? screen.width : MAX_WIDTH;
    canvas.height = canvas.width / SCREEN_RATIO;
    this.context = canvas.getContext("2d");
    body.appendChild(canvas);
  },
  start : function () {
    window.game = this;
    this.gameObjects.push(player);
    this.interval_id = setInterval(this.loop, this.interval);
  },
  draw : function (gameObjects) {
    this.clearScreen();
    this.rooms[this.activeRoom].draw(this.context);
    for (let i = 0; i < this.gameObjects.length; i++)
      this.gameObjects[i].draw(this.context);
  },
  clearScreen : function () {
    this.context.fillStyle = "#FFFFFF";
    this.context.fillRect(0,0,900,700);
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
    for (let i = 0; i < this.gameObjects.length; i++)
      this.gameObjects[i].logic();

    //this.rooms[this.activeRoom].logic();
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
