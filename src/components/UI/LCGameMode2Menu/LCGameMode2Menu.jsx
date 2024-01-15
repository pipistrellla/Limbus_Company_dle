import React, {useState, useRef, useEffect} from "react";
import classes from './LCGameMode2Menu.module.css';
import LCInput from "../LCInput/LCInput";
import LCButton from '../LCButton/LCButton'
import LCCanvas from "../LCCanvas/LCCanvas";
import { useLCCanvasFill } from "../../hook/useLCCanvas";
import { LCFillBlack } from "../../LCFillBlack";
import {LCCanvasClear} from '../../LCCanvasClear';
import { LCAnswerCheck } from "../../LCAnswerCheck";



const LCGameMode2Menu = () => {
    const [userAnswer, setUserAnswer] = useState('');

    const [imgLink, setImageLink] = useState([require('../../../images/ImageForGameMode2/Acupuncture_Outis_Icon.webp'),
    require('../../../images/ImageForGameMode2/Acupuncture_Outis_Icon.webp'),
    require('../../../images/ImageForGameMode2/Acupuncture_Outis_Icon.webp'),
    require('../../../images/ImageForGameMode2/Acupuncture_Outis_Icon.webp')])

    const [gameMode2Data, setGameMode2Data] = useState('[]')
    const canvasRefPassive = useRef();
    const canvasRefSupport = useRef();

    useLCCanvasFill(canvasRefPassive, LCFillBlack);
    useLCCanvasFill(canvasRefSupport, LCFillBlack);

    const [gameMode2Answer, setGameMode2Answer] = useState('ryoshu')

    function canvasClearPassive(){
        const canvas = canvasRefPassive.current;
        const context = canvas.getContext('2d');
        LCCanvasClear(context);
    }

    function canvasClearSupport(){
        const canvas = canvasRefSupport.current;
        const context = canvas.getContext('2d');
        LCCanvasClear(context);
    }

    if (localStorage.getItem('gameMode2Passive') === null) {
        localStorage.setItem('gameMode2Passive' , JSON.stringify(false));
    }

    if (localStorage.getItem('gameMode2Support') === null) {
        localStorage.setItem('gameMode2Support' , 'false');
    }

    useEffect( () => {
        // делаем запрос и добавляепм список всех identity 
        fetch('/api/gm2')
        .then(response => response.json())
        .then(response => setGameMode2Data(JSON.stringify(response)));

        if (JSON.parse(localStorage.getItem('gameMode2Support')) === true)
        {
            canvasClearSupport();
        }
        if (JSON.parse(localStorage.getItem('gameMode2Passive')) === true)
        {
            canvasClearPassive();
        }}, 

        []);
    
        useEffect(() => { 
            if (gameMode2Data !== '[]')
            {
                // рендоманая генерация 1 картинки

                console.log(gameMode2Data)
                setImageLink('')
                setImageLink([require(`../../../images/ImageForGameMode2/${(JSON.parse(gameMode2Data))[0].pathToImage[0]}`),
                require(`../../../images/ImageForGameMode2/${(JSON.parse(gameMode2Data))[0].pathToImage[1]}`),
                require(`../../../images/ImageForGameMode2/${(JSON.parse(gameMode2Data))[0].pathToImage[2]}`),
                require(`../../../images/ImageForGameMode2/${(JSON.parse(gameMode2Data))[0].pathToImage[3]}`)]);
                setGameMode2Answer(JSON.parse(gameMode2Data)[0].characterName)
    
                // статичная генерация
                // let item = (JSON.parse(identityList))  
                // item = item[0]
                // setGameMode3Answer(item.characterName);
                // setGameMode3EGOAnswer(item.name);
                // setImageLink('');
                // setImageLink(require(`../../../images/ImageForGameMode3/${item.pathToImage}`));
            
        }
    
        }, [gameMode2Data])
        
        



return(
    <form>
        <div className={classes.LCGameModeBorder}>
            
            
            <div className={classes.LCFirstLine}>
                <LCCanvas 
                    ref ={canvasRefSupport} 
                    className={classes.LCSkill} 
                    style={{ 
                        backgroundImage: `url("${imgLink[0]}")` 
                }}/>
                <LCCanvas 
                    ref ={canvasRefPassive} 
                    className={classes.LCSkill}                     
                    style={{ 
                        backgroundImage: `url("${imgLink[1]}")` 
                }} />
                <LCCanvas 
                    ref ={canvasRefPassive} 
                    className={classes.LCSkill}                     
                    style={{ 
                        backgroundImage: `url("${imgLink[2]}")` 
                }} />
                <LCCanvas 
                    ref ={canvasRefPassive} 
                    className={classes.LCSkill}                     
                    style={{ 
                        backgroundImage: `url("${imgLink[3]}")` 
                }} />
            </div>


            <div className={classes.LCSecondLine}>

                <LCInput 
                    style = {{minWidth: '500px' , height: '30%'}}
                    type = 'text' 
                    name = 'userAnswer'
                    placeholder = 'Enter LC character name' 
                    onChange={(event) =>   setUserAnswer(event.target.value)}/>

                <LCButton 
                    
                    onClick = {(e) => 
                        {e.preventDefault();
                            if (LCAnswerCheck(userAnswer, gameMode2Answer)) {
                                canvasClearPassive()
                                canvasClearSupport() 
                            }
                            else {
                                canvasClearPassive()
                                
                                if (JSON.parse(localStorage.getItem('gameMode2Passive')) === true){
                                    canvasClearSupport()
                                    localStorage.setItem('gameMode2Support' , JSON.stringify(true));
                                    
                                }
                                localStorage.setItem('gameMode2Passive' , JSON.stringify(true));
                                
                            }
                        }
                    }> Confirm </LCButton>
            </div>



        </div>
    </form>
    

);
};

export default LCGameMode2Menu;
