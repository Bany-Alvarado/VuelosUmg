$(document).ready(function () {
    var Dispositivos = {};
    firebase.auth().onAuthStateChanged(function (user) {

        var user = firebase.auth().currentUser;
        firebase.database().ref('aviones')
            .once('value').then(function (datos) {
                Dispositivos = datos.val();
                $.each(Dispositivos, function (indice, valor) {
                    var mostrar = '<option value="' + indice + '">' + valor.nombre + '</option>';
                    $(mostrar).appendTo("#avionR");
                });
            });

    });

    // $('#avion').change(function (obj, value) {
    //     var asientos = Dispositivos[obj.currentTarget.value].asientos;
    //     var list = JSON.parse(asientos);
    //     var mostrar = '<div class="browser-default input-field"><select multiple>';

    //     list.forEach(function (item, index) {
    //         mostrar += '<option value=\"' + item + '\">' + item + '</option>';
    //     });
    //     mostrar += '</select><label>Asientos</label></div>';

    //     $(mostrar).appendTo("#asientosS");

    // });
   
});