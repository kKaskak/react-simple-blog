import React, { useState, useEffect } from 'react';
import { Loading, PageLayout } from './components';
import { Header } from './containers';
import './index.css';

function App() {
    const [isLoaded, setIsLoaded] = useState(false);
    useEffect(() => {
        let timer = setTimeout(() => setIsLoaded(true), 2000);
        return () => {
            clearTimeout(timer);
        };
    }, []);
    return <PageLayout>{!isLoaded ? <Loading /> : <Header />}</PageLayout>;
}

export default App;
