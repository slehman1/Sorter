import React from "react"

function Divvy(props) {


    const leftPush = props.index * 7
    const heighter = props.height * 2

    var backgroundColorz = "red"

    if (props.isSelected){
        backgroundColorz = "blue"
    }

    if (props.isSorted){
        backgroundColorz = "purple"
    }

    if (props.isDone){
        backgroundColorz = "green"
    }


    const style = {
        backgroundColor: backgroundColorz,
        width: "10px",
        height: `${heighter}px`,
    }

    const style2 = {
        position: "relative",
        left: `${leftPush}px`,
    }


    return (
        <div style={style2}>
            <div style={style}>
            </div>
            <span>{props.height}</span>

        </div>
        

    )
}


export default Divvy;