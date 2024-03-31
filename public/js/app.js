

console.log('hello world!!!');


const form = document.querySelector('form')
const search = document.querySelector('input')

const para1 = document.getElementById('para-1')
const para2 = document.getElementById('para-2')

form.addEventListener('submit',(e)=>{
    e.preventDefault();
    const location = search.value;
    
fetch(`http://localhost:3000/weather?address=${location}`).then((response) => {
    return  response.json();
}).then((data) => {
    if(!data.error){
        para1.textContent = data.forcast
        para2.textContent = data.address
    }
    else{
        para2.textContent = data.error
        para1.textContent = ''
    }
})
})