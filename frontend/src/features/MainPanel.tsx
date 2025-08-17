export default function MainPanel() {
    return (
        <>
        <div className="flex flex-col h-screen w-screen bg-blue-200">
            <div className="flex justify-evenly items-center flex-row h-1/2 w-screen pt-3.5 pb-3.5">
                <div className="h-full w-2xl bg-white rounded-4xl"></div>
                <div className="h-full w-2xl bg-white rounded-4xl"></div>
            </div>
            <div className="flex justify-evenly items-center flex-row h-1/2 w-screen pt-3.5 pb-3.5">
                <div className="h-full w-2xl bg-white rounded-4xl"></div>
                <div className="h-full w-2xl bg-white rounded-4xl"></div>
            </div>
        </div>
        </>
    )
}