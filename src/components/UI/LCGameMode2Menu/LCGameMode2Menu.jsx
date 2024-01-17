import React, {useState, useEffect} from "react";
import classes from './LCGameMode2Menu.module.css';
import LCInput from "../LCInput/LCInput";
import LCButton from '../LCButton/LCButton'
import LCCanvas from "../LCCanvas/LCCanvas";
import { LCAnswerCheck } from "../../LCAnswerCheck";
import { LCRandomTask } from "../../LCRandomTask";


const LCGameMode2Menu = () => {
    const [userAnswer, setUserAnswer] = useState('');
    const [imgLink, setImageLink] = useState([require('../../../images/ImageForGameMode2/Acupuncture_Outis_Icon.webp')])
    const [gameMode2Data, setGameMode2Data] = useState('[]')
    const [gameMode2Answer, setGameMode2Answer] = useState('Outis')
    const [attempNumber, setAttempNumber] = useState(1)
    const [nextImageVisible, setNextImageVisible] = useState(false)

    function answerSet(position){
        setImageLink('')
        let tempArr = JSON.parse(gameMode2Data)[position].pathToImage
        // присваиваем картинки
        tempArr = tempArr.map(item => require(`../../../images/ImageForGameMode2/${item}`))
        setImageLink(tempArr)
        setGameMode2Answer(JSON.parse(gameMode2Data)[position].characterName)

    }


    useEffect( () => {
        // делаем запрос и добавляепм список всех identity 
        fetch('/api/gm2')
        .then(response => response.json())
        .then(response => setGameMode2Data(JSON.stringify(response)));
        }, 

        []);
    
    useEffect(() => { 
        if (gameMode2Data !== '[]')
        {
            // рендоманая генерация 1 картинки

            answerSet(LCRandomTask(JSON.parse(gameMode2Data)));
            
    }
    
    }, [gameMode2Data])
        
        



return(
    <form>
        <div className={classes.LCGameModeBorder}>
            
            
            <div className={classes.LCFirstLine}>
                {imgLink.map((item)=>
                <LCCanvas
                    className={classes.LCSkill} 
                    key = {item}
                    style={{ 
                        backgroundImage: (imgLink.indexOf(item) < attempNumber )? `url("${item}")` : `url("")`
                }}>


                </LCCanvas>)}

            </div>


            <div className={classes.LCSecondLine}>

                <LCInput 
                    style = {{minWidth: '500px' , height: '40%'}}
                    type = 'text' 
                    name = 'userAnswer'
                    placeholder = 'Enter LC character name' 
                    onChange={(event) =>   setUserAnswer(event.target.value)}/>

                <LCButton 
                    
                    onClick = {(e) => 
                        {e.preventDefault();
                            if (LCAnswerCheck(userAnswer, gameMode2Answer)) {
                                setAttempNumber(4)
                                setNextImageVisible(true)
                            }
                            else {
                                setAttempNumber(attempNumber+1)
                            }
                        }
                    }> Confirm </LCButton>

                <LCButton 
                    visible={nextImageVisible}
                    onClick = {(e) => 
                        {e.preventDefault();
                            setNextImageVisible(false)
                            answerSet(LCRandomTask(JSON.parse(gameMode2Data)));
                            setAttempNumber(1)
                        }
                    }> next Image </LCButton>
            </div>



        </div>
    </form>
    

);
};

export default LCGameMode2Menu;
