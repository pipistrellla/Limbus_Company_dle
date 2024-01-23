import React , {useEffect, useState} from "react";
import classes from './LCGameMode4Menu.module.css';
import LCInput from "../LCInput/LCInput";
import LCButton from '../LCButton/LCButton'
import { LCAnswerCheck } from "../../LCAnswerCheck";

const LCGameMode4Menu = () => {
    const [userAnswer, setUserAnswer] = useState('');

    
    const [emojiGuess, setEmojiGuess] = useState('⚔ 🚬 🚅 🧽')
    const emojiGuessArr = emojiGuess.split(' ')
    const [gameMode4Answer,setGameMode4Answer] = useState('ryoshu') 


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
        setEmojiGuessShowed(emojiGuess);
        localStorage.setItem('gameMode4' , JSON.stringify(emojiGuess));
    }


    if (localStorage.getItem('gameMode4') === null) {
        localStorage.setItem('gameMode4' , JSON.stringify(emojiGuessArr[0]));
    }

    const [emojiGuessShowed, setEmojiGuessShowed] = 
    useState((typeof(JSON.parse(localStorage.getItem('gameMode4'))))
     === 'string' ? [JSON.parse(localStorage.getItem('gameMode4'))] : (JSON.parse(localStorage.getItem('gameMode4'))))
    useEffect( ( ) => 
    {
        fetch('/api/gm4')
        .then(response => response.json())
        .then(response => {
            let tempData = response[1].split(' - ')
            setEmojiGuess(tempData[0])
            setGameMode4Answer(tempData[1])
        })
    })

return(
    <form>
        <div className={classes.LCGameModeBorder}>
            
            <div className={classes.LCEmoji}> 
                {emojiGuessShowed.map((item)=> <div key = {item} className={classes.LCChar}>{item}</div>)}  
            </div>
            
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
