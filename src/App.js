import './App.css';
import {getPrime} from './Prime.js';
import {useState} from 'react'; 
import {InfinitySpin} from 'react-loader-spinner';

function App() {
  return(
    <body className="App vertical-center">
    { NumberLable()}
    </body>
  );
}

function GenerateButton(func) {
    return(
        <button className = 'gen-button' onClick={func}>Generate</button>
    );
}


function NumberLable() {
    const [number, setNumber] = useState('');
    const [bits, setBits] = useState(512);
    const [isLoading, setIsLoading] = useState(false);

    // Used to get the prime number asd set loading
    const getNumber =  async () => {
          setIsLoading(true);
          const result = await getPrime(bits);
          setIsLoading(false);
          setNumber(result);
    }

return(     
        <div className='center-div'>
            <h1 className='title'> Prime Number Generator </h1>
            <div className='number-div' >
            {isLoading ? (<Loading />) : number}
            </div>

            {BitsButtons(setBits)}
            {GenerateButton(getNumber)}
        </div>
        );
}

function Loading(){
    return(
    <div className='loading-wrapper'>
        <InfinitySpin
          visible={true}
          width="200"
          color="#DFDEDF"
          ariaLabel="infinity-spin-loading"
          />
        </div>
        );
}

function BitsButtons(setBits){
    return(
    <div 
        onChange={() => 
            setBits(document.querySelector('input[name="bits"]:checked').value)}
        className = 'bit-selector'
        >
        <input type="radio" value='512' name="bits" /> 512
        <input type="radio" value='1024' name="bits" /> 1024 
        <input type="radio" value='2048' name="bits" /> 2048 
    </div>
    );
}


export default App;
