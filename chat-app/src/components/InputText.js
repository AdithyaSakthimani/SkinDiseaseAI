import React, { useState, useEffect } from 'react';
import './TextStyle.css'
import ArrangePara from './ArrangePara';
function InputText(props) {
  const [inputText, setInputText] = useState('');
  const [outputText, setOutputText] = useState('Enter some Query');
  const [clicked, setClicked] = useState(false);
  const [loading, setLoading] = useState(false);
  const[treatmentPlan , setTreatmentPlan] = useState('');
  const click = () => {
    setClicked(true);
    setLoading(true);
    setOutputText("Fetching Result")
    fetchRes();
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
        {loading ? 'Loading...' : 'Search'}
      </button>
      </div>
      <h1 className='res'>
        {outputText ==="Fetching Result"?"FETCHING...":
        outputText!=="Enter some Query"?`RESULT : ${outputText.toUpperCase()}`:''}
      </h1>
      <div className='treatment-box'>
      <p className='treatment'>
      {console.log(ArrangePara(treatmentPlan))}
      {ArrangePara(treatmentPlan)}
      </p>
      </div>
    </div>
  );
}

export default InputText;
