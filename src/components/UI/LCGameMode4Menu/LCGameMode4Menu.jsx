import React , {useEffect, useState} from "react";
import classes from './LCGameMode4Menu.module.css';
import LCInput from "../LCInput/LCInput";
import LCButton from '../LCButton/LCButton'
import { LCAnswerCheck } from "../../LCAnswerCheck";
import { LCRandomTask } from "../../LCRandomTask";
const LCGameMode4Menu = () => {
    const [nextVisible, setNextVisible] = useState((localStorage.getItem('gm4Next')==='true') ? true : false)
    const [userAnswer, setUserAnswer] = useState('');
    const [emojiGuess, setEmojiGuess] = useState(' ')
    const [gameMode4Answer,setGameMode4Answer] = useState(' ')  


// в массивах определяем индекс по длине массива,который хотим увеличить
    function showNewEmoji() {
        let emojiGuessArrShowed = []
        if ((localStorage.getItem('gameMode4')).length === 1 ){
            emojiGuessArrShowed = JSON.parse(localStorage.getItem('gameMode4'))
        }
        else {
            emojiGuessArrShowed = JSON.parse(localStorage.getItem('gameMode4'))
        }


        if ( emojiGuessArrShowed.length < emojiGuess.length){
            emojiGuessArrShowed.push(emojiGuess[emojiGuessArrShowed.length].toString());
        }

        localStorage.setItem('gameMode4' , JSON.stringify(emojiGuessArrShowed));
        setEmojiGuessShowed(JSON.parse(localStorage.getItem('gameMode4')));
    }


    function showAllEmoji() {
        setEmojiGuessShowed(emojiGuess);
        localStorage.setItem('gameMode4' , JSON.stringify(emojiGuess));
    }

    const answerSet = () => {    
        fetch('/api/gm4')
        .then(response => response.json())
        .then(response => {
            // фетчим дату с запросв и раскидываем ее в массив
            let tempData = response[LCRandomTask(response)].split(' - ')
            // устанавливаем значение смайликов в ответе
            setEmojiGuess(tempData[0].split(' '))
            tempData[0] = tempData[0].split(' ')
            localStorage.setItem('gameMode4' , JSON.stringify([tempData[0][0]]))
            // устанавливаем значение имени в ответе
            setGameMode4Answer(tempData[1])
            // запоминаем чтобы не делать запрос повторно
            localStorage.setItem('gameMode4Answers' , JSON.stringify([tempData[0], tempData[1]]))
            // выводим первый смайлик
            setEmojiGuessShowed(JSON.parse(localStorage.getItem('gameMode4')))
    })}

    const [emojiGuessShowed, setEmojiGuessShowed] = 
    useState([' '])
    
    useEffect( ( ) => 
    {
        if (localStorage.getItem('gameMode4Answers') === null)
        {    answerSet()
        } else if (emojiGuess === ' ' ) {
            // достаем ответ и данные смайлики из ЛС
            setEmojiGuess(JSON.parse(localStorage.getItem('gameMode4Answers'))[0])
            setGameMode4Answer(JSON.parse(localStorage.getItem('gameMode4Answers'))[1])
            setEmojiGuessShowed(JSON.parse(localStorage.getItem('gameMode4')))
        }
    })

    const LCGameModeBorderClasses = [classes.LCEmoji]
    const [LCGameModeBorderClassesShake,setLCGameModeBorderClassesShake] = useState(' ')

    
    if (LCGameModeBorderClassesShake === false){
        LCGameModeBorderClasses.push(classes.wrong)
    
        setTimeout(()=> {LCGameModeBorderClasses.pop() ; setLCGameModeBorderClassesShake(' ')},400)
    }
    
    if (LCGameModeBorderClassesShake === true){
        LCGameModeBorderClasses.push(classes.true)
    
        setTimeout(()=> {LCGameModeBorderClasses.pop() ; setLCGameModeBorderClassesShake(' ')},400)
    }
    

return(
    <form>
        <div className={classes.LCGameModeBorder}>
            
            <div className={LCGameModeBorderClasses.join(' ')}> 
                {emojiGuessShowed.map((item)=> <div key = {item} className={classes.LCChar}>{item}</div>)}  
            </div>
            
            <LCInput
            type = 'text' 
            name = 'userAnswer'
            placeholder = {( nextVisible === true) ? JSON.parse(localStorage.getItem('gameMode4Answers'))[1] : 'Enter LC character name' }
            onChange={(event) =>   setUserAnswer(event.target.value)}
            disabled = {(nextVisible === true) ? true : false }
            />
            <LCButton
            disabled={(nextVisible === true) ? true : false }
            onClick = {(e) => 
                {e.preventDefault();
                    if (LCAnswerCheck(userAnswer, gameMode4Answer)) {
                        showAllEmoji();
                        setLCGameModeBorderClassesShake(true)
                        setNextVisible(true)
                        localStorage.setItem('gm4Next' , true)
                    }
                    else {
                        showNewEmoji();
                        setLCGameModeBorderClassesShake(false)

                    }
                    
                }}> Confirm </LCButton>

            <LCButton
                key ={'next'}
                visible={nextVisible}
                onClick = {(e) => 
                    {e.preventDefault();
                        answerSet()
                        setNextVisible(false)
            }}>
                Next
            </LCButton>

        </div>
    </form>
    

);
};

export default LCGameMode4Menu;
