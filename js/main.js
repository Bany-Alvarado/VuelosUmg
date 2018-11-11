$(document).ready(function () {

    var Dispositivos = {};
    firebase.auth().onAuthStateChanged(function (user) {

        var user = firebase.auth().currentUser;
        firebase.database().ref('aviones')
            .once('value').then(function (avionV) {

                var avion = avionV.val();
                firebase.database().ref('usuario/' + user.uid + '/vuelos')
                    .once('value').then(function (datos) {
                        Dispositivos = datos.val();

                        $.each(Dispositivos, function (indice, valor) {

                            var mostrar = '<li>';
                            mostrar += '<div class="collapsible-header">';
                            mostrar += '<div class="row acordeon">';
                            mostrar += '<div class="col">';
                            mostrar += '<p><b>Avión: </b>' + avion[valor.avion].nombre + '</p>';
                            mostrar += '</div>';
                            mostrar += '<div class="col">';
                            mostrar += '<p><b>Destino : </b>' + valor.destino + ' </p>';
                            mostrar += '</div>';
                            mostrar += '</div>';
                            mostrar += '</div>';

                            mostrar += '<div class="collapsible-body">';
                            mostrar += '<p><b>Fecha: </b>' + valor.fecha + '</p>';
                            mostrar += '<p><b>Hora: </b>' + valor.hora + '</p>';

                            mostrar += '<p><b>Tipo de vuelo: </b>' + valor.tipo + '</p>';
                            // mostrar += '<span><a class="waves-effect waves-light btn blue darken-4"><i class="material-icons">close</i></a></span>';
                            // mostrar += '<span><a class="waves-effect waves-light btn blue darken-4"><i class="material-icons">edit</i></a></span>';
                            mostrar += '</div>';
                            mostrar += '</li>';

                            $(mostrar).appendTo('#HistorialVuelos');

                        });

                    });

            });
    });

    $('.collapsible').collapsible();

});