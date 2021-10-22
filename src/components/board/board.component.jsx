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