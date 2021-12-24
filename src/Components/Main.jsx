import React, { useEffect, useState } from 'react'

const Main = () => {

    const dayName = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const monthName = ['January', 'Feburary', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', "December"];

    const time = new Date();
    const day = dayName[time.getDay()];
    const month = monthName[time.getMonth()];
    const date = time.getDate();
    const year = time.getFullYear();

    const [city, setCity] = useState(null);
    const [search, setSearch] = useState("Mumbai");

    useEffect( () => {
        const fetchApi = async () => {
            const url = `https://api.openweathermap.org/data/2.5/weather?q=${search}&units=metric&appid=6e475f8aeeec10badabc148ae805a7ec`;
            const response = await fetch(url);
            const resJson = await response.json();
            // console.log(resJson);
            setCity(resJson.main);
        };

        fetchApi();
    }, [search]);

    return (
        <div>
            <section className='main'>
                <div id='search-section'>
                    <input type="search" value={search} placeholder='enter city name' className='searchField' onChange={(event) => {setSearch(event.target.value)}} />
                </div>

                {!city ? (
                    <p>No city found</p>
                ) : (
                    <div>
                        <div id="location-date">
                            <h3>{search}</h3>
                            <p>{day}, {month} {date}, {year}</p>
                        </div>
                        <div id='temp'>
                            <h1>{city.temp} <span style={{"fontSize":"60px"}}>&#8451;</span> </h1>
                            <hr id='line'/>
                        </div>
                        <div id='weather'>
                            icon <br/> Sunny
                        </div>
                        <div id='min-max'>
                            <p>{city.temp_min}&#8451;/{city.temp_max}&#8451;</p>
                        </div>
                    </div>
                )}
            </section>
        </div>
    )
}

export default Main
