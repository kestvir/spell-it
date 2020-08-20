import React from "react";
import { motion } from "framer-motion";
import { allBtnVariants } from "../framerMotionVariants";

const AnswerForm = ({
  checkAnswer,
  setAnswer,
  forwardedRefAnswerInputEl,
  answer,
  forwardedRefHintEl,
  hideHint,
}) => {
  return (
    <form onSubmit={checkAnswer}>
      <input
        onChange={(e) => setAnswer(e.target.value)}
        ref={forwardedRefAnswerInputEl}
        type="text"
        value={answer}
        id="answer"
        name="answer"
        placeholder="Type your answer!"
        autoComplete="off"
        spellCheck="false"
      />

      <div ref={forwardedRefHintEl} id="hint" onClick={hideHint}>
        Hello
      </div>

      <motion.input
        className="btn"
        id="submit-btn"
        type="submit"
        variants={allBtnVariants}
        whileHover="hover"
      />
    </form>
  );
};

export default AnswerForm;
