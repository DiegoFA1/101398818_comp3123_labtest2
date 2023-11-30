import React, { Fragment } from 'react'


function getIconUrl(iconId) {
    return 'http://openweathermap.org/img/wn/' + iconId + '.png'
}

export default function DayContainer(props) {
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    console.log(props)
  return (
    <Fragment>
    <div className='otherdays_content'>
        <div className='otherdays_header'>
            <h2>{days[new Date(props.day.dt * 1000).getDay()]}</h2>
        </div>
        <img src={getIconUrl(props.day.weather[0].icon)} alt='weather icon' />
        <div className='otherdays_weather'>
            <h2>{(props.day.main.temp - 273.15).toFixed(1)} °C</h2>
        </div>
    </div>
    </Fragment>
  )
}
