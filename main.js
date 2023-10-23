

const body = document.querySelector('body'),
    sidebar = body.querySelector('nav'),
    toggle = body.querySelector(".toggle"),
    searchBtn = body.querySelector(".search-box"),
    modeSwitch = body.querySelector(".toggle-switch"),
    modeText = body.querySelector(".mode-text");


toggle.addEventListener( 'click' , () =>{
    sidebar.classList.toggle("close");
} )




    searchBtn.addEventListener( 'click', () => {
        sidebar.classList.remove("close");
        imglogo__bt.style.display="none"
    } )


   

/* searchBtn.addEventListener('click', () => {
    sidebar.classList.remove("close");
    imglogo__bt.style.display = "none";
}); */


modeSwitch.addEventListener('click', ()=>{

    body.classList.toggle("dark");

    if(body.classList.contains("dark")){
        modeText.innerText = "Light mode"
    }
    else
    {
        modeText.innerText = "Dark mode"
    }

})

//desarrollo bootcamp

//Declarar variables

let menuHamburguesa = document.getElementById("menuHamburguesa")
let parteDerecha = document.getElementById("parteDerecha")
let estadoBoton = 0;
let imglogo__bt = document.getElementById("logo__bt")


menuHamburguesa.addEventListener("click", function(){
/*     alert("hola compas");
 */    estadoBoton++; // Incrementa el estado en 1 (cambia de par a impar o viceversa)
    actualizarEstado();
});

function actualizarEstado() {
    if (estadoBoton % 2 === 0) {
        parteDerecha.style.width="92%";
        imglogo__bt.style.display="none";

        // Realiza acciones correspondientes al estado par
    } else {
        parteDerecha.style.width="77.5%";
        imglogo__bt.style.display="block";

        // Realiza acciones correspondientes al estado impar
    }
}



// sfdfsdfsdfsdfdfs***********************


