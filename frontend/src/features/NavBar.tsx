import { useState } from "react";
import darkMode from "../assets/dark_mode.png";
import lightMode from "../assets/light_mode.png";
import logo from "../assets/microsoft.png";
import { Link } from 'react-router'

export default function Navbar(): React.ReactElement {
    // TODO: Implement and fix theme toggle functionality

    const [whatTheme, setTheme] = useState<boolean>(true);
    const [isTimeFrameShown, setTimeFrameVisible] = useState<boolean>(true);
    const [value, setValue] = useState<string>("");

    const changeTheme = (): void => {
        setTheme((prevTheme): boolean => !prevTheme)
    }

    const showTimeFrames = (): void => {
        setTimeFrameVisible((prevBox): boolean => !prevBox)
    }

    const setVisible = (isVisible: boolean): void => {
        setTimeFrameVisible(isVisible)
    }

    const changeValue = (time: string): void => {
        setValue(time)
    }

    return (
        <>  {/* HOLDS NAVIGATION BAR */}
            <div className="flex flex-row justify-between items-center w-screen h-24 bg-[#273166] pl-10 pr-20">
                <div>
                    {/* TIMEFRAME INPUT */}
                    <input className={isTimeFrameShown ? "bg-gray-200 pr-1 rounded-xl h-11 w-23 outline-0 text-center font-voces font-medium text-frame" : "bg-gray-200 pr-1 h-11 w-23 outline-0 rounded-t-xl text-center font-voces font-medium text-frame"}
                        value={value ? value : 'All Time'}
                        onMouseEnter={(): void => showTimeFrames()}
                        onMouseLeave={(): void => showTimeFrames()} />

                    {/* THIS HOLDS TIMEFRAMES*/}
                    <div className={isTimeFrameShown ? "hidden absolute h-40 w-23 bg-gray-200 rounded-b-xl" : "flex absolute h-40 w-23 bg-gray-200 rounded-b-xl"}
                        onMouseEnter={(): void => setVisible(!true)}
                        onMouseLeave={(): void => setVisible(!false)}>
                        
                        {/* LIST OF TIMES */}
                        <ul className="flex flex-col h-full justify-start items-start m-0 w-full">
                            <li className="flex h-10 justify-center items-center hover:bg-gray-100 duration-400 cursor-pointer w-full font-voces font-medium text-frame"
                                onClick={() => changeValue("1 Week")}>1 Week</li>
                            <li className="flex h-10 justify-center items-center hover:bg-gray-100 duration-400 cursor-pointer w-full font-voces font-medium text-frame"
                                onClick={() => changeValue("1 Month")}>1 Month</li>
                            <li className="flex h-10 justify-center items-center hover:bg-gray-100 duration-400 cursor-pointer w-full font-voces font-medium text-frame"
                                onClick={() => changeValue("1 Year")}>1 Year</li>
                            <li className="flex h-10 justify-center items-center hover:bg-gray-100 duration-400 cursor-pointer w-full rounded-b-xl font-voces font-medium text-frame"
                                onClick={() => changeValue("All Time")}>All Time</li>
                        </ul>

                    </div>
                </div>

                {/* STOCK TICKER NAVIGATIONS */}
                <div className="flex flex-row justify-evenly items-center w-2/2 h-1/1">
                    <Link to='/Amazon' className="flex justify-center items-center bg-[#262c50] h-[50px] w-1/5 rounded-4xl cursor-pointer text-white text-xl font-voces font-medium hover:bg-[#424b84]  duration-600">
                        <label>AMZN</label>
                    </Link>
                    <Link to='/Apple' className="flex justify-center items-center bg-[#262c50] h-[50px] w-1/5 rounded-4xl cursor-pointer text-white text-xl font-voces font-medium hover:bg-[#424b84] duration-600">
                        <label>AAPL</label>
                    </Link>

                    {/* SHOWS 4 PANELS */}
                    <Link to='/' className="flex justify-center items-center bg-[#262c50] hover:bg-[#424b84] duration-600 rounded-[100px] w-15 h-15">
                        <img className="w-8 transition duration-300" src={logo} />
                    </Link>
                    <Link to='/Microsoft' className="flex justify-center items-center bg-[#262c50] h-[50px] w-1/5 rounded-4xl cursor-pointer text-white text-xl font-voces font-medium hover:bg-[#424b84] duration-600">
                        <label>MSFT</label>
                    </Link>
                    <Link to='/Nvidia' className="flex justify-center items-center bg-[#262c50] h-[50px] w-1/5 rounded-4xl cursor-pointer text-white text-xl font-voces font-medium hover:bg-[#424b84]  duration-600">
                        <label>NVDA</label>
                    </Link>
                </div>

                {/* DARK/LIGHT MODE TOGGLER */}
                <img className="w-10 cursor-pointer" src={whatTheme ? lightMode : darkMode} onClick={(): void => changeTheme()} />
            </div>
        </>
    )
}