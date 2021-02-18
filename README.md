# Getting Started with HendricksPOS

This project was created using MongoDB + Express + React + NodeJS.

For the database connection, I've integrated with MongoDbAtlas so that reviewer can view the data which I've created while doing testing for CRUD API.

## Steps to start :
1) Download / clone the project from GitHub.

2) run "npm install" ( to download project dependencies )

3)run "npm run dev" to start the project backend + frontend

### Once localhost / app is started :
## Menu API
# POST
Postman api: "localhost:5000/api/menu"
request body example :
{
	"name":"Mee Rojak",
	"price":"3.50"
}

# GET
Postman api: "localhost:5000/api/menus"

# PUT
Postman api: "localhost:5000/api/menu/{:id}"

request body example :
{
        "name": "Mee Rojak",
        "price": "4.00"
}

# DELETE
Postman api: "localhost:5000/api/menu/{:id}"


## Order API
