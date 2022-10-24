import Image from 'next/image'
import styles from '../styles/Home.module.css'
import Lotus from '../public/lotus.png'
import light from '../public/light.png'
import dark from '../public/dark.png'
import Link from 'next/link'
import { useEffect, useRef, useState } from 'react'
import SearchEng from './searchEng'
import { CurrentWeatherContext } from '../context/Location'
import Current from './Current'
import { useRouter } from 'next/router'
import Hourly from './Houry'
import Tomorrow from './Tomorrow'



function App() {
  
  const [time, setTime] = useState("")
  let ArrMonth = ['JANUARY', 'FEBRUARY', 'MARCH', 'APRIL', 'MAY', 'JUNE', 'JULY', 'AUGUST', 'SEPTEMBER', 'OCTOBER', 'NOVEMBER', 'DECEMBER']
  let [line, setLine] = useState('yes')
 

  const Display = useRouter()
  const pid = Display.query


  useEffect(() => {
    let date = new Date()

    let day = date.getDate()
    let month = date.getMonth()
    let year = date.getFullYear()

    setTime(`${day} ${ArrMonth.at(month)} ${year}`)
    
   
   
  }, [])

  return (
    <CurrentWeatherContext.Consumer>
      {
        (context) => {
          const currentWeather = context.currentWeather;
          const hourWeather = context.hourWeather;
          const tomorrowWeather = context.tomorrowWeather;

          if (currentWeather && hourWeather && tomorrowWeather) {
            return (
              <section  style={{background: context.toggle == false ? " linear-gradient(45deg, rgb(244,177,124), rgb(252,208,131))" : "linear-gradient(45deg, #3F4E4F, #1B2430 )", padding:"1em", }} >
                <>
                     <div className={styles.img} >
                     <Image src={Lotus} alt='lotus' />
                   </div> 
                </>
                <>
                  <main className={styles.main} style={{background: context.toggle == false ? " linear-gradient(165deg, rgb(250,224,119),rgb(255,190,148))" : "linear-gradient(165deg, #261C2C, #3F4E4F)"}}>
                    <nav className={styles.nav}>
                      <main style={{ display: "flex", justifyContent: "space-between",alignItems:"flex-end",  fontFamily: "monospace", fontSize: "20px", fontWeight: "bold"}}>
                        <div className='fs-3' style={{lineHeight:"20px" }}>Weather Forecast</div>
                        <div className={styles.mode}>
                           {context.toggle == false ? 
                               <span>
                               <Image onClick={()=> context.setToggle(true)} src={light} width={50} height={50} alt="ligtmode" />
                             </span> :
                              <span>
                              <Image onClick={()=> context.setToggle(false)} src={dark} width={50} height={50} alt="darkmode" />
                            </span>
                          }
                        </div>
                      </main>

                      <SearchEng setCurrentweather={context.setCurrentWeather} />

                    </nav>
                    <main>

                      <Current dailydata={currentWeather} Time={time} />
                    </main>
                  </main>
                </>
                <>
                  <main className={styles.period} style={{width:"70%", margin:"auto", padding:"2em"}}>
                    <Link href={"/?hour=today"} >
                      <button onClick={()=> setLine("yes")}  className={`${styles.btn} ${line == "yes"?"border-3 border-bottom":" border-none"}`}>Today</button>
                     
                    </Link>
                    <Link href={"/?hour=tomorrow"} >
                    <button onClick={()=> setLine("no")}  className={`${styles.btn} ${line == "no" ? "border-3 border-bottom":" border-none"}`}>Tomorrow</button>
                    </Link>
                  </main>


                  <main>
                    {pid["hour"] == "today" && <Hourly hourly = {hourWeather} dailydata={currentWeather} />}
                    {pid["hour"] == "tomorrow" && <Tomorrow tomorrow = {tomorrowWeather} />}
                  </main>
                </>
                <>
                    <div className={styles.img2}>
                      <Image src={Lotus} alt='lotus' />
                    </div>
                </>
              </section>
            )
          } else {
            return (
              <div className="" style={{ display: "flex", justifyContent: "center", flexDirection: "column", background: "linear-gradient(45deg, rgb(244,177,124), rgb(252,208,131))", padding: "2.5em", alignItems: "center", height: "100vh" }}>

                <h1 className={styles.sprint}>SPRINT</h1>
                <div style={{ width: "200px", height: "8px", borderRadius: "10px", backgroundColor: "whitesmoke", paddingTop: "0.5px" }}>
                  <div className={styles.anim}></div>
                </div>

              </div>
            )
          }
        }

      }
    </CurrentWeatherContext.Consumer>
  );

}

export default App;