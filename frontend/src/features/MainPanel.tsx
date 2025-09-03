import {useState, useEffect} from 'react'
import Label from '../components/Label.tsx'
import closeButton from '../assets/close-unhovered.png'
import closeButtonHovered from '../assets/close-hovered.png'

type MainPanelProps = {
    time:string;
}

type stockViewProps = {
    ticker: string;
    time:string;
    openPrice:number;
    closingPrice:number;
    highPrice:number;
    lowPrice:number;
}

export default function MainPanel({time}:MainPanelProps): React.ReactElement {    
    // const [isFullChart, setFullChart] = useState<boolean>(false);
    const [stockView, setStockView] = useState<stockViewProps>();
    const [isCloseHovered, setCloseHovered]  = useState<boolean>(false);
    const [message, setMessage] = useState<string>('');

    const changeHovered = (isHovered: boolean):void => {
        setCloseHovered(isHovered);
    }

    useEffect(() =>{
        fetch('http://localhost:3000/hello')
        .then(res => res.json())
        .then(data => setMessage(data.message))
        }, [message]);

    const showFullChart = (ticker:string, time:string, openPrice:number, closingPrice:number, highPrice:number, lowPrice:number) => {
        // TODO: Fix how to add this in the flow
        setStockView({ticker:ticker, 
                        time:time, 
                        openPrice:openPrice, 
                        closingPrice:closingPrice, 
                        highPrice:highPrice, 
                        lowPrice:lowPrice});
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
                                'flex flex-col justify-evenly items-start h-150 w-250 bg-gray-800 z-1 absolute rounded-4xl' : 
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
                <div className='flex flex-row pl-5 pr-5 justify-between items-center w-full'>
                    <div className='flex flex-row justify-between items-center w-fit'>
                        <label className='text-white font-voces text-[2em] mr-3'>{stockView?.ticker === 'AMZN' ? 
                        'AMZN - Amazon.com, Inc.' : (stockView?.ticker === 'AAPL' ?     
                        'AAPL - Apple Inc.' : (stockView?.ticker === 'MSFT' ? 
                        'MSFT - Microsoft Corporation' : (stockView?.ticker === 'NVDA') ? 
                        'NVDA - NVIDIA Corporation': ''))}
                        </label>
                        <label className='flex justify-center items-center text-black font-voces text-[1.5em] bg-green-300 rounded-4xl w-[110px]'>
                            {/* GET FROM THE BACKEND  */}
                            +2.3%
                            {/* BACKEND TEST ROUTING  */}
                            message 
                        </label>
                    </div>
                    <img className='w-10 cursor-pointer' src={isCloseHovered? closeButtonHovered: closeButton} 
                    onClick={():void => showFullChart('','',0,0,0,0)} 
                    onMouseEnter={():void => {changeHovered(true)}} 
                    onMouseLeave={():void => {changeHovered(false)}}/>
                </div>

                <div className='flex justify-evenly items-center h-1/2 w-full'>
                    <img className='h-full w-[760px] object-cover bg-gray-100 rounded-3xl cursor-pointer'
                    src={(stockView?.ticker === 'AMZN' && stockView?.time === 'All Time') ? 
                    'svg_visuals/AMZN_AT_m.svg' : ((stockView?.ticker === 'AAPL' && stockView?.time === 'All Time') ? 
                    'svg_visuals/AAPL_AT_m.svg' : ((stockView?.ticker === 'MSFT' && stockView?.time === 'All Time') ? 
                    'svg_visuals/MSFT_AT_m.svg' : ((stockView?.ticker === 'NVDA' && stockView?.time === 'All Time') ? 
                    'svg_visuals/NVDA_AT_m.svg' : ((stockView?.ticker === 'AMZN' && stockView?.time === '1 Year') ? 
                    'svg_visuals/AMZN_Y_m.svg' : ((stockView?.ticker === 'AAPL' && stockView?.time === '1 Year') ? 
                    'svg_visuals/AAPL_Y_m.svg' : ((stockView?.ticker === 'MSFT' && stockView?.time === '1 Year') ? 
                    'svg_visuals/MSFT_Y_m.svg' : ((stockView?.ticker === 'NVDA' && stockView?.time === '1 Year') ? 
                    'svg_visuals/NVDA_Y_m.svg' : ((stockView?.ticker === 'AMZN' && stockView?.time === '1 Month') ? 
                    'svg_visuals/AMZN_M_m.svg' : ((stockView?.ticker === 'AAPL' && stockView?.time === '1 Month') ? 
                    'svg_visuals/AAPL_M_m.svg' : ((stockView?.ticker === 'MSFT' && stockView?.time === '1 Month') ? 
                    'svg_visuals/MSFT_M_m.svg' : ((stockView?.ticker === 'NVDA' && stockView?.time === '1 Month') ? 
                    'svg_visuals/NVDA_M_m.svg' : ((stockView?.ticker === 'AMZN' && stockView?.time === '1 Week') ? 
                    'svg_visuals/AMZN_WW_m.svg' : ((stockView?.ticker === 'AAPL' && stockView?.time === '1 Week') ? 
                    'svg_visuals/AAPL_WW_m.svg' : ((stockView?.ticker === 'MSFT' && stockView?.time === '1 Week') ? 
                    'svg_visuals/MSFT_WW_m.svg' : ((stockView?.ticker === 'NVDA' && stockView?.time === '1 Week') ? 
                    'svg_visuals/NVDA_WW_m.svg' : '')))))))))))))))}/>

                    {/* Stock open/close price */}
                    <div className='flex flex-col justify-evenly items-center h-2/3 w-1/5'>
                        <div className='flex flex-row justify-start items-center h-1/5 w-[150px] rounded-2xl'>
                            <label className='flex justify-center items-center bg-gray-400 font-voces text-[2em] rounded-bl-2xl rounded-tl-2xl h-full w-[50px]'>O</label>
                            <label className='flex flex-row justify-center items-center text-black font-voces text-[2em] h-full w-[100px] bg-white rounded-tr-2xl rounded-br-2xl'>
                                {stockView?.ticker === 'AMZN' ? 
                                stockView?.openPrice : (stockView?.ticker === 'AAPL' ? 
                                stockView?.openPrice : (stockView?.ticker === 'MSFT' ? 
                                stockView?.openPrice : (stockView?.ticker === 'NVDA' ? 
                                stockView?.openPrice : 0.00)))}
                            </label>
                        </div>

                        <div className='flex flex-row justify-start items-center h-1/5 w-[150px] rounded-2xl'>
                            <label className='flex justify-center items-center bg-gray-400 font-voces text-[2em] rounded-bl-2xl rounded-tl-2xl h-full w-[50px]'>C</label>
                            <label className='flex flex-row justify-center items-center text-black font-voces text-[2em] h-full w-[100px] bg-white rounded-tr-2xl rounded-br-2xl'>
                                {stockView?.ticker === 'AMZN' ? 
                                stockView?.closingPrice : (stockView?.ticker === 'AAPL' ? 
                                stockView?.closingPrice : (stockView?.ticker === 'MSFT' ? 
                                stockView?.closingPrice : (stockView?.ticker === 'NVDA' ? 
                                stockView?.closingPrice : 0.00)))}
                            </label>
                        </div>

                        <div className='flex flex-row justify-start items-center h-1/5 w-[150px] rounded-2xl'>
                            <label className='flex justify-center items-center bg-gray-400 font-voces text-[2em] rounded-bl-2xl rounded-tl-2xl h-full w-[50px]'>H</label>
                            <label className='flex flex-row justify-center items-center text-black font-voces text-[2em] h-full w-[100px] bg-white rounded-tr-2xl rounded-br-2xl'>
                                {stockView?.ticker === 'AMZN' ? 
                                stockView?.highPrice : (stockView?.ticker === 'AAPL' ? 
                                stockView?.highPrice : (stockView?.ticker === 'MSFT' ? 
                                stockView?.highPrice : (stockView?.ticker === 'NVDA' ? 
                                stockView?.highPrice : 0.00)))}
                            </label>
                        </div>

                        <div className='flex flex-row justify-start items-center h-1/5 w-[150px] rounded-2xl'>
                            <label className='flex justify-center items-center bg-gray-400 font-voces text-[2em] rounded-bl-2xl rounded-tl-2xl h-full w-[50px]'>L</label>
                            <label className='flex flex-row justify-center items-center text-black font-voces text-[2em] h-full w-[100px] bg-white rounded-tr-2xl rounded-br-2xl'>
                                {stockView?.ticker === 'AMZN' ? 
                                stockView?.lowPrice : (stockView?.ticker === 'AAPL' ? 
                                stockView?.lowPrice : (stockView?.ticker === 'MSFT' ? 
                                stockView?.lowPrice : (stockView?.ticker === 'NVDA' ? 
                                stockView?.lowPrice : 0.00)))}
                            </label>
                        </div>
                    </div>
                </div>
                <div className='flex justify-start items-center h-1/3 w-full pl-3 pr-3'>
                     <img className='h-full w-[760px] object-cover bg-gray-100 rounded-3xl cursor-pointer'
                    src={(stockView?.ticker === 'AMZN' && stockView?.time === 'All Time') ? 
                    'svg_visuals/AMZN_AT_m_RSI.svg' : ((stockView?.ticker === 'AAPL' && stockView?.time === 'All Time') ? 
                    'svg_visuals/AAPL_AT_m_RSI.svg' : ((stockView?.ticker === 'MSFT' && stockView?.time === 'All Time') ? 
                    'svg_visuals/MSFT_AT_m_RSI.svg' : ((stockView?.ticker === 'NVDA' && stockView?.time === 'All Time') ? 
                    'svg_visuals/NVDA_AT_m_RSI.svg' : ((stockView?.ticker === 'AMZN' && stockView?.time === '1 Year') ? 
                    'svg_visuals/AMZN_Y_m_RSI.svg' : ((stockView?.ticker === 'AAPL' && stockView?.time === '1 Year') ? 
                    'svg_visuals/AAPL_Y_m_RSI.svg' : ((stockView?.ticker === 'MSFT' && stockView?.time === '1 Year') ? 
                    'svg_visuals/MSFT_Y_m_RSI.svg' : ((stockView?.ticker === 'NVDA' && stockView?.time === '1 Year') ? 
                    'svg_visuals/NVDA_Y_m_RSI.svg' : ((stockView?.ticker === 'AMZN' && stockView?.time === '1 Month') ? 
                    'svg_visuals/AMZN_M_m_RSI.svg' : ((stockView?.ticker === 'AAPL' && stockView?.time === '1 Month') ? 
                    'svg_visuals/AAPL_M_m_RSI.svg' : ((stockView?.ticker === 'MSFT' && stockView?.time === '1 Month') ? 
                    'svg_visuals/MSFT_M_m_RSI.svg' : ((stockView?.ticker === 'NVDA' && stockView?.time === '1 Month') ? 
                    'svg_visuals/NVDA_M_m_RSI.svg' : ((stockView?.ticker === 'AMZN' && stockView?.time === '1 Week') ? 
                    'svg_visuals/AMZN_WW_m_RSI.svg' : ((stockView?.ticker === 'AAPL' && stockView?.time === '1 Week') ? 
                    'svg_visuals/AAPL_WW_m_RSI.svg' : ((stockView?.ticker === 'MSFT' && stockView?.time === '1 Week') ? 
                    'svg_visuals/MSFT_WW_m_RSI.svg' : ((stockView?.ticker === 'NVDA' && stockView?.time === '1 Week') ? 
                    'svg_visuals/NVDA_WW_m_RSI.svg' : '')))))))))))))))}/>
                </div>
            </div>

            {/* UPPER MAIN SCREEN */}
            <div className="flex justify-evenly items-center flex-row h-1/2 w-screen pt-3.5 pb-3.5">
                <div className='h-full flex flex-col items-start
                                hover:scale-101 duration-300'>
                    <Label text='Amazon.com, Inc.'/>
                    <div className="h-full w-2xl" onClick={():void => showFullChart('AMZN',time,0,0,0,0)}>
                        <img className='h-full w-full object-cover bg-gray-100 rounded-b-3xl rounded-tr-3xl cursor-pointer' 
                        src={time === "All Time" ? "svg_visuals/AMZN_AT.svg" : 
                        (time === "1 Year" ? "svg_visuals/AMZN_Y.svg" : 
                        (time === "1 Month" ? "svg_visuals/AMZN_M.svg" : 
                        (time === "1 Week" ? "svg_visuals/AMZN_WW.svg" : "svg_visuals/AMZN_AT.svg")))}/>
                    </div>
                </div>
                <div className='h-full flex flex-col justify-between items-start 
                                hover:scale-101 duration-300'>
                    <Label text='Apple Inc.'/>
                    <div className="h-full w-2xl" onClick={():void => showFullChart('AAPL',time,0,0,0,0)}>
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
                    <div className="h-full w-2xl" onClick={():void => showFullChart('MSFT',time,0,0,0,0)}>
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
                    <div className="h-full w-2xl" onClick={():void => showFullChart('NVDA',time,0,0,0,0)}>
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