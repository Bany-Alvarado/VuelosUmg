var email, password, passwordConf;

function Exitoso() {
    M.toast({
        html: 'Cuenta Creada'
    });
    location.assign("datos.html");
};

function alFinalizar(error) {

    if (error !== 'undefined') {
        switch (error.code) {
            case 'auth/email-already-in-use':
                M.toast({
                    html: 'No se puede crear la nueva cuenta de usuario, por que el e-mail ya está en uso'
                });
                break;
            case 'auth/invalid-email':
                M.toast({
                    html: 'El e-mail facilitado no es un e-mail correcto'
                });
                break;
            default:
                M.toast({
                    html: 'Se ha producido un error al crear el usuario.\n\n' + error + '\n'
                });
                break;
        }
    }
}
$(document).ready(function () {

    $('#btnRegistrar').click(function () {

        email = $('#email').val();
        password = $('#password').val();
        passwordConf = $('#passwordConf').val();

        if (password != passwordConf) {
            M.toast({
                html: 'La Confirmacion de la Contraseña es Incorrecta'
            });
        } else {
            firebase.auth().createUserWithEmailAndPassword(email, password).then(Exitoso).catch(alFinalizar);
        }
    });

    $("#btnCancelar").click(function () {
        location.assign('index.html');
    });

});