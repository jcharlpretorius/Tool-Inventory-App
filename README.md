# Toolshop app

Instructions below...

**Database:**

Paste the contents of [ToolShop.sql](database/ToolShop.sql) into MySQL workbench

**Backend:**

create a file in backend folder called `.env`

Enter the environment variables for your MySQL connection:

```
# NODE APP ENVIRONMENT VARIABLES

NODE_ENV=development
PORT=5000

# DATABASE CONNECTION ENVIRONMENT VARIABLES

DB_HOST=localhost
DB_USER=root
DB_NAME=toolshop
DB_PASSWORD=<your password>

```

**Install node modules:**

cd into backend folder run this command:

`npm install`

**Start the server:**

`npm run backend`
