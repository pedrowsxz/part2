function Weather({name}) {

    const [latlong, setlatlong] = useState({})
    const [weather, setWeather] = useState({})

    const api_key = import.meta.env.VITE_SOME_KEY

    useEffect(() => {
        axios.get(`http://api.openweathermap.org/geo/1.0/direct?q=${capital},${name}&limit=1&appid=${api_key}`)
          .then( response => {
            setlatlong({ lat: response.data[0].lat, lon: response.data[0].lon})
            console.log(latlong)
          })
    }, [capital, name])

    useEffect(() => {
        axios.get(`https://api.openweathermap.org/data/3.0/onecall?lat=${latlong.lat}&lon=${latlong.lon}&appid=${api_key}`)
          .then( response => {
            setWeather(response.data)
            console.log(weather)
          })
    }, [latlong])

    return (
        <>
            <h1>Weather in {name}</h1>
            <p>temperature {(weather.current.temp - 32)/1.8} Celsius</p>
            <img src={`https://openweathermap.org/img/wn/${weather.current.weather.icon}@${weather.current.weather.id}.png`} />
            <p>wind {weather.current.wind_speed} m/s</p>
        </>
    )
} 

export default Weather
