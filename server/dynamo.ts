import AWS from 'aws-sdk';


let documentClient = new AWS.DynamoDB.DocumentClient( {
  credentials: {
    accessKeyId: "1234",
    secretAccessKey: "1234"
  },
  region: "eu-west-1",
  endpoint: "http://localhost:8000",
  convertEmptyValues: true
});

// Create the input for getItem call
const getItemInput = createGetItemInput();

// Call DynamoDB's getItem API
// export default (async () => {
//   const data = await executeGetItem(documentClient, getItemInput);
//   console.log("hi");
//   console.log(data);
// })();

export async function execute(){
  const data = await executeGetItem(documentClient, getItemInput);
  return data.Item
}

function createGetItemInput() {
  return {
    "TableName": "sheepfarm",
    "Key": {
      "pk": "id#dolly",
      "sk": "type#sheep"
    }
  }
}

// export async function executeGetItem(dynamoDbClient: any, getItemInput: any}) {
async function executeGetItem(documentClient: AWS.DynamoDB.DocumentClient, getItemInput: any) {
  // Call DynamoDB's getItem API
  try {
    const getItemOutput = await documentClient.get(getItemInput).promise();
    console.info('GetItem executed successfully.');
    return getItemOutput
  } catch (err) {
    handleGetItemError(err);
    return err
  }
}

// Handles errors during GetItem execution. Use recommendations in error messages below to 
// add error handling specific to your application use-case. 
function handleGetItemError(err: any) {
  if (!err) {
    console.error('Encountered error object was empty');
    return;
  }
  if (!err.code) {
    console.error(`An exception occurred, investigate and configure retry strategy. Error: ${JSON.stringify(err)}`);
    return;
  }
  // here are no API specific errors to handle for GetItem, common DynamoDB API errors are handled below
  handleCommonErrors(err);
}

function handleCommonErrors(err: any) {
  switch (err.code) {
    case 'InternalServerError':
      console.error(`Internal Server Error, generally safe to retry with exponential back-off. Error: ${err.message}`);
      return;
    case 'ProvisionedThroughputExceededException':
      console.error(`Request rate is too high. If you're using a custom retry strategy make sure to retry with exponential back-off.` 
        + `Otherwise consider reducing frequency of requests or increasing provisioned capacity for your table or secondary index. Error: ${err.message}`);
      return;
    case 'ResourceNotFoundException':
      console.error(`One of the tables was not found, verify table exists before retrying. Error: ${err.message}`);
      return;
    case 'ServiceUnavailable':
      console.error(`Had trouble reaching DynamoDB. generally safe to retry with exponential back-off. Error: ${err.message}`);
      return;      
    case 'ThrottlingException':
      console.error(`Request denied due to throttling, generally safe to retry with exponential back-off. Error: ${err.message}`);
      return;
    case 'UnrecognizedClientException':
      console.error(`The request signature is incorrect most likely due to an invalid AWS access key ID or secret key, fix before retrying.` 
        + `Error: ${err.message}`);
      return;
    case 'ValidationException':
      console.error(`The input fails to satisfy the constraints specified by DynamoDB, `
        + `fix input before retrying. Error: ${err.message}`);
      return;
    case 'RequestLimitExceeded':
      console.error(`Throughput exceeds the current throughput limit for your account, `
        + `increase account level throughput before retrying. Error: ${err.message}`);
      return;
    default:
      console.error(`An exception occurred, investigate and configure retry strategy. Error: ${err.message}`);
      return;
  }
}
