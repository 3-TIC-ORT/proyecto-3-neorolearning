document.getElementById('btn-login').addEventListener("click", e => ingresar(e))
        const ingresar = (e) => {
            e.preventDefault();
            var email = document.getElementById('email').value;
            var password = document.getElementById('password').value;
            if (email == 'estefany-44@hotmail.com' && password == '1a') {
                alert("login correctodf")
                window.location.href = "https://admission.laboratoria.la/cohorts/reg-2022-05-admission-js-reg001/topics/admission-js/03-learning-mindset/01-welcome-and-objectives"
            }
            else {
                alert('Revise clave o correo')
            }
        }