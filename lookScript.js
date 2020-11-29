var centerFaceX = 0;
var centerFaceY = 0;

var lookX = 0;
var lookY = 0;
var xSensitivity = 0.4;
var ySensitivity = 0.1;

function calcMidpoint(x1, y1, x2, y2) {
    return [(x1 + x2)/2, (y1 + y2)/2];
}

function findCenterFace() {
    let nose = pose.keypoints[0].position;
    let leftEye = pose.keypoints[1].position;
    let rightEye = pose.keypoints[2].position;
    let mpEyes = calcMidpoint(leftEye.x, leftEye.y, rightEye.x, rightEye.y);
    let mpRight = calcMidpoint(nose.x, nose.y, rightEye.x, rightEye.y); 
    let mpLeft = calcMidpoint(nose.x, nose.y, leftEye.x, leftEye.y);
    centerFaceX = (mpEyes[0] + mpRight[0] + mpLeft[0]) / 3;
    centerFaceY = (mpEyes[1] + mpRight[1] + mpLeft[1]) / 3;

    findLookPoint();
}

function findLookPoint() {
    let nose = pose.keypoints[0].position;
    let earLeft = pose.keypoints[3];
    let earRight = pose.keypoints[4];
    xDiff = nose.x - centerFaceX;
    if (earLeft.score > 0.2 && earRight.score > 0.2) {
        yDiff = centerFaceY - ((earLeft.position.y + earRight.position.y)/2);
    } else {
        if (earLeft.score > 0.2) {
            yDiff = centerFaceY - earLeft.position.y;
        } else if (earRight.score > 0.2) {
            yDiff = centerFaceY - earRight.position.y;
        }
    }
    lookX = centerFaceX + (centerFaceX * xDiff * xSensitivity);
    lookY = centerFaceY + (centerFaceY * yDiff * ySensitivity);
}

function drawCenterPoint() {
    fill(70, 255, 57);
    stroke(0);
    strokeWeight(2);
    ellipse(centerFaceX, centerFaceY, 16, 16);
}

function drawLookPoint() {
    fill(255, 70, 57);
    stroke(0);
    strokeWeight(2);
    ellipse(lookX, lookY, 16, 16);
}
