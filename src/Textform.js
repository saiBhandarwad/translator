import React, { useState } from 'react'


export default function Textform(props) {
    const [inputData, setInputData] = useState("")
        
    
    const undo=()=>{
        let moment=[...inputData]
        moment.pop();
        setInputData(moment.join(""))     
    }
    const convertToUppercase = (inputData) => {
        setInputData(inputData.toString().toUpperCase())
    }
    const convertToLowercase = (inputData) => {
        setInputData(inputData.toString().toLowerCase())
    }
        
    const capitalize= () => {
        const arr = inputData.toString().split(" ")
        for(let i=0; i<arr.length; i++){
            arr[i]=arr[i].charAt(0).toUpperCase() + arr[i].slice(1).toLowerCase()
        }
        setInputData(arr.join(" "))
    }
    const copyText = () =>{        
        navigator.clipboard.writeText(inputData);
    }
    const removeSpaces=()=>{
        const arr =inputData.toString().replace(/ +/g,' ')
        setInputData(arr)
    }
    const removeEnterSpaces= () =>{
        const arr =inputData.toString().replace(/(\r\n|\n|\r)/gm, "");
        setInputData(arr)
    }
    const convertToHindi = (inputData) => {

        fetch(`https://api.mymemory.translated.net/get?q=${inputData}&langpair=en|hi`)
            .then((response) => response.json())
            .then((response) => {
                let translate;
                console.log(response)

                // **********   using for loop and array methods  *************

                // let i;
                // let l=[]
                // let l1=[]
                // let l3=[]
                //     if(response.matches.length>1){
                //         for(i=0; i<response.matches.length; i++){
                //             if(response.matches[i].source=="en-GB"){
                //              console.log(`en-GB matched at ${i}`);

                //             l.push(response.matches[i].match)
                //             l3.push(response.matches[i].quality)
                //             l1.push(response.matches[i].translation)
                //             }                         

                //         }
                //     }else{
                //         l.push(response.matches[0].match)
                //         l3.push(response.matches[0].quality)
                //         l1.push(response.matches[0].translation)
                //     }

                //     // let largestMatch = l3.reduce((accum,curElem)=>{
                //     //     let max=accum>curElem?accum:curElem
                //     //     return max
                //     // })
                //     let largestMatch = l.reduce((accum,curElem)=>{
                //         let max=accum>curElem?accum:curElem
                //         return max
                //     })

                //        let largestMatchIndex=l.indexOf(largestMatch)
                //        setInputData(l1[largestMatchIndex])

                //        console.log(l1[largestMatchIndex])
                //        console.log(response.responseData.translatedText)


                // ************** using simple method  *************

                let i;
                for (i=0; i < response.matches.length; i++) {
                    // console.log(response.matches[i].segment);
                    // console.log(response.matches[i].reference);
                    if (response.matches[i].segment === inputData && response.matches[i].reference === "Machine Translation.") {
                        translate = response.matches[i].translation
                    }
                    else if (response.matches[i].segment === inputData || response.matches[i].reference === "Machine Translation.") {
                        translate = response.matches[i].translation
                    }else{
                        translate = response.responseData.translatedText
                    }
                }
                setInputData(translate)
            })

    }

    const convertToEnglish = (inputData) => {
        fetch(`https://api.mymemory.translated.net/get?q=${inputData}&langpair=hi|en`)
            .then((response) => response.json())
            .then((response) => {
                console.log(response)
                let translate = response.matches[0].translation
                setInputData(translate)
            })
    }
    const joinText = () =>{
        const arr =inputData.toString().replace(/(\r\n|\n|\r)/gm, "");
        const arr2 =arr.toString().replace(/ +/g,'')
        const arr3 =arr2.toString().replace(" ","")
        setInputData(arr3)
    }
    return (
        <>
        
            <div className="container">
                <div className=" my-3 ">
                    <label htmlFor="exampleFormControlTextarea1" className="form-label"><h3 class="text-white">{props.heading}</h3></label>
                    <textarea className="form-control border border-danger" id="exampleFormControlTextarea1" rows="10" value={inputData} onChange={(e) => setInputData(e.target.value)} placeholder="Enter Text Here ✍️"></textarea>
                </div>
                <div className="container text-center">
                <button className="btn btn-primary  mx-1 my-2 " onClick={() => convertToUppercase(inputData)}>To Uppercase</button>

                <button className="btn btn-primary  mx-1 my-2" onClick={() => convertToLowercase(inputData)}>To Lowercase</button>

                <button className="btn btn-primary  mx-1 my-2" onClick={() => capitalize()}>Capitalize</button>

                <button className="btn btn-primary  mx-1 my-2" onClick={() => setInputData("")}>Clear Text</button>

                <button className="btn btn-primary btn-primary mx-1 my-2" onClick={() => convertToHindi(inputData)}>To Hindi</button>

                <button className="btn btn-primary btn-primary mx-1 my-2" onClick={() => convertToEnglish(inputData)}>To English</button>

            
                <button className="btn btn-primary  mx-1 my-2" onClick={()=>removeSpaces()}>Remove Extra Spaces</button>

                <button className="btn btn-primary  mx-1 my-2" onClick={()=>undo()}>Undo</button>

                <button className="btn btn-primary  mx-1 my-2" onClick={()=>removeEnterSpaces()}>Remove All Spaces</button>

                <button className="btn btn-primary  mx-1 my-2" onClick={()=>copyText()}>Copy</button>

                <button className="btn btn-primary  mx-1 my-2" onClick={()=>joinText()}>Join Text</button>
                </div>
                
        
                
            </div>
        </>
    )
}
