var cvs = document.getElementById("canvas");
var ctx = cvs.getContext("2d");

let sign1 = document.querySelector("#HP1");
let sign2 = document.querySelector("#HP2");

var firstTank = new Image();
var secondTank = new Image();
var shell = new Image();
var background = new Image();
var groundHitImg = new Image();
var tankHitImg = new Image();
var shotImg = new Image();

var scale = 1;

firstTank.src = "images/FirstTank.png";
secondTank.src = "images/SecondTank.png";
shell.src = "images/shell.png";
background.src = "images/Background.png";
groundHitImg.src = "images/groundHit.png";
tankHitImg.src = "images/tankHit.png";
shotImg.src = "images/Shot.png";

window.addEventListener("keydown", function (e) { KeyDown(e); });

//stats
var firstHP = 2000;
var secondHP = 2000;
var averageDamage = 150;
var damageScatter = Math.round(averageDamage * 0.5);
var firstCurrentDamage = 0;
var secondCurrentDamage = 0;
var shotTime = 0.5;
var hitGroundTime = 1.5;
var hitTankTime = 1;

//Params
var speed = 6;
var aimingSpeed = 1;
var shellSpeed = 1200;
var grav = 700;
var firstIsShot = false;
var firstShooting = false;
var secondIsShot = false;
var secondShooting = false;
var minAngle = -5;
var maxAngle = 45;
var firstT = 0;
var secondT = 0;

var firstTankHit = false;
var secondTankHit = false;

//initial shell pos
var firstInitShellXPos = 0;
var firstInitShellYPos = 0;
var secondInitShellXPos = 0;
var secondInitShellYPos = 0;

function groundHit(x, y) {
    ctx.drawImage(groundHitImg, x - groundHitImg.width / 2, y - groundHitImg.height);
}

function tankHit(x, y) {
    ctx.drawImage(tankHitImg, x - groundHitImg.width / 2, y - groundHitImg.height / 2);
}

function Shot(x, y) {
    ctx.drawImage(shotImg, x, y - groundHitImg.height / 2);
}

function KeyDown(e) {
    switch (e.keyCode) {
        case 65: //A
            firstTankXPos -= speed / 2;
            break;

        case 68: //D
            firstTankXPos += speed;
            break;

        case 87: //W
            if (firstTankGunAngle < maxAngle) {
                firstTankGunAngle += aimingSpeed;
            }
            break;

        case 83: //S
            if (firstTankGunAngle > minAngle) {
                firstTankGunAngle -= aimingSpeed;
            }
            break;

        case 17: //ctrl
            firstInitShellXPos = firstTankXPos;
            firstInitShellYPos = firstTankYPos - firstTank.height * scale;
            if (!firstShooting) {
                firstIsShot = true;
                firstT = new Date();
            }
            break;

        case 37: //left
            secondTankXPos -= speed;
            break;

        case 39: //right
            secondTankXPos += speed / 2;
            break;

        case 38: //up
            if (secondTankGunAngle > 180 - maxAngle) {
                secondTankGunAngle -= aimingSpeed;
            }
            break;

        case 40:  //down
            if (secondTankGunAngle < 180 + minAngle) {
                secondTankGunAngle += aimingSpeed;
            }
            break;

        case 13: //enter
            secondInitShellXPos = secondTankXPos;
            secondInitShellYPos = secondTankYPos - secondTank.height * scale;
            if (!secondShooting) {
                secondIsShot = true;
                secondT = new Date();
            }
            break;
    }
}

//Tanks position
var firstTankXPos = 1 + 60;
var firstTankYPos = -0.415 * firstTankXPos + 805.415;
var secondTankXPos = 1920 - 60;
var secondTankYPos = firstTankYPos = 0.472 * firstTankXPos - 165.067;

//Gun angle
var firstTankGunAngle = 0;
var secondTankGunAngle = 180;

