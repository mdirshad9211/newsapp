import React, { useEffect, useRef, useState } from 'react';
import './News.css';

function NewsApp() {
    const apiKey = '2aeff972e45e42e88962e68838a73be0';
    const [newsList, setNewsList] = useState([]);
    const [query, setQuery] = useState('business');
    const queryInputRef = useRef(null);

    async function fetchData(query) {
        //https://newsapi.org/v2/top-headlines?country=us&category=business&apiKey=API_KEY
        const apiURL = `https://newsapi.org/v2/top-headlines?country=us&category=${query}&apiKey=${apiKey}`;
        console.log('Fetching data from URL:', apiURL);

        try {
            const response = await fetch(apiURL);
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const jsonData = await response.json();
            console.log('Fetched data:', jsonData);
            setNewsList(jsonData.articles);
        } catch (e) {
            console.error('Error occurred:', e);
        }
    }

    useEffect(() => {
        fetchData(query);
    }, [query]);



    function handleSubmit(event) {
        event.preventDefault();
        const queryValue = queryInputRef.current.value;
        console.log('Form submitted with query:', queryValue);
        setQuery(queryValue);
    }

    return (
        <div className="main">
            <h1 className='header'>PERFECT NEWS</h1>
            <form className='form-search' onSubmit={handleSubmit}> 
                <input className="query-search" type="text" ref={queryInputRef} />
                <input className='submit-btn' type="submit" value="Submit" />
            </form>
            <div className='news-main'>
                {newsList.length === 0 && <p>No news available</p>}
                {newsList.map((news, index) => (
                    <div className="news-card" key={index}>
                        <img src={news.urlToImage} alt={news.title} />
                        <h2>{news.title}</h2>
                        <p>{news.description}</p>
                        <button className='read-more' onClick={() => window.open(news.url)}>Read More</button>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default NewsApp;
