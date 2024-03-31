const path = require('path')
const hbs = require('hbs')
const express = require('express')
const request = require('request')
const forcast = require('./utils/forcast')

const app = express();

const viewPath = path.join(__dirname,'../templates/views')

const partialsPath = path.join(__dirname,'../templates/partials')


app.use(express.static(path.join(__dirname,'../public')))
app.set('views',viewPath)

hbs.registerPartials(partialsPath)

app.set('view engine','hbs')
app.get('',(req,res)=>{
    res.render('index',{
        title:'weather app',
        name:"Mohit parashar"
    });
})

app.get('/about',(req,res) => {
    res.render('about',{
        title:'about page',
        name:'Mohit Parashar'
    })
})

app.get('/product', (req,res) => {
    console.log(req.query);
    res.send({
        products: []
    })
})

app.get('/help', (req,res) => {
    res.render('help', {
        title:'Help page',
        name:'Mohit Parashar'
    })
})

app.get('/weather',(req,res) => {
    const city = req.query.address
    if(!city){
        return res.send({
            error: 'please provide address to fecth data'
        })
    } else{
        forcast(city,(error,data) => {
            if(!data) {
               return res.send({
                    error:error
                })
            }
            res.send({
                forcast: data,
                location: 'hisar',
                address:req.query.address
            });
        })
    }
   
})

app.get('/help/*', (req,res) => {
    res.render('error',{
        msg: `The help article not found`,
        title:'404',
        name:'Mohit'
    })
})

app.get('*',(req,res) =>{
    res.render('error',{
        msg:'Page not found!',
        title:'404',
        name:'Mohit'
    })
})

app.listen(3000,() =>{
    console.log('server is running');
})

