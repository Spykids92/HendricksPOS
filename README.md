# Getting Started with HendricksPOS

This project was created using MongoDB + Express + React + NodeJS.

For the database connection, I've integrated with MongoDbAtlas so that reviewer can view the data which I've created while reviewing / trying the available CRUD API.

## Steps to start :
1) Download / clone the project from GitHub.

2) run "npm install" ( to download project dependencies )
*note: You may need to install npm.*

3) run "npm run dev" to start the project backend + frontend

*note*
In case you're encounter such error message :
    "Cannot read property 'prototype' of undefined when extending classes" 

Do the following steps :
MacOS:
$ lsof -i tcp:3000
$ kill -9 PID

$ lsof -i tcp:5000
$ kill -9 PID

Windows:
netstat -ano | findstr :3000
tskill typeyourPIDhere 

netstat -ano | findstr :5000
tskill typeyourPIDhere 

### Once localhost / app is started :
# Menu API
## POST
Postman api: "localhost:5000/api/menu"

request body example :

{
        "name": "Mee Rojak",
        "price": {
            "$numberDecimal": "3.00"
        }
}

## GET
Postman api: "localhost:5000/api/menus"

## PUT
Postman api: "localhost:5000/api/menu/{:id}"

request body example :

{
        "name": "Mee Rojak",
        "price": {
            "$numberDecimal": "4.50"
        }
}

## DELETE
Postman api: "localhost:5000/api/menu/{:id}"


# Order API
## POST
Postman api: "localhost:5000/api/order"

request body example :
{
	"items":[
		{"item":
			{
        		"menu_id":"602d2e5b4830b34f51ee9aff",
        		"name":"Roti Prata",
        		"price":{
        			"$numberDecimal":"1.00"
        		}
			},
    	 "qty":3,
    	 "subTotalPrice":{
        			"$numberDecimal":"3.00"
        		}
		}
	],
	"totalPrice":{
        			"$numberDecimal":"3.00"
        		}
}

## GET
Postman api: "localhost:5000/api/menus

## PUT
Postman api: "localhost:5000/api/order/{:order_id}

request body example :
{
        "totalPrice": {
            "$numberDecimal": "3.00"
        },
        "items": [
            {
                "item": {
                    "menu_id": "602d2e5b4830b34f51ee9aff",
                    "name": "Roti Prata",
                    "price": {
                        "$numberDecimal": "1.00"
                    }
                },
                "qty": 3,
                "subTotalPrice": {
                    "$numberDecimal": "3.00"
                }
            }
        ]
}

## DELETE
Postman api: "localhost:5000/api/order/{:order_id}"