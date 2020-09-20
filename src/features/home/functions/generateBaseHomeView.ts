import { AppHomeOpenedEvent } from '@slack/bolt'
import { homeViewBlocks } from '../blocks/homeViewBlocks'

export async function generateBaseHomeView(event: AppHomeOpenedEvent) {
	return {
		type: 'home',
		blocks: await homeViewBlocks(event),
	}
}