//Shell position
var firstShellXPos = 0;
var firstShellYPos = 0;
var secondShellXPos = 0;
var secondShellYPos = 0;

function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}

function draw() {
    ctx.drawImage(background, 0, 0);
    ctx.drawImage(firstTank, firstTankXPos - firstTank.width / 2 * scale, firstTankYPos - firstTank.height * scale, firstTank.width * scale, firstTank.height * scale);
    ctx.drawImage(secondTank, secondTankXPos - secondTank.width / 2 * scale, secondTankYPos - secondTank.height * scale, secondTank.width * scale, secondTank.height * scale);
    //1st tank
    if (firstTankXPos < 0) {
        firstTankXPos = 0;
    }
    if (firstTankXPos >= 1 && firstTankXPos <= 237) {
        firstTankYPos = -0.415 * firstTankXPos + 805.415
    }
    if (firstTankXPos > 237 && firstTankXPos <= 677) {
        firstTankYPos = 707
    }
    if (firstTankXPos > 677 && firstTankXPos <= 860) {
        firstTankYPos = 0.339 * firstTankXPos + 477.634
    }
    if (firstTankXPos > 860 && firstTankXPos <= 1263) {
        firstTankYPos = 769
    }
    if (firstTankXPos > 1263 && firstTankXPos <= 1441) {
        firstTankYPos = -0.629 * firstTankXPos + 1563.697
    }
    if (firstTankXPos > 1441 && firstTankXPos <= 1742) {
        firstTankYPos = 657
    }
    if (firstTankXPos > 1742 && firstTankXPos <= 1920) {
        firstTankYPos = 0.472 * firstTankXPos - 165.067
    }
    if (firstTankXPos > 1920) {
        firstTankXPos = 1920;
    }

    //
    if (firstTankXPos >= secondTankXPos - secondTank.width / 2) {
        firstTankXPos -= (speed * 2);
        secondTankXPos += (speed + speed / 2);
    }

    let firstShotTempTime = new Date();
    if ((firstShotTempTime - firstT) / 1000 < shotTime) {
        Shot(firstTankXPos + firstTank.width / 3, firstTankYPos - firstTank.height / 2);
    }

    let secondShotTempTime = new Date();
    if ((secondShotTempTime - secondT) / 1000 < shotTime) {
        Shot(secondTankXPos - secondTank.width, secondTankYPos - secondTank.height / 2);
    }

    //shooting
    if (firstIsShot) {
        firstTankHit = false;
        firstShooting = true;
        let tempDate = new Date();
        let delta = (tempDate - firstT) / 1000;
        firstShellXPos = firstInitShellXPos + shellSpeed * Math.cos(firstTankGunAngle * 3.14 / 180) * delta;
        firstShellYPos = firstInitShellYPos - shellSpeed * Math.sin(firstTankGunAngle * 3.14 / 180) * delta + grav * Math.pow(delta, 2) / 2;
        ctx.drawImage(shell, firstShellXPos, firstShellYPos, 10, 10);
        //ground hit
        if (firstShellXPos < 0) {
            firstIsShot = false;
        }
        if (firstShellXPos >= 1 && firstShellXPos <= 237) {
            if (firstShellYPos >= -0.415 * firstShellXPos + 805.415) {
                firstIsShot = false;
            }
        }
        if (firstShellXPos > 237 && firstShellXPos <= 677) {
            if (firstShellYPos >= 707) {
                firstIsShot = false;
            }
        }
        if (firstShellXPos > 677 && firstShellXPos <= 860) {
            if (firstShellYPos >= 0.339 * firstShellXPos + 477.634) {
                firstIsShot = false;
            }
        }
        if (firstShellXPos > 860 && firstShellXPos <= 1263) {
            if (firstShellYPos >= 769) {
                firstIsShot = false;
            }
        }
        if (firstShellXPos > 1263 && firstShellXPos <= 1441) {
            if (firstShellYPos >= -0.629 * firstShellXPos + 1563.697) {
                firstIsShot = false;
            }
        }
        if (firstShellXPos > 1441 && firstShellXPos <= 1742) {
            if (firstShellYPos >= 657) {
                firstIsShot = false;
            }
        }
        if (firstShellXPos > 1742 && firstShellXPos <= 1920) {
            if (firstShellYPos >= 0.472 * firstTankXPos - 165.067) {
                firstIsShot = false;
            }
        }
        if (firstShellXPos > 1920) {
            firstIsShot = false;
        }
        let firstHit = false;
        //tank hit
        if (((firstShellXPos >= secondTankXPos - secondTank.width / 2) && (firstShellXPos <= secondTankXPos + secondTank.width / 2)) && ((firstShellYPos >= secondTankYPos - secondTank.height) && (firstShellYPos <= secondTankYPos))) {
            firstHit = true;
            firstTankHit = true;
            firstIsShot = false;
        }
        if (firstHit) {
            firstCurrentDamage = averageDamage + getRandomInt(damageScatter) - Math.round(damageScatter / 2);
            console.log("FIRST HIT! Damage: ", firstCurrentDamage);
            secondHP -= firstCurrentDamage;
            if (secondHP <= 0) {
                secondHP = 0;
            }
            sign2.innerText = secondHP;
            console.log("secondHP: ", secondHP);
        }
    }
    else {
        firstShooting = false;
        if (!firstTankHit) {
            let groundHitTempTime = new Date();
            if ((groundHitTempTime - firstT) / 1000 < hitGroundTime) {
                groundHit(firstShellXPos, firstShellYPos)
            }
        }
        else {
            let tankHitTempTime = new Date();
            if ((tankHitTempTime - firstT) / 1000 < hitTankTime) {
                tankHit(firstShellXPos, firstShellYPos)
            }
        }
    }

    //////////////////////////////////////////////////////2nd tank
    if (secondTankXPos < 0) {
        secondTankXPos = 0;
    }
    if (secondTankXPos >= 1 && secondTankXPos <= 237) {
        secondTankYPos = -0.415 * secondTankXPos + 805.415
    }
    if (secondTankXPos > 237 && secondTankXPos <= 677) {
        secondTankYPos = 707
    }
    if (secondTankXPos > 677 && secondTankXPos <= 860) {
        secondTankYPos = 0.339 * secondTankXPos + 477.634
    }
    if (secondTankXPos > 860 && secondTankXPos <= 1263) {
        secondTankYPos = 769
    }
    if (secondTankXPos > 1263 && secondTankXPos <= 1441) {
        secondTankYPos = -0.629 * secondTankXPos + 1563.697
    }
    if (secondTankXPos > 1441 && secondTankXPos <= 1742) {
        secondTankYPos = 657
    }
    if (secondTankXPos > 1742 && secondTankXPos <= 1920) {
        secondTankYPos = 0.472 * secondTankXPos - 165.067
    }
    if (secondTankXPos > 1920) {
        secondTankXPos = 1920;
    }

    //
    if (secondTankXPos <= firstTankXPos + firstTank.width / 2) {
        secondTankXPos += speed * 2;
        firstTankXPos -= (speed + speed / 2);
    }
    

    //shooting
    if (secondIsShot) {
        secondTankHit = false;
        secondShooting = true;        
        let tempDate = new Date();
        let delta = (tempDate - secondT) / 1000;
        secondShellXPos = secondInitShellXPos + shellSpeed * Math.cos(secondTankGunAngle * 3.14 / 180) * delta;
        secondShellYPos = secondInitShellYPos - shellSpeed * Math.sin((180 - secondTankGunAngle) * 3.14 / 180) * delta + grav * Math.pow(delta, 2) / 2;
        ctx.drawImage(shell, secondShellXPos, secondShellYPos, 10, 10);
        //ground hit
        if (secondShellXPos < 0) {
            secondIsShot = false;
        }
        if (secondShellXPos >= 1 && secondShellXPos <= 237) {
            if (secondShellYPos >= -0.415 * secondShellXPos + 805.415) {
                secondIsShot = false;
            }
        }
        if (secondShellXPos > 237 && secondShellXPos <= 677) {
            if (secondShellYPos >= 707) {
                secondIsShot = false;
            }
        }
        if (secondShellXPos > 677 && secondShellXPos <= 860) {
            if (secondShellYPos >= 0.339 * secondShellXPos + 477.634) {
                secondIsShot = false;
            }
        }
        if (secondShellXPos > 860 && secondShellXPos <= 1263) {
            if (secondShellYPos >= 769) {
                secondIsShot = false;
            }
        }
        if (secondShellXPos > 1263 && secondShellXPos <= 1441) {
            if (secondShellYPos >= -0.629 * secondShellXPos + 1563.697) {
                secondIsShot = false;
            }
        }
        if (secondShellXPos > 1441 && secondShellXPos <= 1742) {
            if (secondShellYPos >= 657) {
                secondIsShot = false;
            }
        }
        if (secondShellXPos > 1742 && secondShellXPos <= 1920) {
            if (secondShellYPos >= 0.472 * secondShellXPos - 165.067) {
                secondIsShot = false;
            }
        }
        if (secondShellXPos > 1920) {
            secondIsShot = false;
        }
        let secondHit = false;
        //tank hit
        if (((secondShellXPos <= firstTankXPos + firstTank.width / 2) && (secondShellXPos >= firstTankXPos - firstTank.width / 2)) && ((secondShellYPos >= firstTankYPos - firstTank.height) && (secondShellYPos <= firstTankYPos))) {
            secondHit = true;
            secondTankHit = true;
            secondIsShot = false;
        }
        if (secondHit) {
            secondCurrentDamage = averageDamage + getRandomInt(damageScatter) - Math.round(damageScatter / 2);
            console.log("SECOND HIT! Damage: ", secondCurrentDamage);
            firstHP -= secondCurrentDamage;
            if (firstHP <= 0) {
                firstHP = 0;
            }
            sign1.innerText = firstHP;
            console.log("firstHP: ", firstHP);
        }
    }
    else {
        secondShooting = false;
        if (!secondTankHit) {
            let groundHitTempTime = new Date();
            if ((groundHitTempTime - secondT) / 1000 < hitGroundTime) {
                groundHit(secondShellXPos, secondShellYPos)
            }
        }
        else {
            let tankHitTempTime = new Date();
            if ((tankHitTempTime - secondT) / 1000 < hitTankTime) {
                tankHit(secondShellXPos, secondShellYPos)
            }
        }
    }
    
    getWinnerInfo();
}

function getWinnerInfo() {
    if (firstHP == 0 || secondHP == 0) {
        if (firstHP == 0) {
            alert("Second WIN!");
            firstTankXPos = 1 + 60;
            firstTankYPos = -0.415 * firstTankXPos + 805.415;
            secondTankXPos = 1920 - 60;
            secondTankYPos = firstTankYPos = 0.472 * firstTankXPos - 165.067;
            firstHP = 2000;
            secondHP = 2000;
            sign1.innerText = firstHP;
            sign2.innerText = secondHP;
        }
        else {
            if (secondHP == 0) {
                alert("First WIN!");
                firstTankXPos = 1 + 60;
                firstTankYPos = -0.415 * firstTankXPos + 805.415;
                secondTankXPos = 1920 - 60;
                secondTankYPos = firstTankYPos = 0.472 * firstTankXPos - 165.067;
                firstHP = 2000;
                secondHP = 2000;
                sign1.innerText = firstHP;
                sign2.innerText = secondHP;
            }
        }
    }
    requestAnimationFrame(draw);
}

background.onload = draw;