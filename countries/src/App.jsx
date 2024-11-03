import { useState, useEffect } from 'react'
import axios from 'axios'
import Country from './Country'


function App() {
  const [countries, setCountries] = useState([])
  const [searchValue, setSearchValue] = useState('')

  useEffect(() => {
    axios.get("https://studies.cs.helsinki.fi/restcountries/api/all")
      .then( response => {
        setCountries(response.data)
      })
  }, [])


  const handleCountriesSearch = (event) => {
    setSearchValue(event.target.value)
  }

  const countriesShowed = countries.filter((country) => country.name.common.toLowerCase().includes(searchValue.toLowerCase()))

  
  if (countriesShowed.length > 10) {
    return (
      <>
        find countries <input value={searchValue} onChange={handleCountriesSearch}/>
        <p>
          Too many matches, specify another filter
        </p> 
      </>
    )
  }
  return (
      <>
        find countries <input value={searchValue} onChange={handleCountriesSearch}/>
        {countriesShowed.map((country) =>
                  <Country key={country.ccn3} 
                          name={country.name.common} 
                          capital={country.capital}   
                          area={country.area} 
                          languages={country.languages} 
                          flag={country.flags} 
                          countriesShowed={countriesShowed} />
                )}
      </>
  )
}

export default App
