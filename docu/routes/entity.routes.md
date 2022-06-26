# Entity routes

## Prototype level
### create
#### Evaluation
type: post <br>
route: /eval/create <br>
returns: _id <br>
success status: 201 <br>
fail status: ? <br>
#### Request
type: post <br>
route: /req/create <br>
returns: _id <br>
success status: 201 <br>
fail status: ? <br>
#### Ride
type: post <br>
route: /ride/create <br>
returns: _id <br>
success status: 201 <br>
fail status: ? <br>
#### Vehicle
type: post <br>
route: /vehicle/create <br>
returns: _id <br>
success status: 201 <br>
fail status: ? <br>

### get
#### Evaluation (one)
type: get <br>
route: /eval/findById/:id <br>
returns: Eval (JSON) <br>
success status: 200 <br>
fail status: ? <br>
#### Evaluation (all)
type: get <br>
route: /eval/findAll <br>
returns: Eval[] (JSON)<br>
success status: 200 <br>
fail status: ? <br>
#### Request (one)
type: get <br>
route: /req/findById/:id <br>
returns: Request (JSON)<br>
success status: 200 <br>
fail status: ? <br>
#### Request (all)
type: get <br>
route: /req/findAll <br>
returns: Request[] (JSON) <br>
success status: 200 <br>
fail status: ? <br>
#### Ride (one)
type: get <br>
route: /ride/findById/:id <br>
returns: Ride (JSON) <br>
success status: 200 <br>
fail status: ? <br>
#### Ride (all)
type: get <br>
route: /ride/findAll <br>
returns: Rides[] (JSON) <br>
success status: 200 <br>
fail status: ? <br>
#### Vehicle (one)
type: get <br>
route: /vehicle/findById/:id <br>
returns: Vehicle (JSON)<br>
success status: 200 <br>
fail status: ? <br>
#### Vehicle (one)
type: get <br>
route: /vehicle/findAll <br>
returns: Vehicle[] (JSON)<br>
success status: 200 <br>
fail status: ? <br>

### delete
#### Evaluation
type: delete <br>
route: /eval/delete/:id <br>
returns: Evaluation (JSON) <br>
success status: 200 <br>
fail status: 404, 401 (if not authorized), 403 (if you are authorized, but it is not yours)
#### Request
type: delete <br>
route: /req/delete/:id <br>
returns: Request (JSON) <br>
success status: 200 <br>
fail status: 404, 401 (if not authorized), 403 (if you are authorized, but it is not yours)
#### Ride
type: delete <br>
route: /ride/delete/:id <br>
returns: Ride (JSON) <br>
success status: 200 <br>
fail status: 404, 401 (if not authorized), 403 (if you are authorized, but it is not yours)
#### Vehicle
type: delete <br>
route: /vehicle/delete/:id <br>
returns: Request (JSON) <br>
success status: 200 <br>
fail status: 404, 401 (if not authorized), 403 (if you are authorized, but it is not yours)

### update
#### User
type: post <br>
route: .../update/:id <br>
body: new values <br>
returns: ? <br>
success status: 200 <br>
fail status: 404, 401 (if not authorized), 403 (if you are authorized, but it is not yours)
#### Request
type: post <br>
route: .../update/:id <br>
body: new values <br>
returns: ? <br>
success status: 200 <br>
#### Ride
type: post <br>
route: .../update/:id <br>
body: new values <br>
returns: ? <br>
success status: 200 <br>
fail status: 404, 401 (if not authorized), 403 (if you are authorized, but it is not yours)

## N**i**ce to have

## update
#### Vehicle
#### Evaluation


### tracking Requests only if logged in and involved in the ride (accepted request)