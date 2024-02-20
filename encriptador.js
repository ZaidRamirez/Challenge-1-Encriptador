//Esperamos a que la pagina se cargue completamente
window.addEventListener('load', ()=>{

    //Obtenemos los objetos que vamos a ocupar del DOM
    let formulario = document.querySelector("form");
    let textareaMensajeUsuario = document.querySelector("#mensaje");
    let btnEncriptar = document.querySelector("#btnEncriptar");
    let btnDesencriptar = document.querySelector("#btnDesencriptar");
    let imagenResultado = document.querySelector("#resultado img");
    let resultadoTitulo = document.querySelector("#resultadoTitulo");
    let resultadoParrafo = document.querySelector("#resultadoParrafo");
    let btnCopiarTexto = document.querySelector("#btnCopiarTexto");
    let error=false;
    

    //Declaramos las constantes que vamos a usar después
    const acentos = ['á', 'é', 'í', 'ó', 'ú', 'Á', 'É', 'Í', 'Ó', 'Ú'];
    const mayusculas = ['A','B','C','D','E','F',
                        'G','H','I','J','K','L',
                        'M','N','Ñ','O','P','Q',
                        'R','S','T','U','V','W',
                        'X','Y','Z']

    //Evitamos que el formulario refresque la página
    formulario.addEventListener('submit', function(event) {
        event.preventDefault();
    });
    
    //Mandamos a llamar a la función encriptar cuando  el btnEncriptar se presione
    btnEncriptar.addEventListener('click', encriptar);

    //Mandamos a llamar a la función desencriptar cuando  el btnDesencriptar se presione
    btnDesencriptar.addEventListener('click', desencriptar);

    //Mandamos a llamar a la función copiar cuando  el btnDesencriptar se presione
    btnCopiarTexto.addEventListener('click', copiar);

function encriptar() {
    //Declaramos esta variable para cuando el encriptador encuentre una letra mayuscula o acento
    error=false

    //obtenemos el valor del textarea y lo convertimos a un arreglo
    let mensajeUsuario = textareaMensajeUsuario.value.split('');    

    //Pasamos por cada letra del arreglo buscando vocales y encriptandolas
    mensajeUsuario.forEach((letra,indice,arreglo) => {
        //Mandamos a llamar a la función buscarError
        if(!error){
            buscarError(letra);
        }

        //Procedemos a encriptar las letras
        if(letra == 'a'){
            letra = 'ai';
            arreglo.splice(indice, 1, letra);
        }else if(letra == 'e'){
            letra = 'enter';
            arreglo.splice(indice, 1, letra);
        }else if(letra == 'i'){
            letra = 'imes';
            arreglo.splice(indice, 1, letra);
        }else if(letra == 'o'){
            letra = 'ober';
            arreglo.splice(indice, 1, letra);
        }else if(letra == 'u'){
            letra = 'ufat';
            arreglo.splice(indice, 1, letra);
        }
        mensajeUsuario=arreglo.join("");
    });

    //Imprimimos el resultado con la función
    imprimirResultado(mensajeUsuario);
}

function desencriptar(){
    //Declaramos esta variable para cuando el desencriptador encuentre una letra mayuscula o acento
    error=false;

    
    //obtenemos el valor del textarea y lo convertimos a un arreglo
    let mensajeUsuario = textareaMensajeUsuario.value.split('');    

    //Pasamos por cada letra del arreglo buscando vocales y encriptandolas
    mensajeUsuario.forEach((letra) => {
        //Mandamos a llamar a la función buscarError
        if(!error){
            buscarError(letra);
        }
    });

    //obtenemos el valor del textarea
    mensajeUsuario = textareaMensajeUsuario.value;    


    //Pasamos el string buscando vocales encriptadas y las desencriptamos
    mensajeUsuario = mensajeUsuario.replace(/ai/g, 'a');
    mensajeUsuario = mensajeUsuario.replace(/enter/g, 'e');
    mensajeUsuario = mensajeUsuario.replace(/imes/g, 'i');
    mensajeUsuario = mensajeUsuario.replace(/ober/g, 'o');
    mensajeUsuario = mensajeUsuario.replace(/ufat/g, 'u');

    //Imprimimos el resultado con la función
    imprimirResultado(mensajeUsuario);
}

function buscarError(letra){
            //Revisamos que el usuario no haya ingresado letras con acento
            for (let i=0; i< acentos.length;i++){
                if (letra == acentos[i]){
                    alert("Ingrese solo letras minúsculas y sin acentos");
                    error=true;
                }
            }
            
            //Revisamos que el usuario no haya ingresado mayusculas
            for (let i=0; i< mayusculas.length;i++){
                if (letra == mayusculas[i]){
                    alert("Ingrese solo letras minúsculas y sin acentos");
                    error=true;
                }
            }
}

function imprimirResultado(mensajeUsuario){
    //Si no hay errores entonces corremos el siguiente código
    if(!error){
        //Escondemos el título y la imagen del resultado 
        resultadoTitulo.style.display="none";
        imagenResultado.style.display="none";
        
        //Cambiamos el textp del resultado por el mensaje encriptado
        resultadoParrafo.innerHTML= mensajeUsuario;

        //Mostramos un botón para que el usuario pueda copiar el texto encriptado
        btnCopiarTexto.style.display="block";
    }
}

function copiar(){
    navigator.clipboard.writeText(resultadoParrafo.innerText)
    .then(() => {
        // Mostrar un mensaje de éxito
        alert("Texto copiado al portapapeles");
    })
    .catch(err => {
        // Manejar cualquier error que pueda ocurrir
        console.error('Error al copiar el texto: ', err);
    });

}
})