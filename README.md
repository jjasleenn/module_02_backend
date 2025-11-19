## PROJECT OVERVIEW
The Task Management API is a node.js-based, Express-based, and TypeScript-based backend service. It offers hierarchical and verified points to control the branches, employees, and the corresponding business processes. The application of this API can be found in the cases of structured data management, CRUD operations and secure communication between the back-end.
This project includes:
1.Complete API REST, based on OpenAPI (Swagger).
2.Input validation using Joi
3.Hardening of security with Helmet.
4.Custom CORS policies
5.Automated deployment of API documentation through the use of GitHub Pages.

## INSTALLATION INSTRUCTIONS

1. Clone the repository:
git clone https://github.com/your-username/module_02_backend.git
cd module_02_backend

2.Install Dependencies:
npm install

3.Set Up Environment Variables (Create a .env file):
PORT=3000
MONGO_URI=your_mongodb_connection_string
ALLOWED_ORIGINS=http://localhost:3000

4.Run the Application
npm start 

## API Request Examples
Below are sample Postman-style examples showing how to interact with your API.

1. Create a New Branch

POST /api/v1/branches
curl --location 'http://localhost:3000/api/v1/branches' \
--header 'Content-Type: application/json' \
--data '{
"name": "Downtown Office",
"address": "123 Main Street",
"phone": "+1 (555) 123-4567"
}'

2. Get All Employees

GET /api/v1/employees
curl --location 'http://localhost:3000/api/v1/employees'

3. Update an Employee

PUT /api/v1/employees/{id}
curl --location --request PUT 'http://localhost:3000/api/v1/employees/67a2ee14c3c2045fb04e7f3e' \
--header 'Content-Type: application/json' \
--data '{
"name": "Updated Employee",
"position": "Manager",
"department": "HR",
"phone": "+1 (555) 987-6543"
}'

## Documentation Links
Public API Documentation (GitHub Pages)
https://jjasleenn.github.io/module_02_backend/

## HELMET SECURITY CONFIGURATION

The use of Helmet is made dynamic based on the mode of operation i.e. development or production of the API.

Below is the production mode:

{
  contentSecurityPolicy: false,
  hidePoweredBy: true,
  noSniff: true,
  hsts: {
    maxAge: 31536000,
    includeSubDomains: true,
    preload: true
  },
  frameguard: { action: "deny" },
  referrerPolicy: { policy: "no-referrer" }
}

## Why I choose this configuration?

1. HSTS implements HTTPS over a one-year period period, thereby mitigating the MITM attacks.

2. frameguard is used to stop clickjacking.

3. referrerPolicy protects sensitive URLs from getting exposed. 

4. noSniff has safeguards against MIME type attacks.

5. hidePoweredBy does not allow Express fingerprinting.

# CUSTOM CORS CONFIGURATION

These were stored in config/cors.ts, config/corsoption.ts

# Why I choose this configuration?

It uses three idifferent policies which are as follows:

A. Dynamic Global CORS

Application:

app.use(cors(getCorsOptions()));

Below is the development mode:

origin: true
credentials: true

Developmenrt mode allows 

All origins

It has a smooth frontend development.

Below is th production mode:

origin: process.env.ALLOWED_ORIGINS?.split(","),
credentials: true,
methods: ["GET", "POST", "PUT", "DELETE"],
allowedHeaders: ["Content-Type", "Authorization"]

It helps to:

1. Provide strict control over origins

2. Blocks unwarranted domains into reaching your API.

B. Public CORS:

{
  origin: "*",
  methods: ["GET"]
}

Used for:

Health checks

The documentation of Public Swagger.

C. Authenticated CORS

{
  origin: process.env.ALLOWED_ORIGINS?.split(","),
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE"]
}

Ensures:

Privacy of routes can be accessed only by trusted frontends.

The credentials (tokens, cookies) are only forwarded to trusted sources.

## SECURE ENVIRONMENT VARIABLE MANAGEMENT

To load in main application file which is app.ts add:

dotenv.config();

1. Never commit your .env file

2. Always add .env to .gitignore

