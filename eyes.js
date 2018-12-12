// The message to be displayed
var eyeText  = "this is eye";
var sourceText = sourceText.toUpperCase();
var r = 20;

var font,
  fontsize = 16

function preload() {
  //font = loadFont('assets/SourceSansPro-Regular.otf');
}

function setup() {
  createCanvas(320, 320);
  textAlign(CENTER);
  smooth();
}

function draw() {
  background(255);

  // Start in the center and draw the circle
  translate(width / 2, height / 2);
  noFill();
  stroke(0);
  //ellipse(0, 0, r*2, r*2);

  // We must keep track of our position along the curve
  var arclength = 0;

  // For every box
  for (var i = 0; i < sourceText.length; i++)
  {
    // Instead of a constant width, we check the width of each character.
    var currentChar = sourceText.charAt(i);
    var w = textWidth(currentChar);

    // Each box is centered so we move half the width
    arclength += w/2;
    // Angle in radians is the arclength divided by the radius
    // Starting on the left side of the circle by adding PI
    var theta = PI + arclength /r;

    push();
    // Polar to cartesian coordinate conversion
		rotate(sin(frameCount*0.04));
    translate(r*cos(theta), r*sin(theta));
    // Rotate the box
    rotate(theta+PI/2); // rotation is offset by 90 degrees
    // Display the character
    fill(0);
    text(currentChar,0,0);
    pop();
    // Move halfway again
    arclength += w/2;
  }
}
