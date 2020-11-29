const width = window.innerWidth;
const height = window.innerHeight;
const videoWidth = 480;
const videoHeight = 360;

let video;
let poseNet;
let pose;

var lookScriptBool = true;
var facePntBool = false;
var visAimBool = false;
var visMpBool = false;
var laserEyesBool = true;

function setup() {
    //Usual Canvas Setup
    createCanvas(width, height);
    //document.getElementsByTagName('canvas')[0].style.transform = 'translate(' + -videoWidth/2 + 'px,' + -videoHeight/2 + 'px)';
    //Creating capture using only video (p5js)
    video = createCapture(VIDEO);
    video.size(videoWidth, videoHeight);
    video.hide();
    //Adding poseNet and sending HTMLVideoElement to video; callback: modelLoaded()
    poseNet = ml5.poseNet(video, modelLoaded);
    poseNet.on('pose', gotPoses); //Initiates when a "pose" is detected;  callback: gotPoses(poses)
    //Adding background color to toggle buttons
    showToggle('all');
}

function gotPoses(poses) {
    //poses are the people it detects on video
    //console.log(poses);

    if (poses.length > 0) {
        pose = poses[0].pose;
    }
}

function modelLoaded() {
    console.log('Model Loaded!');
}

function toggle(thing) {
    switch(thing) {
        case 'lookScrp':
            lookScriptBool = !lookScriptBool;
            showToggle(thing, lookScriptBool);
        break;
        case 'facepnts':
            facePntBool = !facePntBool;
            showToggle(thing, facePntBool);
        break;
        case 'aimer':
            visAimBool = !visAimBool;
            showToggle(thing, visAimBool);
        break;
        case 'mpAvg':
            visMpBool = !visMpBool;
            showToggle(thing, visMpBool);
        break;
        case 'lsrEyes':
            laserEyesBool = !laserEyesBool;
            showToggle(thing, laserEyesBool);
        break;
    }
}

function showToggle(bttn, bool) {
    if (bttn === "all") {
        let arr = [lookScriptBool, facePntBool, visAimBool, visMpBool, laserEyesBool];
        for (let i = 0; i < arr.length; i++) {
            if (arr[i]) {
                document.getElementsByClassName('toggleBttn')[i].style.backgroundColor = "#95ff7d";
            } else {
                document.getElementsByClassName('toggleBttn')[i].style.backgroundColor = "#ff7d7d";
            }
        }
    } else {
        if (bool) {
            document.getElementById(bttn).style.backgroundColor = "#95ff7d";
        } else {
            document.getElementById(bttn).style.backgroundColor = "#ff7d7d";
        }
    }
}

function draw() {
    background(255);
    translate(width/2 + videoWidth/2, height/2 - videoHeight/2);
    scale(-1, 1);
    image(video, 0, 0, videoWidth, videoHeight);

    if (pose) {
        if (facePntBool) {
            drawFacePoints();
        }
        if (lookScriptBool) {
            findCenterFace();
            if (visAimBool) {
                drawLookPoint();
            }
            if (visMpBool) {
                drawCenterPoint();
            }
        }
    }
    if (laserEyesBool) {
        LASERREYESSSS();
    }
}

function drawFacePoints() {
    for (let i = 0; i < 5; i++) {
        let x = pose.keypoints[i].position.x;
        let y = pose.keypoints[i].position.y; 
        let score = pose.keypoints[i].score;
        if (score > 0.2) {
            fill(255);
            stroke(0);
            strokeWeight(2);
            ellipse(x, y, 16, 16);
        }
    }
}

