const API_KEY = process.env.REACT_APP_WORDNIK_API_KEY;


const apiBaseURL = "http://api.wordnik.com:80/v4/words.json/";

const apiOptions = "randomWords?hasDictionaryDef=true&minCorpusCount=0&minLength=5&maxLength=15&limit=1&api_key="

export const requestURL = `${apiBaseURL}${apiOptions}${API_KEY}`;

export const sounds = {
    correct: "http://soundbible.com/mp3/Ta%20Da-SoundBible.com-1884170640.mp3",
    wrong: "http://soundbible.com/mp3/Bleep-SoundBible.com-1927126940.mp3"
}