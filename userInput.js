
//default Mouseposiion = screen middle
var MousePosX = window.innerWidth / 2
var MousePosY = window.innerHeight /2
//add eventlistener for tracking mousemovement
document.addEventListener('mousemove', function(e) {
    MousePosX = e.clientX - 9
    MousePosY = e.clientY - 9
})
console.log('Mousedetector is runnig!')

function createBoardShifter(keyOne,keyTwo,isXShifter){
    const S = {}

    S.keyOne = keyOne
    S.keyTwo = keyTwo

    S.shift = 0
    S.changeCoords = (coord,isReverse)=>{
        var boardDimension

        if(isXShifter){
            boardDimension = Settings.boardWidth
        }
        else{
            boardDimension = Settings.boardHeight
        }

        if (isReverse){
            return mod(coord - S.shift, boardDimension) + Settings.boardMargin
        }
        return mod( coord + S.shift , boardDimension) - Settings.boardMargin
    }
    

    S.shiftInterval
    S.currentShiftLabel = ''
    

    S.shiftCoords = (sign, shiftLabel)=>{
        if(S.currentShiftLabel !== shiftLabel){
            clearInterval(S.shiftInterval)
            S.shiftInterval = setInterval(() => {
                S.shift += Settings.shiftStep * sign
            },Settings.shiftInterval );
            S.currentShiftLabel = shiftLabel
            console.log('shiftcoords')
        }
    }

    S.clarShiftIntervalIfKey = (shiftLabel)=>{
        if (shiftLabel === S.currentShiftLabel){
            clearInterval(S.shiftInterval)
            S.currentShiftLabel = ''
            // console.log('clearShiftInterval')
        }
    }

    document.addEventListener('keydown',event => {
        switch (event.key){
            case S.keyOne:
                S.shiftCoords(-1, S.keyOne)
                break
            case S.keyTwo:
                S.shiftCoords(1,S.keyTwo)
                break
        }
        
    })
    document.addEventListener('keyup', event => {
        S.clarShiftIntervalIfKey(event.key)
    })

    console.log('arrowKeyListener added!')

    return S
}

const BoardShiftX = createBoardShifter('ArrowRight','ArrowLeft',true)
const BoardShiftY = createBoardShifter('ArrowDown','ArrowUp',false)

