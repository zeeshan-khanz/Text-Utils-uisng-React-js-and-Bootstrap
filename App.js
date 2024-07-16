import './App.css'
import Navbar from './components/Navbar';
import TextForm from './components/TextForm';

function App() {
  return (
    <>
      
      <Navbar title="TextUTILS"/>
     <div className='container my-3' > <TextForm heading="Enter Text here to analyze"/></div> 
    </>

  );
  
}

export default App;