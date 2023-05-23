function LimpiarPantalla(){
    
    document.querySelector("#contenedor").innerHTML="";
        
}

function CargarDatosPorId(){
    document.querySelector("#contenedor").innerHTML="";
    console.log("entra a cargar datos por ID");
    url='http://localhost:3000/api/pizzas/';
    id=document.getElementById('idPizza').value;
    console.log("id: " + id);
    axios
        .get(url+id)
        .then((result)=>{
            displayUnaPizza(result.data);
            
            /*document.querySelector("#contenedor").innerHTML+=`
            <ul>
                <li>Id: ${result.data.Id}</li>
                <li>Nombre: ${result.data.Nombre}</li>
                <li>Libre de gluten: ${result.data.LibreGluten}</li>
                <li>Importe: $${result.data.Importe}</li>
                <li>Descripción: ${result.data.Descripcion}</li>
            </ul>`;*/
            
        })
    .catch((error)=>{
        console.log(error);
    });
}

function CargarDatos(){   
    document.querySelector("#contenedor").innerHTML="";
    console.log("entra a cargar datos");
    url='http://localhost:3000/api/pizzas/';
    axios
        .get(url)
        .then((result)=>{

            displayPizzas(result.data);
            
            const pizzas = result.data;
            /*pizzas.map((pizza)=>{
                const{Id,Nombre,LibreGluten,Importe,Descripcion} = pizza;
                
                document.querySelector("#contenedor").innerHTML+=`
                    <ul>
                        <li>Id: ${pizza.Id}</li>
                        <li>Nombre: ${pizza.Nombre}</li>
                        <li>Libre de gluten: ${pizza.LibreGluten}</li>
                        <li>Importe: $${pizza.Importe}</li>
                        <li>Descripción: ${pizza.Descripcion}</li>
                     </ul>`;
            }
            )*/          
        })
    
    .catch((error)=>{
        console.log(error);
    });
}

function BorrarPizza(){
    document.querySelector("#contenedor").innerHTML="";
    console.log("entra a borrar pizza");
    url='http://localhost:3000/api/pizzas/delete/';
    id=document.getElementById('idPizzaBorrar').value;
    console.log("id: " + id);

    axios
        .delete(url+id)
        .then((result)=>{

                document.querySelector("#contenedor").innerHTML+=`
                <p> se borró la pizza</p>`;
         
        })
    
    .catch((error)=>{
        console.log(error);
    });
}

function UpdatePizza(){
    document.querySelector("#contenedor").innerHTML="";
    console.log("entra a update pizza");
    

    let id=document.getElementById('id').value;
    let nombre=document.getElementById('nombre').value;
    let libreGluten=document.getElementById('libreGluten').value;  
    let importe=document.getElementById('importe').value;
    let descripcion=document.getElementById('descripcion').value;

    if (libreGluten==1) {
        libreGluten==true;
    }
    else
    {
        libreGluten==false;
    } 
    
    let url='http://localhost:3000/api/pizzas/update/'+id;

    const params = {
        id: id,
        nombre: nombre,
        libreGluten: libreGluten,
        importe: importe,
        descripcion: descripcion
    };

    console.log(params);

    axios
        .put(url,params)
        .then((result)=>{
                console.log('resulatado', result.data);
                if (result.data!=0) {
                    document.querySelector("#contenedor").innerHTML+=`<p>Se actualizó la pizza</p>`;
                }
                else{
                    document.querySelector("#contenedor").innerHTML+=`<p>ERROR. Uno de los campos es inválido</p>`;
                }
                
         
        })
    
    .catch((error)=>{
        console.log(error);
    });
}

function InsertPizza(){
    document.querySelector("#contenedor").innerHTML="";
    console.log("entra a insert pizza");
    var  url = 'http://localhost:3000/api/pizzas/insert/';
    let nombre=document.getElementById('nombre2').value;
    let libreGluten=document.getElementById('libreGluten2').value;
    let importe=document.getElementById('importe2').value;
    let descripcion=document.getElementById('descripcion2').value;

    if (libreGluten==1) {
        libreGluten==true;
    }
    else
    {
        libreGluten==false;
    } 

    const params = ({
        nombre: nombre,
        libreGluten: libreGluten,
        importe: importe,
        descripcion: descripcion
    });

    const options = {
        method: 'POST',
        url: 'http://localhost:3000/api/pizzas/insert/',
        headers:
        {
            'content-type':'application/json',
            'X-RapidAPI-Host':'microsoft-translator-text.p.rapidapi.com',
        },
        data:params
    }

    axios
        .post(url, params)
        .then((result)=>{

                document.querySelector("#contenedor").innerHTML+=`
                <p>Se creó la pizza</p>`;
         
        })
    
    .catch((error)=>{
        console.log(error);
    });
}

//PARA VARIAS PIZZAS

function displayPizzas(pizzas){
    let table = '<table class="table table-striped table-hover">';
    table += `<thead class="table-dark"><tr><th class="col-1 text-center">Id</th><th class="col-3">Nombre</th><th class="col-5">Descripcion</th><th class="col-2 text-center">Importe</th><th class="col-1 text-center">Libre Gluten</th></tr></thead>`;
    pizzas.forEach((pizza, index) => {
      table += `<tr>`;
      table += `<td scope="col" class="text-center">${pizza.Id}</td>`;
      table += `<td scope="col">${pizza.Nombre}</td>`;
      table += `<td scope="col">${pizza.Descripcion}</td>`;
      table += `<td scope="col" class="text-center">${pizza.Importe}</td>`;
      table += `<td scope="col" class="text-center">${pizza.LibreGluten}</td>`;
      table += `</tr>`;
    });
    table += "</table>";
    document.querySelector("#contenedor").innerHTML = table;
  }

//PARA UNA PIZZA

  function displayUnaPizza(unaPizza){
    let estilo = 'table-dark';
    /*if (huboError){
      estilo = 'table-danger';
    }*/
    let table = '<table class="table table-striped table-hover">';
    table += `<thead class="${estilo}"><tr><th class="col-1 text-center">Id</th><th class="col-3">Nombre</th><th class="col-5">Descripcion</th><th class="col-2 text-center">Importe</th><th class="col-1 text-center">Libre Gluten</th></tr></thead>`;
      table += `<tr>`;
      table += `<td scope="col" class="text-center">${unaPizza.Id}</td>`;
      table += `<td scope="col">${unaPizza.Nombre}</td>`;
      table += `<td scope="col">${unaPizza.Descripcion}</td>`;
      table += `<td scope="col" class="text-center">${unaPizza.Importe}</td>`;
      table += `<td scope="col" class="text-center">${unaPizza.LibreGluten}</td>`;
      table += `</tr>`;
    table += "</table>";
    document.querySelector("#contenedor").innerHTML = table;
  }