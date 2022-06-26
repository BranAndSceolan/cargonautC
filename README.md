# Cargonaut

In this project, we will create a browser-app that enables people to offer and accept rides.

Other than Uber, we put a lot of emphasis on not only the transport of passengers but also cargo of all types.

## Structure
Go to [docu](docu) for non-code elements of the project.

[src](backend/src) contains the code, while [config](config) adds some values needed for docker.

#

## Build

### mongo and node server
#### Build for Development
(starting server and backend without blocking a terminal)
``NODE_ENV=docker_dev docker-compose up --build --detach``
(starting server and backend (blocking a terminal) recommended for more information)
``NODE_ENV=docker_dev docker-compose up --build``

### start tests (very simple test for server, doesn't connect to DB)
``NODE_ENV=test_docker_free npm run test``
