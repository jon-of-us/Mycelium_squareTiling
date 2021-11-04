function sporeConstructor(x,y,player){
    const Spore = {}

    Spore.x = x
    Spore.y = y
    Spore.isActive = true
    Spore.numberOfConnections = 0
    Spore.linkedTo = []
    Spore.player = player

    return Spore
}


const SporeData = (()=>{
    const SD = {}

    
    SD.sporeArray = []
    SD.playerPointCount = Array(Settings.playerCount).fill(0)

    SD.tileifyCoord = (coord)=>{
        distToTileCoord = mod(coord, Settings.tileLength)
        if(distToTileCoord > Settings.tileLength/2){
            return coord - distToTileCoord + Settings.tileLength
        }
        return coord - distToTileCoord
    }

    SD.loopOverAllSpores = function(functionToRun){
        SD.sporeArray.forEach((spore,sporeIndex) => {
            if (spore.isActive){
                functionToRun(spore,sporeIndex)
            }
        })
    }
    SD.loopOverLinkedSpores = (spore1, functionToRun)=>{
        spore1.linkedTo.forEach((spore2Index)=>{
            spore2 = SD.sporeArray[spore2Index]
            if (spore2.isActive){
                functionToRun(spore1,spore2)
            }

        })
    }

    SD.calcDistance = function(x1,y1,x2,y2){
        var calcTorusDist = (val1, val2 ,TorusWidth)=>{
            torusDist = (Math.abs(val1 - val2)+TorusWidth/2)%TorusWidth-TorusWidth/2
            return torusDist
        }
        var xDist = calcTorusDist(x1,x2,Settings.boardWidth)
        var yDist = calcTorusDist(y1,y2,Settings.boardHeight)
        return Math.sqrt(xDist**2 + yDist**2)
    }
    SD.connectSpores = function(spore1,spore2){
        spore1.numberOfConnections ++
        spore1.linkedTo.push(SD.sporeArray.indexOf(spore2))
        spore2.numberOfConnections ++
        spore2.linkedTo.push(SD.sporeArray.indexOf(spore1))
    }
    SD.addNewSpore = function(sporeX,sporeY){
        newSporeX = BoardShiftX.changeCoords(sporeX,true)
        newSporeY = BoardShiftY.changeCoords(sporeY,true)

        try {
            SD.loopOverAllSpores(function(oldSpore) {
                if (SD.calcDistance(oldSpore.x,oldSpore.y,newSporeX,newSporeY) < Settings.innerRadius){
                    throw 'too close'
                }
            })

            SD.sporeArray.push(sporeConstructor(newSporeX,newSporeY,Settings.currentPlayer))
            var newCreatedSpore = SD.sporeArray[SD.sporeArray.length-1]

            SD.loopOverAllSpores(function(oldSpore){
                var distanceToOtherSpore = SD.calcDistance(oldSpore.x,oldSpore.y,newSporeX,newSporeY)
                if (distanceToOtherSpore < Settings.outerRadius && distanceToOtherSpore !== 0){
                    SD.connectSpores(newCreatedSpore,oldSpore)
                }
            })
            Settings.nextPlayer()
    
            console.log('NewSpore!')
        }
        catch(e){
            console.log(e)
        }


    }


    SD.checkIfColorsAreEqual = function(spore1,spore2){
        //checkSpores and set linecolor
        if(spore1.player === spore2.player){
            boardCtx.strokeStyle = Settings.playerColors[spore1.player]
            // count Points
        }
        else {
            boardCtx.strokeStyle = Settings.neutralColor
        }
    }

    SD.calculatePlayerPointCount = () => {
        SD.playerPointCount.fill(0)
        SD.loopOverAllSpores((spore1)=>{
            SD.loopOverLinkedSpores(spore1,(spore1,spore2)=>{
                if(spore1.player == spore2.player){
                    SD.playerPointCount[spore1.player] += 0.5
                }
            })
        })
    }


    SD.deadSporeIndicesOfPlayerInArray = (player) => {
        var deadSpores = []
        SD.loopOverAllSpores((spore,sporeIndex) => {
            
            if (spore.numberOfConnections > Settings.maxConnections && spore.player == player){
                deadSpores.push(sporeIndex)
            }
        })
        return deadSpores
    }
    SD.removeSpore = (deadSporeIndex) => {
        deadSpore = SD.sporeArray[deadSporeIndex]
        deadSpore.isActive = false
        deadSpore.linkedTo.forEach((linkedSporeIndex)=>{
            var linkedSpore = SD.sporeArray[linkedSporeIndex]
            linkedSpore.numberOfConnections --
        })
    }
    SD.checkSporesIfDead = () => {
        for (var i = 0; i < Settings.playerCount; i ++){
            Settings.previousPlayer()
            var deadSporeIndices = SD.deadSporeIndicesOfPlayerInArray(Settings.currentPlayer)
            deadSporeIndices.forEach((deadSporeIndex)=>{
                SD.removeSpore(deadSporeIndex)
            })
        }
    }

    SD.undoLastAction = ()=>{
        indexToDelete = SD.sporeArray.length - 1
        while(!SD.sporeArray[indexToDelete].isActive){
            indexToDelete--
        }
        SD.removeSpore(indexToDelete)
        Settings.currentPlayer = SD.sporeArray[indexToDelete].player
    }


    SD.calcScoreDiff = ()=>{
        var playerPointCountCopy = [...SD.playerPointCount]
        var maxScore = Math.max(...playerPointCountCopy)
        playerPointCountCopy.splice(playerPointCountCopy.indexOf(maxScore), 1)
        var secondMaxScore = Math.max(...playerPointCountCopy)
        var PointDiff = maxScore-secondMaxScore
        return PointDiff
    }
    SD.calcLeadingPlayer = ()=>{ 
        var maxPoints = Math.max(...SD.playerPointCount)
        var leadingPlayer = SD.playerPointCount.indexOf(maxPoints)
        return leadingPlayer
    }
    SD.checkWinner = ()=>{
        
        if (SD.calcScoreDiff() >= Settings.winningDiff){
            alert(`${Settings.playerNames[SD.calcLeadingPlayer()]} player wins!`)
        }
    }



    return SD
    

})()

