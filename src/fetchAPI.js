import React, { useState } from "react";
import axios from "axios";
import { Spinner } from "react-bootstrap";

function ProductData() {
    const [input , setInput] = useState("")
    const url = `https://pokeapi.co/api/v2/pokemon/${input}`
    const [product , setProduct] = useState(null)
    const [notFound, setNotFound] = useState("")
    const [tryElse, setTryElse] = useState("")
    const [inputText, setInputText] = useState("")
    const [loading, setLoading] = useState(false)
    
    const fetchUrl = async () => {
        document.querySelector("input").focus()
        if(input !== "")  
        {
            setInputText(input)
            setProduct(null)
            setInput("")
            setLoading(true)
            await axios.get(url)
                .then(response => {
                    setProduct(response.data)
                })
                .catch(()=>{
                    setNotFound("No Such Pokemon Found")
                    setTryElse("Try something like Pikachu or Squirtle")
                })
            setLoading(false)
            if(window.innerWidth < 700)
            {
                document.querySelector("input").blur()
            }
        }
        else
        {
            setInputText("")
            setNotFound("Please Enter Pokemon Name")
            setTryElse("Try something like Pikachu or Squirtle")
        }
    }


    const EnterKeyHandler = async (e) => {
        if(e.key === 'Enter')
        {
            if(input !== "")  
            {
                setInputText(input)
                setProduct(null)
                setInput("")
                setLoading(true)
                await axios.get(url)
                    .then(response => {
                        setProduct(response.data)
                    })
                    .catch(()=>{
                        setNotFound("No Such Pokemon Found")
                        setTryElse("Try something like Pikachu or Squirtle")
                    })
                setLoading(false)
                if(window.innerWidth < 700)
                {
                    document.querySelector("input").blur()
                }
            }
            else
            {
                
                setInputText("")
                setNotFound("Please Enter Pokemon Name")
                setTryElse("Try something like Pikachu or Squirtle")
            }
        }
    }

    return(
        <>
            <div className="flex justify-center mt-10">
                <input autoFocus className="outline-none rounded-l shadow py-2 px-3 bg-blue-100 w-56" value={input} onChange={(e)=>setInput(e.target.value.toLowerCase())} onKeyPress={EnterKeyHandler} placeholder="Search by Pokemon Name"></input>  
                <button className="bg-blue-500 text-white font-bold py-2 px-6 rounded-r shadow border-blue-500 hover:bg-transparent transition-all duration-300" onClick={fetchUrl}><i className="fas fa-search"/></button>
            </div>
            {
                loading ?
                <div className="flex justify-center mt-5">
                    <Spinner animation="border" variant="light" />
                </div>
                :
                product ?
                <div className="flex flex-col items-center rounded shadow mt-10 bg-gray-100 w-3/4 md:w-1/3 lg:w-1/4 mx-auto">
                    <div>
                        <img className="cursor-pointer w-40" src={product.sprites.front_default} alt="pokemon"/>
                    </div>
                    <p className="uppercase font-bold text-2xl text-gray-700">{product.species.name}</p>

                    <div className="flex mt-5">
                        <p className="text-xl uppercase">Type: &nbsp;</p>
                        <p className="text-xl uppercase font-bold text-gray-500">{product.types[0].type.name}</p>
                    </div>

                    <div className="flex mt-2">
                        <p className="text-xl uppercase">Hp: &nbsp;</p>
                        <p className="text-xl uppercase font-bold">{product.stats[0].base_stat}</p>
                    </div>

                    <div className="flex mt-2">
                        <p className="text-xl uppercase text-red-400">Attack: &nbsp;</p>
                        <p className="text-xl uppercase font-bold text-red-600">{product.stats[1].base_stat}</p>
                    </div>

                    <div className="flex mt-2">
                        <p className="text-xl uppercase text-green-500">Defence: &nbsp;</p>
                        <p className="text-xl uppercase font-bold text-green-700">{product.stats[2].base_stat}</p>
                    </div>

                    <div className="flex mt-2">
                        <p className="text-xl uppercase text-yellow-500">Speed: &nbsp;</p>
                        <p className="text-xl uppercase font-bold text-yellow-600">{product.stats[5].base_stat}</p>
                    </div>

                    <div className="flex mt-2 mb-10">
                        <p className="text-xl uppercase text-blue-400">Experience: &nbsp;</p>
                        <p className="text-xl uppercase font-bold text-blue-500">{product.base_experience}</p>
                    </div>
                </div>
                :
                <div className="flex flex-col items-center mt-10">
                    <p className="text-red-400 uppercase font-bold">{inputText !== "" ? <i className="fas fa-exclamation-circle text-red-600"/> : notFound === "Please Enter Pokemon Name" ? <i className="fas fa-exclamation-triangle text-yellow-400"></i> : null }&nbsp;{inputText}</p>
                    <p className="text-red-600 uppercase font-bold">{notFound}</p>&nbsp;
                    <p className="text-gray-100 uppercase -mt-5">{tryElse}</p>             
                </div> 
            }
        </>
    )
}


export default ProductData;




 



