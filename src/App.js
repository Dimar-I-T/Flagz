import logo from './logo.svg';
import React, { useEffect, useState } from 'react';
import './App.css';
import {Register} from './semua';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import {useNavigate} from 'react-router-dom';
import {Navigate} from 'react-router-dom';
import axios from 'axios';

function Begin() {
  const navigate = useNavigate();

  axios.defaults.withCredentials = true;
  useEffect(() => {
    axios.get("https://flagz-game.vercel.app/api").then(result => {
      if (result.data === "Success"){
        navigate('/home');
      }
    })
  }, []);

  const navToReg = () => {
    navigate('/register');
  }

  const navToLog = () => {
    navigate('/login');
  }

  return (
    <div className="bg-cover bg-no-repeat bg-center bg-black w-screen h-screen">
          <div className="flex justify-center items-center w-full h-full">
            <div
              className="relative bg-[black] object-center aspect-[3/2] w-[60vw] max-w-[900px] max-h-[600px] flex flex-col items-center gap-6 rounded-[5vw] opacity-80 shadow"
            >
            <h1 className="font-bold text-[white] mt-[1.5vw] opacity-100 font-roboto text-[4vw]">
                Welcome to <span className="text-[#5c9dd6ff]">Flagz.</span>
            </h1>

            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center gap-[2vw]">
              <button
                onClick={navToReg}
                className="bg-[#5c9dd6ff] h-[4vw] w-[30vw] left-[40vw] top-[45vw] opacity-90 hover:opacity-100 rounded-[1vw] text-[white] font-roboto text-[2vw]"
              >
                SIGN UP
              </button>
              <button
                onClick={navToLog}
                className="bg-[#5c9dd6ff] h-[4vw] w-[30vw] left-[40vw] top-[50vw] opacity-90 hover:opacity-100 rounded-[1vw] text-[white] font-roboto text-[2vw]"
              >
                LOG IN
              </button>
            </div>
              </div>
            </div>
          </div>
  );
}

