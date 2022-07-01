import { faker } from "@faker-js/faker";
import { User, ChatMessage } from "repo-types";


export default function (msg: string): ChatMessage {

    const random = (min: number, max: number) => min + Math.floor(Math.random() * (max - min + 1));

    const generateUser = (): User => (
        {
            id: faker.datatype.uuid(),
            email: faker.internet.email(),
            username: faker.internet.userName(),
            tier: random(0, 5),
        }
    );

    return {
        id: faker.datatype.uuid(),
        user: generateUser(),
        payload: msg,
        timestamp: (new Date()).getTime()
    };
}