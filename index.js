const { urlencoded } = require("body-parser");
const express=require("express");
const path = require("path")
const app=express();
const cookieParser = require("cookie-parser");
const sessions = require('express-session');
const alert=require("alert");

let meg="";

// app.use(express.static())

app.use(urlencoded({extended: true}));

app.set("view-engine","ejs");
app.use(express.static('public'));
app.set("views",(path.join(__dirname,'/views')));

app.use(sessions({
    secret: "thisismysecrctekeyfhrgfgrfrty84fwir767",
    saveUninitialized:true,
    cookie: { maxAge: 600000 },
    resave: false
}));
app.use(cookieParser());

app.use(function(req, res, next) { 
    res.set(
        'Cache-Control','no-cache, private, no-store, must-revalidate,max-stale=0, post-check=0, pre-check=0');
     next();
   });

app.get("/",(req,res)=>{
    if(req.session.name){
        res.redirect('/home');
    }else{
        console.log(meg);
        let message="Invalid username or password";
       
        res.render('index.ejs',{meg});
        meg="";
    }
})

app.get('/logout',(req,res)=>{
    req.session.destroy();
    res.redirect("/");
})


app.get("/home",(req,res)=>{
    const blogs=[
        {
            text:"MAHINDRA XUV3OO is powered by a 1.2-litre 3-cylinder petrol engine and a 1.5-litre 4-cylinder diesel engine with 6-speed manual transmission. A 6-speed automatic variant is also now available. The new petrol engine co-developed by Ssangyong delivers 110 hp (82 kW; 112 PS) of power and 200 N⋅m (148 lb⋅ft; 20 kg⋅m) of torque.",
            link:"xuv300.webp",

        },
        {
            text:"MAHINDRA XUV5OO is a compact crossover SUV produced by the Indian automobile manufacturer Mahindra & Mahindra. The XUV500 was designed and developed at Mahindra's design and vehicle build center in Nashik and Chennai and is manufactured in Mahindra's Chakan & Nashik plant, India. During its development, the car was code-named 'W201'.",
            link:"xuv500.jpg",

        },
        {
            text:"MAHINDRA XUV7OO is available in two series, which are MX and AdrenoX (AX). The MX series has a single MX trim, while the AdrenoX series consists of four trim levels, which are AX3, AX5, AX7 and AX7L. The AdrenoX series is equipped with the eponymous AdrenoX, an Amazon Alexa-based voice command.",
            link:"xuv700.jpg",

        }
    ]
    let session=req.session.name;
    if(session){
            res.render('cards.ejs',{blogs})
    }else{
        res.redirect('/');
    }
    
    
})

app.get("/table",(req,res)=>{
    const cars=[
        {
           no:"1",
           model:"XUV3OO",
           ed: "1497",
           mp:"115.05bhp@3750rpm",
           mt:"300Nm@1500-2500rpm",
           ftc:"42.0"
        },
        {
            no:"2",
            model:"XUV5OO",
            ed: "2179",
            mp:"152.87bhp@3750rpm",
            mt:"360Nm@1750-2800rpm",
            ftc:"70.0"
         },
         {
            no:"3",
            model:"XUV7OO",
            ed: "2198",
            mp:"182.38bhp@3500rpm",
            mt:"450Nm@1750-2800rpm",
            ftc:"60.0"
         }
    ]
    let session=req.session.name;
    if(session){
            res.render('table.ejs',{cars})
    }else{
        res.redirect('/');
    }

})

app.get('/lists',(req,res)=>{

    const accs=[{
        item1:"AUTOFACT Magnetic Window Sun Shades",
        item2:"Compatible Chromeline Silverline Door Visor Wind Deflector",
        item3:"Exterior Chrome Accessories Combo Kit",
        item4:"Auto Hub EVA-PVC 3D / 4D Car Floor Mats",
        item5:"WolkomHome Mud Flap",
        item6:"VELLON 6X6 PVC Coated 100% Waterproof Car Body Cover ",
        item7:"WheelCore Exterior Chrome Accessories Combo Kit",
        item8:"WolkomHome Car Accessories Chrome Door Handle Cover",
        item9:"3D FRONTLINE PU Leather Car Seat Cover",
        item10:"Kozdiko 3.1 Amp DualUsb Car Charger with 1 Micro USB Cable",
        item11:"WISKA® 4Pcs Car Door Silicone Rubber Edge Corner Bumper Guard Scratch Protector",
        item12:"PegasusPremium PU Leatherite Car Trunk/Boot/Dicky Mat",
        item13:"Vahan Expo 7D Mat for XUV 300 Car Floor Mat",
        item14:"AUGEN Car Retractable Windshield Sun Shade, Large Sunshade Protector",
        item15:"CONTACTS Genuine Leather Car Remote Key Case ",

    
    }]
    let session=req.session.name;
    if(session){
        res.render("lists.ejs",{accs});
    }else{
        res.redirect("/");
    }

})



const EmailID="mishab@gmail.com"
const passwordDB="1234"


app.post("/loginpost",(req,res)=>{
    const {Email,password} =req.body;
    if(Email===EmailID && password===passwordDB){
        req.session.name=Email;
        res.redirect('/home')
    }else{
        meg="invalid user"
        res.redirect('/');
    
        
     
    }
    
})
app.listen(3000);