function Home() {
  const [answer, setAnswer] = useState("");
  const [valPass, setValuePass] = useState("");
  const [muncul, setMuncul] = useState(1);
  const [bisa, setBisa] = useState(2);
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const [main, setMain] = useState(0);
  const [arr, setArr] = useState([]);
  const [indeks, setIndeks] = useState(-1);
  const [dataF, setDataF] = useState([]);
  const [benar, setBenar] = useState(2);
  const [datac, setDatac] = useState("");
  const [loading, setLoading] = useState(0);
  const [bBenar, setBBenar] = useState(0);
  const [bSalah, setBSalah] = useState(0);
  const [stop, setStop] = useState(0);
  const [score, setScore] = useState(0);
  const [countryBenar, setCountryBenar] = useState("");
  const [banyak, setBanyak] = useState(0);
  
  axios.defaults.withCredentials = true;
  useEffect(() => {
    axios.get("https://flagz-game.vercel.app/api").then(result => {
      if (result.data !== "Success"){
        navigate('/');
      }
    })

    axios.get("https://flagz-game.vercel.app/api/home").then(result => {
      setData(result.data);
    })

    axios.get("https://flagz-game.vercel.app/api/f").then(result => {
      setDataF(result.data);
    })
  }, []);

  const play = () => {
    setLoading(1);
    setIndeks(indeks + 1);
    setMain(1);
    setTimeout(() => {
      setBenar(2);
      setLoading(0);
    }, 500);
  }

  const gkPlay = () => {
    axios.get("https://flagz-game.vercel.app/api/home").then(result => {
      setData(result.data);
    })

    setBenar(2);
    setMain(0);
    setStop(0);
  }

  const stopPlaying = () => {
    axios.post("https://flagz-game.vercel.app/api/home", {score: score});
    setBenar(2);
    setStop(1);
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    setBanyak(banyak + 1);
    if (banyak < 196){
      axios.post("https://flagz-game.vercel.app/api/cek", {answer, dataF: dataF[indeks].country}).then((response) => {
        if (response.data == "1"){
          setBenar(1);
          setBBenar(bBenar + 1);
          setScore(score + 50);
        }else{
          setBenar(0);
          setBSalah(bSalah + 1);
          setScore(score - 10);
          setCountryBenar(response.data);
        }
      });
    }else{
      setStop(1);
    }
  }

  const inpAnswer = event => {
    const newVal = event.target.value;
    setAnswer(newVal);
  }
  
  const lanjut = () => {
    setLoading(1);
    setAnswer("");
    setIndeks(indeks + 1);
    setTimeout(() => {
      setBenar(2);
      setLoading(0);
    }, 500);
  }

  // post f.country dan inputnya ke backend trus cek di sana sama atau tidak terus respon ke sini kalo sama ato tidak
  
  return (
    <div className="bg-cover bg-no-repeat bg-center bg-black w-screen h-screen">
      <div className="absolute inset-0 flex flex-col justify-center items-center bg-center bg-[black] opacity-90">
        {main == 0 && stop == 0 && <h1 className="font-roboto text-[white] text-left w-full pl-[22vw] text-[4vw] absolute top-[calc(50%-20vw)]"> Welcome,  
          <span className="text-[#5c9dd6ff]">
            &nbsp;{data?.username}!          
          </span> </h1>}
        
        {main == 0 && stop == 0 &&
         <div className="bg-[#aaaaaa] h-[20vw] w-[60vw] rounded-[5vw] absolute top-[calc(50%-12vw)] opacity-20 shadow">
          
         </div>}
        
        {main == 0 && stop == 0 && <button onClick = {play} className="bg-[#5c9dd6ff] font-bold text-[black] object-center text-[3vw] h-[7vw] w-[20vw] left-[40vw] absolute top-[calc(50%+11vw)] rounded-[2vw] opacity-70 hover:opacity-90 shadow">   
          PLAY
        </button>}

        {main == 0 && stop == 0 && <h1 className="font-roboto text-[#b7b7b7] text-[2vw] absolute top-[calc(50%-7vw)] left-[29.7vw]">  
          Top Score
        </h1>}
        
        {main == 0 && stop == 0 && <h1 className="font-roboto text-[#b7b7b7] text-[2vw] absolute top-[calc(50%-7vw)]">  
          Total Flags
        </h1>}
        
        {main == 0 && stop == 0 && <h1 className="font-roboto text-[#b7b7b7] absolute top-[calc(50%-7vw)] text-[2vw] left-[61.7vw]">  
          Total Plays
        </h1>}
        
        {main == 1 && stop == 0 && 
          <button onClick = {stopPlaying} className="group  bg-[#5c9dd6ff] font-bold text-[black] object-center text-[2vw] h-[18vw] w-[12vw] rounded-[2vw] opacity-70 hover:opacity-90 shadow absolute left-[78vw] top-[calc(50%-10vw)]">   
            STOP <br /> PLAYING
          </button>
        }

        {main == 1 && stop == 0 && 
          <h1 className="font-roboto text-[white] text-[4vw] transform absolute top-[calc(50%-22vw)]">
            What flag is this?
          </h1>
        }
      
        {main == 1 && stop == 0 && 
          <div className="bg-[#aaaaaa] object-center h-[25vw] w-[50vw] transform -translate-x-1/2 left-1/2 rounded-[5vw] opacity-20 shadow absolute top-[calc(50%-14vw)]"> </div>
        }

        {(main == 1 && stop == 0 && benar == 2) && 
          <form onSubmit={handleSubmit}>
            <input onChange = {inpAnswer} placeholder="Enter your answer here" value = {answer} class="placeholder-left-[25vw] placeholder-[white] bg-[#6c6c6c] opacity-50 w-[34vw] h-[5vw] px-[0.9vw] text-white rounded-[1vw] font-roboto text-[2vw] focus:outline-none absolute left-[25vw] top-[calc(50%+14vw)]"/>
            {benar == 2 && <button type="submit" class="group bg-[#5c9dd6ff] font-bold text-[black] object-center text-[2vw] w-[13vw] h-[5vw] rounded-[1vw] opacity-70 hover:opacity-90 shadow absolute left-[62vw] top-[calc(50%+14vw)]"> SUBMIT </button>}
          </form>
        }

        {loading == 1 && 
          <h1 className="font-roboto text-[3vw] text-[white] absolute top-[calc(50%-5vw)]">
            ...
          </h1>
        }

        {(benar == 0 && loading == 0) &&
          <h1 className="font-roboto text-center text-[red] text-[2vw] transform -translate-x-1/2 left-1/2 absolute top-[calc(50%-12.5vw)]">
            Wrong answer! It's {countryBenar} 
          </h1>
        }
        
        {(benar == 1 && loading == 0) &&
          <h1 className="font-roboto text-center text-[green] text-[2vw] transform -translate-x-1/2 left-1/2 absolute top-[calc(50%-12.5vw)]">
            Correct! 
          </h1>
        }

        {(benar == 1 || benar == 0) &&
          <button onClick = {lanjut} class="group bg-[#5c9dd6ff] font-bold text-[black] object-center text-[2vw] w-[13vw] h-[5vw] rounded-[1vw] opacity-70 hover:opacity-90 shadow absolute left-[62vw] top-[calc(50%+14vw)]"> NEXT </button> 
        }

        {stop == 1 &&
          <div className="bg-[#313131] h-[40vw] w-[38vw] transform -translate-x-1/2 left-1/2 rounded-[5vw] opacity-80 shadow absolute top-[calc(50%-20vw)]"></div>
        }
        
        {stop == 1 &&
          <h1 className="font-roboto text-[white] text-[4vw] transform -translate-x-1/2 left-1/2 absolute top-[calc(50%-19vw)]">
            Well Done!
          </h1>
        }

        {stop == 1 &&
          <button onClick = {gkPlay} className="group  bg-[#5c9dd6ff] font-bold text-[black] object-center text-[3vw] h-[6vw] w-[16vw] transform -translate-x-1/2 left-1/2 rounded-[2vw] opacity-70 hover:opacity-90 shadow absolute top-[calc(50%+11vw)]">   
            OK
          </button>
        }

        { stop == 1 &&
        <h1 className="font-roboto text-[#b7b7b7] transform -translate-x-1/2 left-1/2 text-[1.8vw] absolute top-[calc(50%-11.5vw)]">  
          Correct Answers
        </h1>}

        { stop == 1 &&
        <h1 className="text-center font-roboto text-[#5c9dd6ff] font-bold text-[3vw] transform -translate-x-1/2 left-1/2 absolute top-[calc(50%-9.5vw)]">  
          {bBenar}
        </h1>}

        { stop == 1 &&
        <h1 className="font-roboto text-[#b7b7b7] transform -translate-x-1/2 left-1/2 text-[1.8vw] absolute top-[calc(50%-4.8vw)]">  
          Wrong Answers
        </h1>}

        { stop == 1 &&
        <h1 className="text-center font-roboto text-[#5c9dd6ff] font-bold text-[3vw] transform -translate-x-1/2 left-1/2 absolute top-[calc(50%-2.8vw)]">  
          {bSalah}
        </h1>}

        { stop == 1 &&
        <h1 className="font-roboto text-[#b7b7b7] transform -translate-x-1/2 left-1/2 text-[1.8vw] absolute top-[calc(50%+1.9vw)]">  
          Score
        </h1>}

        { stop == 1 &&
        <h1 className="text-center font-roboto text-[#5c9dd6ff] font-bold text-[3vw] transform -translate-x-1/2 left-1/2 absolute top-[calc(50%+3.9vw)]">  
          {score}
        </h1>}

      </div>
      <div className="flex flex-col">
        {main == 0 && stop == 0 && <h1 className="font-roboto text-[#5c9dd6ff] font-bold text-[4vw] transform -translate-x-1/3 left-1/3 absolute top-[calc(50%-4.5vw)]">  
          {data?.top_score}
        </h1>}

        {main == 0 && stop == 0 && <h1 className="text-center font-roboto text-[#5c9dd6ff] font-bold text-[4vw] transform -translate-x-1/2 left-1/2 absolute top-[calc(50%-4.5vw)]">  
          {data?.total_flags}
        </h1>}

        {main == 0 && stop == 0 && <h1 className="font-roboto text-[#5c9dd6ff] font-bold text-[4vw] transform -translate-x-2/3 left-2/3 absolute top-[calc(50%-4.5vw)]">  
          {data?.total_plays}
        </h1>}
        
        {(main == 1 && stop == 0 && loading == 0) && 
          <img src={`https://www.worldometers.info/${dataF[indeks].flag}`} className="h-[14vw] w-[21vw] absolute left-[40vw] top-[calc(50%-8vw)]"></img>
        } 

      </div>
    </div>
  )
}

