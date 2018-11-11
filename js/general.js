$(document).ready(function () {
    // Seguridad para Saber si ha Iniciado Seccion
    firebase.auth().onAuthStateChanged(function (user) {

        if (user) {
            // firebase.auth().currentUser nos ayuda a elejir el usuario            

            var as = firebase.auth().currentUser;
            // Se conecta a ala base de datos y Busca los valores del usuario conectado
            firebase.database().ref("usuario/" + as.uid + "/cuenta")
                .once("value").then(VerDatos);

            // Dibujar los valore en la paginaVerDatos
            var logueado = '<li>Salir</li>';
            logueado += '<li><a class="waves-effect waves-light btn light-green darken-1"><i class="material-icons" id="btnLogout">exit_to_app</i></a></li>';

            // la variable 'logeado' se va a dibujar en el ID nav-mobile
            $(logueado).appendTo('#nav-mobile');

            $("#loader").fadeOut("slow");
            $(btnLogout).click(desconectar);

        } else {
            location.assign('index.html');
        }
    });
    $('.sidenav').sidenav();

    $('#AgregarAsciento').click(function () {
        var nombre = $("#nAsientos").val();
        if (nombre != "") {
            var asciento = ' <li><div class="collapsible-header">' + nombre + '</div> </li>'
            $(asciento).appendTo('#ascientosList');
            $("#nAsientos").val("");
        } else {
            M.toast({
                html: 'Agregue el nombre del asciento'
            });
        }
    });
    // $('#guardarReserva').click(function () {
    //     var tipo = $("#listadeTipoR").val();
    //     var nombreA = $("#avion").val();
    //     var destino = $("#destino").val();
    //     var nAsientos = $("#asientos").val();
    //     var hora = $("#horario").val();
    //     var fecha = $("#fecha").val();
    //     var jsonVuelo = {
    //         tipo: tipo,
    //         nombre: nombreA,
    //         destino: destino,
    //         asientos: nAsientos,
    //         hora: hora,
    //         fecha: fecha
    //     }

    //     firebase.database().ref('usuario/' + as.uid + '/vuelos').push(jsonVuelo, function () {
    //         location.assign('inicio.html');
    //     });
    // });

    $('#guardarVuelo').click(function () {
        var tipo = $("#listadeTipoV").val();
        var nombreV = $("#NombreVuelo").val();
        var asientosLista = [];
        var listAs = $("#ascientosList").children();
        var uuid = getUuid();
        for (let i = 0; i < listAs.length; i++) {
            asientosLista.push(listAs[i].innerText);
        }
        var jsonVuelo = {
            tipo: tipo,
            nombre: nombreV,
            asientos: JSON.stringify(asientosLista)
        }

        firebase.database().ref('aviones/' + uuid).set(jsonVuelo, function () {
            location.assign('AvionesLista.html');
        });
    });


    $('#AgregarAvion').click(function () {
        location.assign('Vuelos.html');
    });


    $('#guardarReserva').click(function () {

        var tipo = $('#listadeTipoR').val();
        var avion = $('#avionR').val();
        var destino = $('#destino').val();
        var hora = $('#horario').val();
        var fecha = $('#fecha').val();

        if (tipo != "" && avion != "" && destino != "" && hora != "" && fecha != "") {
            var Datos = {
                avion: avion,
                destino: destino,
                tipo: tipo,
                hora: hora,
                fecha: fecha
            };

            firebase.database().ref('usuario/' + firebase.auth().currentUser.uid + '/vuelos')
                .push(Datos);

            $('[type = text]').val("");

            M.toast({
                html: 'Datos Guardados'
            });
            location.assign('inicio.html');
        } else {
            M.toast({
                html: 'Ingrese todos los datos'
            });
        }
    });


});

// Funcion para dibujar los datos en la pagina
// esta funcion se usa en la linea 12
function VerDatos(snapshot) {
    var datos = snapshot.val();
    var nombre = (snapshot.val() && snapshot.val().nombre);
    var foto = (snapshot.val() && snapshot.val().foto);
    var email = (snapshot.val() && snapshot.val().correo);

    var MostrarDatos = '<a href="#user"><img class="circle" src=' + foto + '></a>';
    MostrarDatos += '<a href="#name"><span class="white-text name">' + nombre + '</span></a>';
    MostrarDatos += '<a href="#email"><span class="white-text email">' + email + '</span></a>';

    if (!datos.isAdmin) {
        $('.dispositivos_icon').css('display', 'none');
    } else {
        MostrarDatos += '<a href="#admin"><span class="white-text email">Administrador</span></a>';
    }
    $(MostrarDatos).appendTo('#Mostrardatos');
}

// Funcon para cerrar session
function desconectar() {
    firebase.auth().signOut().then(function () {
        location.assign('login.html');
    }, function () {
        M.toast({
            html: 'Error al Deslogearse'
        });
    });
};


function getUuid() {
    var dt = new Date().getTime();
    var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        var r = (dt + Math.random() * 16) % 16 | 0;
        dt = Math.floor(dt / 16);
        return (c == 'x' ? r : (r & 0x3 | 0x8)).toString(16);
    });
    return uuid;
}