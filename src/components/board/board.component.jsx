import React, { useEffect, useState } from "react";
import {BoardContainer, BoardCandy} from './board.styles.jsx';

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

    const [currentColorArray, setCurrentColorArray] = useState([])

    const checkForColumnOfThree = () => {
        for(let i = 0; i < 47; i++) {
            const columnOfThree = [i, i + width, i + width * 2];
            const decidedColor = currentColorArray[i];

            if (columnOfThree.every(square => currentColorArray[square] === decidedColor)){
                columnOfThree.forEach(square => currentColorArray[square] = '')
            }
        }
    }

    const checkForRowOfThree = () => {
        for(let i = 0; i < 64; i++) {
            const rowOfThree = [i, i + 1, i + 2];
            const decidedColor = currentColorArray[i];
            const notValid = [6,7,14,15,22,23,30,31,38,39,46,47,54,55,63,64]
            
            if (notValid.includes(i)) continue

            if (rowOfThree.every(square => currentColorArray[square] === decidedColor)){
                rowOfThree.forEach(square => currentColorArray[square] = '')
            }
        }
    }

    const checkForColumnOfFour = () => {
        for(let i = 0; i < 39; i++) {
            const columnOfFour = [i, i + width, i + width * 2, i + width * 3];
            const decidedColor = currentColorArray[i];

            if (columnOfFour.every(square => currentColorArray[square] === decidedColor)){
                columnOfFour.forEach(square => currentColorArray[square] = '')
            }
        }
    }

    const checkForRowOfFour = () => {
        for(let i = 0; i < 64; i++) {
            const rowOfFour = [i, i + 1, i + 2, i + 3];
            const decidedColor = currentColorArray[i];
            const notValid = [5,6,7,13,14,15,21,22,23,29,30,31,37,38,39,45,46,47,53,54,55,62,63,64]
            
            if (notValid.includes(i)) continue

            if (rowOfFour.every(square => currentColorArray[square] === decidedColor)){
                rowOfFour.forEach(square => currentColorArray[square] = '')
            }
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
            setCurrentColorArray([...currentColorArray])
        }, 100)    
        return () => clearInterval(timer)    
    }, [checkForColumnOfFour, checkForRowOfFour, checkForColumnOfThree, checkForRowOfThree, currentColorArray])

    return (
        <BoardContainer>
            {currentColorArray.map((candyColor, index) =>(
                <BoardCandy
                    key={index}
                    style={{backgroundColor: candyColor}}
                    alt={candyColor}
                />
            ))}
        </BoardContainer>       
    )
};

export default Board;