import React, { Component } from 'react'
import axios from 'axios'
import '../components/forecast.css'

export default class Forecast extends Component {

    constructor(props) {
        super(props);
        this.cities = ['Toronto', 'Montreal', 'Vancouver']
        this.state = {
            city: '',
            weather_iconId: '',
            weather_description: '',
            weather_temp: '',
            weather_feelsLike: '',
            weather_tempMin: '',
            weather_tempMax: '',
            weather_pressure: '',            
        }
    }

    /*
    data = axios.get('http://api.openweathermap.org/data/2.5/weather?q=Toronto&appid=2b1fd2d7f77ccf1b7de9b441571b39b8')
    .then(function (response) {
        console.log(response);
    })
    .catch(function (error) {
        console.log(error);
    })
    */

    getIconUrl(iconId) {
        return 'http://openweathermap.org/img/wn/' + iconId + '.png'
    }

    getWeather(city) {
        axios.get('http://api.openweathermap.org/data/2.5/weather?q=' + city + '&appid=2b1fd2d7f77ccf1b7de9b441571b39b8')
        .then(response => {
            console.log(response);
            this.setState({
                city: city,
                weather_iconId: response.data.weather[0].icon,
                weather_description: response.data.weather[0].description,
                weather_temp: response.data.main.temp,
                weather_feelsLike: response.data.main.feels_like,
                weather_tempMin: response.data.main.temp_min,
                weather_tempMax: response.data.main.temp_max,
                weather_pressure: response.data.main.pressure,
            })
        })
        .catch(error => {
            console.log(error);
        })
    }
    /*
    componentDidMount() {
        this.getWeather('Toronto')
    }
    */

  render() {
    return (
      <div className='wrapper'>
        <h1>Weather Forecast</h1>
        <div className='daily'>
            <div className='daily_content'>
                <h2></h2>




            </div>   
        </div>
        <div className='weekly'>
        <div className='weekly_content'>
            </div>   

        </div>



      </div>
    )
  }
}
