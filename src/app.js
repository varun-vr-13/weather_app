const express=require('express');
const path=require('path');
const loc=path.join(__dirname,'../public')
const temppath=path.join(__dirname,'../templates/views')
const partpath=path.join(__dirname,'../templates/partials')
const app=express();
const hbs=require('hbs');
const geocode=require('../geocode');
const forecast=require('../forecast')

console.log(loc);
app.use(express.static(loc));


app.set('view engine','hbs');
app.set('views',temppath);
hbs.registerPartials(partpath);

app.get('',(req,res)=>{
    res.render('index',{
        'title':'Weather App',
        'name':'Varun'
    });
})

app.get('/help',(req,res)=>{
   /* res.send([{
        name:'Varun'
    },{
        name:"Priya"
    }]);*/
  //  res.sendFile(path.join(loc,'help.html'));
  res.render('help',{
    'title':'Help Desk',
    'name':'Varun'
  })
})

app.get('/about',(req,res)=>{
    res.render('about',{
        'title':'About page',
        'name':'Varun',
        'des':'This page gives information about the content creator'
    })
})
app.get('/weather',(req,res)=>{
    if(!req.query.address){
        return res.send({
            error:'error please enter address value'
        })
    }
    console.log(req.query.address);
    geocode(req.query.address, (error, {latitude,longitude,location}={}) => {
        if (error) {
          return console.log(error);
        }

        forecast(latitude, longitude, (error, forecastdata) => {
          if (error) {
            return console.log(error);
          }
          res.send({
            
            location:location,
            forecast:forecastdata
           
        })
          console.log(location)
          console.log(forecastdata)
        })
      })
   
})


app.get('/products',(req,res)=>{
    if(!req.query.search){
        return res.send({
            error:'error please enter search value'
        })
    }
    console.log(req.query.search);
    res.send({
        products:[]
    })
})
app.get('/help/*',(req,res)=>{
    res.render('404',{
        'title':'404 page',
        'name':'Varun',
        'errorMessage':'Article not found'
    })
})
app.get('*',(req,res)=>{
    res.render('404',{
        'title':'404 page',
        'name':'Varun',
        'errorMessage':'Page not found'
    })
})

console.log(path.join(__dirname,'about.html'));
app.listen(3000,()=>{
    console.log("connected on port 3000");
});