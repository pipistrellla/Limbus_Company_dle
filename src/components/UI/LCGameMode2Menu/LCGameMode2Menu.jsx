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
    const [nextImageVisible, setNextImageVisible] = useState(( localStorage.getItem('gm2next') === 'true') ? true : false)

    function answerSet(position){
        if (localStorage.getItem('gm2position') === null){
            localStorage.setItem('gm2position' , position)
            setImageLink('')
            let tempArr = JSON.parse(gameMode2Data)[position].pathToImage
            // присваиваем картинки
            tempArr = tempArr.map(item => require(`../../../images/ImageForGameMode2/${item}`))
            setImageLink(tempArr)
            setGameMode2Answer(JSON.parse(gameMode2Data)[position].characterName)
        } else {
            let tempPos = +localStorage.getItem('gm2position')
            let tempArr = JSON.parse(gameMode2Data)[tempPos].pathToImage
            // присваиваем картинки
            tempArr = tempArr.map(item => require(`../../../images/ImageForGameMode2/${item}`))
            setImageLink(tempArr)
            setGameMode2Answer(JSON.parse(gameMode2Data)[tempPos].characterName)
        }


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
            if (localStorage.getItem('gm2attempt') !== null )
                setAttempNumber(+localStorage.getItem('gm2attempt'))
    }
    
    
    }, [gameMode2Data])
        
    const LCGameModeBorderClasses = [classes.LCFirstLine]
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
                {imgLink.map((item)=>
                <LCCanvas
                    className={(imgLink.indexOf(item) < attempNumber )? classes.LCSkill + ' ' + classes.next : classes.LCFullblack} 
                    key = {item}
                    style={{ 
                    backgroundImage: (imgLink.indexOf(item) < attempNumber )? `url("${item}")` : `url("")`}}>
                </LCCanvas>)}

            </div>


            <div className={classes.LCSecondLine}>

                <LCInput 
                    type = 'text' 
                    name = 'userAnswer'
                    disabled={(nextImageVisible === true) ? true : false }
                    placeholder = {(nextImageVisible === true) ?  gameMode2Answer: 'Enter LC character name' }
                    onChange={(event) =>  setUserAnswer(event.target.value)
                    }/>

                <LCButton 
                    disabled={(nextImageVisible === true) ? true : false }
                    onClick = {(e) => 
                        {e.preventDefault();
                            if (LCAnswerCheck(userAnswer, gameMode2Answer)) {
                                setAttempNumber(4)
                                setNextImageVisible(true)
                                setLCGameModeBorderClassesShake(true)
                                localStorage.setItem('gm2next' , true)
                                localStorage.setItem('gm2attempt' , 4)
                                localStorage.setItem('gm2score', +(localStorage.getItem('gm2score'))+1)
                            } else {
                                setAttempNumber(attempNumber+1)
                                setLCGameModeBorderClassesShake(false)
                                localStorage.setItem('gm2attempt' , attempNumber+1)
                            }
                        }
                    }> Confirm </LCButton>

                <LCButton 
                    visible={nextImageVisible}
                    onClick = {(e) => 
                        {e.preventDefault();
                            setNextImageVisible(false)
                            localStorage.removeItem('gm2position')
                            answerSet(LCRandomTask(JSON.parse(gameMode2Data)));
                            setAttempNumber(1)
                            localStorage.removeItem('gm2next')
                            localStorage.removeItem('gm2attempt')
                            
                        }
                    }> next Image </LCButton>
            </div>



        </div>
    </form>
    

);
};

export default LCGameMode2Menu;
