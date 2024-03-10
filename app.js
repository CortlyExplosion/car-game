const app = new PIXI.Application();
const ufoList = [];
document.body.appendChild(app.view);

window.onload = function () {
  if (!localStorage.getItem("visited")) {
    alert(
      "Zoomout to 90%! Move your car with the arrows and press space on your keyboard!"
    );
    localStorage.setItem("visited", true);
  }
};

const rocket = PIXI.Sprite.from("bilder/car.png");
rocket.x = 350;
rocket.y = 435;
rocket.scale.x = 0.1;
rocket.scale.y = 0.1;
app.stage.addChild(rocket);

gameInterval(function () {
  const ufo = PIXI.Sprite.from("bilder/hinderniss" + random(1, 2) + ".png");
  ufo.x = random(0, 700);
  ufo.y = -25;
  ufo.scale.x = 0.08;
  ufo.scale.y = 0.08;
  app.stage.addChild(ufo);
  flyDown(ufo, 1);
  ufoList.push(ufo);
  waitForCollision(ufo, rocket).then(function () {
    app.stage.removeChild(rocket);
    stopGame();
  });
}, 150);

function leftKeyPressed() {
  rocket.x = rocket.x - 5;
}

function rightKeyPressed() {
  rocket.x = rocket.x + 5;
}

function spaceKeyPressed() {
  const bullet = PIXI.Sprite.from("bilder/bullet.png");
  bullet.x = rocket.x + 22;
  bullet.y = 450;
  bullet.scale.x = 0.05;
  bullet.scale.y = 0.05;
  app.stage.addChild(bullet);
  flyUp(bullet, 5);

  waitForCollision(bullet, ufoList).then(function ([bullet, ufo]) {
    app.stage.removeChild(bullet);
    app.stage.removeChild(ufo);
  });
}
