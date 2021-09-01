import { motion, useAnimation } from "framer-motion"
import { useEffect } from "react"
import { useSelector } from "react-redux"

export const Animation = (props) => {
    const playing = useSelector(state => state.video.isOn)
    const controls = useAnimation()
    const variants = {
        started:{
            bottom: [0, 100, 0],
            rotate: 90,
            transition: {
                repeat: Infinity,
                duration: 60 / props.tempo
            }
        },
        stopped: {
            bottom: 0,
            rotate: 0,
        }
    }
    useEffect(() => {
        controls.set({ transitionDuration: 60 / props.tempo })
    }, [props.tempo, controls])


    return (<motion.div
        key={props.tempo}
        variants={variants}
        animate={playing ? "started" : "stopped"}
        drag
        dragConstraints={props.constraintsRef}
        style={{
            position: "absolute",
            bottom: 0,
            width: 200,
            height: 200,
            zIndex: 0,
            backgroundColor: "skyblue",
            borderRadius: "20%"
        }}
    />)
}

