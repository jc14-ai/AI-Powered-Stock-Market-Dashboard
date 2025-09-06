type AppleProps = {
    time:string;
}

export default function Apple({time}:AppleProps):React.ReactElement{
    return (
        <>
            <iframe className="flex flex-col justify-center items-center h-[888px] w-screen bg-blue-100" 
                    src={time === 'All Time' ? "../chart_visuals/AAPL_AT.html" : time === '1 Year' ? 
                    "../chart_visuals/AAPL_Y.html" : time === '1 Month' ? 
                    "../chart_visuals/AAPL_M.html": time === '1 Week' ? 
                    "../chart_visuals/AAPL_WW.html" : "../chart_visuals/AAPL_AT.html"}/>
        </>
    )
}