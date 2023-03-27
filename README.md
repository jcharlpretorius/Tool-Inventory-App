# Toolshop app

Instructions to run

**Set up Database:**

Paste the contents of [ToolShop.sql](database/ToolShop.sql) into MySQL workbench

**Set up Backend:**

create a file in backend folder called `.env`

Copy the following code, replaceing the \<placeholder> environment variables for your MySQL connection:

```
# NODE APP ENVIRONMENT VARIABLES

NODE_ENV=development
PORT=5000

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
