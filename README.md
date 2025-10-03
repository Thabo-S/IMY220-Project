# DOCKER DEPLOYMENT COMMANDS - PORT 5000

PREREQUISITES:
- Docker installed on your system
- Application files in current directory

## BUILD AND RUN:

1. Build the Docker image:
   docker build -t repo-river .

2. Run container mapping host port 5000 to container port 3000:
   docker run -p 5000:3000 --name repo-river-container repo-river

3. Run with auto-restart on failure:
   docker run -d --restart unless-stopped -p 5000:3000 --name repo-river-container repo-river

MANAGEMENT COMMANDS:

4. Stop the container:
   docker stop repo-river-container

5. Start stopped container:
   docker start repo-river-container

6. Remove the container:
   docker rm repo-river-container

7. Remove the image:
   docker rmi repo-river

8. View running containers:
   docker ps

APPLICATION ACCESS:
- Frontend: http://localhost:5000
- Login: POST http://localhost:5000/api/auth/login
- Signup: POST http://localhost:5000/api/auth/signup

# TESTING THE APPLICATION:

# Test with sample login 
curl -X POST http://localhost:5000/api/auth/login \
   "email":"john@example.com","password":"password123"