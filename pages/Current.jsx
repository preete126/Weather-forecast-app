// import { useEffect } from "react";
import Location from "../public/location.png"
import Image from 'next/image'

function Current({ dailydata, Time }) {

   

    return (
        <main>
            <main style={{marginTop:"5em"}}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems:"center" }}>
                    <div>{Time}</div>
                    <div style={{ fontSize: "25px", fontWeight: "bold" }}>Today</div>
                </div>
                <div style={{ textAlign: "center", marginTop: "1em", marginBottom: "5em", lineHeight:"1rem" }}>
                    <Image src={"http:" + dailydata.current.condition.icon} width={200} height={200} alt="" />
                    <div style={{ fontSize: "4rem", fontWeight: "bold" }}>{dailydata.current.temp_c.toFixed()}<span style={{color:"rgb(254,130,135)"}}>&deg;C</span></div>
                   
                </div>
                
                <div>
                    
                    <Image src={Location} alt="location" width={25} height={25} />
                    <span style={{ fontSize: "1.5rem", fontWeight: "bold" }}>{dailydata.location.name}, {dailydata.location.country}</span>
                    <div style={{paddingLeft:"1.6rem", lineHeight:"1em",}} className="my-3">
                        <p> <span style={{ fontSize: "1.2rem", fontWeight: "bold", fontFamily:"monospace" }}>Condition :</span> <span>{dailydata.current.condition.text} </span></p>
                        <p> <span style={{ fontSize: "1.2rem", fontWeight: "bold", fontFamily:"monospace" }}>Humidity :</span> <span style={{fontWeight: "bold"}}>{dailydata.current.humidity} <span style={{color:"rgb(254,130,135)"}}>%</span></span></p>
                    </div>
                </div>
                <article>

                </article>

            </main>

        </main>
    );
}

export default Current;