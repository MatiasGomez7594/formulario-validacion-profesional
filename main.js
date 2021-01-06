//expresiones regulares

const expresiones = {
    usuario: /^[a-zA-Z0-9\_\-]{3,30}$/,//letras, nros guion y guion bajo
    nombre: /^[a-zA-ZÁ-ÿ\s]{2,40}$/, //letras y letras con acentos
    password:/^.{8,20}$/,//DE 8 A 20 digitos
    correo:/^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
    telefono:/^\d{8,10}$///de 8 a 10 nros

}
const campos = {
    usuario:false,
    nombre:false,
    contrasena:false,
    correo:false,
    telefono:false

}

//asi accedo al formulario 

const formulario = document.getElementById("formulario");
//aca selecciono a todos los inputs por el id del formulario
const input = document.querySelectorAll("#formulario input"); 

const validarFormulario = (e) =>{
    //para acceder a cada uno de los inputs utilizando el name
    switch(e.target.name){

        case "usuario":
            validarCampo(expresiones.usuario,e.target,'usuario');    
        break;

        case "nombre":
            validarCampo(expresiones.nombre,e.target,'nombre');  
        break;

        case "contrasena":
            validarCampo(expresiones.password,e.target,'contrasena');  
            validarContrasena2();
        break;

        case "contrasena2":
            validarContrasena2(); 
        break;

        case "correo":
            validarCampo(expresiones.correo,e.target,'correo');  
        break;

        case "telefono":
            validarCampo(expresiones.telefono,e.target,'telefono');  
        break;
    }

}
const validarCampo = (expresion,input,campo) =>{
    if(expresion.test(input.value)){
        document.getElementById(`grupo__${campo}`).classList.remove('formulario__grupo-incorrecto');
        document.getElementById(`grupo__${campo}`).classList.add('formulario__grupo-correcto');
        //asi cambio el icono del input cuando es correcto
        document.querySelector(`#grupo__${campo} i`).classList.add('fa-check-circle');
        document.querySelector(`#grupo__${campo} i`).classList.remove('fa-times-circle');
        document.querySelector(`#grupo__${campo} .formulario__input-error`).classList.remove('formulario__input-error-activo')
        //valido que el campo sea correcto para poder enviar el formulario
        campos[campo]=true;
      

    }

        else{
            document.getElementById(`grupo__${campo}`).classList.remove('formulario__grupo-correcto');
            document.querySelector(`#grupo__${campo} i`).classList.remove('fa-check-circle');
            document.getElementById(`grupo__${campo}`).classList.add('formulario__grupo-incorrecto');
            document.querySelector(`#grupo__${campo} i`).classList.add('fa-times-circle');
            document.querySelector(`#grupo__${campo} .formulario__input-error`).classList.add('formulario__input-error-activo')
            campos[campo]=false;
        }

}

//funcion que valida que las contraseña sean iguales
const validarContrasena2= () =>{
    const contrasena1 = document.getElementById('contrasena');
    const contrasena2 = document.getElementById('contrasena2');

    if(contrasena1.value !== contrasena2.value){
        document.getElementById(`grupo__contrasena2`).classList.remove('formulario__grupo-correcto');
        document.querySelector(`#grupo__contrasena2 i`).classList.remove('fa-check-circle');
        document.getElementById(`grupo__contrasena2`).classList.add('formulario__grupo-incorrecto');
        document.querySelector(`#grupo__contrasena2 i`).classList.add('fa-times-circle');
        document.querySelector(`#grupo__contrasena2 .formulario__input-error`).classList.add('formulario__input-error-activo')
        campos[contrasena]=false;
           
    }
    else{
        document.getElementById(`grupo__contrasena2`).classList.remove('formulario__grupo-incorrecto');
        document.querySelector(`#grupo__contrasena2 i`).classList.remove('fa-check-circle');
        document.getElementById(`grupo__contrasena2`).classList.add('formulario__grupo-correcto');
        document.querySelector(`#grupo__contrasena2 i`).classList.remove('fa-times-circle');
        document.querySelector(`#grupo__contrasena2 .formulario__input-error`).classList.remove('formulario__input-error-activo')
        campos[contrasena]=true;

    }

}
input.forEach((input) => {
    //para cuando el usuario presiona una tecla 
    //o sea escriba algo en el input
    input.addEventListener('keyup', validarFormulario);
    //para cuando se clickea fuera del input
    input.addEventListener('blur', validarFormulario);
    
        
    
});

//el parametro e es el evento
formulario.addEventListener('submit', (e)=>{
    e.preventDefault();

    const terminos = document.getElementById("terminos");

    //asi valido que se completen todos los campos del formulario
    if(campos.usuario && campos.nombre && campos.contrasena && campos.correo
        && campos.telefono && terminos.checked){
            //asi reinicio todo el formulario al enviar todos los datos
            formulario.reset();
        document.getElementById("formulario__mensaje-exito").classList.add("formulario__mensaje-exito-activo");
        document.getElementById('formulario__mensaje').classList.remove('formulario__mensaje-activo');

        //para borrar el mensaje luego de 5 segundos
        setTimeout(()=>{
            document.getElementById("formulario__mensaje-exito").classList.remove("formulario__mensaje-exito-activo");


        },5000);
        //asi borro los iconos 
        document.querySelectorAll('.formulario__grupo-correcto').forEach((icono)=>{
            icono.classList.remove('formulario__grupo-correcto');
        });
    }
    else{
        document.getElementById('formulario__mensaje').classList.add('formulario__mensaje-activo');
    }
});