const SporeVisual = (()=>{
    const SV = {}


    SV.drawPlayerScore = ()=>{
        for (var i = 0; i < Settings.playerCount; i ++){
            scoreCtx.font = Settings.font
            scoreCtx.fillStyle = Settings.neutralColor
            // staticCtx.fillStyle = Settings.playerColors[i]
            var TextBlockheight = Settings.textZSpace*Settings.playerCount
            scoreCtx.fillText(
                `${Settings.playerNames[i]} player has ${SporeData.playerPointCount[i]} points`,
                window.innerWidth - 290,
                window.innerHeight - 15 - TextBlockheight + Settings.textZSpace*i)        
        }

    }
    SV.drawScoreDiff = ()=>{
        var scoreDiff = SporeData.calcScoreDiff()
        scoreCtx.font = Settings.font
        scoreCtx.fillStyle = Settings.playerColors[SporeData.calcLeadingPlayer()]
        if (scoreDiff === 0 ){scoreCtx.fillStyle = Settings.neutralColor}
        
        scoreCtx.fillText(
            `the pointdifference is: ${scoreDiff} points`,
            15,
            window.innerHeight - 15 - Settings.textZSpace)    
        
    }

    SV.drawAllSpores = function(){
        SporeData.loopOverAllSpores(function(spore){
                var shiftedX = BoardShiftX.changeCoords(spore.x)
                var shiftedY = BoardShiftY.changeCoords(spore.y)
                boardCtx.beginPath()
                boardCtx.lineWidth = 0
                boardCtx.fillStyle = Settings.playerColors[spore.player]
                boardCtx.arc(shiftedX,shiftedY,Settings.sporeRadius,0,Math.PI*2,false)

                boardCtx.fill()
            }
        )
    }
    SV.drawAllLines = function(){
        SporeData.loopOverAllSpores(function(spore1){
            var shiftedX = BoardShiftX.changeCoords(spore1.x)
            if(shiftedX<0 || shiftedX>window.innerWidth){return}
            var shiftedY = BoardShiftY.changeCoords(spore1.y)
            if(shiftedY<0 || shiftedY>window.innerHeight){return}
            SporeData.loopOverLinkedSpores(spore1,(spore1,spore2)=>{
                boardCtx.beginPath()
                SporeData.checkIfColorsAreEqual(spore1,spore2)
                boardCtx.lineWidth = Settings.lineWidth
                boardCtx.moveTo(shiftedX,shiftedY)
                boardCtx.lineTo(BoardShiftX.changeCoords(spore2.x),BoardShiftY.changeCoords(spore2.y))
                boardCtx.stroke()
            })
        })
    }
    SV.drawSporesInRange = ()=>{
        SporeData.loopOverAllSpores(function(spore1){
            var distToOtherSpore = SporeData.calcDistance(
                spore1.x,spore1.y,
                SporeData.tileifyCoord(BoardShiftX.changeCoords(MousePosX,true)),
                SporeData.tileifyCoord(BoardShiftY.changeCoords(MousePosY,true))
            )          

            if (distToOtherSpore < Settings.outerRadius){
                boardCtx.beginPath()
                boardCtx.strokeStyle = Settings.playerColors[spore1.player]
                boardCtx.lineWidth = Settings.markingWidth
                boardCtx.arc(BoardShiftX.changeCoords(spore1.x),BoardShiftY.changeCoords(spore1.y),Settings.sporeRadius,0,Math.PI*2,false)
                boardCtx.stroke()
            }
        })
    }

    SV.drawProvisionalGrid = ()=>{
        for ( var x = 0; x<Settings.horizontalTileCount; x++){
            for (var y = 0 ; y<Settings.verticalTileCount; y++){
                boardCtx.fillStyle = 'rgba(255,255,255,0.1)'
                boardCtx.fillRect(
                    BoardShiftX.changeCoords(Settings.tileLength * (x-Settings.tileMarkingLengthFactor),false), 
                    BoardShiftY.changeCoords(Settings.tileLength *(y-Settings.tileMarkingLengthFactor),false), 
                    Settings.tileLength * Settings.tileMarkingLengthFactor* 2,
                    Settings.tileLength * Settings.tileMarkingLengthFactor* 2,
                )
            }
        }
    }
    

    return SV
})()