# Predictor de notas

#### Para comenzar
Para poder utilizar el servicio de predicción de notas desde las hojas de cálculo de Google es necesario que cree una cuenta de servicio y credenciales OAuth2 desde [Google APIs Console](https://console.developers.google.com/).

Para ello, siga los pasos detallados a continuación:

1. Ingrese a [Google APIs Console](https://console.developers.google.com/).
2. Cree un nuevo proyecto.
3. Seleccione el proyecto recién creado.
4. En el menu lateral, haga click en `Pantalla de consentimiento OAuth`.
5. Marque la opción `Externo` y luego haga click en `Crear`.
6. Nombre la aplicación (Ej.: Predictor de notas).
7. Haga click en `Guardar`.
8. En el menú lateral, haga click en `Credenciales`.
9. Haga click en `Crear credenciales` y luego en `ID de cliente de OAuth`.
10. Marque la opción `Otro`, nombre el cliente (Ej.: OAuth client) y haga click en `Crear`.
11. En la ventana emergente, haga click en `Aceptar`.
12. Seleccione el cliente recién creado.
13. Haga click en `Descargar JSON`.
14. Abra el archivo descargado con un editor de texto.
15. Por último, copie el contenido del archivo y péguelo en el archivo _credentials.json_ de su proyecto.

#### Primera ejecución: autorización y habilitación de Google Sheets API
Para utilizar la aplicación es necesario que esta tenga la autorización para acceder y/o modificar su información. A su vez, es necesario habilitar la API para que pueda trabajar con ella.

Este proceso solo es necesario la primera vez que se ejecute la aplicación.

#### En el momento de su primera ejecución:

Para habilitar la API:

1. Copie el enlace que le entrega la aplicación y péguela en una nueva pestaña de su navegador.
2. En la página a la cual le redirige, haga click en `Habilitar`
3. Vuelva a la aplicación y haga click en `Listo`.

Luego, para autorizarla:

1. Copie el enlace que le entrega la aplicación y péguela en una nueva pestaña de su navegador.
2. En la página a la cual le redirige, elija su cuenta que contiene las hojas de cálculo a predecir.
3. Conceda permiso haciendo click en `Permitir`.
4. Haga click en `Permitir` nuevamente.
5. Copie el código que se muestra en pantalla y péguelo en la aplicación.



https://console.developers.google.com/apis/api/sheets.googleapis.com/overview?project=79957240321

https://colorlib.com/wp/free-html5-contact-form-templates/

https://freshman.tech/learn-node/

https://flaviocopes.com/express-request-parameters/