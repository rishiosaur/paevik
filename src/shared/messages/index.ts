import { journal_channel, token } from '../../config'

import { app } from '../../index'

export const postMessage = (
	channel: string,
	blocks?: any[],
	text = '',
	icon_url?: string,
	username?: string
) =>
	icon_url && username
		? app.client.chat.postMessage({
				channel,
				text,
				blocks,
				token,
				username,
				icon_url,
		  })
		: app.client.chat.postMessage({
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

export const postEphemeralDMCurry = (user: string) => (
	blocks?: any[],
	text = ''
) => app.client.chat.postEphemeral({ user, channel: user, token, text, blocks })

export const getPermalink = async (channel, ts): Promise<string> =>
	(
		await app.client.chat.getPermalink({
			token,
			channel,
			message_ts: ts,
		})
	).permalink as string

export const getPermalinkCurry = (channel) => (ts) => getPermalink(channel, ts)

export const getPermalinkFromJournalChannel = (ts) =>
	getPermalinkCurry(journal_channel)(ts)
