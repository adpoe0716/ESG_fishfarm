import Video from "../Topics/Video";
import Who from "../Topics/Who";
import Bar from "../Topics/Bar";
import Meter from "../Topics/Meter";
import Needle from "../Topics/Needle";
import Weather from "../Topics/Weather";
import Water from "../Topics/Water";


function Topices({num}) {
  
    console.log(num);
  return (
    <>
    <Video></Video>
    <Who num={num}></Who>
    <Bar num={num}></Bar>
    <Meter num={num}></Meter>
    <Needle num={num}></Needle>
    <Weather num={num}></Weather>
    
    </>
  );
}

export default Topices;
