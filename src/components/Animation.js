import { motion, useAnimation } from "framer-motion"
import { useEffect } from "react"

export const Animation = (props) => {
    const controls = useAnimation()
    const variants = {
        started: () => ({
            bottom: [0, 100, 0],
            rotate: 90,
            transition:{
                repeat: Infinity,
                duration: 60 / props.tempo
            }
        })
    }
    useEffect(() => {
        controls.set({transitionDuration: 60 / props.tempo})
    }, [props.tempo, controls])


    return (<motion.div
        variants= {variants}
        animate="started"
        drag
        dragConstraints={props.constraintsRef}
        style={{
            position: "absolute",
            bottom: 0,
            width: 200,
            height: 200,
            backgroundColor: "skyblue",
            borderRadius: "20%"
        }}
    />)
}