function Reg() {
  const [valUser, setValueUser] = useState("");
  const [valPass, setValuePass] = useState("");
  const [muncul, setMuncul] = useState(1);
  const [bisa, setBisa] = useState(2);
  const navigate = useNavigate();
  
  axios.defaults.withCredentials = true;
  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post("https://flagz-game.vercel.app/api/register", {valUser, valPass}).then((response) => {
      const resp = JSON.stringify(response.data.success, null, 2)
      if (resp == "true"){
        setBisa(1);
        navigate('/login');
      }else{
        setBisa(0);
      }
    }).catch((err) => {
      alert(err);
    });
  }
  
  const navToLog = () => {
    navigate('/login');
  }

  const changeUser = event => {
    const newVal = event.target.value;
    setValueUser(newVal);
  }
  
  const changePass = event => {
    const newVal = event.target.value;
    setValuePass(newVal);
  }
  
  const clickPass = () => {
    setMuncul(0);
  }
  
  return (
    <div className="bg-cover bg-no-repeat bg-center bg-black w-screen h-screen">
          <div className="flex justify-center items-center w-full h-full relative">
            <div
              className="relative bg-[black] object-center aspect-[3/2] w-[60vw] max-w-[900px] max-h-[600px] flex flex-col items-center gap-6 rounded-[5vw] opacity-80 shadow"
            >
              <h1 className="text-center font-bold object-top mt-[1.5vw] text-[white] opacity-100 font-roboto text-[4vw] z-10">
                Create Account
              </h1>

              <h1 className="object-top text-center mt-[25vw] text-[white] opacity-100 font-roboto text-[1.3vw] z-10">
                Already have an account? <button onClick = {navToLog} class=" bg transparent opacity-90 text-[#5c9dd6ff] hover:opacity-100"> Login </button>
              </h1>

              {bisa == 1 && <h1 className="absolute left-[14.5vw] top-[10vw] text-[green] opacity-100 font-roboto text-[1.5vw] z-10">
                Registered Successfully!
              </h1>}

              {bisa == 0 && <h1 className="absolute left-[14.5vw] top-[10vw] text-[red] opacity-100 font-roboto text-[1.5vw] z-10">
                Username already used!
              </h1>}

              <form onSubmit={handleSubmit}>
                <input onChange = {changeUser} placeholder="Enter your username" value = {valUser} class="absolute transform -translate-x-1/2 top-[13vw] w-[30vw] h-[3.5vw] px-[0.9vw] rounded-[1vw] font-roboto text-[2vw] focus:outline-none"/>
                <input onChange = {changePass} placeholder="Enter your password" value = {valPass} class="absolute transform -translate-x-1/2 top-[18vw] w-[30vw] h-[3.5vw] px-[0.9vw] rounded-[1vw] font-roboto text-[2vw] focus:outline-none"
                type="password"/>
                <button type="submit" class="absolute bg-[#5c9dd6ff] transform -translate-x-1/2 top-[23vw] w-[30vw] h-[3.5vw] opacity-90 hover:opacity-100 rounded-[1vw] text-[white] font-roboto text-[2vw]"> SIGN UP </button>
              </form>
            </div>
          </div>
        </div>
  )
}

