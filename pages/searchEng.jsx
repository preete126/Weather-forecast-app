import axios from 'axios';
import { useCallback, useEffect, useState } from 'react';
import styles from '../styles/search.module.css'
import key from './api/key';

const SearchEng = (props) => {
    const [content, setContent] = useState("");
    const [error, setError] = useState(null);
    // const API_KEY = "b29986140bba4fea9fb171132221410"
    // const BASE_URL = "http:api.weatherapi.com/v1"

    const searchLocation = useCallback((city) => {
        const url = `${key.BASE_URL}/current.json?key=${key.API_KEY}&q=${city !== "[object Object]" ? city : content}&aqi=no`;
        axios.get(url)
            .then(response => {
                props.setCurrentweather(response.data)
              
            })
            .catch(err => {
                console.log(err);
                setError({ message: "Not Found", content: content });
            })

        if (error) {
            return (
                <h1>Error...</h1>
            )
        }
       
    }, [])

    const search = (ev) => {
        ev.preventDefault()
        // useEffect(() => {
            if (content) searchLocation(content);
            
        // }, [])
    }


    return (
        <div>
            <form onSubmit={search} action="">
                <input
                    type="search"
                    placeholder='Search location'
                    className={styles.input}
                    value={content}
                    onChange={ev => setContent(ev.target.value)}
                />
            </form>
        </div>
    )
}
export default SearchEng;