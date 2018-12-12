
var x = 0, y = 0;
var stepSize = 5.0;
var letters = "importance";
var fontSizeMin = 3;
var angleDistortion = 0.0;
var counter = 0;


function setup() {
  // use full screen size
  createCanvas(780, 780);
  background(255);
  smooth();

  x = mouseX;
  y = mouseY;

  textAlign(CENTER, CENTER);
  fill(0);

}

function draw() {
    var d = dist(x,y, mouseX,mouseY);
    textFont('Georgia');
    textSize(fontSizeMin+d/2)
    var newLetter = letters.charAt(counter);;
    stepSize = textWidth(newLetter);

    if (d > stepSize) {
      var angle = atan2(mouseY-y, mouseX-x);

      push();
      translate(x, y);
      rotate(angle + random(angleDistortion));
      text(newLetter, 0, 0);
      pop();

      counter++;
     if (counter > letters.length-1) counter = 0;

      x = x + cos(angle) * stepSize;
      y = y + sin(angle) * stepSize;
  }
}
