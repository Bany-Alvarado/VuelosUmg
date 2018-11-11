$(document).ready(function () {

    var listaAvionew = $('.listaAvionesI');
    var avionesList = {};
    if (listaAvionew) {

        firebase.auth().onAuthStateChanged(function (user) {
            var user = firebase.auth().currentUser;

            firebase.database().ref('aviones')
                .once('value').then(function (datos) {
                    avionesList = datos.val();

                    $.each(avionesList, function (indice, valor) {
                        var mostrar = '<li>';
                        mostrar += '<div class="collapsible-header">';
                        mostrar += '<div class="row acordeon">';
                        mostrar += '<div class="col">';
                        mostrar += '<p><b>Nombre: </b>' + valor.nombre + '</p>';
                        mostrar += '</div>';
                        mostrar += '<div class="col">';
                        mostrar += '<p><b>No. Tipo de vuelo : </b>' + valor.tipo + ' </p>';
                        mostrar += '</div>';
                        mostrar += '</div>';
                        mostrar += '</div>';
                        mostrar += '<div class="collapsible-body">';
                        mostrar += '<button class="btn waves-effect waves-light btn blue darken-4" type="button"  onclick="leer(\'' + indice + '\')">Guardar<i class="material-icons right">edit</i>';
                        mostrar += '<button class="btn waves-effect waves-light btn blue darken-4" type="button"  onclick="eliminar(\'' + indice + '\')">Eliminar<i class="material-icons right">close</i>';
                        mostrar += '</div>';
                        mostrar += '</li>';

                        $(mostrar).appendTo('#listaAvionesI');
                    });

                });
        });

        $('.collapsible').collapsible();

    }
});

function leer(indice) {
    location.assign('Vuelos.html?' + indice);
}

function eliminar(indice) {
    firebase.database().ref('aviones').child(indice).remove(function (a) {
        M.toast({
            html: 'Eliminado exitosamente'
        });
    })
    location.reload();
}