import { useContext } from "react";
import { CurrentWeatherContext } from "../context/Location";
import Image from 'next/image'

function Tomorrow({tomorrow}) {
    const {toggle} = useContext(CurrentWeatherContext)

    return ( 
        <section className=" gap-5 d-flex flex-wrap justify-content-center" style={{ margin:"auto", width:"100%"}}>
           {
               
                   tomorrow.map((value, index) =>
                       <main key={index} className=" py-3 px-3 text-center " style={{ background: toggle == false ? "linear-gradient(45deg, rgb(244,177,124), rgb(252,208,131))": "linear-gradient(45deg, #1B2430, #3F4E4F)", width: "20rem", borderRadius:"12px" }} >
                           <div className="text-end fs-5 fw-bold">{value.time.split(" ")[1]}</div>
                           <Image src={"http:" + value.condition.icon} alt="" width={100} height={100} />
                           <div style={{ fontSize: "3rem", fontWeight: "bold" }}>{value.temp_c.toFixed()}<span style={{ color: "rgb(254,130,135)" }}>&deg;C</span></div>
                           <div>
                               <p style={{height:"2rem"}}> <span style={{ fontSize: "1.2rem", fontWeight: "bold", fontFamily: "monospace"}}>Condition :</span> <span>{value.condition.text} </span></p>
                               <p> <span style={{ fontSize: "1.2rem", fontWeight: "bold", fontFamily: "monospace" }}>Humidity :</span> <span style={{ fontWeight: "bold" }}>{value.humidity} <span style={{ color: "rgb(254,130,135)" }}>%</span></span></p>
                           </div>
                       </main>
   
                   )
            
           }
        </section>
     );
}

export default Tomorrow;