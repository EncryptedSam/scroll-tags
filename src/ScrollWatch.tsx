import React, { useRef, useState } from 'react'
import { BsCaretLeftFill } from 'react-icons/bs';
import {
    FiBookOpen,
    FiHelpCircle,
    FiCpu,
    FiTarget,
    FiEdit3,
    FiGift,
    FiHeart,
    FiMoon,
    FiCompass,
    FiMap,
    FiCamera,
    FiMessageCircle,
    FiCoffee,
} from "react-icons/fi";


let data: DialProps["data"] = [
    { text: "Learn", icon: <FiBookOpen />, color: "#E6A700" },   
    { text: "Ask", icon: <FiHelpCircle />, color: "#3B82F6" },   
    { text: "Think", icon: <FiCpu />, color: "#6366F1" },        
    { text: "Focus", icon: <FiTarget />, color: "#10B981" },     
    { text: "Create", icon: <FiEdit3 />, color: "#F59E0B" },     
    { text: "Give", icon: <FiGift />, color: "#EF4444" },        
    { text: "Love", icon: <FiHeart />, color: "#EC4899" },       
    { text: "Sleep", icon: <FiMoon />, color: "#8B5CF6" },       
    { text: "Explore", icon: <FiCompass />, color: "#14B8A6" },  
    { text: "Travel", icon: <FiMap />, color: "#22C55E" },       
    { text: "Capture", icon: <FiCamera />, color: "#F97316" },   
    { text: "Talk", icon: <FiMessageCircle />, color: "#0EA5E9" }, 
    { text: "Relax", icon: <FiCoffee />, color: "#A16207" },
];


const ScrollWatch = () => {
    const [index, setIndex] = useState(0);
    const lock = useRef(false);

    const MAX = data?.length;

    const onWheel = (e: React.WheelEvent) => {
        if (lock.current) return;

        const dir = e.deltaY < 0 ? 1 : -1;

        lock.current = true;

        setIndex((prev) => {
            const next = Math.max(0, Math.min(prev + dir, MAX));
            return next;
        });

        setTimeout(() => {
            lock.current = false;
        }, 300);
    };

    return (
        <div className='w-screen h-screen flex items-center justify-center bg-gray-950' >
            <div
                className='inline-flex border-10 border-gray-300 rounded-4xl'
            >
                <div
                    className="relative inline-flex items-center bg-gray-900 rounded-3xl w-100 h-100 overflow-hidden"
                    onWheel={onWheel}
                >

                    <Dial
                        x={475}
                        y={200}
                        dials={30}
                        deg={(((index) * 2) / 30) * 360}
                        radius={250}
                        data={data}
                        gap={2}
                        skip={(360 / 30) * 2}
                        index={index}
                    />
                    <Pointer
                        x={270}
                        y={200}
                        radius={60}
                    />
                    <VerticalProgress
                        percentage={(index / MAX) * 100}
                        height='50%'
                    />
                    <div
                        className='absolute top-0 left-0 w-full h-full'
                        style={{
                            boxShadow: 'rgb(0, 0, 0,0.4) 0px 0px 89px 80px inset'
                        }}
                    />
                </div>
            </div>
        </div >
    );
};

export default ScrollWatch


/*--------------------------------------------------------------------------- */

interface PointerProps {
    x?: number;
    y?: number;
    radius?: number
}

const Pointer = ({ x, y, radius }: PointerProps) => {


    return (
        <div
            className="absolute inline-flex items-center  w-0 h-0 transition-[transform] duration-300 ease-out"
            style={{
                left: x,
                top: y,
            }}
        >
            <BsCaretLeftFill className='shrink-0 text-gray-100 text-3xl' />
            <div
                className='absolute w-25 h-0 right-0 inline-flex items-center origin-right'
                style={{
                    width: radius
                }}
            >
                <div className='w-10 h-1 rounded-full bg-amber-400' />
            </div>

        </div>
    )
}


/*--------------------------------------------------------------------------- */
interface DialProps {
    radius?: number;
    dials?: number;
    data?: {
        icon?: React.ReactNode,
        text: string,
        color?: string
    }[];
    skip?: number;
    gap?: number;
    x?: number
    y?: number;
    deg?: number
    index?: number;
}


const Dial = ({ data, radius, dials = 0, x, y, deg = 0, gap = 1, skip = 0, index = 0 }: DialProps) => {


    return (
        <div
            className="absolute inline-flex items-center justify-center  w-0 h-0 transition-[transform] duration-300 ease-out"
            style={{
                left: x,
                top: y,
                transform: `rotate(${skip - deg}deg)`
            }}
        >
            {/* <div className='absolute w-2 h-2 rounded-full bg-red-500' /> */}

            {Array.from({ length: dials }).map((_, i) => (
                <div
                    key={i}
                    className='absolute w-25 h-0 right-0 inline-flex items-center origin-right'
                    style={{
                        transform: `rotate(${(360 / dials) * i}deg)`,
                        width: radius
                    }}
                >
                    <div className='w-6 h-1 rounded-full bg-gray-100' />
                    {typeof data == 'object' && i / gap < data?.length && (i % gap) == 0 &&
                        <div
                            className='absolute inline-flex items-center px-3! rounded-full text-gray-100 text-2xl font-medium h-15 bg-gray-700 right-[calc(100%+30px)] space-x-2! transition-opacity duration-300 ease-out'
                            style={{
                                opacity: (index - 1) >= (i / gap) ? 1 : 0.1
                            }}

                        >
                            <span
                                className='inline-flex items-center justify-center rounded-full bg-amber-400 h-10 w-10'
                                style={{
                                    backgroundColor: data[i / gap].color
                                }}
                            >
                                {data[i / gap].icon}
                            </span>
                            <span>{data[i / gap].text}</span>
                        </div>
                    }
                </div>
            ))}

        </div>
    )
}

/*--------------------------------------------------------------------------- */
interface VerticalProgress {
    percentage: number
    height: `${number}%`
}


const VerticalProgress = ({ percentage, height }: VerticalProgress) => {
    return (
        <div
            className='absolute inline-flex items-center right-3 rounded-full w-1.5 overflow-hidden'
            style={{ height }}
        >
            <div
                className='bg-amber-400 w-full transition-[height] duration-300 ease-out rounded-full'
                style={{ height: `${percentage == 0 ? 3 : percentage}%` }}
            />
        </div>
    )
}



// https://dribbble.com/shots/26221138-Wheel-UI?utm_source=Clipboard_Shot&utm_campaign=Daniellaa&utm_content=Wheel%20UI&utm_medium=Social_Share&utm_source=Clipboard_Shot&utm_campaign=Daniellaa&utm_content=Wheel%20UI&utm_medium=Social_Share&utm_source=Clipboard_Shot&utm_campaign=Daniellaa&utm_content=Wheel%20UI&utm_medium=Social_Share&utm_source=Clipboard_Shot&utm_campaign=Daniellaa&utm_content=Wheel%20UI&utm_medium=Social_Share