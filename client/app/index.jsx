import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import Dropdown from '../components/Dropdown';
import Dashboard from '../components/Dashboard';
const PAGE_ID = document.getElementById('reactId');
const REPO_URL = 'https://api.github.com/repos/ktmDeveloper/coding-challenges/contents';

const App = () => {
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [items, setItems] = useState([]);
    const [contentUrl, setContentUrl] = useState('');

    useEffect(() => {
        fetch(REPO_URL, {
            headers: {
                'Authorization': 'token d30025e7f49627bf2517a530c98986491e3d146c',
            }
        })
            .then(res => res.json())
            .then(result => {
                setIsLoaded(true);
                setItems(result);
            },
                (error) => {
                    setIsLoaded(true);
                    setError(error);
                }
            )
    }, [])

    if (error) {
        return <div>Error: {error.message}</div>;
    } else if (!isLoaded) {
        return <div>Loading...</div>;
    } else {
        return (
            <>
                <Dashboard contentUrl={contentUrl} />
                <Dropdown menu={items} setContentUrl={setContentUrl} />
            </>
        );
    }
}

if (PAGE_ID) {
    ReactDOM.render(<App />, PAGE_ID);
}