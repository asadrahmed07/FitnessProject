# My Fitness Project

## A Microservice architechted fitness app with AI recommendations

This is Spring Boot Microservice based application, consist of multiple microservices communicating between each other synchronously through WebClient and asynchronously through apache kafka.
For Frontend I am using React, I have also included a registry Eureka Server, a centralised property manager as Config server and for a AI Generated opinion on Workouts we are also communicating to Google Gemini open API. For Robut Identity and Access Management I have used KeyCloak(IAM).
All these microservices interacted with Frontend through and API-Gateway, for better understanding refere below flow diagram:

<img width="1471" height="748" alt="image" src="https://github.com/user-attachments/assets/80a7ef52-a9c7-4d19-b03d-4b2d883150df" />


