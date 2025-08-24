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
            <div className="flex flex-row justify-between items-center w-screen h-28 bg-blue-950 pl-10 pr-20 ">
                <div className="">

                    {/* TIMEFRAME INPUT */}
                    <input className={isTimeFrameShown ? "bg-white rounded-xl pl-2 h-8 w-20 outline-0" : "bg-white pl-2 h-8 w-20 outline-0 rounded-t-xl"}
                        value={value ? value : '1 Day'}
                        onMouseEnter={(): void => showTimeFrames()}
                        onMouseLeave={(): void => showTimeFrames()} />

                    {/* THIS HOLDS TIMEFRAMES*/}
                    <div className={isTimeFrameShown ? "hidden absolute h-24 w-20 bg-white rounded-b-xl" : "flex absolute h-24 w-20 bg-white rounded-b-xl"}
                        onMouseEnter={(): void => setVisible(!true)}
                        onMouseLeave={(): void => setVisible(!false)}>
                        
                        {/* LIST OF TIMES */}
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

                {/* STOCK TICKER NAVIGATIONS */}
                <div className="flex flex-row justify-evenly items-center w-2/3 h-1/1">
                    <Link to='/Amazon' className="flex justify-center items-center bg-blue-900 h-2/3 w-1/5 rounded-4xl cursor-pointer text-white text-xl font-gantari font-medium hover:bg-white hover:text-blue-950  duration-600">
                        <label>AMZN</label>
                    </Link>
                    <Link to='/Apple' className="flex justify-center items-center bg-blue-900 h-2/3 w-1/5 rounded-4xl cursor-pointer text-white text-xl font-gantari font-medium hover:bg-white hover:text-blue-950 duration-600">
                        <label>AAPL</label>
                    </Link>

                    {/* SHOWS 4 PANELS */}
                    <Link to='/' className="flex justify-center items-center hover:bg-white hover:scale-115 duration-600 rounded-4xl w-15 h-15">
                        <img className="w-8 transition duration-300" src={logo} />
                    </Link>
                    <Link to='/Microsoft' className="flex justify-center items-center bg-blue-900 h-2/3 w-1/5 rounded-4xl cursor-pointer text-white text-xl font-gantari font-medium hover:bg-white hover:text-blue-950 duration-600">
                        <label>MSFT</label>
                    </Link>
                    <Link to='/Nvidia' className="flex justify-center items-center bg-blue-900 h-2/3 w-1/5 rounded-4xl cursor-pointer text-white text-xl font-gantari font-medium hover:bg-white hover:text-blue-950  duration-600">
                        <label>NVDA</label>
                    </Link>
                </div>

                {/* DARK/LIGHT MODE TOGGLER */}
                <img className="w-10 cursor-pointer" src={whatTheme ? lightMode : darkMode} onClick={(): void => changeTheme()} />
            </div>
        </>
    )
}