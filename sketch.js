const width = 480;
const height = 360;

let video;
let poseNet;
let pose;

function setup() {
    //Usual Canvas Setup
    createCanvas(width, height);
    //Creating capture using only video (p5js)
    video = createCapture(VIDEO);
    video.size(width, height);
    video.hide();
    //Adding poseNet and sending HTMLVideoElement to video; callback:modelLoaded
    poseNet = ml5.poseNet(video, modelLoaded);
    poseNet.on('pose', gotPoses); //Initiates when a "pose" is detected;  callback: gotPoses(poses)
}

function gotPoses(poses) {
    //poses are the people it detects on video
    console.log(poses);

    if (poses.length > 0) {
        pose = poses[0].pose;
    }
}

function modelLoaded() {
    console.log('Model Loaded!');
}

function draw() {
    translate(video.width, 0);
    scale(-1, 1);
    image(video, 0, 0, width, height);

    if (pose) {
        drawFacePoints();
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
            strokeWeight(4);
            ellipse(x, y, 16, 16);
        }
    }
}

