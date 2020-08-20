import React from "react";
import { motion } from "framer-motion";
import {
  basicVariants,
  allBtnVariants,
  startContainerVariants,
} from "../framerMotionVariants";

const StartGaame = ({ forwardedRefStartGameEl, startRound }) => {
  return (
    <motion.div
      ref={forwardedRefStartGameEl}
      id="start-game-screen"
      variants={startContainerVariants}
    >
      <h1>Spell It!</h1>

      <motion.div variants={basicVariants}>
        <motion.button
          className="btn start-btn"
          onClick={startRound}
          variants={allBtnVariants}
          whileHover="hover"
        >
          Start Game
        </motion.button>
      </motion.div>
    </motion.div>
  );
};

export default StartGaame;
