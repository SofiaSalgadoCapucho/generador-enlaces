document.addEventListener("DOMContentLoaded", function() {

  const { shell } = require('electron');
  const { exec } = require('child_process');
  const cargarDatos = async () => {
    const json = "generadorEnlaces.json"
    const res = await fetch(json);
    const datos = await res.json();
    return datos
  }

  const form = document.getElementById("myForm");
  form.addEventListener("submit", function(event) {
    event.preventDefault();
    const datos = cargarDatos()

    datos.then(data => {
      //Declaramos Arrays para guardar los datos de paises y entornos seleccionados en el HTML
      const paises = Array.from(document.getElementById("pais").selectedOptions, option => option.value);
      const entornos = Array.from(document.getElementById("entorno").selectedOptions, option => option.value);
      //Declaramos constantes para referenciar los distintos divs por entorno
      const divClose = document.getElementById("close")
      const divStage = document.getElementById("stage")
      const divProxy = document.getElementById("proxy")
      const divPro = document.getElementById("pro")
      //Estos innerHTML limpian al regenerar los enlaces
      divClose.innerHTML = "";
      divStage.innerHTML = "";
      divProxy.innerHTML = "";
      divPro.innerHTML = "";

      const todosLinks = []
      //Creamos el linkElements que se irá rellenando cada vez que entre en un if de Entorno.
      const linkElements = [];

      //Recorremos los entornos que tenemos marcados en el selector
      entornos.forEach((entorno)=> {

      //Recorrer el array de paises marcados en el selector
      paises.forEach((pais) => {
        event.preventDefault(); 
        //Busca los idiomas del país para generar los enlaces correspondientes.           
        const idioma = data.find(p => p.code ===  pais).lenguaje;
        
        //Si el entorno es CLOSE generamos enlaces de CLOSE WEB , Queda pendiente APP y STAGE.
          if (entorno === "close") {     
            const url = "https://www.zara.com/static/zara_close/sale/zaras/index_";
             //En este bloque se crean los enlaces y se suben al array de linkElements para trabajar sobre ellos.
              const item = document.createElement("li");
              const enlace = document.createElement("a");
              enlace.href = `${url}${pais}.html`;
              enlace.textContent = `enlace close WEB ${pais}`;
              item.appendChild(enlace);
              divClose.appendChild(item);  
              linkElements.push(enlace.href);  
              //Este bloque permite que el enlace se abra en chrome en incognito al hacer click sobre él.
              enlace.addEventListener('click', (event) =>             
              {
                event.preventDefault();
                exec(`start chrome "${enlace.href}" --incognito`);  }
              )      
                      
          } else if (entorno === "stage") {
            const linkElements = [];
            const url = "https://axinstgzaranode1-std.central.inditex.grp/";
            const myButton = document.createElement("button");
            myButton.textContent = `Abrir STAGE: ${pais}`;
            document.getElementById("stage").appendChild(myButton);
            idioma.forEach((r) => {
              const item = document.createElement("li");
              item.setAttribute("id", `stage_${pais}`);
              const enlace = document.createElement("a");
              enlace.href = `${url}${pais}/${r}/`;
              enlace.textContent = `${url}${pais}/${r}/`;
              enlace.target = "_blank";
              item.appendChild(enlace);
              divStage.appendChild(item);            
              linkElements.push(enlace.href);
              enlace.addEventListener('click', (event) =>             
              {
                event.preventDefault();
                exec(`start chrome "${enlace.href}" --incognito`);  }
              )
            });
            myButton.addEventListener('click', (event)=>{
              event.preventDefault();
              linkElements.forEach((link) => {
                exec(`start chrome "${link}" --incognito`);
            }); 
            });
          } else if (entorno === "proxy") {
            const linkElements = [];
            const url = "https://zara.com/"; 
            const myButton = document.createElement("button");
            myButton.textContent = `Abrir PROXY: ${pais}`;
            document.getElementById("proxy").appendChild(myButton);
            idioma.forEach((r) => {
              const item = document.createElement("li");
              item.setAttribute("id", `proxy_${pais}`);
              const enlace = document.createElement("a");
              enlace.href = `${url}${pais}/${r}/`;
              enlace.textContent = `${url}${pais}/${r}/`;
              enlace.target = "_blank";
              item.appendChild(enlace);
              divProxy.appendChild(item);            
              linkElements.push(enlace.href);
              enlace.addEventListener('click', (event) =>             
              {
                event.preventDefault();
                exec(`start firefox -private-window "${enlace.href}"`);  }
              )
            });
            myButton.addEventListener('click', (event)=>{
              event.preventDefault();
              linkElements.forEach((link) => {
              exec(`start firefox -private-window "${link}"`);
            }); 
            });
          } else if (entorno === "pro") {
            const linkElements = [];
            const myButton = document.createElement("button");
            myButton.textContent = `Abrir PRO: ${pais}`;
            document.getElementById("pro").appendChild(myButton);

            const url = "https://zara.com/";
            idioma.forEach((r) => {
              const item = document.createElement("li");
              item.setAttribute("id", `pro_${pais}`);
              const enlace = document.createElement("a");
              enlace.href = `${url}${pais}/${r}/`;
              enlace.textContent = `${url}${pais}/${r}/`;
              enlace.target = "_blank";
              item.appendChild(enlace);
              divPro.appendChild(item);            
              linkElements.push(enlace.href);
              enlace.addEventListener('click', (event) =>             
              {
                event.preventDefault();
                exec(`start firefox -private-window "${enlace.href}"`);  }
              )             
            });
            myButton.addEventListener('click', (event)=>{
              event.preventDefault();
              linkElements.forEach((link) => {
                exec(`start chrome "${link}" --incognito`);
            }); 
            });
          }       
        });
      });

      //Aqui creamos el botón que abre todas las close del divClose.
      const myButton = document.createElement("button");
        myButton.textContent = `Abrir CLOSE`;
       document.getElementById("close").appendChild(myButton);
       myButton.addEventListener('click', (event)=>{
         event.preventDefault();
         linkElements.forEach((link) => {
         exec(`start chrome "${link}" --incognito`);
       });               
       });
  });
});
});