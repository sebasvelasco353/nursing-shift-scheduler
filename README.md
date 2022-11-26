# nursing-shift-scheduler
This is a project developed as a Front End test, the file "FE take home test.pdf" contains the description of what does this project needs to show and do.

## Server
To run the server first ```cd server``` folder and run ```node server.js```, this will run the server on port 9001.

###GET /shifts
Returns a JSON object with an array of shifts, each shift has an id, a start and end UTC datetime, a nurse ID (or null), and a qualification level (either CNA, LPN, or RN).

###GET /nurse
Returns a JSON object with an array of nurses, each nurse has an id, a first and last name, a username, and a qualification level.

### PUT /shifts/${shift_id}
A save routine that, given a shift ID in the route, and a nurse ID in the body, simulates saving the nurse to the given shift (this could either be a dumb auto-succeed passthrough or run some server-side validation that the nurse is qualified and capable of working that shift)

## Client
The client is a React application created using vite
