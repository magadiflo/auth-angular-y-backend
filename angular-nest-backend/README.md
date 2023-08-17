
# Backend en Nest

---

## Levantando MongoDB

### Opción 1: usando Mongo en Docker

Si vamos a usar Docker para levantar nuestra base de datos de MongoDb, mediante la terminal nos posicionamos en la raíz del proyecto, precisamente donde está el archivo **docker-compose.yml** y ejecutamos:

```
docker compose up -d
```

### Opción 2: usando Mongo en local

Si vamos a usar MongoDb en nuestra pc local, solo nos aseguramos de tenerlo levantado y use el puerto 27017.

## Levantando Backend Nest

1. Si lo clonamos desde el repositorio de GitHub, asegurarnos de reconstruir las dependencias con: ``npm install``
2. Debemos copiar el ```.env.template``` y renombrarlo a ```.env```. El [repositorio original de este backend](https://github.com/Klerith/angular-nest-backend/tree/fin-seccion-25)
usaba el **localhost** pero tuve que cambiarlo colocando la dirección ip **127.0.0.1**, ya que al ejecutar el backend no se realizaba la conexión.
3. Finalmente iniciamos el backend ejecutando el siguiente comando: ``npm run start:dev``


## Registrando Usuario en Mongo desde Backend

Una vez levantada el proyecto, registramos un usuarios a nuestro backend:

````bash
curl -v -X POST -H "Content-Type: application/json" -d "{\"name\": \"Karen\", \"email\": \"karen@gmail.com\", \"password\": \"123456\"}" http://localhost:3000/auth/register

--- Response
>
< HTTP/1.1 201 Created
<
{
    "user":
        {
            "email":"karen@gmail.com",
            "name":"Karen",
            "isActive":true,
            "roles":["user"],
            "_id":"64d51e60d22a330cbd68a7d8",
            "__v":0
        },
    "token":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0ZDUxZTYwZDIyYTMzMGNiZDY4YTdkOCIsImlhdCI6MTY5MTY4ODU0NCwiZXhwIjoxNjkxNzEwMTQ0fQ.U6-HOwz0HWrtjMVvjnRTQlzrYyrJjF7nVTkzORqVoBY"
}
````
