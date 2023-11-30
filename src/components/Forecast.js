import React, { Component } from 'react'
import axios from 'axios'
import '../components/forecast.css'
import DayContainer from './DayContainer';

export default class Forecast extends Component {

    constructor(props) {
        super(props);
        this.cities = ['Toronto', 'Montreal', 'Vancouver']
        this.days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
        this.state = {
            city: 'Toronto',
            day: '',
            timezone: '',
            weather_iconId: '',
            weather_description: '',
            weather_temp: '',
            weather_feelsLike: '',
            weather_tempMin: '',
            weather_tempMax: '',
            weather_pressure: '',            
        }
    }

    getIconUrl(iconId) {
        return 'http://openweathermap.org/img/wn/' + iconId + '.png'
    }

    onValueChanged = (event) => {
        this.setState({...this.state, [event.target.name]:event.target.value})
    }

    onCityChanged = (event) => {
        this.setState({...this.state, [event.target.name]:event.target.value})
        this.getActualWeather(event.target.value)
        this.getOtherDaysWeather(event.target.value)
    }

    getActualWeather(city) {
        axios.get('http://api.openweathermap.org/data/2.5/weather?q=' + city + '&appid=22062437ae3b8754c56e31542ccf0df3')
        .then(response => {
            this.setState({
                otherDays: [],
                city: city,
                day: this.days[new Date(response.data.dt * 1000).getDay()],
                day_date : new Date(response.data.dt * 1000).toDateString(),
                timezone: response.data.timezone,
                weather_iconId: response.data.weather[0].icon,
                weather_description: response.data.weather[0].description,
                weather_temp: (response.data.main.temp - 273.15).toFixed(1),
                weather_wind: response.data.wind.speed,
                weather_humidity: response.data.main.humidity,
                weather_tempMin: (response.data.main.temp_min- 273.15).toFixed(0),
                weather_tempMax: (response.data.main.temp_max- 273.15).toFixed(0),
                weather_pressure: response.data.main.pressure,
            })
        })
        .catch(error => {
            console.log(error);
        })
    }

    
    getOtherDaysWeather(city) {
       axios.get('http://api.openweathermap.org/data/2.5/forecast?q=' + city + '&appid=22062437ae3b8754c56e31542ccf0df3' + '&cnt=40')
       .then(response => {
        const data = response.data
        const otherDays = []
        for (var i = 0; i < data.list.length; i+=8) {
            const day = data.list[i]
            otherDays.push(day)
          }
        this.setState({otherDays})
        })
        .catch(error => {
            console.log(error);
        })
}

    componentDidMount() {
        this.getActualWeather('Toronto')
        this.getOtherDaysWeather('Toronto')
    }


  render() {
    return (
      <div className='wrapper'>
        <div className='forecastBody'>
            <div className='forecastHeader'>
            <h1>Weather Forecast</h1>
            <select name='city' onChange={(e) => this.onCityChanged(e)}>
                {
                    this.cities.map((city) => (
                            <option key={city} value={city}>{city}</option>
                    ))
                }
            </select>
            </div>

            <div className='daily'>
                <div className='daily_content'>

                    <div className='daily_header'>
                        <h2>{this.state.city}</h2>
                        <h2>{this.state.day}</h2>
                        <h4>{this.state.day_date}</h4>
                    </div>
                    <img src={this.getIconUrl(this.state.weather_iconId)} alt='weather icon' />
                    <div className='daily_weather'>
                        <h2>{this.state.weather_temp} °C</h2>
                        <h4>{this.state.weather_description}</h4>
                    </div>
                
                </div>   
            </div>

            <div className='weekly'>
                <div className='description_content'>
                    <div className='info'>
                        <p>Wind</p>
                        <p>{this.state.weather_wind} km/h</p>
                    </div>

                    <div className='info'>
                        <p>Humidity</p>
                        <p>{this.state.weather_humidity}%</p>
                    </div>

                    <div className='info'>
                        <p>Air pressure</p>
                        <p>{this.state.weather_pressure} mb</p>
                    </div>

                    <div className='info'>
                        <p>Max Temp</p>
                        <p>{this.state.weather_tempMax} °C</p>
                    </div>

                    <div className='info'>
                        <p>Min Temp</p>
                        <p>{this.state.weather_tempMin} °C</p>
                    </div>
                </div>   
                <div className='otherdays'>
                    {
                        this.state.otherDays && this.state.otherDays.map((day) => (
                            <DayContainer key={day.dt} day={day} />
                        ))
                    }

                </div>

            </div>
        </div>
      </div>
    )
  }
}
