# Toolshop app

Instructions to run

**Set up Database:**

Paste the contents of [ToolShop.sql](database/ToolShop.sql) into MySQL workbench

**Set up Backend:**

create a file in backend folder called `.env`

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

cd into backend folder run this command:

`npm install`

**Start the server:**

`npm run backend`

**Logins**
email: lmessi@gmail.com
password: lmessi123

email: cristiano.ronaldo@yahoo.com
password: banana

email: neymaj@yahoo.com
password: red99

email: diegomaradona@gmail.com
password: diegom

email: zlatanibrah@hotmail.com
password: password123

email: rlewandowski@hotmail.com
password: 12345

email: vinicous@gmail.com
password: qwerty

email: benzema.kareem@yahoo.com
password: asdf66

email: aroberts44@gmail.com
password: secret32

email: wrooney1880@gmail.com
password: wrooney
