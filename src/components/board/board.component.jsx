import React, { useEffect, useState } from "react";
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

    const checkForColumnOfThree = () => {
        for(let i = 0; i <= 47; i++) {
            const columnOfThree = [i, i + width, i + width * 2];
            const decidedColor = currentColorArray[i];
            const isBlank = currentColorArray[i] === '';

            if (columnOfThree.every(square => currentColorArray[square] === decidedColor && !isBlank)){
                setScoreDisplay((score) => score + 3)
                columnOfThree.forEach(square => currentColorArray[square] = '')
                return true;
            }
        }
    };

    const checkForRowOfThree = () => {
        for(let i = 0; i <= 64; i++) {
            const rowOfThree = [i, i + 1, i + 2];
            const decidedColor = currentColorArray[i];
            const notValid = [6,7,14,15,22,23,30,31,38,39,46,47,54,55,63,64]
            const isBlank = currentColorArray[i] === '';

            if (notValid.includes(i)) continue

            if (rowOfThree.every(square => currentColorArray[square] === decidedColor && !isBlank)){
                setScoreDisplay((score) => score + 3)
                rowOfThree.forEach(square => currentColorArray[square] = '');
                return true;
            }
        }
    };

    const checkForColumnOfFour = () => {
        for(let i = 0; i <= 39; i++) {
            const columnOfFour = [i, i + width, i + width * 2, i + width * 3];
            const decidedColor = currentColorArray[i];
            const isBlank = currentColorArray[i] === '';

            if (columnOfFour.every(square => currentColorArray[square] === decidedColor && !isBlank)){
                setScoreDisplay((score) => score + 4)
                columnOfFour.forEach(square => currentColorArray[square] = '');
                return true;
            }
        }
    }

    const checkForRowOfFour = () => {
        for(let i = 0; i < 64; i++) {
            const rowOfFour = [i, i + 1, i + 2, i + 3];
            const decidedColor = currentColorArray[i];
            const notValid = [5,6,7,13,14,15,21,22,23,29,30,31,37,38,39,45,46,47,53,54,55,62,63,64]
            const isBlank = currentColorArray[i] === '';

            if (notValid.includes(i)) continue

            if (rowOfFour.every(square => currentColorArray[square] === decidedColor && !isBlank)){
                setScoreDisplay((score) => score + 4)
                rowOfFour.forEach(square => currentColorArray[square] = '');
                return true;
            }
        }
    }

    const checkForRowOfFive = () => {
        for(let i = 0; i < 64; i++) {
            const rowOfFive = [i, i + 1, i + 2, i + 3, i + 4];
            const decidedColor = currentColorArray[i];
            const notValid = [4,5,6,7,12,13,14,15,20,21,22,23,28,29,30,31,36,37,38,39,44,45,46,47,52,53,54,55,61,62,63,64]
            const isBlank = currentColorArray[i] === '';

            if (notValid.includes(i)) continue

            if (rowOfFive.every(square => currentColorArray[square] === decidedColor && !isBlank)){
                setScoreDisplay((score) => score + 5)
                rowOfFive.forEach(square => currentColorArray[square] = '');
                return true;
            }
        }
    }

    const checkForColumnOfFive = () => {
        for(let i = 0; i < 31; i++) {
            const columnOfFive = [i, i + width, i + width * 2, i + width * 3, i + width * 4];
            const decidedColor = currentColorArray[i];
            const isBlank = currentColorArray[i] === '';

            if (columnOfFive.every(square => currentColorArray[square] === decidedColor && !isBlank)){
                setScoreDisplay((score) => score + 5)
                columnOfFive.forEach(square => currentColorArray[square] = '');
                return true;
            }
        }
    }

    const checkForLShapeDownRight = () => {
        for(let i = 0; i <= 47; i++) {
            const shapeL = [i, i + 1, i + 2, i + width, i + width * 2];
            const decidedColor = currentColorArray[i];
            const notValid = [6,7,14,15,22,23,30,31,38,39,46,47,54,55,63,64]
            const isBlank = currentColorArray[i] === '';

            if (notValid.includes(i)) continue
            
            if (shapeL.every(square => currentColorArray[square] === decidedColor && !isBlank)){
                setScoreDisplay((score) => score + 10)
                shapeL.forEach(square => currentColorArray[square] = '');
                return true;
            }
        }
    }
    const checkForLShapeDownLeft = () => {
        for(let i = 0; i <= 47; i++) {
            const shapeL = [i, i - 1, i - 2, i + width, i + width * 2];
            const decidedColor = currentColorArray[i];
            const notValid = [0,1,8,9,16,17,24,25,32,33,40,41,48,49,56,57]
            const isBlank = currentColorArray[i] === '';

            if (notValid.includes(i)) continue
            
            if (shapeL.every(square => currentColorArray[square] === decidedColor && !isBlank)){
                setScoreDisplay((score) => score + 10)
                shapeL.forEach(square => currentColorArray[square] = '');
                return true;
            }
        }
    }
    const checkForLShapeUpLeft = () => {
        for(let i = 16; i < 64; i++) {
            const shapeL = [i, i - 1, i - 2, i - width, i - width * 2];
            const decidedColor = currentColorArray[i];
            const notValid = [0,1,8,9,16,17,24,25,32,33,40,41,48,49,56,57]
            const isBlank = currentColorArray[i] === '';

            if (notValid.includes(i)) continue
            
            if (shapeL.every(square => currentColorArray[square] === decidedColor && !isBlank)){
                setScoreDisplay((score) => score + 10)
                shapeL.forEach(square => currentColorArray[square] = '');
                return true;
            }
        }
    }
    const checkForLShapeUpRight = () => {
        for(let i = 16; i < 64; i++) {
            const shapeL = [i, i + 1, i + 2, i - width, i - width * 2];
            const decidedColor = currentColorArray[i];
            const notValid = [6,7,14,15,22,23,30,31,38,39,46,47,54,55,63,64]
            const isBlank = currentColorArray[i] === '';

            if (notValid.includes(i)) continue
            
            if (shapeL.every(square => currentColorArray[square] === decidedColor && !isBlank)){
                setScoreDisplay((score) => score + 10)
                shapeL.forEach(square => currentColorArray[square] = '');
                return true;
            }
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

        const isLShapeUpLeft = checkForLShapeUpLeft();
        const isLShapeUpRight = checkForLShapeUpRight();
        const isLShapeDownLeft = checkForLShapeDownLeft();
        const isLShapeDownRight = checkForLShapeDownRight();
        const isAColumnOfFive = checkForColumnOfFive();
        const isARowOfFive = checkForRowOfFive();
        const isAColumnOfFour = checkForColumnOfFour();
        const isARowOfFour = checkForRowOfFour();
        const isAColumnOfThree = checkForColumnOfThree();
        const isARowOfThree = checkForRowOfThree();

        if (candyBeingReplacedId && 
            validMove && 
            (isARowOfThree || isARowOfFour || isAColumnOfFour || isAColumnOfThree || isARowOfFive || isAColumnOfFive || isLShapeDownRight
                || isLShapeUpLeft || isLShapeUpRight || isLShapeDownLeft
            )) {
                setCandyBeingDragged(null);
                setCandyBeingReplaced(null);
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
            checkForLShapeUpRight()
            checkForLShapeUpLeft()
            checkForLShapeDownLeft()
            checkForLShapeDownRight()
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
    }, [checkForLShapeUpRight, checkForLShapeUpLeft, checkForLShapeDownLeft, checkForLShapeDownRight, checkForColumnOfFive, checkForRowOfFive, checkForColumnOfFour, checkForRowOfFour, checkForColumnOfThree, checkForRowOfThree, moveIntoSquareBelow, currentColorArray])

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