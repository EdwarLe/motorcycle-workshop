# ACADEMLO MOTORS

###### Aquí encontrarás los **ENDPOINTS** del proyecto realizado.

### Users

|  Verb  |               EndPoint               | Description |
|--------|--------------------------------------|-------------|
|  GET   | http://localhost:3001/api/v1/user    | Busqueda de todos los usuarios|
|  POST  | http://localhost:3001/api/v1/user    | Creación de usuario|
|  GET   | http://localhost:3001/api/v1/user/id | Busqueda de usuario por id|
| PATCH  | http://localhost:3001/api/v1/user/id | Actualización usuario |
| DELETE | http://localhost:3001/api/v1/user/id | Eliminación de usuario|


### Repairs

|  Verb  |               EndPoint               | Description |
|--------|--------------------------------------|-------------|
|  GET   | http://localhost:3001/api/v1/repair    | Busqueda de todos las citas pendientes|
|  POST  | http://localhost:3001/api/v1/repair    | Creación de citas para mantenimiento|
|  GET   | http://localhost:3001/api/v1/repair/id | Busqueda de cita por id|
| PATCH  | http://localhost:3001/api/v1/repair/id | Actualización de cita para completar |
| DELETE | http://localhost:3001/api/v1/repair/id | Cancelación de cita|