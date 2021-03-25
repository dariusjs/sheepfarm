import { execute } from "./dynamo";

export async function sheepQuery(){
  const data = await execute({
    "TableName": "sheepfarm",
    "IndexName": "assets",
    "KeyConditionExpression": "#bef90 = :bef90",
    "ExpressionAttributeNames": {"#bef90":"type"},
    "ExpressionAttributeValues": {":bef90": "sheep"}
  });
  return data
}

export async function sheepShearingQuery(){
  const data = await execute({
    "TableName": "sheepfarm",
    "IndexName": "assets",
    "KeyConditionExpression": "#bef90 = :bef90",
    "ExpressionAttributeNames": {"#bef90":"type"},
    "ExpressionAttributeValues": {":bef90": "shearing"}
  });
  return data
}
export async function perishableQuery(){
  const data = await execute({
    "TableName": "sheepfarm",
    "IndexName": "assets",
    "KeyConditionExpression": "#bef90 = :bef90",
    "ExpressionAttributeNames": {"#bef90":"type"},
    "ExpressionAttributeValues": {":bef90": "perishable"}
  });
  return data
}

export async function equipmentQuery(){
  const data = await execute({
    "TableName": "sheepfarm",
    "IndexName": "assets",
    "KeyConditionExpression": "#bef90 = :bef90",
    "ExpressionAttributeNames": {"#bef90":"type"},
    "ExpressionAttributeValues": {":bef90": "equipment"}
  });
  return data
}