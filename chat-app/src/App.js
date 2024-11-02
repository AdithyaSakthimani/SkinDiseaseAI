import React , {useEffect,useState}from 'react' ; 
import './App.css';
import InputText from './components/InputText';
import HeaderFile from './components/HeaderFile';

function App() {
  const [mode , setMode] = useState('Light')
  const bodyElement = document.body;
  useEffect(() => {
    if (mode === 'Dark') {
      document.body.style.backgroundColor = 'gray';
    } else {
      document.body.style.backgroundColor = 'lightgray';
    }
  }, [mode]);
  const changeMode =()=>{
    setMode((prev)=>{
      if(prev === 'Light'){
        bodyElement.style.backgroundColor = 'blue';
        return 'Dark'
      }
      else{
        bodyElement.style.backgroundColor ='lightgray';
        return 'Light'
      }
    })
  }
  return (
    <div className={`App-${mode}`}>
      <div className='header-area'>
      <button className={`mode-${mode}`} onClick ={changeMode}></button>
     <HeaderFile mode = {mode}/>
      </div>
     <InputText mode = {mode}/>
    </div>
  );
}

export default App;
