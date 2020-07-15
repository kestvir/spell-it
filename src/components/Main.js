import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { sounds, requestURL } from '../constants';
import Message from './Message';
import GameStats from './GameStats';
import Loader from './Loader';
import {
    gameVariants,
    basicVariants,
    allBtnVariants,
    startContainerVariants
} from '../framerMotionVariants';
import { motion, AnimatePresence } from 'framer-motion';


const Main = () => {
    const [word, setWord] = useState('');
    const [answer, setAnswer] = useState('');
    const [msgType, setMsgType] = useState(null)
    const [round, setRound] = useState(0)
    const [attempts, setAttempts] = useState(0)
    const [correctAttempts, setCorrectAttempts] = useState(0)
    const [accuracy, setAccuracy] = useState(0)
    const [displayMessage, setDisplayMessage] = useState(false)
    const [displayHintButton, setDisplayHintButton] = useState(false)
    const [loading, setLoading] = useState(false)
    const [highScore, setHighScore] = useState(0)


    const hintEl = useRef(null);
    const answerInputEl = useRef(null);
    const startGameEl = useRef(null)
    const mainContainerEl = useRef(null)


    const startRound = () => {
        if (startGameEl.current && startGameEl.current.style.display !== "none") {
            startGameEl.current.style.display = "none";
        }

        if (round === 0) {
            setLoading(true)
            getPrevHighscore()
        }

        setTimeout(() => {
            getRandomWord();
            setRound(round + 1)
        }, 1500)
    }

    const getPrevHighscore = () => {
        const savedHighScore = localStorage.getItem('highScore');
        const userHighScore = savedHighScore !== 'null' ? parseInt(savedHighScore) : 0
        setHighScore(userHighScore)
    }

    const getRandomWord = () => {
        axios.get(`${requestURL}`)
            .then(res => {
                setWord(res.data[0].word)
                if (round === 0) setLoading(false)
            })
            .catch(err => {
                alert(err.response);
            });
    }

    const sayWord = () => {
        const msg = new SpeechSynthesisUtterance(word);
        window.speechSynthesis.speak(msg);
    }

    const playGameSound = result => {
        let audio
        if (result === 'correct') {
            audio = new Audio(sounds.correct);
        } else {
            audio = new Audio(sounds.wrong)
        }
        audio.play()
    }

    const checkAnswer = e => {
        e.preventDefault()

        console.log(word, answer)
        if (word.toLowerCase() === answer.toLowerCase().trim()) {
            playGameSound('correct')
            setMsgType('correct')
            setAnswer('')
            setWord('')
            setCorrectAttempts(correctAttempts + 1)
            setDisplayHintButton(false)
            startRound()
        }
        else {
            playGameSound('wrong')
            setMsgType('wrong');
            setDisplayHintButton(true)
        }
        setAttempts(attempts + 1)

        toggleMessageDisplay(true)
        toggleMessageDisplay(false)
    }

    const toggleMessageDisplay = display => {
        if (display) {
            mainContainerEl.current.style.display = 'none'
            setDisplayMessage(true)
        } else {
            setTimeout(() => {
                setDisplayMessage(false)
            }, 2000)

            setTimeout(() => {
                mainContainerEl.current.style.display = 'flex'
            }, 3000)
        }
    }

    const lengthNotSame = () => {
        hintEl.current.innerHTML =
            `
            <span class="tiny-text">Incorrect answer length</span>
            <p>${answer}</p>
        `
    }

    const displayIncorrectLetters = () => {
        const wordLettersArr = word.split('');
        const answerLettersArr = answer.split('');

        const hintLettersArr = answerLettersArr.map((letter, i) => {
            if (letter !== wordLettersArr[i]) {
                return `<span class="incorrect-letter">${letter}</span>`
            } else {
                return letter;
            }
        })

        const hintWord = hintLettersArr.join('')
        hintEl.current.innerHTML = `<p>${hintWord}</p>`
    }

    const displayHint = () => {
        if (answer.length !== word.length) {
            lengthNotSame()
        } else {
            displayIncorrectLetters()
        }

        hintEl.current.style.display = "block";
        answerInputEl.current.style.display = "none";
    }

    const hideHint = () => {
        hintEl.current.innerHTML = ""
        hintEl.current.style.display = "none";
        answerInputEl.current.style.display = "block";
    }

    useEffect(() => {
        const saveNewHighScore = () => {
            const newHighscore = round - 1;
            setHighScore(newHighscore)
            localStorage.setItem('highScore', newHighscore);
        }
        if (round > highScore) {
            saveNewHighScore()
        }
    }, [round, highScore])

    useEffect(() => {
        if (word.length === 0) return
        // need to rewrite
        else sayWord()
        console.log(word)
    }, [word])

    useEffect(() => {
        const calcAccuracy = () => {
            // need to rewrite
            return (correctAttempts / attempts * 100).toFixed(0)
        }
        if (attempts === 0) return
        else {
            const currentAccucary = calcAccuracy()
            setAccuracy(currentAccucary)
        }
    }, [attempts])

    return (
        <div className="text-center">

            {loading && <Loader />}

            <AnimatePresence>
                {displayMessage &&
                    <motion.div
                        variants={basicVariants}
                        initial="hidden"
                        animate="visible"
                        exit={{ opacity: 0 }}
                        style={{ margin: 'auto' }}>
                        <Message msgType={msgType} />
                    </motion.div>
                }
            </AnimatePresence>

            <motion.div
                ref={mainContainerEl}
                className="main-container"
                variants={basicVariants}
                initial="hidden"
                animate="visible"
            >

                {word &&
                    <div className="container">
                        <span id="high-score">High score: {highScore}</span>

                        <GameStats
                            accuracy={accuracy}
                            attempts={attempts}
                            round={round} />

                        <motion.div variants={gameVariants}>
                            <div id="hint-and-repeat">
                                <motion.button className="btn" id="repeat-btn"
                                    onClick={sayWord}
                                    variants={allBtnVariants}
                                    whileHover="hover"
                                >
                                    Repeat Word
                                    </motion.button>

                                {displayHintButton &&
                                    <motion.button
                                        className="btn"
                                        id="hint-btn" onClick={displayHint}
                                        variants={allBtnVariants}
                                        whileHover="hover"
                                    >
                                        Hint
                                        </motion.button>
                                }
                            </div>


                            <form onSubmit={checkAnswer}>

                                <input
                                    onChange={e => setAnswer(e.target.value)}
                                    ref={answerInputEl}
                                    type="text"
                                    value={answer}
                                    id="answer"
                                    name="answer"
                                    placeholder="Type your answer!"
                                    autoComplete="off"
                                    spellCheck="false"
                                />

                                <div ref={hintEl} id="hint" onClick={hideHint}>
                                    Hello
                                </div>

                                <motion.input className="btn" id="submit-btn" type="submit"
                                    variants={allBtnVariants}
                                    whileHover="hover" />

                            </form>

                        </motion.div>

                    </div>
                }


                {!round &&
                    (
                        <motion.div
                            ref={startGameEl}
                            id="start-game-screen"
                            variants={startContainerVariants}>
                            <h1 >
                                Spell It!
                            </h1>

                            <motion.div variants={basicVariants}>
                                <motion.button className="btn start-btn" onClick={startRound}
                                    variants={allBtnVariants}
                                    whileHover="hover"
                                >
                                    Start Game
                                </motion.button>
                            </motion.div>
                        </motion.div>
                    )
                }
            </motion.div>
        </div >
    );
}

export default Main;