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
    // const [isFullChart, setFullChart] = useState<boolean>(false);
    const [stockView, setStockView] = useState<stockViewProps>();

    const showFullChart = (ticker:string, time:string, openPrice:number, closingPrice:number) => {
        // TODO: Fix how to add this in the flow
        setStockView({ticker:ticker,time:time, openPrice:openPrice, closingPrice:closingPrice})
    }

    return (
        <>
        {/* MAIN SCREEN */}
        <div className="flex justify-center items-center flex-col h-[888px] w-screen bg-blue-100">

            {/* FULL CHART TOGGLE */}
            <div className={(stockView?.ticker === 'AMZN' || 
                                stockView?.ticker === 'AAPL' || 
                                stockView?.ticker === 'MSFT' || 
                                stockView?.ticker === 'NVDA') ? 
                                'flex flex-col justify-center items-center h-150 w-250 bg-gray-800 z-1 absolute rounded-4xl' : 
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
                <label className='text-white font-voces text-[4em]'>{stockView?.ticker === 'AMZN' ? 
                'AMZN - Amazon.com, Inc.' : (stockView?.ticker === 'AAPL' ? 
                'AAPL - Apple Inc.' : (stockView?.ticker === 'MSFT' ? 
                'MSFT - Microsoft Corporation' : (stockView?.ticker === 'NVDA') ? 
                'NVDA - NVIDIA Corporation': ''))}</label>

                {/* Stock open/close price */}
                <label className='text-white font-voces text-[4em]'>{stockView?.ticker === 'AMZN' ? 
                stockView?.openPrice : (stockView?.ticker === 'AAPL' ? 
                stockView?.openPrice : (stockView?.ticker === 'MSFT' ? 
                stockView?.openPrice : (stockView?.ticker === 'NVDA' ? 
                stockView?.openPrice : 0.00)))}</label>

                <label className='text-white font-voces text-[4em]'>{stockView?.ticker === 'AMZN' ? 
                stockView?.closingPrice : (stockView?.ticker === 'AAPL' ? 
                stockView?.closingPrice : (stockView?.ticker === 'MSFT' ? 
                stockView?.closingPrice : (stockView?.ticker === 'NVDA' ? 
                stockView?.closingPrice : 0.00)))}</label>

                <button className='bg-amber-50 rounded-xl w-20 cursor-pointer' onClick={():void => showFullChart('','',0,0)}>Close</button>
            </div>

            {/* UPPER MAIN SCREEN */}
            <div className="flex justify-evenly items-center flex-row h-1/2 w-screen pt-3.5 pb-3.5">
                <div className='h-full flex flex-col items-start
                                hover:scale-101 duration-300'>
                    <Label text='Amazon.com, Inc.'/>
                    <div className="h-full w-2xl" onClick={():void => showFullChart('AMZN',time,0,0)}>
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
                    <div className="h-full w-2xl" onClick={():void => showFullChart('AAPL',time,0,0)}>
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
                    <div className="h-full w-2xl" onClick={():void => showFullChart('MSFT',time,0,0)}>
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
                    <div className="h-full w-2xl" onClick={():void => showFullChart('NVDA',time,0,0)}>
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