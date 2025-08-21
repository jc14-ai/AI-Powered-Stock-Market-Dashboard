import { useState } from "react";
import darkMode from "../assets/dark_mode.png";
import lightMode from "../assets/light_mode.png";
import logo from "../assets/microsoft.png";
import {Link} from 'react-router'

export default function Navbar (): React.ReactElement{
    // TODO: Implement and fix theme toggle functionality

    const [whatTheme, setTheme] = useState<boolean>(true);
    const [isTimeFrameShown, setTimeFrameVisible] = useState<boolean>(true);
    const [value, setValue] = useState<string>("");

    const changeTheme = ():void => {
        setTheme((prevTheme):boolean => !prevTheme)
    }

    const showTimeFrames = ():void => {
        setTimeFrameVisible((prevBox):boolean => !prevBox)
    }

    const holdVisible = ():void =>{
        setTimeFrameVisible(():boolean => false)
    }

    const makeInvisible = ():void =>{
        setTimeFrameVisible(():boolean => true)
    }

    const changeValue = (time:string):void => {
        setValue(time)
    }

    return(
        <>
        <div className="flex flex-row justify-between items-center w-screen h-18 bg-blue-800 pl-10 pr-20 ">
            <div className="">
                <input className={isTimeFrameShown ? "bg-white rounded-xl pl-2 h-8 w-20 outline-0" : "bg-white pl-2 h-8 w-20 outline-0 rounded-t-xl"}
                value={value}
                onMouseEnter={():void => showTimeFrames()}
                onMouseLeave={():void => showTimeFrames()}/>

                <div className={isTimeFrameShown ? "hidden absolute h-24 w-20 bg-white rounded-b-xl" : "flex absolute h-24 w-20 bg-white rounded-b-xl"} 
                onMouseEnter={():void => holdVisible()} 
                onMouseLeave={():void => makeInvisible()}>

                    <ul className="flex flex-col justify-start items-start m-0 w-full">
                        <li className="hover:bg-blue-200 cursor-pointer w-full pl-2"
                        onClick={() => changeValue("1 Day")}>1 Day</li>
                        <li className="hover:bg-blue-200 cursor-pointer w-full pl-2"
                        onClick={() => changeValue("1 Week")}>1 Week</li>
                        <li className="hover:bg-blue-200 cursor-pointer w-full pl-2"
                        onClick={() => changeValue("1 Month")}>1 Month</li>
                        <li className="hover:bg-blue-200 cursor-pointer w-full pl-2 rounded-b-xl"
                        onClick={() => changeValue("1 Year")}>1 Year</li>
                    </ul>

                </div>
            </div>

            <div className="flex flex-row justify-evenly items-center w-1/4">
                <Link to='/Amazon'>
                <label className="cursor-pointer text-white hover:text-yellow-500">AMZN</label>
                </Link>
                <Link to='/Apple'>
                <label className="cursor-pointer text-white hover:text-red-500">AAPL</label>
                </Link>
                <Link to='/'>
                <img className="w-10" src={logo}/>
                </Link>
                <Link to='/Microsoft'>
                <label className="cursor-pointer text-white hover:text-orange-500">MSFT</label>
                </Link>
                <Link to='/Nvidia'>
                <label className="cursor-pointer text-white hover:text-green-500">NVDA</label>
                </Link>
            </div>

            <img className="w-10 cursor-pointer" src={whatTheme ? lightMode : darkMode} onClick={():void =>changeTheme()}/>
        </div>
        </>
    )
}