import { execute } from "./dynamo";

export async function sheepQuery(){
  const data = await execute({
    "TableName": "sheepfarm",
    "IndexName": "assets",
    "KeyConditionExpression": "#bef90 = :bef90",
    "ExpressionAttributeNames": {"#bef90":"type"},
    "ExpressionAttributeValues": {":bef90": "type#sheep"}
  });
  return data
}

export async function sheepShearingQuery(){
  const data = await execute({
    "TableName": "sheepfarm",
    "IndexName": "assets",
    "KeyConditionExpression": "#bef90 = :bef90",
    "ExpressionAttributeNames": {"#bef90":"type"},
    "ExpressionAttributeValues": {":bef90": "type#shearing"}
  });
  return data
}
export async function perishableQuery(){
  const data = await execute({
    "TableName": "sheepfarm",
    "IndexName": "assets",
    "KeyConditionExpression": "#bef90 = :bef90",
    "ExpressionAttributeNames": {"#bef90":"type"},
    "ExpressionAttributeValues": {":bef90": "type#perishable"}
  });
  return data
}

export async function equipmentQuery(){
  const data = await execute({
    "TableName": "sheepfarm",
    "IndexName": "assets",
    "KeyConditionExpression": "#bef90 = :bef90",
    "ExpressionAttributeNames": {"#bef90":"type"},
    "ExpressionAttributeValues": {":bef90": "type#equipment"}
  });
  return data
}