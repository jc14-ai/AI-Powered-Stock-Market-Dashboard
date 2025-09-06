type NvidiaProps = {
    time:string;
}

export default function Nvidia({time}:NvidiaProps):React.ReactElement{
    return (
        <>
            <iframe className="flex flex-col justify-center items-center h-[888px] w-screen bg-blue-100" 
                    src={time === 'All Time' ? "../chart_visuals/NVDA_AT.html" : time === '1 Year' ? 
                    "../chart_visuals/NVDA_Y.html" : time === '1 Month' ? 
                    "../chart_visuals/NVDA_M.html": time === '1 Week' ? 
                    "../chart_visuals/NVDA_WW.html" : "../chart_visuals/NVDA_AT.html"}/>
        </>
    )
}