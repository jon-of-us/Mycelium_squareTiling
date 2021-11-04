function drawMouseDonut(){
    donutCtx.fillStyle = Settings.playerColors[Settings.currentPlayer]
    // var tileifiedMouseX = BoardShiftX.changeCoords(SporeData.tileifyCoord(BoardShiftX.changeCoords(MousePosX,true)),false)
    // var tileifiedMouseY = BoardShiftY.changeCoords(SporeData.tileifyCoord(BoardShiftY.changeCoords(MousePosY,true)),false)
    donutCtx.beginPath()
    donutCtx.arc(
        MousePosX,MousePosY,Settings.tileLength*0.5,0,Math.PI*2,false
    )
    donutCtx.fill()
}

