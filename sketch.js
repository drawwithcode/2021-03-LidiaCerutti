var song;
var button;
var fft;

var volhistory = [];

function preload() {
  song = loadSound("./assets/rickroll.mp3");
  //img = loadImage("./assets/plugin.png");
  img = loadImage("./assets/logic.png");
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  let col = color("SkyBlue");
  //button
  button = createButton("play");
  button.style("font-size", "50px");
  button.style("background-color", col);
  button.position(windowWidth / 2.2, windowHeight / 1.4);
  button.mousePressed(toggleSong);

  //amp
  amp = new p5.Amplitude();
}

function toggleSong() {
  if (song.isPlaying()) {
    song.pause();

    button.html("play");
  } else {
    song.play();
    button.html("stop");
    song.setVolume(0.3);
  }
}

function draw() {
  background(0);
  // image(img, windowWidth / 3.5, windowHeight / 3.15);
  img.resize(windowWidth, windowHeight);
  image(img, 0, 0);

  //white stroke
  var vol = amp.getLevel();
  volhistory.push(vol);
  stroke("SkyBlue");
  noFill();

  push();
  var currentY = map(vol, 0, 1, height, 0);

  translate(windowWidth / 4, height / 2.65 - currentY); //center everything
  beginShape();
  for (var i = 0; i < volhistory.length; i++) {
    var y = map(volhistory[i], 0, 1, height, 0);
    vertex(i, y);
  }
  endShape();
  /*//red stroke
  stroke("red");
  line(volhistory.length, 0, volhistory.length, height * 2); */
  pop();

  if (volhistory.length > width - windowWidth / 2) {
    volhistory.splice(0, 1);
  }

  /*if (song.play == true) {
    fill("red");
    ellipse(1500, 100, 30, 30, "red");
  } else {
    noFill();
    ellipse(1500, 100, 30, 30);
  } */
}
