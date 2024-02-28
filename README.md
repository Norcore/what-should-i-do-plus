Summary: This pet-project program is a simple To-Do list which utilizes the MERN stack (MongoDB, Express, React, Node.js) and Docker containerization technology. It allows the user to modify the To-Do list stored in the MongoDB database.

### Volume paths in the docker-compose.yml file have to be changed to reflect your local directory structure (server volume path should point at the server dir, and client volume path should point at the client dir).

### Used a .env file to assign a value to the "MONGO_URI" environment variable. Formula: "MONGO_URI=mongodb://mongo:port/your-database"


