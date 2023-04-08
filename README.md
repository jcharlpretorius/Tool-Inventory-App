# Toolshop app

Instructions to run

**Set up Database:**

Paste the contents of [ToolShop.sql](database/ToolShop.sql) into MySQL workbench

**Set up Backend:**

create a file in backend directory called `.env`

Copy the following code, replaceing the relevant \<placeholder> environment variables for your MySQL connection:

```
# NODE APP ENVIRONMENT VARIABLES

NODE_ENV=development
PORT=5000
process.env.JWT_SECRET = <someSecretRandomStringEnteredHere>

# DATABASE CONNECTION ENVIRONMENT VARIABLES

DB_HOST=localhost
DB_USER=<user>
DB_NAME=toolshop
DB_PASSWORD=<your mysql password>

```

**Install node modules:**

cd into backend directory run this command:

`npm install`

**Start the backend server:**

cd into backend directory run this command:

`npm run backend`

**Start the React frontend:**

cd into frontend directory run this command:

`npm run start`

The application should open automatically in your browser (if using VSCode), otherwise go to http://localhost:3000/

**Logins**

Not all have been tested yet. You must use a sales associate login to make purchases. Some routes are protected in the backend

**Manager Logins**
Messi:

`email: lmessi@gmail.com`

`password: lmessi123`

Zlatan Ibrahimovic:

`email: zlatanibrah@hotmail.com`

`password: password123`

**Sales Associate Logins**
Cristiano Ronaldo:

`email: cristiano.ronaldo@yahoo.com`

`password: banana`

Diego maradona:

`email: diegomaradona@gmail.com`

`password: diegom`

Robert Lewandowski

`email: rlewandowski@hotmail.com`

`password: 12345`

Vinicous Junior

`email: vinicous@gmail.com`

`password: qwerty`

Kareem Benzema

`email: benzema.kareem@yahoo.com`

`password: asdf66`

Andy Roberts

`email: aroberts44@gmail.com`

`password: secret32`

Wayne Rooney

`email: wrooney1880@gmail.com`

`password: wrooney`

Neymar: (invalid password)

`email: neymaj@yahoo.com`

`password: red99`
