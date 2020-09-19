import { token } from '../../config'
import { app } from '../../index'

export const postMessage = (channel: string, blocks?: any[], text = '') =>
	app.client.chat.postMessage({
		channel,
		text,
		blocks,
		token,
	})

export const postMessageCurry = (channel: string) => (
	blocks?: any[],
	text = ''
) =>
	app.client.chat.postMessage({
		channel,
		text,
		blocks,
		token,
	})

export const postEphemeral = (
	channel: string,
	user: string,
	blocks?: any[],
	text = ''
) =>
	app.client.chat.postEphemeral({
		channel,
		text,
		blocks,
		token,
		user,
	})

export const postEphemeralCurry = (channel: string) => (
	user: string,
	blocks?: any[],
	text = ''
) =>
	app.client.chat.postEphemeral({
		channel,
		text,
		blocks,
		token,
		user,
	})
