import Line from "./Topics/Line";
import Bar from "./Topics/Bar";
import Meter from "./Topics/Meter";
import Needle from "./Topics/Needle";
import Who from "./Topics/who";
import Weather from "./Topics/Weather";
import Water from "./Topics/Water";
import Video from "./Topics/Video";
// import "./App.css";

function App() {
  return (
    <>
    <Video></Video>
    <Who num={1}></Who>
    <Who num={2}></Who>
    <Who num={3}></Who>
    <Meter></Meter>
    <Bar num ={1}></Bar>
    <Bar num ={2}></Bar>
    <Bar num ={3}></Bar>
   <Weather></Weather>
   <Needle num={1}num2={0}></Needle>
   <Needle num={2}num2={1}></Needle>
   <Needle num={3}num2={2}></Needle>
   <Needle num={3}num2={3}></Needle>
    </>
  );
}

export default App;
