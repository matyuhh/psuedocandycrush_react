import React from 'react'
import { ScoreBoardContainer } from './scoreboard.styles';

const ScoreBoard = ({score}) => {
    return (
        <ScoreBoardContainer>
            <h2>{score}</h2>
        </ScoreBoardContainer>
    )
}

export default ScoreBoard;

