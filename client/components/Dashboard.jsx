import React, { useState, useEffect } from 'react';

const Dashboard = ({ contentUrl }) => {
    const [error, setError] = useState(null);
    const [title, setTitle] = useState('');
    const [fileString, setFileString] = useState(window.btoa('Please click on the menu on the right to load code'));
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        if (contentUrl) {
            fetch(contentUrl, {
                headers: {
                    'Authorization': 'token d30025e7f49627bf2517a530c98986491e3d146c',
                }
            })
                .then(res => res.json())
                .then(result => {
                    setIsLoaded(true);
                    setFileString(result.content);
                    setTitle(result.name);
                },
                    (error) => {
                        setIsLoaded(true);
                        setError(error);
                    }
                )
        }
    }, [contentUrl]);

    if (error) {
        return <div>Error: {error.message}</div>;
    } else if (!isLoaded) {
        return <div className="dashboard"><div className="rounder"></div></div>;
    } else {
        return (
            <div className="dashboard">
                <h1 style={{textTransform: 'capitalize'}}>{title.replace(/(.js)$/g, '')}</h1>
                <pre className="highlight">
                    <code className="js hljs">
                        {window.atob(fileString)}
                    </code>
                </pre>
            </div>
        );
    }
}

export default Dashboard;