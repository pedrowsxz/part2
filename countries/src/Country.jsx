import { useState } from 'react'
import Weather from './Weather'

function Country({ name, capital, area, languages, flag, countriesShowed }) {

    const [show, setShow] = useState(false)

    const handleShowButton = () => {
        setShow(!show)
    }

    if (countriesShowed.length === 1) {
        return (
            <>
            <div>
                <h1>
                    {name}
                </h1>
                <p>
                    capital {capital}
                </p>
                <p>
                    area {area}
                </p>
                <strong>languages:</strong>
                <ul>
                    {Object.values(languages).map(language => 
                        <li>
                            {language}
                        </li> 
                    )}
                </ul>
                <img src={flag.png} alt={flag.alt} />
            </div>
            </>
        )
    }
    return (
        <>
        {show ?
            <div>
                <h1>
                    {name}
                </h1>
                <p>
                    capital {capital}
                </p>
                <p>
                    area {area}
                </p>
                <strong>languages:</strong>
                <ul>
                    {Object.values(languages).map(language => 
                        <li>
                            {language}
                        </li> 
                    )}
                </ul>
                <img src={flag.png} alt={flag.alt} />
                <button onClick={handleShowButton}>hide</button>
            </div>  
            :
            <p>
                {name}
                <button onClick={handleShowButton}>show</button>
            </p>
            }
            
        </>
    )
}

export default Country