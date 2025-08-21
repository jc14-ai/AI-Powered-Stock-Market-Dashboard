
export default function MainPanel(): React.ReactElement {    

    return (
        <>
        <div className="flex flex-col h-screen w-screen bg-blue-100">
            <div className="flex justify-evenly items-center flex-row h-1/2 w-screen pt-3.5 pb-3.5">
                <div className="h-full w-2xl bg-gray-100 rounded-4xl hover:bg-white cursor-pointer"></div>
                <div className="h-full w-2xl bg-gray-100 rounded-4xl hover:bg-white cursor-pointer"></div>
            </div>
            <div className="flex justify-evenly items-center flex-row h-1/2 w-screen pt-3.5 pb-3.5">
                <div className="h-full w-2xl bg-gray-100 rounded-4xl hover:bg-white cursor-pointer"></div>
                <div className="h-full w-2xl bg-gray-100 rounded-4xl hover:bg-white cursor-pointer"></div>
            </div>
        </div>
        </>
    )
}