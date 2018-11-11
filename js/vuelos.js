$(document).ready(function () {
    var indice = location.href.slice(location.href.indexOf("?") + 1, location.href.length);


    firebase.auth().onAuthStateChanged(function (user) {
        var user = firebase.auth().currentUser;

        firebase.database().ref('aviones/' + indice)
            .once('value').then(function (datos) {
                var val = datos.val();
                var asientos = JSON.parse(val.asientos);
                $("#listadeTipoV").val(val.tipo);
                $("#NombreVuelo").val(val.nombre);
                $("#NombreVuelo").focus();
                [];
                asientos.forEach(function (nombre) {
                    var asciento = ' <li><div class="collapsible-header">' + nombre + '</div> </li>'
                    $(asciento).appendTo('#ascientosList');
                });

            });
    });
});