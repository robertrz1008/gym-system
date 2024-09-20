## Sistema de Gimnacios

## 🚀 Descripción
Una aplicación web, para gestión de gimnasios, facilita el control de las membresías, atreves de registros de transacciones, permite reportes de las mismas y cuenta con gráficos estadísticos sobre ingresos.

## 💻 Tecnologias
* React.js
* Node.js
* PostgreSQL

## ⚙️ Instalación del Proyecto
Para configurar y ejecutar este proyecto en tu entorno de desarrollo:
1. Clona el repositorio:
    ```bash
    git clone https://github.com/robertrz1008/gym-system.git
    ```
2. Navega al directorio del proyecto:
    ```bash
    cd gym-sistem 
    

##  Configuración del Back End
1. Accede a la carpeta **backtend**:
```bash
cd backend
```
2. Instala las dependencias:
```bash
npm install
```
2. crear una base de datos llamado "gymdb".

3. En el archivo  **query.sql** dentro de la carpeta **db** copiar todo el script y pegarlo en su cliente de postgres, que conformara todas las tabla de la base de datos.

4. Modifica el codigo del archivo **conectiondb.ts** segun la configuracion de gestor de su base de datos postgres
```ts
import pgSql from "pg"

const connectdb = new pgSql.Pool({
    host: "Localhost",
    user: "postgres",
    port: 5432, 
    password: "****",
    database: "gymdb",
})

export default connectdb
```

5. Ejecuta el servidor escribiendo en su teminal:
```bash
npm run dev
```
##  Configuración del Front End
1. Accede a la carpeta **frontend**:
```bash
cd frontendP
```
2. Instala las dependencias:
```bash
npm install
```
3. Ejecuta el cliente escribiendo en su teminal:
```bash
npm run dev
```