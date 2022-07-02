import { faker } from "@faker-js/faker";
import { User, ChatMessage, Emoji } from "repo-types";

const random = (min: number, max: number) => min + Math.floor(Math.random() * (max - min + 1));

const generateUser = (): User => (
    {
        id: faker.datatype.uuid(),
        email: faker.internet.email(),
        username: faker.internet.userName(),
        tier: random(0, 5),
    }
);

/** 
 * Faker generates a random sentance, lorem ipsum, with variable length
 * We then gather all posibile spaces where we can insert an emoji
 * Randomize how many emojis to insert, and insert them
 * */
const generateMessageWithEmojis = () => {

    const emojis = Object.keys(Emoji);

    const generateRandomEmoji = (emojis: string[]) => emojis[random(0, emojis.length-1)];
    
    let sentence = faker.lorem.sentence();

    const chunks = sentence.split(" ");
    const shuffled = [...Array(chunks.length+2).keys()].sort(() => 0.5 - Math.random());
    const viableSlots = shuffled.slice(0, random(0, 4)).sort();
 
    let incrementIndex = 0;
    viableSlots.forEach(index => {
        chunks.splice(index + incrementIndex, 0, generateRandomEmoji(emojis));
        incrementIndex++;
    });
   
    return chunks.reduce((acc, value) => acc += ` ${value}`, "");
};

export function generateMessage(): ChatMessage {
    return {
        id: faker.datatype.uuid(),
        user: generateUser(),
        payload: generateMessageWithEmojis(),
        timestamp: (new Date()).getTime()
    };
}

export function wrapMessage(msg: string): ChatMessage {
    return {
        id: faker.datatype.uuid(),
        user: generateUser(),
        payload: msg,
        timestamp: (new Date()).getTime()
    };
}