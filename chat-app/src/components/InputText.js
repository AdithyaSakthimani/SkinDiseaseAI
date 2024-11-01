import React, { useState } from 'react'

function InputText() {
  const [inputText , setInputText] = useState('')
  const [outputText , setOutputText] = useState(()=>{
   return 'Enter some Query' 
})
  useEffect()
  const changeTxt =(e)=>{
    setInputText(e.target.value)
  }
  return (
    <div>
      <input type="text" value = {inputText} onChange={changeTxt}
      placeholder='enter your query' className='ip'/>
      <button>Search</button>
      <input type="text" value = {outputText} 
       className='ip'/>
      
    </div>
  )
}

export default InputText
