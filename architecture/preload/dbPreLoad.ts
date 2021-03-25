import { DynamoDBClient, CreateTableCommand, PutItemCommand, UpdateTableCommand } from "@aws-sdk/client-dynamodb";
import sheepData from '../sheepfarm.json';

const REGION = "REGION";
const tableParams = {
    KeySchema: [
        { AttributeName: "pk", KeyType: "HASH"},
        { AttributeName: "sk", KeyType: "RANGE" }
    ],
    AttributeDefinitions: [       
        { AttributeName: "pk", AttributeType: "S" },
        { AttributeName: "sk", AttributeType: "S" }
    ],
    ProvisionedThroughput: {       
        ReadCapacityUnits: 1, 
        WriteCapacityUnits: 1
    },
    GlobalSecondaryIndexUpdates: [
        {
            Create: {
                IndexName: "assets",
                KeySchema: [
                    {AttributeName: "type", KeyType: "HASH"},
                ],
                Projection: {
                    "ProjectionType": "ALL"
                },
                ProvisionedThroughput: {
                    "ReadCapacityUnits": 1,"WriteCapacityUnits": 1
                }
            }
        }
    ],
    TableName: "sheepfarm",
    StreamSpecification: {
        StreamEnabled: false,
    },
};
const gsiParams = {
    TableName: "sheepfarm",
    AttributeDefinitions: [       
        { AttributeName: "type", AttributeType: "S" },
    ],
    GlobalSecondaryIndexUpdates: [
        {
            Create: {
                IndexName: "assets",
                KeySchema: [
                    {AttributeName: "type", KeyType: "HASH"},
                ],
                Projection: {
                    "ProjectionType": "ALL"
                },
                ProvisionedThroughput: {
                    "ReadCapacityUnits": 1,"WriteCapacityUnits": 1
                }
            }
        }
    ],
};

const dbclient = new DynamoDBClient({
    endpoint: "http://localhost:8000",
    region: REGION
});

const abc = sheepData.DataModel[0].TableData
for (const element of abc) {
    console.log({
        TableName: "sheepfarm",
        Item: element,
    })

}
  
const run = async () => {
    try {
        await dbclient.send(new CreateTableCommand(tableParams));
        console.log("Table created.");

        const abc: any = sheepData.DataModel[0].TableData
        for (const element of abc) {
            await dbclient.send(new PutItemCommand({
                TableName: "sheepfarm",
                Item: element,
            }));
            console.log(element)        
        }
        console.log("Data Loaded.");
        
        await dbclient.send(new UpdateTableCommand(gsiParams));
    } catch (err) {
        console.log("Error", err);
    }
};
run();
