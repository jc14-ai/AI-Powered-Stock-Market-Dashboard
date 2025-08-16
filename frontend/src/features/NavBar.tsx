import { useState } from "react";
import darkMode from "../assets/dark_mode.png";
import lightMode from "../assets/light_mode.png";
import logo from "../assets/microsoft.png";

export default function Navbar (){
    // TODO: Implement and fix theme toggle functionality
    // const themeRef = useRef<HTMLImageElement>(null);

    // const handleThemeMode = ():void => {
    //     if (themeRef.current) {
    //         if (themeRef.current.src === lightMode) {
    //             themeRef.current.src = darkMode;   
    //         } else {
    //             themeRef.current.src = lightMode;
    //         }
    //     }
    // }

    const [whatTheme, setTheme] = useState<boolean>(true);

    const changeTheme = ():void => {
        setTheme((prevTheme):boolean => !prevTheme)
    }

    return(
        <>
        <div className="flex flex-row justify-between items-center w-screen h-18 bg-blue-800 pl-10 pr-20">
            <input className="bg-white rounded-2xl pl-2 h-8"/>
            <div className="flex flex-row justify-evenly items-center w-1/4">
                <label className="cursor-pointer text-white hover:text-yellow-500">AMZN</label>
                <label className="cursor-pointer text-white hover:text-red-500">AAPL</label>
                <img className="w-10" src={logo}/>
                <label className="cursor-pointer text-white hover:text-orange-500">MSFT</label>
                <label className="cursor-pointer text-white hover:text-green-500">NVDA</label>
            </div>

            <img className="w-10 cursor-pointer" src={whatTheme ? lightMode: darkMode} onClick={():void =>changeTheme()}/>
        </div>
        </>
    )
}