

const boardCanvas = document.body.appendChild(document.createElement("canvas"));
const boardCtx = boardCanvas.getContext("2d");
function defineBoardCanvas(){
    boardCanvas.style.position = "absolute";
    boardCanvas.style.background = Settings.canvasColor
    boardCanvas.style.border = `1px solid `;
    document.body.style.margin = '0 px'
    boardCanvas.style.zIndex = '0'
    console.log('static canvas is readY!')
}

const scoreCanvas = document.body.appendChild(document.createElement("canvas"));
const scoreCtx = scoreCanvas.getContext("2d");
function defineDonutCanvas(){
    donutCanvas.style.position = "absolute";
    donutCanvas.style.background = 'rgba(255,0,0,0.0)'
    donutCanvas.style.opacity = 0.3
    donutCanvas.style.border = `1px solid `
    donutCanvas.style.zIndex = '2'
    // document.body.style.margin = '5 px'


    console.log('donut canvas is readY!')
}

const donutCanvas = document.body.appendChild(document.createElement("canvas"));
const donutCtx = donutCanvas.getContext("2d");
function defineScoreCanvas(){

    scoreCanvas.style.position = "absolute";
    scoreCanvas.style.background = 'rgba(0,0,0,0.0)'
    scoreCanvas.style.border = `1px solid `;
    scoreCanvas.style.zIndex = '1'
    // document.body.style.margin = '5 px'


    console.log('score canvas is readY!')
}

function completeSetup(){
    defineBoardCanvas()
    defineDonutCanvas()
    defineScoreCanvas()
}

completeSetup()