$(document).ready( ( ) => {


    const list = () => {

        $.ajax(
        {
            url: 'http://localhost:8080/mercancia',
            type: 'GET',
            dataType: 'json',
            success: function(res){
                let data = '';
                res.forEach(element =>{
                    data+= `
                    <tr alumnoId = ${element.id} >

                        <td> ${element.id} </td>
                        <td> ${element.descripcion} </td>
                        <td> ${element.fecha_entrada} </td>
                        <td> ${element.motivo_devolucion} </td>
                        <td> ${element.nombre} </td>
                        <td> ${element.volumen} </td>

                        <td> <button id="btn-details" class=" btn btn-warning " > Detalles  </button> </td>

                        <td> <button id="btn-delete" class=" btn btn-danger " style= " background:#002C6A; border:none" > Eliminar  </button> </td>


                        
                        <td> <button id="btn-edit" class=" btn btn-info " > Editar  </button> </td>


                    </tr>
                    `
                });
    
                $('#tbody').html(data)
            }
        }
        )
    

    }


    const save = () =>{
        $('#agregar').on('click', function(){
            const datosAlumno = {
                nombre:$('#nombre').val(),
                descripcion:$('#descripcion').val(),
                fecha_entrada:$('#fecha_entrada').val(),
                motivo_devolucion:$('#motivo_devolucion').val(),
                volumen:$('#volumen').val(),

            }

            $.ajax({
                url:'http://localhost:8080/mercancia',
                contentType: 'application/json',
                type: 'POST',
                data: JSON.stringify(datosAlumno),
                dataType: 'json',
                success: (data) =>{
                    $('#messages').html('Mercancia o bodega Creado').css('display','block')

                    list();
                    reset();


                    console.log('Alumno registraro');
                }
            })




        })
    }


    // detalles del alumno


    const details = () => {
        $(document).on('click', '#btn-details' ,function(){
            alert("Hola mundo")
            let btnDetails = $(this)[0].parentElement.parentElement;
            let id = $(btnDetails).attr('alumnoId');

            console.log(id);
            
            $.ajax({
                url:'http://localhost:8080/mercancia/'+ id,
                type: 'GET',
                dataType: 'json',
                success: (res) => {
                    let data = `
                        Nombre - ${res.nombre} - Descripcion - ${res.descripcion} - Fecha Entrada : ${res.fecha_entrada} - Motivo Devolucion : ${res.motivo_devolucion} - Volumen _ ${res.volumen}  <br></br>
                        <button id="btn-limpiar" class=" btn btn-warning " > Limpiar </button>
                    `

                    let alumno = $('#alumno-details').html(data);
                    $('#btn-limpiar').on('click', () => {
                        alumno.html('');
                    })
                }
            })

        })
    }





    // metodo para eliminar alumno

    const deleteAlumno = () => {
        $(document).on('click', '#btn-delete' , function () {

            if(confirm('Seguro que quiere eliminar ? ' )){





                let btnDetails = $(this)[0].parentElement.parentElement;
                let id = $(btnDetails).attr('alumnoId');
                console.log(id);
    
                $.ajax({
                    url:'http://localhost:8080/mercancia/'+id,
                    type: 'DELETE',
                    dataType: 'json',
                   
                    success: (res) => {
                        $('#messages').html('Usuario Eliminado').css('display','block');
                        list();
                    }
    
                })




            }







        })
    }


    //Rellenar los datos del alimno en el formulario

    const rellenarAlumno = () =>{
        $(document).on('click', '#btn-edit', function(){

            let btnDetails = $(this)[0].parentElement.parentElement;
            let id = $(btnDetails).attr('alumnoId');
            console.log(id);

            $('#agregar').hide();
            $('#editar').show();

            $.ajax({
                url: 'http://localhost:8080/mercancia/'+id,
                type: 'GET',
                dataType: 'json',
                
                success: (res) => {
                    $('#id').val(res.id);
                    $('#nombre').val(res.nombre);
                    $('#descripcion').val(res.descripcion);
                }
            })

        })

    }


    //Metodo para modificar los datos

    const editAlumno = () => {
        $('#editar').on('click',function(){
            let id = $('#id').val();

            $('#agregar').css('display','none');
            $('#editar').css('display','block');


            const datosAlumno = {


                nombre:$('#nombre').val(),
                descripcion:$('#descripcion').val(),
                fecha_entrada:$('#fecha_entrada').val(),
                motivo_devolucion:$('#motivo_devolucion').val(),
                volumen:$('#volumen').val(),

            }

            $.ajax({
                
                url: 'http://localhost:8080/mercancia/'+id,
                contentType: 'spplication/json',
                type: 'PUT',
                headers: {
                    "Content-Type": "application/json" // Agrega la cabecera Content-Type
                },
                data:JSON.stringify(datosAlumno),
                dataType: 'json',
                success: (res) =>{
                    $('#messages').html('Alumno modificado').css('display','block');
                    $('#editar').css('display','none');
                    $('#agregar').css('display','block');

                    reset();
                    list();
                }

            })
            
        })
    }


    //metodo para limpiar el formulario
    const reset = () => {

        $('#nombre').val(''),
        $('#descripcion').val('')
        $('#fecha_entrada').val('')
        $('#motivo_devolucion').val('')
        $('#volumen').val('')
        
    }

    //LLamadas a la funcion

    list();
    save();
    details();
    deleteAlumno();
    rellenarAlumno();
    editAlumno();

})












// let url="http://localhost:8080/zonas"
// let peticion={
//     method:"GET"
// }

// fetch(url,peticion)
// .then(function(respuesta){
//     return respuesta
// })
// .then(function(respuesta){
//     console.log(respuesta)
// })


// let url="http://localhost:8080/empresas"
// let peticion={
//     method:"GET"
// }

// fetch(url,peticion)
// .then(function(respuesta){
//     return respuesta.json()
// })
// .then(function(respuesta){
//     console.log(respuesta)
// })












