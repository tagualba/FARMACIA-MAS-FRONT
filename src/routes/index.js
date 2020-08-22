const express = require('express');
const router = express.Router();
const nodemailer = require('nodemailer');

router.get('/', (req, res) => {
  res.render('index', { title: 'First Web Node' });
});



  router.post('/tran', async(req,res)=>{
    const{nombre,correo,asunto,tipo,mensaje} = req.body;
    var color;
    if(tipo=="consulta")
    {
      color="#85D414";
    }
    else if(tipo=="reclamo")
    {
      color="#D41414";
    }
    else
      color="#E5E1E4";
    //CUERPO HTML CORREO
    contentHTML = `
      <h1 >${tipo}</h1>
      <ul>
        <li>Nombre:${nombre}</li>
        <li>Correo:${correo}</li>
        <li>Asunto:${asunto}</li>
      </ul>
      <h2>Mensaje:${mensaje}</h2>   
    `;
    //CUERPO HTML CORREO
  
    const transporter = nodemailer.createTransport({
      host:'mail.bitconsulting.com.ar',
      port:465,
      secure:true,
      auth:{
        user:'info@bitconsulting.com.ar',
        pass:'pw0=9e[-=%CA'
      },
      tls:{
        rejectUnauthorized: false
      }
    });
   
    emailList = ["tomialba16@gmail.com","tomas_alba_1999@hotmail.com"]
    //COPIAR:MODIFICAR EL TO:PARA RECIBIR EL CORREO EN OTRO 
    const info  = await transporter.sendMail({
      from: tipo+" 'Bit Consulting Web' <info@bitconsulting.com.ar> ",
      to:emailList,
      subject:'Mensaje de web:',
      html:contentHTML
    });
    //COPIAR:MODIFICAR EL TO:PARA RECIBIR EL CORREO EN OTRO 
    console.log(info.messageId);
    res.redirect('/resources/succes.html')
  }
    )

module.exports = router;