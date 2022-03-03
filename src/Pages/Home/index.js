import React, {useState, useEffect} from 'react' 
import './home.css'
import api from '../../services/api'

import toast, { Toaster } from 'react-hot-toast';


import clouds from '../../assets/cloudy.png'
import rain from '../../assets/rain.png'
import sun from '../../assets/sun.png'
import snow from '../../assets/snow.png'

import {HiLocationMarker} from 'react-icons/hi'
import {IoWater} from 'react-icons/io5'
import {BsThermometerHalf, BsSearch} from 'react-icons/bs'
import {RiSearch2Line} from 'react-icons/ri'
import {ImSearch} from 'react-icons/im'

export default function Home(){
const [input, setInput] = useState('')
const [weather, setWeather] = useState([]);

const img = 'http://openweathermap.org/img/wn/'

const apiKey = '&units=metric&lang=pt_br&appid=473c99c7e814a128dea703966c3c4fa0'

async function handleSearch(e){
    e.preventDefault();
    if(input === ''){
        // alert('Insira alguma Cidade')
        toast('Insira alguma Cidade', {
            icon: 'ℹ️',
          });
        return;
    }
   
    try {
        const response = await api.get(`weather?q=${encodeURI(input)}${apiKey}`)
        setWeather(response.data)
        console.log(response.data)
        setInput('')
    } catch {
        toast.error('Nenhuma Cidade encontrada')
    }
    
    }

return(

    <div className='container'>
    <Toaster position='top-right'/>

        <form type="submit">
                <input 
                type="text" 
                value={input} 
                onChange={e => setInput(e.target.value)} 
                placeholder='Ex: São Paulo' 
                />
                <button type="submit" onClick={handleSearch}><ImSearch/></button>
        </form>

        {weather.main ? 
            <div className='box'>
            
            {weather.main ? 
            
            <div className='title'>
            
            <strong><HiLocationMarker/> {weather.name} - {weather.sys.country}</strong> 
            
            </div> 
            
            : null
            
            }

            { weather.weather[0].main === 'Clear' ? <img src={sun}/> 
            : 
            <>

                {weather.weather[0].main === 'Clouds' ? <img src={clouds}/>
                
                : 

                <>

                    {weather.weather[0].main === 'Rain' ? <img src={rain}/> 
                
                    : 

                    <>
                        {weather.weather[0].main === 'Snow' ? <img src={snow}/> 
                
                        : 

                        <>

                        </>

                        }

                    </>

                    }

                </>

                }

            </>
            }

                <div className='description'>
                    <span >{Math.round(weather.main.temp)}°</span>
                    <p className='description'>{weather.weather[0].description}</p>
                </div>

                <div className='infos'>
                    <div className='texts'>
                        <IoWater className='humidade'/>
                        <p>Humidade</p>
                        <div className='border'> 
                            <span>{Math.round(weather.main.humidity)}%</span> 
                        </div>
                    </div>

                    <div className='texts'>
                        <BsThermometerHalf className='termometro' />
                        <p>Sensação</p>
                        <div className='border'> 
                            <span >{Math.round(weather.main.feels_like)}°</span>
                        </div>
                        
                    </div>

                </div>
            
            </div> 

            : 

        <div className='box'>
            <div className='initial'>
                <h2>Qual o tempo?</h2>
            </div>
        </div> 

        }
        
    </div>
)
}