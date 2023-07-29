import AWS from "aws-sdk";

const dynamoDB = new AWS.DynamoDB.DocumentClient();

export const scanTable = async (params: any) => {
    const scanResults: any[] = [];
    let items;
    do {
        items = await dynamoDB.scan(params).promise();
        if (items.Items) {
            items.Items.forEach((item) => scanResults.push(item));
        }
        params.ExclusiveStartKey = items.LastEvaluatedKey;
    } while (typeof items.LastEvaluatedKey !== "undefined");

    return scanResults;
};

