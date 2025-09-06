import { useState } from "react";
import darkMode from "../assets/dark_mode.png";
import lightMode from "../assets/light_mode.png";
import logo from "../assets/microsoft.png";
import { Link } from 'react-router'

type NavbarProps = {
    selectValue: (val:string) => void;
    time: string;
    setTicker: (val:string) => void;
    tickerB:string;
}

export default function Navbar({selectValue, time, setTicker, tickerB}: NavbarProps): React.ReactElement {
    // TODO: Implement and fix theme toggle functionality

    const [whatTheme, setTheme] = useState<boolean>(true);
    const [isTimeFrameShown, setTimeFrameVisible] = useState<boolean>(true);
    // const [tickerButton, setTickerColored] = useState<tickerButtonProps>({ticker: "ALL"});

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
        selectValue(time)
    }

    const highlightTicker = (ticker:string):void  => {
        setTicker(ticker);
    }

    return (
        <>  {/* HOLDS NAVIGATION BAR */}
            <div className="flex flex-row justify-between items-center w-screen h-24 bg-[#273166] pl-10 pr-20 z-2">
                <div>
                    {/* TIMEFRAME INPUT */}
                    <input className={isTimeFrameShown ? 
                    "bg-gray-200 pr-1 rounded-xl h-11 w-23 outline-0 text-center font-voces font-medium text-frame" : 
                    "bg-gray-200 pr-1 h-11 w-23 outline-0 rounded-t-xl text-center font-voces font-medium text-frame"}
                        value={time}
                        onMouseEnter={(): void => showTimeFrames()}
                        onMouseLeave={(): void => showTimeFrames()} />

                    {/* THIS HOLDS TIMEFRAMES*/}
                    <div className={isTimeFrameShown ? 
                    "hidden absolute h-40 w-23 bg-gray-200 rounded-b-xl" : 
                    "flex absolute h-40 w-23 bg-gray-200 rounded-b-xl"}
                        onMouseEnter={(): void => setVisible(!true)}
                        onMouseLeave={(): void => setVisible(!false)}>
                        
                        {/* LIST OF TIMES */}
                        <ul className="flex flex-col h-full justify-start items-start m-0 w-full">
                            <li className="flex h-10 justify-center items-center 
                                            hover:bg-gray-100 duration-400 cursor-pointer w-full font-voces font-medium text-frame"
                                onClick={() => changeValue("1 Week")}>1 Week</li>
                            <li className="flex h-10 justify-center items-center 
                                            hover:bg-gray-100 duration-400 cursor-pointer w-full font-voces font-medium text-frame"
                                onClick={() => changeValue("1 Month")}>1 Month</li>
                            <li className="flex h-10 justify-center items-center 
                                            hover:bg-gray-100 duration-400 cursor-pointer w-full font-voces font-medium text-frame"
                                onClick={() => changeValue("1 Year")}>1 Year</li>
                            <li className="flex h-10 justify-center items-center 
                                            hover:bg-gray-100 duration-400 cursor-pointer w-full rounded-b-xl font-voces font-medium text-frame"
                                onClick={() => changeValue("All Time")}>All Time</li>
                        </ul>

                    </div>
                </div>

                {/* STOCK TICKER NAVIGATIONS */}
                <div className="flex flex-row justify-evenly items-center w-2/2 h-1/1">
                    <Link to='/Amazon' className={tickerB === "AMZN" ? 
                        "flex justify-center items-center bg-[#5c65a3] h-[50px] w-1/5 rounded-4xl cursor-pointer" + 
                        " text-white text-xl font-voces font-medium hover:bg-[#5c65a3] duration-600": 
                        "flex justify-center items-center bg-[#424b84] h-[50px] w-1/5 rounded-4xl cursor-pointer" + 
                        " text-white text-xl font-voces font-medium hover:bg-[#5c65a3] duration-600"} 
                        onClick={():void => highlightTicker("AMZN")}>
                        <label>AMZN</label>
                    </Link>
                    <Link to='/Apple' className={tickerB === "AAPL" ?  
                        "flex justify-center items-center bg-[#5c65a3] h-[50px] w-1/5 rounded-4xl cursor-pointer" + 
                        " text-white text-xl font-voces font-medium hover:bg-[#5c65a3] duration-600": 
                        "flex justify-center items-center bg-[#424b84] h-[50px] w-1/5 rounded-4xl cursor-pointer" + 
                        " text-white text-xl font-voces font-medium hover:bg-[#5c65a3] duration-600"} 
                        onClick={():void => highlightTicker("AAPL")}>
                        <label>AAPL</label>
                    </Link>

                    {/* SHOWS 4 PANELS */}
                    <Link to='/' className={tickerB === "ALL" ?
                        "flex justify-center items-center bg-[#5c65a3] hover:bg-[#5c65a3] duration-600 rounded-[100px] w-15 h-15" :
                        "flex justify-center items-center bg-[#424b84] hover:bg-[#5c65a3] duration-600 rounded-[100px] w-15 h-15"}
                        onClick={():void => highlightTicker("ALL")}>
                        <img className="w-8 transition duration-300" src={logo} />
                    </Link>
                    <Link to='/Microsoft' className={tickerB === "MSFT" ?  
                        "flex justify-center items-center bg-[#5c65a3] h-[50px] w-1/5 rounded-4xl cursor-pointer" + 
                        " text-white text-xl font-voces font-medium hover:bg-[#5c65a3] duration-600": 
                        "flex justify-center items-center bg-[#424b84] h-[50px] w-1/5 rounded-4xl cursor-pointer" + 
                        " text-white text-xl font-voces font-medium hover:bg-[#5c65a3] duration-600"} 
                        onClick={():void => highlightTicker("MSFT")}>
                        <label>MSFT</label>
                    </Link>
                    <Link to='/Nvidia' className={tickerB === "NVDA" ?  
                        "flex justify-center items-center bg-[#5c65a3] h-[50px] w-1/5 rounded-4xl cursor-pointer" + 
                        " text-white text-xl font-voces font-medium hover:bg-[#5c65a3] duration-600": 
                        "flex justify-center items-center bg-[#424b84] h-[50px] w-1/5 rounded-4xl cursor-pointer" + 
                        " text-white text-xl font-voces font-medium hover:bg-[#5c65a3] duration-600"} 
                        onClick={():void => highlightTicker("NVDA")}>
                        <label>NVDA</label>
                    </Link>
                </div>

                {/* DARK/LIGHT MODE TOGGLER */}
                <img className="w-10 cursor-pointer" src={whatTheme ? lightMode : darkMode} onClick={(): void => changeTheme()} />
            </div>
        </>
    )
}