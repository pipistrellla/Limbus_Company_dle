import React , {useState} from "react";
import classes from './LCGameMode4Menu.module.css';
import LCInput from "../LCInput/LCInput";
import LCButton from '../LCButton/LCButton'
import { LCAnswerCheck } from "../../LCAnswerCheck";

const LCGameMode4Menu = () => {
    const [userAnswer, setUserAnswer] = useState('');

    
    const emojiGuess = '⚔ 🚬 🚅 🧽'
    const emojiGuessArr = emojiGuess.split(' ')
    const gameMode4Answer = 'ryoshu' 


// в массивах определяем индекс по длине массива,который хотим увеличить
    function showNewEmoji() {
        let emojiGuessArrShowed = []

        if (JSON.parse(localStorage.getItem('gameMode4')).length === 1 ){
            emojiGuessArrShowed = (JSON.parse(localStorage.getItem('gameMode4'))).split()
        }
        else {
            emojiGuessArrShowed = (JSON.parse(localStorage.getItem('gameMode4')))
        }


        if ( emojiGuessArrShowed.length < emojiGuessArr.length){
            emojiGuessArrShowed.push(emojiGuessArr[emojiGuessArrShowed.length].toString());
        }

        localStorage.setItem('gameMode4' , JSON.stringify(emojiGuessArrShowed));
        setEmojiGuessShowed(JSON.parse(localStorage.getItem('gameMode4')));
    }


    function showAllEmoji() {
        let emojiGuessArrShowed = []
        // в случая ошибки, чтобы сайт не падал
        let n = 0;
        while (emojiGuessArrShowed.length < emojiGuessArr.length) {

            if (JSON.parse(localStorage.getItem('gameMode4')).length === 1 ){
                emojiGuessArrShowed = (JSON.parse(localStorage.getItem('gameMode4'))).split()
            }
            else {
                emojiGuessArrShowed = (JSON.parse(localStorage.getItem('gameMode4')))
            }

            
            emojiGuessArrShowed.push(emojiGuessArr[emojiGuessArrShowed.length].toString());
            localStorage.setItem('gameMode4' , JSON.stringify(emojiGuessArrShowed));
            n+=1
            if (n > 10 ){
                break
            }
        }

        setEmojiGuessShowed(JSON.parse(localStorage.getItem('gameMode4')));
    }


    if (localStorage.getItem('gameMode4') === null) {
        localStorage.setItem('gameMode4' , JSON.stringify(emojiGuessArr[0]));
    }

    const [emojiGuessShowed, setEmojiGuessShowed] = useState(JSON.parse(localStorage.getItem('gameMode4')))

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
                    console.log(localStorage.getItem('gameMode4'))
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
