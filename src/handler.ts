import { Context, APIGatewayEvent, APIGatewayProxyResult } from "aws-lambda";
import * as axios from "axios";
import { Ability } from "./models/ability";
import { getAbilitiesCountFromHTML, getAbilitiesFromHTML } from "./parse-helper";

export async function info(
    event: APIGatewayEvent,
    context: Context
): Promise<APIGatewayProxyResult> {
    return {
        statusCode: 200,
        headers: {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Credentials': true,
          },
        body: JSON.stringify({
            message: "This API is for league-ability-quiz, and its working!",
            context,
            event,
        }),
    };
}

export async function getAbilities(
    event: APIGatewayEvent,
    context: Context
): Promise<any> {
    try {
        const axiosResponse: axios.AxiosResponse = await axios.default.request({
            url: "https://www.mobafire.com/league-of-legends/abilities",
        });

        let amountToFetch = 0;
        if (
            event.pathParameters?.amount &&
            !isNaN(parseInt(event.pathParameters.amount)) &&
            parseInt(event.pathParameters.amount) > 0
        ) {
            amountToFetch = parseInt(event.pathParameters.amount);
        }
        const abilities: Ability[] = getAbilitiesFromHTML(axiosResponse.data, amountToFetch);
        return {
            statusCode: 200,
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Credentials': true,
              },
            body: JSON.stringify({
                abilities,
                context,
                event,
            }),
        };
    } catch (e) {
        return {
            statusCode: 500,
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Credentials': true,
              },
            body: JSON.stringify({
                message: "Error: " + e,
                context,
                event,
            }),
        };
    }
}

export async function getAbilitiesCount(
    event: APIGatewayEvent,
    context: Context
): Promise<APIGatewayProxyResult> {
    const axiosResponse: axios.AxiosResponse = await axios.default.request({
        url: "https://www.mobafire.com/league-of-legends/abilities",
    });

    const count = getAbilitiesCountFromHTML(axiosResponse.data)
    return {
        statusCode: 200,
        headers: {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Credentials': true,
          },
        body: JSON.stringify({
            count: count,
            context,
            event,
        }),
    };
}