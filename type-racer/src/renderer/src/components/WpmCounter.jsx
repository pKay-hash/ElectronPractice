import React from 'react';

export default function WpmCounter({ correctChars }) {
    const wpm = Math.ceil(correctChars / 5);

    return (
        <div className='flex justify-center items-center'>
            <h1 className='text-2xl pb-1 pr-2 text-gray-300'>{wpm}</h1>
            <h1 className='text-2xl pb-1 text-gray-500'>WPM</h1>
        </div>
    );
}
