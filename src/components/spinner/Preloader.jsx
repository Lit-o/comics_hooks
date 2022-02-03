import style from "./Preloader.module.css";
// import React from "react";

const Preloader = () => {
    return (
        <div className={style.loader}>
            <svg>
                {/*strokeDasharray = stroke-dasharray strokeWidth = stroke-width*/}
                <circle cx="50" cy="50" r="40" stroke="#9F0013" strokeDasharray="78.5 235.5" strokeWidth="3"
                        fill="none"/>
                <circle cx="50" cy="50" r="30" stroke="#5C5C5C" strokeDasharray="62.8 188.8" strokeWidth="3"
                        fill="none"/>
                <circle cx="50" cy="50" r="20" stroke="#9F0013" strokeDasharray="47.1 141.3" strokeWidth="3"
                        fill="none"/>
            </svg>
        </div>
    )
}

// randomiser = (min, max) => {
//     min = Math.ceil(min);
//     max = Math.floor(max);
//     return Math.floor(Math.random() * (max - min + 1)) + min;
//   } 

export default Preloader;