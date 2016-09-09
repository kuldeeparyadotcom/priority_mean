A containerized app - priority
Technology Stack: MEAN (Mongo, Express, Angular2, Nodejs)

Set up Instructions:

Step 01: Clone
clone repository.

Step 02: build Docker Image for tasksmanager micro service
Navigate to: priority_mean/taskmanager
Execute tasksmanager/buildImage.sh to build Docker image

Step 03: Configure frontend micro service to talk to tasksmanager microservice
Navigate to: priority_mean/priorityapp
update taskUrl, tasksUrl and baseUrl in the following file - 
priorityapp/app/task.service.ts

Step 04: build Docker Image for frontend micro service
Execute priorityapp/buildImage.sh to build Docker image


Step 05: Run in detached mode
Navigate to: priority_mean
docker-compose up -d


Enjoy!
