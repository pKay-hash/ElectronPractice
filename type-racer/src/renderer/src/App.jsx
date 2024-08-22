import { useState } from 'react';
import WpmCounter from './components/WpmCounter.jsx';
import MainGame from './components/MainGame.jsx';

function App() {
    const [correctChars, setCorrectChars] = useState(0);

    return (
        <>
            <div className='bg-stone-900 flex justify-center items-center h-screen'>
                <div className='w-full'>
                    <WpmCounter correctChars={correctChars} />
                    <div className='flex items-center justify-center'>
                        <MainGame setCorrectChars={setCorrectChars} />
                    </div>
                </div>
            </div>
        </>
    );
}

export default App;
