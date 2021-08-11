# Speer backend task

I have completed the Task 2 - Section 1

Build a stock market tracking system.

> Your system should have support for users to login/logout.

> Users should be able to add balance to their wallet.

> Users should be able to buy/sell shares (transactions need not be stored)

> Users should be able to subscribe to an endpoint that should provide live rates.

> Users should have the ability to see their portfolio

~ USER MANUAL ~

All the logic is in the Index.js file

Open your Postman

Test Login by send POST request to http://localhost:3000/login -> response: OK

Test Logout by send POST request to http://localhost:3000/logout -> response: OK

Process:

Login by send POST request to http://localhost:3000/login -> response: OK

*** Must login first to do the tasks below ***

View balance in wallet by send GET request to http://localhost:3000/chanh/balance -> response: 0

Add balance to wallet by send POST request to http://localhost:3000/chanh/balance/add with the json body:

{
	"username": *default*,
	"password": *default*,
	"amount": "10000"
}

-> response: OK

View Balance in wallet by send GET request to http://localhost:3000/chanh/balance -> response: 10000

View Portfolio by send GET request to http://localhost:3000/chanh/shares -> response: []

Buy by send POST request to http://localhost:3000/chanh/shares/buy with the json body:

{
	"username": *default*,
	"password": *default*,
	"amount": "10",
  "code": "VUS" 
} 

-> response: OK

View Portfolio by send GET request to http://localhost:3000/chanh/shares -> response: { VUS: 10 }

View balance in wallet by send GET request to http://localhost:3000/chanh/balance -> response: 9500

Sell by send POST request to http://localhost:3000/chanh/shares/sell with the json body:

{
	"username": *default*,
	"password": *default*,
	"amount": "5",
  "code": "VUS" 
} 

-> response: OK

View Portfolio by send GET request to http://localhost:3000/chanh/shares -> response: { VUS: 5 }

View balance in wallet by send GET request to http://localhost:3000/chanh/balance -> response: 9750

NOTE: 

*You can add many different type of shares to your wallet or add more balance to your wallet by doing the same process above. 

*Each share has different price so it reflects your balance. As shown below:

View Live Rates by send GET request to http://localhost:3000/rates -> response:
{
  QQQ: 12,
  VUS: 50,
  VTI: 96,
  APPL: 65,
  SHOP: 16
}

NOTE: The api handles some of the errors such as Authorization, Buy/ Sell invalid shares, invalid balance to make a purchase and invalid user's action rather an "buy" or "sell"

Enjoy!
