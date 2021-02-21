# Sample SheepFarm
A demo app to show Single Table DynamoDB design.
#### Required Local DynamoDB
sudo docker run  -p 8000:8000 amazon/dynamodb-local -jar DynamoDBLocal.jar -sharedDb
#### Execute Nodemon to run the server
ts-node --project tsconfig.server.json server/index.ts

#### DynamoDB WorkBench File
[WorkBench FIle](./architecture/sheepfarm_workbench.json)

#### SheepFarm Entity View
![SheepFarm.png](./architecture/SheepFarm.png)