import React, { useState, useEffect } from 'react';
import './TextStyle.css'
import ArrangePara from './ArrangePara';
import SocialMedia from './SocialMedia';
import magnifyingGlass from './images/istockphoto-1151843591-612x612.png'
let Heading = "Welcome to our Skin Disease Detection AI " ; 
const InitialText ="Your reliable companion for skin health! Our powerful AI tool uses cutting-edge technology to help identify and classify a wide range of skin conditions . Designed to support both healthcare professionals and individuals, our AI provides fast, accurate insights that can make a real difference in early detection and proactive skin care . Easy to use, quick, and highly reliable, we’re here to empower you on your journey to healthier skin  "
function InputText(props) {
  const [inputText, setInputText] = useState('');
  const [outputText, setOutputText] = useState('Enter some Query');
  const [clicked, setClicked] = useState(false);
  const [loading, setLoading] = useState(false);
  const[treatmentPlan , setTreatmentPlan] = useState(InitialText);
  const click = () => {
    if(inputText === ''){
      Heading = 'Enter Some Query'
      setTreatmentPlan('')
  }
    else{
    setClicked(true);
    setLoading(true);
    setOutputText("Fetching Result")
    fetchRes();
    Heading ='' ; }
  };

  const fetchRes = () => {
    const data = { inputText };
    fetch("http://127.0.0.1:5000/api/TextAi", {
      method: "POST",
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    })
      .then((response) => response.json()) 
      .then((result) => {
        console.log(result)
        console.log(result.result)
        console.log(result.treatment_plan)
        setOutputText(result.result);
        setTreatmentPlan(result.treatment)
      })
      .catch((error) => {
        setOutputText('Error fetching result');
        console.error("Error:", error);
      })
      .finally(() => {
        setLoading(false);
        setClicked(false);
      });
  };

  const changeTxt = (e) => {
    setInputText(e.target.value);
  };

  return (
    <div className={`body-container-${props.mode}`}>
      <div className='res-box'>
              <h1 className='res'>
                {
                  (Heading !== '')?"Welcome to our Skin Disease Detection AI ":
                  outputText ==="Fetching Result"?"Generating...":
                     outputText!=="Enter some Query"?`RESULT : ${outputText.toUpperCase()}`:''}
              </h1>
              <p className='treatment' style={{ whiteSpace: 'pre-line' }}>
    {treatmentPlan}
</p>
      </div>
      <div className='ip-search'>
      <input
        type="text"
        value={inputText}
        onChange={changeTxt}
        placeholder="enter your query"
        className="ip"
      />
      <button onClick={click} disabled={loading}
      className='search-button'>
        {loading ? <div className="loading-spinner">
                    <div className="spinner"></div>
                </div> : <img src ={magnifyingGlass}
        className='magnifying-glass'/>}
      </button>
      </div>
    </div>
  );
}

export default InputText;
