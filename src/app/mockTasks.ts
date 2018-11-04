import { TaskVO } from "./task";

export const TASKS : TaskVO[] = [{
    "taskId": 1,
    "parentTaskId": 100,
    "task": "Angular Training",
    "parentTask": "Training",
    "startDate": "03/09/2018",
    "endDate": "06/02/2018",
    "priority": 14
  }, {
    "taskId": 2,
    "parentTaskId": 100,
    "task": "React Training",
    "parentTask": "Training",
    "startDate": "08/23/2018",
    "endDate": "01/09/2018",
    "priority": 25
  }, {
    "taskId": 6,
    "parentTaskId": 101,
    "task": "Requirement gathering",
    "parentTask": "Requirement",
    "startDate": "07/26/2018",
    "endDate": "09/25/2018",
    "priority": 15
  }, {
    "taskId": 7,
    "parentTaskId": 110,
    "task": "Coding UI",
    "parentTask": "Construction",
    "startDate": "02/16/2018",
    "endDate": "02/04/2018",
    "priority": 1
  }, {
    "taskId": 3,
    "parentTaskId": 100,
    "task": "Spring Boot Training",
    "parentTask": "Training",
    "startDate": "10/21/2017",
    "endDate": "12/25/2017",
    "priority": 22
  }, {
    "taskId": 15,
    "parentTaskId": 110,
    "task": "Spring Restful web service development",
    "parentTask": "Construction",
    "startDate": "12/09/2017",
    "endDate": "01/03/2018",
    "priority": 17
  }, {
    "taskId": 16,
    "parentTaskId": 122,
    "task": "Unit Testing",
    "parentTask": "Testing",
    "startDate": "10/29/2017",
    "endDate": "07/24/2018",
    "priority": 18
  }, {
    "taskId": 17,
    "parentTaskId": 122,
    "task": "Integration Testing",
    "parentTask": "Testing",
    "startDate": "08/07/2018",
    "endDate": "07/29/2018",
    "priority": 20
  }, {
    "taskId": 20,
    "parentTaskId": 120,
    "task": "Build deployment",
    "parentTask": "Deployment",
    "startDate": "02/12/2018",
    "endDate": "04/22/2018",
    "priority": 1
  }, {
    "taskId": 7,
    "parentTaskId": 102,
    "task": "Analysis",
    "parentTask": "A and D",
    "startDate": "08/30/2018",
    "endDate": "06/25/2018",
    "priority": 1
  }];