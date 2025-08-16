import { useRef } from "react";
import darkMode from "../assets/dark_mode.png";
import lightMode from "../assets/light_mode.png";
import logo from "../assets/microsoft.png";

export default function Navbar (){
    // TODO: Implement and fix theme toggle functionality
    const theme = useRef<HTMLImageElement>(null);

    const handleThemeMode = ():void => {

    }

    return(
        <>
        <div className="flex flex-row justify-evenly items-center w-screen h-18 bg-blue-500">
            <input className="bg-white rounded-2xl pl-2"/>
            <div className="flex flex-row justify-evenly items-center w-1/4">
                <label>AMZN</label>
                <label>AAPL</label>
                <img className="w-10" src={logo}/>
                <label>MSFT</label>
                <label>NVDA</label>
            </div>

            <img className="w-10" src={lightMode} ref={theme} onClick={handleThemeMode}/>
        </div>
        </>
    )
}