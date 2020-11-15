var spaceKey = false;

function keyPressed() {
    if (keyCode === 32) {
        spaceKey = true;
        
    }
}

function keyReleased() {
    if (keyCode === 32) {
        spaceKey = false;
    }
}

function LASERREYESSSS() {
    if (spaceKey) {
        strokeWeight(12);
        stroke(255, 0, 0);
        line(pose.keypoints[1].position.x, pose.keypoints[1].position.y, lookX, lookY);
        line(pose.keypoints[2].position.x, pose.keypoints[2].position.y, lookX, lookY);
        strokeWeight(8);
        stroke(255);
        line(pose.keypoints[1].position.x, pose.keypoints[1].position.y, lookX, lookY);
        line(pose.keypoints[2].position.x, pose.keypoints[2].position.y, lookX, lookY);
    }
}