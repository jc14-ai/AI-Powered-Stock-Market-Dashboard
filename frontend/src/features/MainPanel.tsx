import {useState} from 'react'
export default function MainPanel(): React.ReactElement {    
    const [isFullChart, setFullChart] = useState<boolean>(false);

    const showFullChart = (isFull:boolean) => {
        setFullChart(isFull)
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
                <div className="h-full w-2xl" onClick={():void => showFullChart(true)}>
                    <img className='h-full w-full object-cover bg-gray-100 rounded-4xl cursor-pointer' src='AMZN_AT.svg'/>
                </div>
                <div className="h-full w-2xl" onClick={():void => showFullChart(true)}>
                    <img className='h-full w-full object-cover bg-gray-100 rounded-4xl cursor-pointer' src='AAPL_AT.svg'/>
                </div>
            </div>

            {/* LOWER MAIN SCREEN */}
            <div className="flex justify-evenly items-center flex-row h-1/2 w-screen pt-3.5 pb-3.5">
                <div className="h-full w-2xl" onClick={():void => showFullChart(true)}>
                    <img className='h-full w-full object-cover bg-gray-100 rounded-4xl cursor-pointer' src='MSFT_AT.svg'/>
                </div>
                <div className="h-full w-2xl" onClick={():void => showFullChart(true)}>
                    <img className='h-full w-full object-cover bg-gray-100 rounded-4xl cursor-pointer' src='NVDA_AT.svg'/>
                </div>
            </div>
        </div>
        </>
    )
}