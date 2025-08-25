import {useState} from 'react'
import Label from '../components/Label.tsx'

type MainPanelProps = {
    time:string;
}

export default function MainPanel({time}:MainPanelProps): React.ReactElement {    
    const [isFullChart, setFullChart] = useState<boolean>(false);

    const showFullChart = (isFull:boolean) => {
        setFullChart(isFull)
    }
    // TODO: FINISH AND FIX THIS
    const changeChart = (time:string, stock:string):string => {
        const image = 
            stock === 'AMZN' ? (time === "All Time" ? "AMZN_AT.svg" : 
                (time === "1 Week" ? "AMZN_1W.svg" : 
                    (time === "1 Month" ? "AMZN_1M.svg" : 
                        (time === "1 Year" ? "AMZN_1Y.svg" : "")))) : 
                stock === 'AAPL' ? (time === "All Time" ? "APPL_AT.svg" : 
                    (time === "1 Week" ? "AAPL_1W.svg" : 
                        (time === "1 Month" ? "AAPL_1M.svg" : 
                            (time === "1 Year" ? "AAPL_1Y.svg" : "")))) : 
                    stock === 'MSFT' ? (time === "All Time" ? "MSFT_AT.svg" : 
                        (time === "1 Week" ? "MSFT_1W.svg" : 
                            (time === "1 Month" ? "MSFT_1M.svg" : 
                                (time === "1 Year" ? "MSFT_1Y.svg" : "")))):"";
        
        return image;
    }

    return (
        <>
        {/* MAIN SCREEN */}
        <div className="flex justify-center items-center flex-col h-[888px] w-screen bg-[#262c50]">

            {/* FULL CHART TOGGLE */}
            <div className={isFullChart ? 'flex justify-center items-center h-150 w-250 bg-gray-800 z-1 absolute rounded-4xl' : 'hidden h-150 w-250 bg-gray-800 z-1 absolute rounded-4xl'}>
                <button className='bg-amber-50 rounded-xl w-20 cursor-pointer' onClick={():void => showFullChart(false)}>Close</button>
            </div>

            {/* UPPER MAIN SCREEN */}
            <div className="flex justify-evenly items-center flex-row h-1/2 w-screen pt-3.5 pb-3.5">
                <div className='h-full flex flex-col items-start'>
                    <Label text='Amazon.com, Inc.'/>
                    <div className="h-full w-2xl" onClick={():void => showFullChart(true)}>
                        <img className='h-full w-full object-cover bg-gray-100 rounded-b-3xl rounded-tr-3xl cursor-pointer' src={'AMZN_AT.svg'}/>
                    </div>
                </div>
                <div className='h-full flex flex-col justify-between items-start'>
                    <Label text='Apple Inc.'/>
                    <div className="h-full w-2xl" onClick={():void => showFullChart(true)}>
                        <img className='h-full w-full object-cover bg-gray-100 rounded-b-3xl rounded-tr-3xl cursor-pointer' src={'AAPL_AT.svg'}/>
                    </div>
                </div>
            </div>
            {changeChart(time,"")}
            {/* LOWER MAIN SCREEN */}
            <div className="flex justify-evenly items-center flex-row h-1/2 w-screen pt-3.5 pb-3.5">
                <div className='h-full flex flex-col justify-between items-start'>
                    <Label text='Microsoft Corporation'/>
                    <div className="h-full w-2xl" onClick={():void => showFullChart(true)}>
                        <img className='h-full w-full object-cover bg-gray-100 rounded-b-3xl rounded-tr-3xl cursor-pointer' src={'MSFT_AT.svg'}/>
                    </div>
                </div>
                <div className='h-full flex flex-col justify-between items-start'>
                    <Label text='NVIDIA Corporation'/>
                    <div className="h-full w-2xl" onClick={():void => showFullChart(true)}>
                        <img className='h-full w-full object-cover bg-gray-100 rounded-b-3xl rounded-tr-3xl cursor-pointer' src={'NVDA_AT.svg'}/>
                    </div>
                </div>
            </div>
        </div>
        </>
    )
}