function Login() {
  const [valUser, setValueUser] = useState("");
  const [valPass, setValuePass] = useState("");
  const [muncul, setMuncul] = useState(1);
  const [bisa, setBisa] = useState(3);
  const navigate = useNavigate();

  const navToReg = () => {
    navigate('/register');
  }

  axios.defaults.withCredentials = true;
  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post("https://flagz-game.vercel.app/api/login", {valUser, valPass}).then((response) => {
      const resp = JSON.stringify(response.data.success, null, 2)
      if (resp == "true"){
        setBisa(1);
        navigate('/home');
      }else {
        setBisa(0);
      }
    }).catch((err) => {
      alert(err);
    });
  }
  
  const changeUser = event => {
    const newVal = event.target.value;
    setValueUser(newVal);
  }
  
  const changePass = event => {
    const newVal = event.target.value;
    setValuePass(newVal);
  }
  
  const clickPass = () => {
    setMuncul(0);
  }
  
    return (
      <div className="bg-cover bg-no-repeat bg-center bg-black w-screen h-screen">
          <div className="flex justify-center items-center w-full h-full relative">
            <div
              className="relative bg-[black] object-center aspect-[3/2] w-[60vw] max-w-[900px] max-h-[600px] flex flex-col items-center gap-6 rounded-[5vw] opacity-80 shadow"
            >
              <h1 className="text-center font-bold object-top mt-[1.5vw] text-[white] opacity-100 font-roboto text-[4vw] z-10">
                Log In
              </h1>

              <h1 className="object-top text-center mt-[25vw] text-[white] opacity-100 font-roboto text-[1.3vw] z-10">
                Don't have an account? <button onClick = {navToReg} class=" bg transparent opacity-90 text-[#5c9dd6ff] hover:opacity-100"> Sign Up </button>
              </h1>

              {bisa == 1 && <h1 className="absolute left-[10vw] top-[10vw] text-[green] opacity-100 font-roboto text-[1.5vw] z-10">
                Logged in Successfully!
              </h1>}

              {bisa == 0 && <h1 className="absolute left-[10vw] top-[10vw] text-[red] opacity-100 font-roboto text-[1.5vw] z-10">
                Username or password is incorrect!
              </h1>}

              <form onSubmit={handleSubmit}>
                <input onChange = {changeUser} placeholder="Enter your username" value = {valUser} class="absolute transform -translate-x-1/2 top-[13vw] w-[30vw] h-[3.5vw] px-[0.9vw] rounded-[1vw] font-roboto text-[2vw] focus:outline-none"/>
                <input onChange = {changePass} placeholder="Enter your password" value = {valPass} class="absolute transform -translate-x-1/2 top-[18vw] w-[30vw] h-[3.5vw] px-[0.9vw] rounded-[1vw] font-roboto text-[2vw] focus:outline-none"
                type="password"/>
                <button type="submit" class="absolute bg-[#5c9dd6ff] transform -translate-x-1/2 top-[23vw] w-[30vw] h-[3.5vw] opacity-90 hover:opacity-100 rounded-[1vw] text-[white] font-roboto text-[2vw]"> LOG IN </button>
              </form>
            </div>
          </div>
        </div>
    )
}

function App() {
  
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/register' element={
          <Reg />
        }>
        </Route>

        <Route path='/' element={
          <Begin />} />

        <Route path='/login' element={<Login />} ></Route>
        <Route path='/home' element={<Home />}>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
