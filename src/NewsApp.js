import React, { useEffect, useRef, useState } from 'react';
import './News.css';


function NewsApp() {
    const apiKey = '2aeff972e45e42e88962e68838a73be0';

    const [newsList, setNewsList] = useState([]);
    const [query, setQuery] = useState('tesla');
    const queryInputRef = useRef(null);


    const apiURL = `https://newsapi.org/v2/everything?q=${query}&from=2024-06-15&sortBy=publishedAt&apiKey=${apiKey}`;

    useEffect(() => {
        fetchData();
    }, [query]);

    async function fetchData() {
        try {
            const response = await fetch(apiURL);
            const jsonData = await response.json();
            setNewsList(jsonData.articles);
        } catch (e) {
            console.error('Error Occurred', e);
        }
    }


    function handleSubmit(event){
        event.preventDefault();
        const queryValue = queryInputRef.current.value;
        setQuery(queryValue);
    }

    return (
        <div className="main">
            <h1 className='header'>PERFECT NEWS</h1>
            <form className='form-search' onSubmit={handleSubmit}> 
                <input className="query-search" type="text" ref={queryInputRef} />
                <input className='submit-btn'  onClick = {handleSubmit}  type="submit" value = "Submit" />
            </form>
            <div className='news-main'>
                {newsList.map((news, index) => (
                    <div className="news-card">
                    <img src={news.urlToImage} alt={news.title} />
                    <h2>{news.title}</h2>
                    <p>{news.description}</p>
                    <button className='read-more' onClick={() =>window.open(news.url)}>Read More</button>
                </div>
                ))}
            </div>

        </div>
    );
}

export default NewsApp;
