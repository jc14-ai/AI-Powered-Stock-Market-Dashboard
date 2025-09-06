type MicrosoftProps = {
    time:string;
}

export default function Microsoft({time}:MicrosoftProps):React.ReactElement{
    return (
        <>
            <iframe className="flex flex-col justify-center items-center h-[888px] w-screen bg-blue-100" 
                        src={time === 'All Time' ? "../chart_visuals/MSFT_AT.html" : time === '1 Year' ? 
                        "../chart_visuals/MSFT_Y.html" : time === '1 Month' ? 
                        "../chart_visuals/MSFT_M.html": time === '1 Week' ? 
                        "../chart_visuals/MSFT_WW.html" : "../chart_visuals/MSFT_AT.html"}/>
        </>
    )
}