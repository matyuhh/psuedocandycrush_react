import React, { useEffect, useState, useCallback } from "react";
import ScoreBoard from "../scoreboard/scoreboard.component.jsx";
import {BoardContainer, BoardCandy, BoardWrapper} from './board.styles.jsx';

const width = 8;
const candyColors = [
    'blue',
    'green',
    'orange',
    'purple',
    'red',
    'yellow'
];

const Board = () => {

    const [currentColorArray, setCurrentColorArray] = useState([]);
    const [candyBeingDragged, setCandyBeingDragged] = useState(null);
    const [candyBeingReplaced, setCandyBeingReplaced] = useState(null);
    const [scoreDisplay, setScoreDisplay] = useState(0);

    const checkForShapeHelper = (i, shape, points) => {
        const decidedColor = currentColorArray[i];
        const isBlank = currentColorArray[i] === '';

        if (shape.every(square => currentColorArray[square] === decidedColor && !isBlank)){
            setScoreDisplay((score) => score + points)
            shape.forEach(square => currentColorArray[square] = '');
            return true;
        }
    }

    const checkForColumnOfThree = () => {
        for(let i = 0; i <= 47; i++) {
            const columnOfThree = [i, i + width, i + width * 2];
            checkForShapeHelper(i, columnOfThree, 3)
        }
    };

    const checkForRowOfThree = () => {
        for(let i = 0; i <= 64; i++) {
            const rowOfThree = [i, i + 1, i + 2];
            const notValid = [6,7,14,15,22,23,30,31,38,39,46,47,54,55,63,64]
            if (notValid.includes(i)) continue
            checkForShapeHelper(i, rowOfThree, 3)
        }
    };

    const checkForColumnOfFour = () => {
        for(let i = 0; i <= 39; i++) {
            const columnOfFour = [i, i + width, i + width * 2, i + width * 3];
            checkForShapeHelper(i, columnOfFour, 4)
        }
    }

    const checkForRowOfFour = () => {
        for(let i = 0; i < 64; i++) {
            const rowOfFour = [i, i + 1, i + 2, i + 3];
            const notValid = [5,6,7,13,14,15,21,22,23,29,30,31,37,38,39,45,46,47,53,54,55,62,63,64]
            if (notValid.includes(i)) continue
            checkForShapeHelper(i, rowOfFour, 4)
        }
    }

    const checkForRowOfFive = () => {
        for(let i = 0; i < 64; i++) {
            const rowOfFive = [i, i + 1, i + 2, i + 3, i + 4];
            const notValid = [4,5,6,7,12,13,14,15,20,21,22,23,28,29,30,31,36,37,38,39,44,45,46,47,52,53,54,55,61,62,63,64]
            if (notValid.includes(i)) continue
            checkForShapeHelper(i, rowOfFive, 5)
        }
    }

    const checkForColumnOfFive = () => {
        for(let i = 0; i < 31; i++) {
            const columnOfFive = [i, i + width, i + width * 2, i + width * 3, i + width * 4];
            checkForShapeHelper(i, columnOfFive, 5)
        }
    }

    

    const checkForLShape = () => {
        //DownRight
        for(let i = 0; i <= 47; i++) {
            const shapeL = [i, i + 1, i + 2, i + width, i + width * 2];
            const notValid = [6,7,14,15,22,23,30,31,38,39,46,47,54,55,63,64];
            if (notValid.includes(i)) continue
            checkForShapeHelper(i, shapeL, 10);
        }
        //DownLeft
        for(let i = 0; i <= 47; i++) {
            const shapeL = [i, i - 1, i - 2, i + width, i + width * 2];
            const notValid = [0,1,8,9,16,17,24,25,32,33,40,41,48,49,56,57]
            if (notValid.includes(i)) continue
            checkForShapeHelper(i, shapeL, 10);
        }
        //UpLeft
        for(let i = 16; i < 64; i++) {
            const shapeL = [i, i - 1, i - 2, i - width, i - width * 2];
            const notValid = [0,1,8,9,16,17,24,25,32,33,40,41,48,49,56,57]
            if (notValid.includes(i)) continue
            checkForShapeHelper(i, shapeL, 10);
        }
        //UpRight
        for(let i = 16; i < 64; i++) {
            const shapeL = [i, i + 1, i + 2, i - width, i - width * 2];
            const notValid = [6,7,14,15,22,23,30,31,38,39,46,47,54,55,63,64]
            if (notValid.includes(i)) continue
            checkForShapeHelper(i, shapeL, 10);
        }
    }
    
    const checkForTShape = () => {
        //Right
        for(let i = 0; i <= 55; i++) {
            const shapeT = [i, i + 1, i + 2, i + width, i - width];
            const notValid = [6,7,14,15,22,23,30,31,38,39,46,47,54,55,63,64]
            if (notValid.includes(i)) continue
            checkForShapeHelper(i, shapeT, 10);
        }
        //Down
        for(let i = 0; i <= 47; i++) {
            const shapeT = [i, i - 1, i + 1, i + width, i + width * 2];
            const notValid = [0,1,8,9,16,17,24,25,32,33,40,41,48,49,56,57]
            if (notValid.includes(i)) continue
            checkForShapeHelper(i, shapeT, 10);
        }
        //Left
        for(let i = 8; i < 55; i++) {
            const shapeT = [i, i - 1, i - 2, i + width, i - width];
            const notValid = [0,1,8,9,16,17,24,25,32,33,40,41,48,49,56,57]
            if (notValid.includes(i)) continue
            checkForShapeHelper(i, shapeT, 10);
        }
        //Up
        for(let i = 16; i < 64; i++) {
            const shapeT = [i, i + 1, i - 1, i - width, i - width * 2];
            const notValid = [0,7,8,15,16,23,24,31,32,39,40,47,48,55,56,64]
            if (notValid.includes(i)) continue
            checkForShapeHelper(i, shapeT, 10);
        }
    }

    const moveIntoSquareBelow = () => {
        for (let i = 0; i <= 55; i++) {
            const firstRow = [0,1,2,3,4,5,6,7];
            const isFirstRow = firstRow.includes(i);

            if (isFirstRow && currentColorArray[i] === ''){
                let randomNumber = Math.floor(Math.random() *candyColors.length);
                currentColorArray[i] = candyColors[randomNumber];
            }

            if (currentColorArray[i + width] === ''){
                currentColorArray[i + width] = currentColorArray[i];
                currentColorArray[i] = '';
            }
        }
    }

    const dragStart = (e) => {
        setCandyBeingDragged(e.target);
    }
    const dragDrop = (e) => {
        setCandyBeingReplaced(e.target);
    }
    const dragEnd = (e) => {
        const candyBeingDraggedId = parseInt(candyBeingDragged.getAttribute('data-id'));
        const candyBeingReplacedId = parseInt(candyBeingReplaced.getAttribute('data-id'));

        currentColorArray[candyBeingReplacedId] = candyBeingDragged.style.backgroundColor
        currentColorArray[candyBeingDraggedId] = candyBeingReplaced.style.backgroundColor
    
        const validMoves = [
            candyBeingDraggedId - 1,
            candyBeingDraggedId - width,
            candyBeingDraggedId + 1,
            candyBeingDraggedId + width
        ]

        const validMove = validMoves.includes(candyBeingReplacedId);

        if (validMove) {
            const isTShape = checkForTShape();
            const isLShape = checkForLShape();

            const isAColumnOfFive = checkForColumnOfFive();
            const isARowOfFive = checkForRowOfFive();
            const isAColumnOfFour = checkForColumnOfFour();
            const isARowOfFour = checkForRowOfFour();
            const isAColumnOfThree = checkForColumnOfThree();
            const isARowOfThree = checkForRowOfThree();

            if (candyBeingReplacedId &&  
                (isARowOfThree || isARowOfFour || isAColumnOfFour || isAColumnOfThree || isARowOfFive || isAColumnOfFive 
                    || isLShape
                    || isTShape
                )) {
                    setCandyBeingDragged(null);
                    setCandyBeingReplaced(null);
                    
            } else {
                currentColorArray[candyBeingReplacedId] = candyBeingReplaced.style.backgroundColor;
                currentColorArray[candyBeingDraggedId] = candyBeingDragged.style.backgroundColor;
                setCurrentColorArray([...currentColorArray]);
            } 
        } else {
            currentColorArray[candyBeingReplacedId] = candyBeingReplaced.style.backgroundColor;
            currentColorArray[candyBeingDraggedId] = candyBeingDragged.style.backgroundColor;
            setCurrentColorArray([...currentColorArray]);
        }

        

    }

    const createBoard = () => {
        const randomColorArray = [];
        for (let i = 0; i < width * width; i++){
            const randomColor = candyColors[Math.floor(Math.random() * candyColors.length)];
            randomColorArray.push(randomColor);
        }
        setCurrentColorArray(randomColorArray);
    }

    useEffect(() => {
        createBoard()
    }, [])

    useEffect(() => {
        const timer = setInterval(() => {
            checkForTShape()
            checkForLShape()

            checkForColumnOfFive()
            checkForColumnOfFour()
            checkForColumnOfThree()
            checkForRowOfFive()
            checkForRowOfFour()
            checkForRowOfThree()
            moveIntoSquareBelow()            
            setCurrentColorArray([...currentColorArray])
        }, 100)    
        return () => clearInterval(timer)    
    }, [checkForTShape,
        checkForLShape,
        checkForColumnOfFive, checkForRowOfFive, checkForColumnOfFour, checkForRowOfFour, checkForColumnOfThree, checkForRowOfThree, moveIntoSquareBelow, currentColorArray])

    return (
        <BoardContainer>
            <BoardWrapper>
                {currentColorArray.map((candyColor, index) =>(
                    <BoardCandy
                        key={index}
                        style={{backgroundColor: candyColor}}
                        alt={candyColor}
                        data-id={index}
                        draggable={true}
                        onDragStart={dragStart}
                        onDragOver={(e) => e.preventDefault()}
                        onDragEnter={(e) => e.preventDefault()}
                        onDragLeave={(e) => e.preventDefault()}
                        onDrop={dragDrop}
                        onDragEnd={dragEnd}
                    />
                ))}
                
            </BoardWrapper>
            <ScoreBoard score={scoreDisplay}/>
        </BoardContainer>     
         
    )
};

export default Board;