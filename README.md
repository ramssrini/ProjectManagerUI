# TaskManagerAppCaseStudyOne
This application built using Angular JS with Docker container, in order to run the application, follow the below steps

Build docker image 
Clone the source code. Navigate to the application folder and build the application using the following command
Command:  docker build --rm -f "Dockerfile" -t ramssrini/taskmanagerappcasestudyone:latest .

Run the docker images 
Command: docker run -p 4200:4200 ramssrini/taskmanagerappcasestudyone:latest 

