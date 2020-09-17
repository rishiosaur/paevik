import { token } from '../config';
import { app } from '../index';


export const postMessage = (channel: string, blocks?: (any)[], text: string = "") => {
    return app.client.chat.postMessage({
        channel: channel,
        text: text,
        blocks: blocks,
        token: token
    })
}

export const updateBlockMessage = (channel: string, ts: string, blocks?: (any)[]) => {
    return app.client.chat.update({
        token,
        ts,
        channel,
        blocks
    })
}

export const postMessageCurry = (channel: string) => (blocks?: (any)[], text: string = "") => {
    return app.client.chat.postMessage({
        channel: channel,
        text: text,
        blocks: blocks,
        token: token
    })
}

export const postEphemeral = (channel: string, user: string, blocks?: (any)[], text: string = "") => {
    return app.client.chat.postEphemeral({
        channel: channel,
        text: text,
        blocks: blocks,
        token: token,
        user: user
    })
}

export const postEphemeralCurry = (channel: string) => (user: string, blocks?: (any)[], text: string = "") => {
    return app.client.chat.postEphemeral({
        channel: channel,
        text: text,
        blocks: blocks,
        token: token,
        user: user
    })
}