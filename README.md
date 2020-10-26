# Immfly - Backend test

## Description
The test consists on creating an API with 3 endpoints to:
- Return data abount countries from another API, allowing to filter them by country and code, and order them in ascending or descending order by their vat.
- Return the string you sent, but reversed and with its vowels converted to uppercase.
- Add to the start and/or to the end of an array the strings you provide in the query. The initial state of the array must be configurable.

Create environment variables: NODE_ENV​ , SIMPLE_ARRAY​. \
SIMPLE_ARRAY env variable will have the array that you will use to append the query params of the third endpoint.

## Installation
Inside the project folder, to install the project dependencies run the command:
~~~
npm install
~~~

## Configuration
The project can be configured for each stage, through the **.env** files found in the directory: 
> src/config/

These configuration files will be loaded according to the value of **NODE_ENV** (development, test, production).\
If NODE_ENV is not set, then by default the program will use
> src/config/.env.development

Here you can set:
- **PORT** = port value where the server will run (default 8080).
- **COUNTRIES_API_URL** = url of the API to consume to obtain the list of countries.
- **SIMPLE_ARRAY** = initial array to load for the third endpoint.
- **REQUEST_TIMEOUT** = value (ms) that the service will wait before replying **408 Request Timeout** if there is no previous response.

## To run tests
To run all the tests in the code, run the command:
~~~
npm run test
~~~

## Compile the code
To compile the typescript code, run the command:
~~~
npm run tsc
~~~

## Run the service
To start the service run the command:
~~~
npm start
~~~

## Compile the code and run the service
There also is a command to run the last two commands together:
~~~
npm run dev
~~~

## Docker
### Build
Inside the project folder, build the docker image (with your preferred image TAG):
~~~
TAG=1.0.0 ./docker_build.sh
~~~

### Run
Then to start a container from the image, run:
~~~
TAG=1.0.0 CONTAINER_PORT=8080 NODE_ENV=development ./docker_run.sh
~~~
Where:
- TAG (required): the tag of an existing image.
- CONTAINER_PORT (optional): the new container will run in this port. This allows to run multiple containers of this image on different ports. Default: 8080.
- NODE_ENV (optional): can be development, test, or production. This variable is used to know which src/config/.env.* file to load. Default: development.


## API documentation
Once the service is up, the full API documentation can be found in\
**http://localhost:8080/api-docs/** \
(or in the CONTAINER_PORT used in the docker_run.sh execution, instead of 8080)

The main endpoints are:
| Action|Method|URL|
|-|-|-|
|Fetch countries|**GET**|http://localhost:8080/countries?filter={string}&order={string}|
|Reverse string|**GET**|http://localhost:8080/reverse/{string}|
|Append to array|**POST**|http://localhost:8080/append?start={string}&end={string}|
(replace each {string} with the value you want, order can only be **asc** or **desc**)

### Responses
- Fetch countries will return:
    - If filter and order are not used in the url query: all the countries in the order they were received.
    - If both filter and order are used in the url query: only the countries with a country or code field that containing the filter string, sorted in the specified order by their vat.
    - If filter is used in the url query: only the countries with a country or code field that containing the filter string, in the order they were received.
    - If order is used in the url query: all the countries sorted in the specified order by their vat.
    - If order is used in the url query with a value other than asc or desc: error 400 with details explaining the correct values.
    - If there was an error in the request to the countries API: error 502.
- Reverse a string will return the string specified in the url (by url param), but reversed and with its vowels in uppercase.
- Append to array will return:
    - If start and end are not used in the url query: error 400 with details explaining that the fields are missing
    - If both start and end are used in the url query: the initial array with the strings added at the start and end of it. For any subsequent requests, the previosly added values will still be there, and the new ones will also be added permanently.
    - If start is used in the url query: the initial array with the string appended to the start. For any subsequent requests, the previosly added values will still be there, and the new ones will also be added permanently.
    - If end is used in the url query: the initial array with the string appended to the end. For any subsequent requests, the previosly added values will still be there, and the new ones will also be added permanently.


## Timeout Error
The service will reply **408 Request Timeout** if there was no response after a configurable amount of time.


---

## Additional information requested
- SQL: experience with MySQL
- NoSQL: experience with MongoDB
- RabbitMQ: I've used it mostly as a consumer, but also handled message manual reinsertions and acknowledgements. Used it for 2 years.
- Git: more than 7 years of experience with git.
