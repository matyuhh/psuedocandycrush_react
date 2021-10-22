import React, { useEffect, useState } from "react";
import ScoreBoard from "../scoreboard/scoreboard.component.jsx";
import {BoardContainer, BoardCandy, BoardWrapper} from './board.styles.jsx';

import blueCandy from '../../img/blue.png';
import greenCandy from '../../img/green.png';
import orangeCandy from '../../img/orange.png';
import purpleCandy from '../../img/purple.png';
import redCandy from '../../img/red.png';
import yellowCandy from '../../img/yellow.png';
import blank from '../../img/blank.png'

const width = 8;
const candyColors = [
    blueCandy,
    greenCandy,
    orangeCandy,
    purpleCandy,
    redCandy,
    yellowCandy
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
            const isBlank = currentColorArray[i] === blank;

            if (columnOfThree.every(square => currentColorArray[square] === decidedColor && !isBlank)){
                setScoreDisplay((score) => score + 3)
                columnOfThree.forEach(square => currentColorArray[square] = blank)
                return true;
            }
        }
    };

    const checkForRowOfThree = () => {
        for(let i = 0; i <= 64; i++) {
            const rowOfThree = [i, i + 1, i + 2];
            const decidedColor = currentColorArray[i];
            const notValid = [6,7,14,15,22,23,30,31,38,39,46,47,54,55,63,64]
            const isBlank = currentColorArray[i] === blank;

            if (notValid.includes(i)) continue

            if (rowOfThree.every(square => currentColorArray[square] === decidedColor && !isBlank)){
                setScoreDisplay((score) => score + 3)
                rowOfThree.forEach(square => currentColorArray[square] = blank);
                return true;
            }
        }
    };

    const checkForColumnOfFour = () => {
        for(let i = 0; i < 39; i++) {
            const columnOfFour = [i, i + width, i + width * 2, i + width * 3];
            const decidedColor = currentColorArray[i];
            const isBlank = currentColorArray[i] === blank;

            if (columnOfFour.every(square => currentColorArray[square] === decidedColor && !isBlank)){
                setScoreDisplay((score) => score + 4)
                columnOfFour.forEach(square => currentColorArray[square] = blank);
                return true;
            }
        }
    }

    const checkForRowOfFour = () => {
        for(let i = 0; i < 64; i++) {
            const rowOfFour = [i, i + 1, i + 2, i + 3];
            const decidedColor = currentColorArray[i];
            const notValid = [5,6,7,13,14,15,21,22,23,29,30,31,37,38,39,45,46,47,53,54,55,62,63,64]
            const isBlank = currentColorArray[i] === blank;

            if (notValid.includes(i)) continue

            if (rowOfFour.every(square => currentColorArray[square] === decidedColor && !isBlank)){
                setScoreDisplay((score) => score + 4)
                rowOfFour.forEach(square => currentColorArray[square] = blank);
                return true;
            }
        }
    }

    const moveIntoSquareBelow = () => {
        for (let i = 0; i <= 55; i++) {
            const firstRow = [0,1,2,3,4,5,6,7];
            const isFirstRow = firstRow.includes(i);

            if (isFirstRow && currentColorArray[i] === blank){
                let randomNumber = Math.floor(Math.random() *candyColors.length);
                currentColorArray[i] = candyColors[randomNumber];
            }

            if (currentColorArray[i + width] === blank){
                currentColorArray[i + width] = currentColorArray[i];
                currentColorArray[i] = blank;
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

        currentColorArray[candyBeingReplacedId] = candyBeingDragged.getAttribute('src')
        currentColorArray[candyBeingDraggedId] = candyBeingReplaced.getAttribute('src')
    
        const validMoves = [
            candyBeingDraggedId - 1,
            candyBeingDraggedId - width,
            candyBeingDraggedId + 1,
            candyBeingDraggedId + width
        ]

        const validMove = validMoves.includes(candyBeingReplacedId);

        const isAColumnOfFour = checkForColumnOfFour();
        const isARowOfFour = checkForRowOfFour();
        const isAColumnOfThree = checkForColumnOfThree();
        const isARowOfThree = checkForRowOfThree();

        if (candyBeingReplacedId && 
            validMove && 
            (isARowOfThree || isARowOfFour || isAColumnOfFour || isAColumnOfThree)) {
                setCandyBeingDragged(null);
                setCandyBeingReplaced(null);
        } else {
            currentColorArray[candyBeingReplacedId] = candyBeingReplaced.getAttribute('src');
            currentColorArray[candyBeingDraggedId] = candyBeingDragged.getAttribute('src');
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
            checkForColumnOfFour()
            checkForColumnOfThree()
            checkForRowOfFour()
            checkForRowOfThree()
            moveIntoSquareBelow()            
            setCurrentColorArray([...currentColorArray])
        }, 100)    
        return () => clearInterval(timer)    
    }, [checkForColumnOfFour, checkForRowOfFour, checkForColumnOfThree, checkForRowOfThree, moveIntoSquareBelow, currentColorArray])

    return (
        <BoardContainer>
            <BoardWrapper>
                {currentColorArray.map((candyColor, index) =>(
                    <BoardCandy
                        key={index}
                        src={candyColor}
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