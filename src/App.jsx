import { useState,useCallback,useEffect,useRef } from 'react'

import './App.css'

function App() {
  const [length,setLength]=useState(8)
  const [number,setNumber]=useState(false)
  const [character,setCharacter]=useState(false)
  const [password,setPassword]=useState("")
  const passRef=useRef(null)
  const passwordGenerator = useCallback(() => {
    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    if (number) str += "0123456789";
    if (character) str += "!@#$%&*";
  
    for (let i = 0; i < length; i++) {
      let char = Math.floor(Math.random() * str.length);
      pass = pass + str.charAt(char);
    }
  
    setPassword(pass);
  }, [length, number, character, setPassword]);
  
  
  const copyPasswordToClipBoard = useCallback(() => {
    passRef.current?.select();
    const copy = passRef.current?.value;
    window.navigator.clipboard.writeText(copy);
    if (copy) alert(`${copy} Copy to Clipboard`);
  }, []);
  
  useEffect(()=>{
    passwordGenerator()
  },[length,number,character,passwordGenerator])

  return (
   
   <div className=' w-full max-w-md px-4 py-3 my-8 mx-auto shadow-lg text-orange-500 bg-black rounded-lg'>
      <h1 className=' text-white text-center my-3 text-2xl'>Password</h1>
      <div className='flex shadow-md rounded-2xl overflow-hidden mb-4 justify-center'>
        <input type="text" 
        value={password}
        className='w-full py-2 px-3 outline-none text-black'
        placeholder='Password'
        readOnly
        ref={passRef}
        />
        <button
        onClick={copyPasswordToClipBoard}
        className=' bg-blue-800 px-3 text-white outline-none py-0.5 shrink-0'
        >COPY</button>
      </div>
      <div className='flex text-sm gap-x-3'>
          <div className='flex item-center gap-x-1'>
            <input
             type="range"
             min={6}
             max={20}
             value={length}
             className=' cursor-pointer'
             onChange={(e)=>{setLength(e.target.value)}}
             />
             <label className='text-sm'>Length: {length}</label>
          </div>
          <div className='flex item-center gap-x-1'>
            <input 
            type="checkbox"
            defaultChecked={number}
            id='numberInput'
           onChange={()=>{
            setNumber((prev)=>!prev)
           }}
            />
            <label htmlFor="">Number</label>
          </div>
          <div className='flex item-center gap-x-1'>
            <input 
            type="checkbox"
            defaultChecked={character}
            id='characterInput'
           onChange={()=>{
            setCharacter((prev)=>!prev)
           }}
            />
            <label htmlFor="">Character</label>
          </div>
      </div>
   </div>
  
  )
}

export default App
