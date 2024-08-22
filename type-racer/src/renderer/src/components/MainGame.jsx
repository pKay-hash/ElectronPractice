import React, { useState, useEffect } from 'react';

const promptText = `The health hazards of microplastics within the human body are not yet well-known. Recent studies are just beginning to suggest they could increase the risk of various conditions such as oxidative stress, which can lead to cell damage and inflammation, as well as cardiovascular disease. Animal studies have also linked microplastics to fertility issues, various cancers, a disrupted endocrine and immune system, and impaired learning and memory. There are currently no governmental standards for plastic particles in food or water in the United States. The Environmental Protection Agency is working on crafting guidelines for measuring them, and has been giving out grants since 2018 to develop new ways to quickly detect and quantify them.`;

export default function MainGame({ setCorrectChars }) {
    const [input, setInput] = useState('');
    const [isActive, setIsActive] = useState(false);
    const [timer, setTimer] = useState(60);

    useEffect(() => {
        let interval;
        if (isActive && timer > 0) {
            interval = setInterval(() => {
                setTimer((prevTime) => prevTime - 1);
            }, 1000);
        } else if (timer === 0) {
            setIsActive(false);
            calculateCorrectChars();
        }
        return () => clearInterval(interval);
    }, [isActive, timer]);

    const handleChange = (e) => {
        if (!isActive) {
            setIsActive(true);
        }
        setInput(e.target.value);
    };

    const calculateCorrectChars = () => {
        let correctString = "";
        let correctChars = 0;
        for (let i = 0; i < input.length; i++) {
            if (input[i] === promptText[i]) {
                correctChars++;
                correctString += promptText[i];
            }
        }
        setCorrectChars(correctChars);
        console.log(correctString);
    };
    return (
        <div className='bg-stone-900 w-[75vw] h-[75vh] flex flex-col justify-center items-center rounded-xl p-6'>
            <p className='text-gray-400 text-sm mb-4'>{promptText}</p>
            <textarea
                className='w-full h-1/3 bg-stone-800 text-white p-2 rounded-lg'
                value={input}
                onChange={handleChange}
                disabled={!isActive && timer === 0}
                placeholder='Start typing here...'
            />
            <div className='text-gray-400 mt-4'>Time left: {timer} seconds</div>
        </div>
    );
}
