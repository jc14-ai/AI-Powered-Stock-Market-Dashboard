import type React from "react";

type LabelProps = {
    text:string;
}

export default function Label({text}: LabelProps): React.ReactElement{
    return (
        <>
            <h1 className='text-black bg-white p-3 rounded-t-3xl font-voces font-medium text-frame pl-5 pr-5'>
                {text}
            </h1>
        </>
    )
}