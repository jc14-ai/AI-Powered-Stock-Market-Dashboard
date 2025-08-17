import { useState } from "react";
import darkMode from "../assets/dark_mode.png";
import lightMode from "../assets/light_mode.png";
import logo from "../assets/microsoft.png";

export default function Navbar (){
    // TODO: Implement and fix theme toggle functionality

    const [whatTheme, setTheme] = useState<boolean>(true);
    const [isTimeFrameShown, setTimeFrameVisible] = useState<boolean>(true);

    const changeTheme = ():void => {
        setTheme((prevTheme):boolean => !prevTheme)
    }

    const showTimeFrames = ():void => {
        setTimeFrameVisible((prevBox):boolean => !prevBox)
        console.log("hovered")
    }

    // const holdVisible = ():void =>{
    //     setTimeFrameVisible(():boolean => true)
    // }

    return(
        <>
        <div className="flex flex-row justify-between items-center w-screen h-18 bg-blue-800 pl-10 pr-20">
            <input className="bg-white rounded-2xl pl-2 h-8" 
            onMouseEnter={():void => showTimeFrames()}
            onMouseLeave={():void => showTimeFrames()}/>

            <div className={isTimeFrameShown ? "hidden absolute h-20 w-20 bg-white" : "flex absolute h-20 w-20 bg-white"}>
                <ul className="flex flex-col justify-start items-center m-0">
                    <li className="hover:bg-blue-100 m-0">1 Day</li>
                    <li className="hover:bg-blue-100">1 Week</li>
                    <li className="hover:bg-blue-100">1 Month</li>
                    <li className="hover:bg-blue-100">1 Year</li>
                </ul>
            </div>

            <div className="flex flex-row justify-evenly items-center w-1/4">
                <label className="cursor-pointer text-white hover:text-yellow-500">AMZN</label>
                <label className="cursor-pointer text-white hover:text-red-500">AAPL</label>
                <img className="w-10" src={logo}/>
                <label className="cursor-pointer text-white hover:text-orange-500">MSFT</label>
                <label className="cursor-pointer text-white hover:text-green-500">NVDA</label>
            </div>

            <img className="w-10 cursor-pointer" src={whatTheme ? lightMode : darkMode} onClick={():void =>changeTheme()}/>
        </div>
        </>
    )
}