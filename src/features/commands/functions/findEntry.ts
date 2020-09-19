import { AckFn } from '@slack/bolt'
import { currentDate } from '../../../shared/time/index'
import { app } from '../../../index'
import { token } from '../../../config'

export async function findEntry(ack: AckFn<any>, trigger_id: string) {
	await ack()

	await app.client.views.open({
		trigger_id,
		token,
		view: {
			type: 'modal',
			title: {
				text: 'Get',
				type: 'plain_text',
			},
			callback_id: 'findEntry',
			blocks: [
				{
					type: 'header',
					text: {
						type: 'plain_text',
						text: 'Find a journal entry',
					},
				},
				{
					type: 'section',
					text: {
						type: 'mrkdwn',
						text: '_By Date_',
					},
				},
				{
					type: 'input',
					element: {
						type: 'datepicker',
						initial_date: currentDate(),
						placeholder: {
							type: 'plain_text',
							text: 'Select a date',
							emoji: true,
						},
						action_id: 'value',
					},
					label: {
						type: 'plain_text',
						text: 'Date',
						emoji: true,
					},
					optional: true,
					block_id: 'entryDate',
				},
				{
					type: 'divider',
				},
				{
					type: 'section',
					text: {
						type: 'mrkdwn',
						text: '_By Id_',
					},
				},
				{
					type: 'input',
					block_id: 'entryId',
					label: {
						type: 'plain_text',
						text: 'What is your entry ID?',
					},
					element: {
						type: 'plain_text_input',
						action_id: 'value',
						multiline: false,
					},
					optional: true,
				},
			] as any[],
			submit: {
				text: 'Submit',
				type: 'plain_text',
			},
		},
	})
}
