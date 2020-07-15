import React from 'react';
import { motion } from 'framer-motion';
import { statsVariants } from '../framerMotionVariants'


const GameStats = ({ round, attempts, accuracy }) => {
    return (
        <motion.div id="game-stats" variants={statsVariants} initial="hidden" animate="visible">
            <div id="attempts">Attempts:{attempts}</div>
            <div id="round">Round:{round}</div>
            <div id="accuracy">Accuracy:{accuracy}%</div>
        </motion.div>
    );
}

export default GameStats;