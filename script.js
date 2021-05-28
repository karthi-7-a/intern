
function fetchData(category){

    fetch(category)
    .then(res=>res.json())
    .then(data=>{
          let div=createDomElement('div','row bg-secondary','maindiv')
        data.map((k)=>{
          
            let container=createDomElement('div','card ml-auto mr-auto col-lg-4')
            let coun=country(k['name'])
            let container1=createDomElement('div','card-header text-white bg-dark')
            let img=image(k['flag'])
            let cap=region(k['capital'])
            let reg=region(k['region'])
            let bod=createDomElement('div','card-body m-auto')
            let but=button(k['capital'])
            let coun_code=region(k['alpha3Code'])

            bod.append(img,cap,reg,coun_code,but)
            container1.append(coun)
            container.append(container1,bod)
            div.append(container)
            document.body.append(div)


        })
    })

}
let array=[];
let weather=(l)=>{
    fetch('https://api.openweathermap.org/data/2.5/weather?q='+l+'&appid=4cf7425d4bed8f5e5e9a5708c35b66d3')
    .then(res=>res.json())
    .then(data=>{
        array.push(l)
        for(let i=0;i<array.length;i++){
            if(document.getElementById(array[i])){
                document.getElementById(array[i]).style.display='none !important'
            }
        }
        
            if(!document.getElementById(l)){
           let div=createDomElement('div','card m-auto mini',data['name'])
           let divbody=createDomElement('div','card-body bg-light','body'+l)
           let nam=card_div('City Name',data['name'])
           let hum=card_div('Humidity',data['main']['humidity'])
           let temp=card_div('Temperature',data['main']['temp'])
           let temp_max=card_div('Maximum Temperature',data['main']['temp_max'])
           let temp_min=card_div('Minimum Temperature',data['main']['temp_min'])
           divbody.append(nam,hum,temp,temp_max,temp_min);
           let but1=buttonn(data['name'])
           let span1=span()
           but1.append(span1)
           div.append(but1,divbody)
           document.getElementById('maindiv').style.display='none'
           document.body.append(div)
            }else{
                document.getElementById(l).style.display='block'
              
               
                document.getElementById('maindiv').style.display='none'
            }


})
}

let span=()=>{
    let j=document.createElement('span')
    j.setAttribute('aria-hidden','true')
    j.innerHTML='&times;'
    return j;
}
let mute=(m)=>{
    
    document.getElementById(m).style.display='none'
    document.getElementById('maindiv').style.display='flex'

}
let buttonn=(m)=>{
    let k=document.createElement('button')
    k.setAttribute('type','button')
 
    k.style.float='right'
   k.style.width='10%'
   k.style.marginLeft='90%'
    k.className='close but'
 

    k.setAttribute('onclick',`mute("${m}")`)
   
    return k;
}

let card_div=(k,l)=>{
    let j=document.createElement('h3')
    j.innerHTML=`${k}:  ${l}`
    return j
}
let button=(m)=>{
    let j=document.createElement('button')
    j.className='btn btn-primary mr-auto'
    j.innerHTML='Click for Weather'
    j.setAttribute('onclick',`weather("${m}")`)
    j.style.marginLeft='30%'
    return j
}
let country=(m)=>{
    let j=document.createElement('h3')
    j.className='card-header text-center'
    j.innerHTML=m
    return j
}
let image=(m)=>{
    let j=document.createElement('img')
    j.setAttribute('src',`${m}`)
    j.style.maxWidth='100%'
    return j
}
let region=(m)=>{
    let j=document.createElement('h4')
    j.className='text-center'
    j.innerHTML=m;
    return j
}


    let v=fetchData('https://restcountries.eu/rest/v2/all')

let createDomElement=(element,cls,id='')=>{
    let j=document.createElement(element)
    j.className=cls;
    j.id=id;
    return j
}
