export const startContainerVariants = {
    hidden: {
        opacity: 0
    },
    visible: {
        opacity: 1,
        transition: {
            delay: 0.5,
            duration: 1.2,
            when: "beforeChildren",
            staggerChildren: 1
        }
    }
}

export const basicVariants = {
    hidden: {
        opacity: 0
    },
    visible: {
        opacity: 1,
        transition: {
            duration: 1,
            when: "beforeChildren",
            staggerChildren: 1
        }
    }
}

export const statsVariants = {
    hidden: {
        y: '-100vh'
    },
    visible: {
        y: 0,
        transition: {
            type: "spring",
            stiffness: 50
        }
    }
}

export const gameVariants = {
    hidden: {
        y: '100vh'
    },
    visible: {
        y: 0,
        transition: {
            type: "spring",
            stiffness: 50
        }
    }
}

export const allBtnVariants = {
    hover: {
        scale: 1.1,
        textShadow: "0px 0px 7px rgb(255,255,255)",
        boxShadow: "0px 0px 7px rgb(255,255,255)",
        transition: {
            duration: 0.3,
            yoyo: Infinity
        }
    }
}
