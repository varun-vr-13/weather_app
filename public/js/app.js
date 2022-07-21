console.log('loaded file');
/*
fetch('https://puzzle.mead.io/puzzle').then(response=>{
    response.json().then(data=>{
        console.log(data)
    })
})
*/



const weatherform=document.querySelector('form');
const search=document.querySelector('input');

weatherform.addEventListener('submit',(e)=>{
    e.preventDefault();
    console.log('testing')
    const location=search.value;
    const area=document.getElementById('predict');
        const p1=document.createElement('p');
        const p2=document.createElement('p');
      
        area.innerHTML='Loading...';
    
    fetch('http://localhost:3000/weather?address='+location).then(response=>{
    response.json().then((data)=>{
        area.innerHTML='';
        if(data.error){
            console.log(data.error);
            
            p1.textContent =`${data.error} `
            
            p2.textContent=``;
        }
        else{
            console.log(data.location);
            
            p1.textContent =`location : ${data.location} `
            
            p2.textContent=`Prediction : ${data.forecast} `
            

            console.log(data.forecast);
        }
        area.appendChild(p1);
        area.appendChild(p2);
    })
})

})