var imagen;
$(document).ready(function () {
    // Seguridad para Saber si ha Iniciado Seccion
    firebase.auth().onAuthStateChanged(function (user) {
        if (user) {
            console.log('Conetado');
        } else {
            location.assign('index.html');
        }
    });

    $("#imagen").change(function () {
        var descriptor = new FileReader();
        descriptor.readAsDataURL(this.files[0]);

        descriptor.onloadend = function () {
            imagen = descriptor.result;
            $("#previsualizacion").attr("src", imagen);
        };
    });

    $('#btnDatos').click(function () {

        var nombre = $('#nombre').val();
        if (nombre != "") {
            $('#load').delay(2000).fadeOut("slow");

            if (!imagen) {
                imagen = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQpdX6tPX96Zk00S47LcCYAdoFK8INeCElPeJrVDrh8phAGqUZP_g";
            }
            var user = firebase.auth().currentUser;

            firebase.database().ref("usuario/" + user.uid + "/cuenta")
                .once("value").then(function (datos) {
            firebase.database().ref('usuario/' + user.uid + '/cuenta').set({
                uid: user.uid,
                correo: user.email,
                nombre: nombre,
                foto: imagen,
                isAdmin: datos.EsAdmin ? user.EsAdmin : false
            }, function () {
                location.assign('inicio.html');
            });
        });

        } else {
            M.toast({
                html: 'Ingrese un nombre de Usuario'
            });
        }
    });
});