import React, { useState, useEffect } from 'react';

const Dropdown = ({ menu, setContentUrl }) => {
    const [error, setError] = useState(null);
    const [activeUrl, setActiveUrl] = useState('');
    const [subItems, setSubItems] = useState([]);
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        if (menu.length) {
            setActiveUrl(menu.find(item => item.type === 'dir').url);
        }
    }, [menu])

    useEffect(() => {
        if (activeUrl) {
            fetch(activeUrl, {
                headers: {
                    'Authorization': 'token 85307d15276c0bf1c8105a20c549b0ab67b62bbe',
                }
            })
                .then(res => res.json())
                .then(result => {
                    setIsLoaded(true);
                    setSubItems(result);
                    setContentUrl(result.find(item => item.type === 'file').url)
                },
                    (error) => {
                        setIsLoaded(true);
                        setError(error);
                    }
                )
        }

    }, [activeUrl]);

    const DropSubList = ({ subItems }) => {
        if (error) {
            return <h4>some error happened: {error}</h4>
        }
        return <ul>
            {isLoaded
                ? subItems.map((subItem, idx) => {
                    if (subItem.type === 'file') {
                        return <li key={idx} onClick={(e) => handleSubItemClick(e, subItem.url)}>{subItem.name}</li>
                    }
                })
                : null}
        </ul>
    }

    const DropList = ({ item }) => {
        return <div onClick={() => handleItemClick(item.url)} style={{ position: "relative" }}>
            <p>{item.name}</p>
            {item.url === activeUrl ? <DropSubList subItems={subItems} /> : ''}
        </div>
    }

    const handleItemClick = (url) => {
        if (activeUrl !== url) {
            setIsLoaded(false);
            setActiveUrl(url);
        }
    }

    const handleSubItemClick = (e, url) => {
        e.stopPropagation();
        setContentUrl(url);
    }

    return <div className="dropdown">
        {menu.map((item, idx) => {
            if (item.type === 'dir') {
                return <DropList item={item} key={idx} />
            }
        })}
    </div>
}

export default Dropdown;