const infoJson = 'juego1.json';
const contenedor = document.querySelector('.juego');

let acertadas=0;
let equivocadas = 0;

fetch(infoJson)
    .then(response => response.json())
    .then(data =>{   
        const template = document.querySelector('template').content;
        const frac = document.createDocumentFragment();
        const clone = template.cloneNode(true);

        frac.appendChild(clone);
        contenedor.appendChild(frac);

        let num = 0; 
        principal(data,num)           
    })
    .catch(err => console.log(err));

    function principal(data, n){        
        document.querySelector(".btn-siguiente").style.visibility="hidden"; 
        document.querySelector('.opcion1').disabled = false;
        document.querySelector('.opcion2').disabled = false;
        document.querySelector('.opcion3').disabled = false;
        document.querySelector('.opcion4').disabled = false; 
        
        document.querySelector('.opcion1').style.backgroundColor = 'rgb(180, 213, 220)';           
        document.querySelector('.opcion2').style.backgroundColor = 'rgb(180, 213, 220)';
        document.querySelector('.opcion3').style.backgroundColor = 'rgb(180, 213, 220)';
        document.querySelector('.opcion4').style.backgroundColor = 'rgb(180, 213, 220)';

        let datos = data.preguntas[n];   
        console.log(datos)                            
        document.querySelector('.question').textContent = datos.enunciado;
        document.querySelector('.opcion1').textContent = datos.questions[0];
        document.querySelector('.opcion2').textContent = datos.questions[1];
        document.querySelector('.opcion3').textContent = datos.questions[2];
        document.querySelector('.opcion4').textContent = datos.questions[3];

        const valido = datos.correcta;

        let resp1 = document.querySelector('.opcion1');
        let resp2 = document.querySelector('.opcion2');
        let resp3 = document.querySelector('.opcion3');
        let resp4 = document.querySelector('.opcion4');

        resp1.onclick = ()=>{
            if(resp1.textContent == valido){ 
                
                resp1.style.backgroundColor ='green';
                correcto(data, n)                          
            }else{ 
                resp1.style.backgroundColor = 'red';                   
                erroneo(data, n)                       
            }        
        }
        resp2.onclick = ()=>{
            if(resp2.textContent == valido){ 
                resp2.style.backgroundColor ='green';                     
                correcto(data, n);                                            
            }else{ 
                resp2.style.backgroundColor = 'red';                   
                erroneo(data, n);                       
            }        
        }
        resp3.onclick = ()=>{
            if(resp3.textContent == valido){ 
                resp3.style.backgroundColor ='green';                     
                correcto(data, n);                        
            }else{
                resp3.style.backgroundColor = 'red';
                erroneo(data,n);                                     
            }        
        }
        resp4.onclick = ()=>{
            if(resp4.textContent == valido){ 
                resp4.style.backgroundColor ='green'; 
                correcto(data, n);                       
            }else{
                resp4.style.backgroundColor = 'red';
                erroneo(data, n);                      
            }         
        }
    }
    function correcto(data, n){
        acertadas += 1;
        console.log('RESPUESTA CORRECTA!!')        
        limpiar();        
        n += 1;     
        boton(data, n, acertadas, equivocadas)
    }
    function erroneo(data, n){
        equivocadas +=1;
        console.log('HA FALLADO!!')         
        limpiar();        
        n += 1;
        boton(data, n, acertadas, equivocadas) 
    }
    function boton(valor, n, a, e){
        let presion = document.querySelector('.btn-siguiente');
        presion.onclick = ()=>{
            if(n < valor.preguntas.length){
                principal(valor, n)
            }else{                                
                document.querySelector('.btn-siguiente').disabled = true;
                swal({
                    title: "FIN DEL JUEGO!",
                    text: "Acertadas : "+a +" / Erradas : "+e,                    
                    icon: "success",                    
                  }).then(result =>{
                    if(result.value){
                        location.reload(); 
                    }else{location.reload();}
                  })
                //location.reload();
            }            
        }
    }
    function limpiar(){
        document.querySelector(".btn-siguiente").style.visibility="visible"; 
        document.querySelector('.opcion1').disabled = true;
        document.querySelector('.opcion2').disabled = true;
        document.querySelector('.opcion3').disabled = true;
        document.querySelector('.opcion4').disabled = true;          
    }
     
    
    