function Seguro(marca, year, tipo){
    this.marca = marca;
    this.year = year;
    this.tipo = tipo;
}

//Método que realiza cotizacion de datos
Seguro.prototype.cotizarSeguro = function(){
    /*
    1 --> Americano - 1.15
    2 --> Asiatico -  1.05
    3 -->  Europeo - 1.35
    */
   let cantidad;
   const base = 2000;
   switch(this.marca) {
       case 'Americano':
        cantidad =  base*1.15;
        break;
       case 'Asiatico':
        cantidad = base*1.05;
        break;
       case 'Europeo':
        cantidad =  base*1.35;
        break;

       default:
           break;

   }
   //Leer el año 
   const diferencia = new Date().getFullYear() - this.year;

   //Cada año menos, el costo reduce en un 3%
   cantidad -= (diferencia * 0.03 * cantidad);

   /*Tipo de seguro
   si el seguro es basic multiplica en 30%
   si el seguro es premium multiplica en 50%
   */
   let total;
   if(this.tipo === 'basic'){
       total = cantidad + cantidad * 0.3;
   }else{
       total = cantidad + cantidad * 0.5;
   }

   //Mostrar el total
   showTotal(total);
}

function UI(){}

//LLena las opciones del año
UI.prototype.llenarOpciones = function() {
    const max = new Date().getFullYear();
          min = max - 20;
    const selectYear = document.getElementById('year');

    for(let i = max; i > min; i--){
        let option = document.createElement('option');
        option.textContent = i;
        selectYear.appendChild(option)
    }

}

//Método para mostrar alerta
UI.prototype.showAlert = (className) => {
    const btn = document.getElementById('btn');
    const div = document.createElement('div');
    div.className = `alert alert-${className}`
    div.textContent = 'Seleccione toda las opciones.'
    btn.insertAdjacentElement('beforebegin', div);

    setTimeout(() => {
        div.remove();
    }, 1000)
}

console.log(new UI())


//Events
const events = () => {
    document.addEventListener('DOMContentLoaded', () => {
        new UI().llenarOpciones();
    });

    const formulario = document.getElementById('formulario');
    formulario.addEventListener('submit', cotizarSeguro);
    
}

events();

//Validar formulario
function cotizarSeguro(e) {
    e.preventDefault();
    
    const marca = document.getElementById('marca').value;
    const year = document.getElementById('year').value;
    //const tipoSeguro = document.querySelector('input[name="tipo"]:checked');
    const tipoSeguro = () => {
        const tipo = document.getElementsByName('tipo');
        for(let i = 0; i < tipo.length; i++) {
        if(tipo[i].checked){
            return tipo[i].value
        }
    }
    }

    if(marca === '-Seleccionar-' || year === '' || tipoSeguro() === ''){
        new UI().showAlert('danger');
    }else{
        //Instanciar el seguro
        const seguro  = new Seguro(marca, year, tipoSeguro());
        seguro.cotizarSeguro();
    }


}


function showTotal(total){
    console.log(total)
    const div = document.createElement('div');
    div.classList.add('shadow', 'p-3', 'border', 'border-info', 'fw-bold');
    div.textContent = `Total a pagar: $${total}`;
    const btn = document.getElementById('btn');
    btn.insertAdjacentElement('beforebegin', div)

    setTimeout(() => {
        div.remove();
    }, 2000)

}