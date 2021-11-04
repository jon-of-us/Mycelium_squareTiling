function drawMouseDonut(){
    donutCtx.beginPath()
    donutCtx.strokeStyle = Settings.playerColors[Settings.currentPlayer]
    donutCtx.lineWidth = Settings.outerRadius - Settings.innerRadius
    // console.log(Settings.playerColors[Settings.currentPlayer])
    donutCtx.arc(
        MousePosX, MousePosY,
        Settings.innerRadius + (Settings.outerRadius-Settings.innerRadius)/2 - Settings.sporeRadius,
        0,Math.PI*2,false
    )
    donutCtx.stroke()

}

