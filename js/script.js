let canvas = document.getElementById("vaccine-go");
let context = canvas.getContext("2d");
let box = 32;
let char = [];
char[0] = {
    x: 8 * box,
    y: 8 * box
}
let direction = "right";
let syringe = {
    x: Math.floor(Math.random() * 15 + 1) * box,
    y: Math.floor(Math.random() * 15 + 1) * box
}
let virus = {
    x: Math.floor(Math.random() * 15 + 1) * box,
    y: Math.floor(Math.random() * 15 + 1) * box
}
let virus2 = {
    x: Math.floor(Math.random() * 15 + 1) * box,
    y: Math.floor(Math.random() * 15 + 1) * box
}
let virus3 = {
    x: Math.floor(Math.random() * 15 + 1) * box,
    y: Math.floor(Math.random() * 15 + 1) * box
}

function createBG(){
    context.fillStyle = "#787DAB";
    context.fillRect(0, 0, 16 * box, 16 * box);
}

function createChar(){
    for(i=0; i < char.length; i++){
        context.fillStyle = "#88A6A3";
        context.font = '600 32px "Font Awesome 5 Free"';
        context.fillText('\uf554', char[i].x, char[i].y);
    }
}

function createSyringe(){
    context.fillStyle = "#88A6A3";
    context.font = '600 32px "Font Awesome 5 Free"';
    context.fillText('\uf48e', syringe.x, syringe.y);
}

function createVirus(){
    context.fillStyle = "#474747";
    context.font = '600 32px "Font Awesome 5 Free"';
    context.fillText('\ue074', virus.x, virus.y);
}

function createVirus2(){
    context.fillStyle = "#474747";
    context.font = '600 32px "Font Awesome 5 Free"';
    context.fillText('\ue074', virus2.x, virus2.y);
}

function createVirus3(){
    context.fillStyle = "#474747";
    context.font = '600 32px "Font Awesome 5 Free"';
    context.fillText('\ue074', virus3.x, virus3.y);
}

function replace(a){
    a.x = Math.floor(Math.random() * 15 + 1) * box;
    a.y = Math.floor(Math.random() * 15 + 1) * box;
}

function score(){
    var score3 = char.length; 
    var score2 = 'Score: ' + score3;
    document.getElementById("score").innerHTML = score2;
}

document.addEventListener('keydown', update);
function update (event) {
    if((event.keyCode == 38 | event.keyCode == 87) && direction != "down") direction = "up";
    if((event.keyCode == 37 | event.keyCode == 65) && direction != "right") direction = "left";
    if((event.keyCode == 39 | event.keyCode == 68) && direction != "left") direction = "right";
    if((event.keyCode == 40 | event.keyCode == 83) && direction != "up") direction = "down";
}

createBG();
function startGame(){
    if(char[0].x > (16 * box) && direction == "right") char[0].x = 0;
    if(char[0].x < 0 && direction == "left") char[0].x = (16 * box);
    if(char[0].y > (16 * box) && direction == "down") char[0].y = 0;
    if(char[0].y < 0 && direction == "up") char[0].y = (16 * box);

    for(i = 1; i < char.length; i++){
        if(char[0].x == char[i].x && char[0].y == char[i].y){
            document.getElementById("gameover").innerHTML = 'Game Over! Your group did not avoid crowding!';
            clearInterval(game);
        }
    }

    if(char[0].x == virus.x && char[0].y == virus.y)
    {
        document.getElementById("gameover").innerHTML = "Game Over! Your group has been infected!";
        clearInterval(game);
    }

    createBG();
    createChar();  
    
    createSyringe();
    for(i = 1; i < char.length; i++){
        while(syringe.x == char[i].x && syringe.y == char[i].y){
            replace(syringe);
        }
    }

    createVirus();
    while(virus.x == syringe.x && virus.y == syringe.y){
        replace(virus);
    }
    for(i = 1; i < char.length; i++){
        while(virus.x == char[i].x && virus.y == char[i].y){
            replace(virus);
        }
    }

    if(char.length > 10){
        if(char[0].x == virus2.x && char[0].y == virus2.y)
        {
            document.getElementById("gameover").innerHTML = "Game Over! Your group has been infected!";
            clearInterval(game);
        }
        createVirus2();
        while((virus2.x == syringe.x && virus2.y == syringe.y) || (virus2.x == virus.x && virus2.y == virus.y)){
            replace(virus2);
        }
        for(i = 1; i < char.length; i++){
            while(virus2.x == char[i].x && virus2.y == char[i].y){
                replace(virus2);
            }
        }
    }

    if(char.length > 20){
        if(char[0].x == virus3.x && char[0].y == virus3.y)
        {
            document.getElementById("gameover").innerHTML = "Game Over! Your group has been infected!";
            clearInterval(game);
        }
        createVirus3();
        while((virus3.x == syringe.x && virus3.y == syringe.y) || (virus3.x == virus.x && virus3.y == virus.y) || (virus3.x == virus2.x && virus3.y == virus2.y)){
            replace(virus3);
        }
        for(i = 1; i < char.length; i++){
            while(virus3.x == char[i].x && virus3.y == char[i].y){
                replace(virus3)
            }
        }
    }

    let charX = char[0].x;
    let charY = char[0].y;

    if(direction == "right") charX += box;
    if(direction == "left") charX -= box;
    if(direction == "up") charY -= box;
    if(direction == "down") charY += box;
    
    if(charX != syringe.x || charY != syringe.y){
        char.pop();
    }
    else{
        score();
        replace(syringe);
        for(i = 1; i < char.length; i++){
            while(syringe.x == char[i].x && syringe.y == char[i].y){
                replace(syringe);
            }
        }
        replace(virus);
        while(virus.x == syringe.x && virus.y == syringe.y){
            replace(virus);
        }
        for(i = 1; i < char.length; i++){
            while(virus.x == char[i].x && virus.y == char[i].y){
                replace(virus);
            }
        }
        if(char.length > 10){
            replace(virus2);
            while((virus2.x == syringe.x && virus2.y == syringe.y) || (virus2.x == virus.x && virus2.y == virus.y)){
                replace(virus2);
            }
            for(i = 1; i < char.length; i++){
                while(virus2.x == char[i].x && virus2.y == char[i].y){
                    replace(virus2)
                }
            }
        }
        if(char.length > 20){
            replace(virus3);
            while((virus3.x == syringe.x && virus3.y == syringe.y) || (virus3.x == virus.x && virus3.y == virus.y)|| (virus3.x == virus2.x && virus3.y == virus2.y)){
                replace(virus3);
            }
            for(i = 1; i < char.length; i++){
                while(virus3.x == char[i].x && virus3.y == char[i].y){
                    replace(virus3);
                }
            }
        }
    }

    let newMember = {
        x: charX,
        y: charY
    }
    char.unshift(newMember);
}

function btnStart(){
    let game = setInterval(startGame, 130);
}