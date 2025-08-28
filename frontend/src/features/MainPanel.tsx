import {useState} from 'react'
import Label from '../components/Label.tsx'

type MainPanelProps = {
    time:string;
}

type stockViewProps = {
    ticker: string;
    time:string;
    openPrice:number;
    closingPrice:number;
}

export default function MainPanel({time}:MainPanelProps): React.ReactElement {    
    const [isFullChart, setFullChart] = useState<boolean>(false);
    const [stockView, setStockView] = useState<stockViewProps>();

    const showFullChart = (isFull:boolean) => {
        setFullChart(isFull)
    }

    return (
        <>
        {/* MAIN SCREEN */}
        <div className="flex justify-center items-center flex-col h-[888px] w-screen bg-blue-100">

            {/* FULL CHART TOGGLE */}
            <div className={isFullChart ? 
                'flex justify-center items-center h-150 w-250 bg-gray-800 z-1 absolute rounded-4xl' : 
                'hidden h-150 w-250 bg-gray-800 z-1 absolute rounded-4xl'}>
                    {/* Stock Ticker - Company
                        Timeframe selector
                        Line Chart
                        Volume Chart
                        Latest Open Price
                        Lates Closing Price
                        Gain / Loss
                        Full View Button */}

                {/*Stock Ticker*/}
                <label className=''>{stockView?.ticker}</label>

                {/* Stock open/close price */}
                <label>{stockView?.openPrice}</label>
                <label>{stockView?.closingPrice}</label>

                <button className='bg-amber-50 rounded-xl w-20 cursor-pointer' onClick={():void => showFullChart(false)}>Close</button>
            </div>

            {/* UPPER MAIN SCREEN */}
            <div className="flex justify-evenly items-center flex-row h-1/2 w-screen pt-3.5 pb-3.5">
                <div className='h-full flex flex-col items-start
                                hover:scale-101 duration-300'>
                    <Label text='Amazon.com, Inc.'/>
                    <div className="h-full w-2xl" onClick={():void => showFullChart(true)}>
                        <img className='h-full w-full object-cover bg-gray-100 rounded-b-3xl rounded-tr-3xl cursor-pointer' 
                        src={time === "All Time" ? "svg_visuals/AMZN_AT.svg": 
                        (time === "1 Year" ? "svg_visuals/AMZN_Y.svg" : 
                        (time === "1 Month" ? "svg_visuals/AMZN_M.svg" : 
                        (time === "1 Week" ? "svg_visuals/AMZN_WW.svg" : "svg_visuals/AMZN_AT.svg")))}/>
                    </div>
                </div>
                <div className='h-full flex flex-col justify-between items-start 
                                hover:scale-101 duration-300'>
                    <Label text='Apple Inc.'/>
                    <div className="h-full w-2xl" onClick={():void => showFullChart(true)}>
                        <img className='h-full w-full object-cover bg-gray-100 rounded-b-3xl rounded-tr-3xl cursor-pointer' 
                        src={time === "All Time" ? "svg_visuals/AAPL_AT.svg": 
                        (time === "1 Year" ? "svg_visuals/AAPL_Y.svg" : 
                        (time === "1 Month" ? "svg_visuals/AAPL_M.svg" : 
                        (time === "1 Week" ? "svg_visuals/AAPL_WW.svg" : "svg_visuals/AAPL_AT.svg")))}/>
                    </div>
                </div>
            </div>

            {/* LOWER MAIN SCREEN */}
            <div className="flex justify-evenly items-center flex-row h-1/2 w-screen pt-3.5 pb-3.5">
                <div className='h-full flex flex-col justify-between items-start 
                                hover:scale-101 duration-300'>
                    <Label text='Microsoft Corporation'/>
                    <div className="h-full w-2xl" onClick={():void => showFullChart(true)}>
                        <img className='h-full w-full object-cover bg-gray-100 rounded-b-3xl rounded-tr-3xl cursor-pointer'
                        src={time === "All Time" ? "svg_visuals/MSFT_AT.svg": 
                        (time === "1 Year" ? "svg_visuals/MSFT_Y.svg" : 
                        (time === "1 Month" ? "svg_visuals/MSFT_M.svg" : 
                        (time === "1 Week" ? "svg_visuals/MSFT_WW.svg" : "svg_visuals/MSFT_AT.svg")))}/>
                    </div>
                </div>
                <div className='h-full flex flex-col justify-between items-start 
                                hover:scale-101 duration-300'>
                    <Label text='NVIDIA Corporation'/>
                    <div className="h-full w-2xl" onClick={():void => showFullChart(true)}>
                        <img className='h-full w-full object-cover bg-gray-100 rounded-b-3xl rounded-tr-3xl cursor-pointer'
                        src={time === "All Time" ? "svg_visuals/NVDA_AT.svg": 
                        (time === "1 Year" ? "svg_visuals/NVDA_Y.svg" : 
                        (time === "1 Month" ? "svg_visuals/NVDA_M.svg" : 
                        (time === "1 Week" ? "svg_visuals/NVDA_WW.svg" : "svg_visuals/NVDA_AT.svg")))}/>
                    </div>
                </div>
            </div>
        </div>
        </>
    )
}