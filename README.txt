Ejecución del Poryecto
Cambiar las credenciales de la conexión MySQL en
    config/db.config.js
        PORT: Cambiar de 3308 al puerto 3306!!

Cambiar el puerto del servido NodeJs en
    /index.js
        app.listen(3001, () => {})



Descripción del Proyecto:
/database: script de las base de datos.
/config: contiene los archivo de conexión de la base de datos
/models: contiene los modelos necesarios para los métodos de la api
/controllers: contiene los controladores necesarios para los modelos
/routes: contiene el archivo con las rutas para los diferentes métodos
/utils: contiene el archivo strings.js en dónde se colocan todas las respuestas de texto de la api