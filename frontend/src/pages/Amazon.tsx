type AmazonProps = {
    time:string;
}

export default function Amazon({time}:AmazonProps):React.ReactElement{
    return (
        <>
            <iframe className="flex flex-col justify-center items-center h-[888px] w-screen bg-blue-100" 
                    src={time === 'All Time' ? "../chart_visuals/AMZN_AT.html" : time === '1 Year' ? 
                    "../chart_visuals/AMZN_Y.html" : time === '1 Month' ? 
                    "../chart_visuals/AMZN_M.html": time === '1 Week' ? 
                    "../chart_visuals/AMZN_WW.html" : "../chart_visuals/AMZN_AT.html"}/>
        </>
    )
}