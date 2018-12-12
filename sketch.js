var font,
    fontsize = 10

var ctracker;
var slider;
var val = 5;
var positions;
let srcTextEye = "eye";
let srcTextEyebrow = "eyebrows";
let srcTextNose = "nose";
let srcTextMouth = "mouth";
let srcTextJaw = "myfacesjawline"
var rix, riy, lex, ley;
var eyebrows = [19, 20, 21, 22, 18, 17, 16, 15];
var nose1 = [33, 41, 62, 37];
var nose2 = [35, 42, 43, 39];
var mouth1 = [44, 56, 57, 58, 50];
var mouth2 = [44, 61, 60, 59, 50];

function setup() {

    // setup camera capture
    var videoInput = createCapture();
    videoInput.size(400, 300);
    videoInput.position(200, 150);

    // setup canvas
    var cnv = createCanvas(800, 600);
    cnv.position(0, 0);

    // setup tracker
    ctracker = new clm.tracker();
    ctracker.init(pModel);
    ctracker.start(videoInput.elt);

    //font
    textFont('Georgia');
    textAlign(CENTER, CENTER);
    textSize(10);

}


function draw() {

    clear();
    background(255);

    // get array of face marker positions [x, y] format
    positions = ctracker.getCurrentPosition();

    for (var i = 0; i < positions.length; i++) {

        //eyebrows
        for (let i = 0; i < srcTextEyebrow.length; i++) {
            text(srcTextEyebrow.charAt(i), positions[eyebrows[i]][0], positions[eyebrows[i]][1]);
        }

        //eyes
        rix = positions[27][0];
        riy = positions[27][1];
        lex = positions[32][0];
        ley = positions[32][1];

        for (let j = 0; j < srcTextEye.length; j++) {
            push();
            textSize(20 / (pow(1 - j, 2) + 1));
            text(srcTextEye.charAt(j), rix - 10, riy);
            rix = rix + 10;
            riy = positions[27][1];
            text(srcTextEye.charAt(j), lex - 10, ley);
            lex = lex + 10;
            ley = positions[32][1];
            pop();
        }

        //Nose
        for (let i = 0; i < srcTextNose.length; i++) {
            text(srcTextNose.charAt(i), positions[nose1[i]][0], positions[nose1[i]][1]);
            text(srcTextNose.charAt(i), positions[nose2[i]][0], positions[nose2[i]][1]);
        }

        //Mouth
        for (let i = 0; i < srcTextMouth.length; i++) {
            push();
            textSize(20 / (pow(2 - i, 2) + 1));
            text(srcTextMouth.charAt(i), positions[mouth1[i]][0], positions[mouth1[i]][1]);
            text(srcTextMouth.charAt(i), positions[mouth2[i]][0], positions[mouth2[i]][1]);
            pop();
        }

        //Jawline
        for (let i = 0; i < 14; i++) {
            push();
            text(srcTextJaw.charAt(i), positions[i][0], positions[i][1]);
            pop();
        }

        //mouth blob
        if (positions[57][1] - positions[60][1] > 5) {
            for (let i = 0; i < srcTextMouth.length; i++) {
                push();
                noFill();
                stroke(1);
                textSize(3 + Math.pow(frameCount % 40, 1.5));
                text(srcTextMouth.charAt(i), pow(mouth2[i], 3) + positions[57][0], positions[60][1]);
                pop();
            }
        } else {
            textSize(10);
        }

        pattern();
    }
}

function pattern() {
    translate(canvas.width/2,  canvas.height/2);
    //ellipse(0,0, 100,100);
    rotate(mouseX);
    //frameRate(15);
}



function mouseClicked() {
    save('myCanvas.png');
}
