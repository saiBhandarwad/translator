import React ,{ useEffect, useState} from 'react'
import countries from './coutries';
import convert from './images/transfer.png'
import del from './images/delete.png'
import copy from './images/copy.png'

export default function Translator() {
  
    const [inputText,setInputText]=useState("")
    const [translation,setTranslation]=useState("")
    var selectTag=document.querySelectorAll("select")
    let textareastyle={border:"none",resize:"none",outline:"none"}
    let pointer={cursor:'pointer'}
    
        

    useEffect(()=>{
        var selectTag=document.querySelectorAll("select")
        selectTag.forEach((tag,index)=>{
            for(let country_code in countries){
                let selected;
                if(index===0 && country_code==='en-GB'){
                    selected='selected'
                }
                else if(index===1 && country_code==='hi-IN'){
                    selected='selected'
                }
                let option =`<option value=${country_code} ${selected}>${countries[country_code]}</option>`
                tag.insertAdjacentHTML("beforeend",option)
            } 
        })
        
    },[])
    useEffect(()=>{
        var selectTag=document.querySelectorAll("select")
        selectTag.forEach((tag)=>{
            for(let country_code in countries){
                let option =`<option value=${country_code} >${countries[country_code]}</option>`
                tag.insertAdjacentHTML("beforeend",option)
            } 
        })
        handleclick(inputText,selectTag[0].value,selectTag[1].value)
        console.log(inputText)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[inputText])
    
    
    const handleclick = (inputText,selectTag0,selectTag1) =>{
            
            if( inputText===undefined || inputText===null){
                let style="position:absolute;top:5%;background-color:#c92b1c;color:white;border-radius:2px 2px 2px 2px;padding:10px;font-size:20px;height:100px; width:500px"
                tempAlert("you didn't enter text",1000,style,'alertId')
            }  
            else if(inputText.length>500){
                let style="position:absolute;top:5%;background-color:#c92b1c;color:white;border-radius:2px 2px 2px 2px;padding:10px;font-size:20px;height:100px; width:500px"
                tempAlert("You should enter characters less than 500",1500,style,'alertId')
            }else{ 

            // let translateFrom=selectTag[0].value
            // let translateTo=selectTag[1].value
            let translateFrom=selectTag0
            let translateTo=selectTag1
            let url=`https://api.mymemory.translated.net/get?q=${inputText}&langpair=${translateFrom}|${translateTo}`
            console.log(url);

            fetch(url)
            .then((response) => response.json())
            .then((response) => {
                let translate;
                console.log(response)
                let i;
                for (i=0; i < response.matches.length; i++) {
                    // console.log(response.matches[i].segment);
                    // console.log(response.matches[i].reference);
                    if (response.matches[i].segment === inputText && response.matches[i].reference === "Machine Translation.") {
                        translate = response.matches[i].translation
                    }
                    else if (response.matches[i].segment === inputText || response.matches[i].reference === "Machine Translation.") {
                        translate = response.matches[i].translation
                    }else{
                        translate = response.responseData.translatedText
                    }
                }
                
                setTranslation(translate)
                
    })
                    
}
}
    const exchange = () =>{
        let translateFrom=selectTag[0].value
        let translateTo=selectTag[1].value
        selectTag[0].value=translateTo
        selectTag[1].value=translateFrom
        let t=translation
        // let i=inputText
        setInputText(t)
        // setTranslation(i)
        handleclick(t)     
    }
    const tempAlert = (msg,duration,style,id) =>{
        var element = document.createElement("div");
        element.setAttribute("style",style);
        element.innerHTML = msg;
        document.getElementById(id).appendChild(element);
        setTimeout(function(){
           element.parentNode.removeChild(element);
        },duration);
    }
    const copyTranslation = () =>{
        navigator.clipboard.writeText(translation)
        let style="background-color:black;color:white;border-radius:8px 8px 0px 8px;padding:10px;position:absolute;bottom:15%;right:5%;font-size:12px"
        tempAlert("copied!",1000,style,"translationId")
    }
    const copyInputText = () =>{
        navigator.clipboard.writeText(inputText)
        let style="background-color:black;color:white;border-radius:8px 8px 0px 8px;padding:10px;position:absolute;bottom:15%;right:5%;font-size:12px"
        tempAlert("copied!",1000,style,'inputTextId')
    }
    return (
        <>
            
            {/**/}
            <div className='d-flex justify-content-center text-center'  id="alertId"></div>
            <div className="container bg-dark p-3 mt-5" id='marginOfTranslator'>
                <div className="row row-cols-1 row-cols-md-3 my-3 text-center ">
                    <div className="col ">
                        <div className="card my-3 rounded-3 shadow-sm">

                           <textarea className="p-1 rounded-3" cols="30" rows="5" placeholder='Enter Text Here...✍️' id='inputText' value={inputText} onChange={(e)=>setInputText(e.target.value)} style={textareastyle}></textarea>
                           <div className="d-flex justify-content-end p-1" id="inputTextId">
                           <img className="mx-1"  src={del} alt="delete" height={"20px"} width={"20px"} onClick={()=>setInputText("")} style={pointer} />
                           <img className="mx-1" src={copy} alt="copy" height={"20px"} width={"20px"} onClick={()=>copyInputText()} style={pointer} />
                           </div>
                           
                        </div>
                    </div>
                    {/**/}
                    <div className="container my-3 d-flex align-items-center">

                        <div className="card-body my-2">
                            <select className="form-select" aria-label="Default select example">
                                 
                            </select>

                        </div>
                        <div className="rounded-3  mx-3 p-2 ">
                        <img src={convert} alt="convert" srcset="" height={"40px"} style={pointer} onClick={()=>exchange()}/></div>
                        <div className="card-body my-2 ">
                            <select className="form-select" aria-label="Default select example ">
                                 
                            </select>

                        </div>
                    </div>
                    {/**/}
 
                    {/**/}
                    <div className="col">
                        <div className="card my-3 rounded-3 shadow-sm">

                            
                               <textarea className="p-1 rounded-3" cols="30" rows="5" placeholder='Translation.....' value={translation} style={textareastyle}></textarea>
                               <div className="d-flex justify-content-end p-1" id="translationId">
                               <img className="mx-1"  src={del} alt="delete" height={"20px"} width={"20px"} onClick={()=>setTranslation("")} style={pointer} />
                               <img className="" src={copy} alt="copy" height={"20px"} width={"20px"} onClick={()=>copyTranslation()} style={pointer} />
                               </div> 
                        </div>
                    </div>
                </div>
                <div className="d-flex justify-content-center">
                    <button className="btn btn-primary text-white text-center" id='translateBtn' onClick={()=>handleclick(inputText)}>Translate Text</button>
                </div>
                
            </div>
            
            
        </>
    )
}
