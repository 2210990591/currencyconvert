const BASE_URL = "https://api.vatcomply.com/rates?base=";
// accessing select from html page...
const dropdown=document.querySelectorAll(".together select");
const btn=document.querySelector(".button");
const fromcurr=document.querySelector(".from select");
const tocurr=document.querySelector(".to select");


// access the countrylist..
for(let select of dropdown)
{
    for(let code in countryList)
        {
            let newop=document.createElement("option");
            newop.innerText=code;
            newop.value=code;
            
            if(select.name==="from" && code==="USD")
            {
                newop.selected="selected";
            }
            else if(select.name==="to" && code==="INR")
            {
                newop.selected="selected";
            }
            select.append(newop);
        }
        select.addEventListener("change",(evt)=>{
            updateflag(evt.target);
        });

}

const updateflag=(element)=>{
    let code=element.value;
    let countrycode=countryList[code];
    let newsrc=`https://flagsapi.com/${countrycode}/flat/64.png`;
    let image=element.parentElement.querySelector("img");
    image.src=newsrc;


};

// value updation...
btn.addEventListener("click",async(evt)=>{
    evt.preventDefault();
    let amount=document.querySelector(".amount input");
    let amtval=amount.value;
    if(amtval==="" || amtval<1)
    {
        amtval=1;
        amount.value="1";
    }
    console.log(fromcurr.value, tocurr.value);
const URL=`${BASE_URL}${fromcurr.value}`;
let response=await fetch(URL);
let data=await response.json();
let rate=data.rates[tocurr.value];
let finalamount=amtval*rate;
btn.innerText=finalamount;
document.querySelector(".result").innerText = `${amtval} ${fromcurr.value} = ${finalamount.toFixed(2)} ${tocurr.value}`;


console.log(rate);
});






