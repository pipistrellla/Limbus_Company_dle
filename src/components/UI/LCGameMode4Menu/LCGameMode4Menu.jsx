import React , {useState} from "react";
import classes from './LCGameMode4Menu.module.css';
import LCInput from "../LCInput/LCInput";
import LCButton from '../LCButton/LCButton'
import { LCAnswerCheck } from "../../LCAnswerCheck";

const LCGameMode4Menu = () => {
    const [userAnswer, setUserAnswer] = useState('');

    
    const emojiGuess = '⚔ 🚬🚅 🧽'
    const emojiGuessArr = emojiGuess.split(' ')

    const emojiGuessArrShowed = [];


    const gameMode4Answer = 'ryoshu' 

    const [emojiGuessShowed, setEmojiGuessShowed] = useState(emojiGuessArr[0])

    function showNewEmoji() {

        if (emojiGuessArrShowed.length < emojiGuessArr.length){
            emojiGuessArrShowed.push(emojiGuessArr[emojiGuessArrShowed.length].toString());
        }

        setEmojiGuessShowed(emojiGuessArrShowed.join(' '));
    }


    function showAllEmoji() {
        while (emojiGuessArrShowed.length < emojiGuessArr.length) {
            emojiGuessArrShowed.push(emojiGuessArr[emojiGuessArrShowed.length].toString());
        }
        setEmojiGuessShowed(emojiGuessArrShowed.join(' '));
    }

    emojiGuessArrShowed.push(emojiGuessArr[0]);

return(
    <form>
        <div className={classes.LCGameModeBorder}>
            
            <div className={classes.LCEmoji}> {emojiGuessShowed}  </div>
            
            <LCInput
            type = 'text' 
            name = 'userAnswer'
            placeholder = 'Enter LC character name' 
            onChange={(event) =>   setUserAnswer(event.target.value)}
            />
            <LCButton
            onClick = {(e) => 
                {e.preventDefault();
                    if (LCAnswerCheck(userAnswer, gameMode4Answer)) {
                        showAllEmoji();

                    }
                    else {
                        showNewEmoji();

                    }
                }}> Confirm </LCButton>



        </div>
    </form>
    

);
};

export default LCGameMode4Menu;
