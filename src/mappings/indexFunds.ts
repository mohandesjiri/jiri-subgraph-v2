import { log } from "@graphprotocol/graph-ts"
import {
	BalancedInvested,
	BalancedRedeemed,
	Invested,
	Redeemed,
} from '../../generated/IndexFund/IndexFund'

import { IndexFund } from "../../generated/schema"
import {getIndexFundId, updateIndexFundInfo} from "../helpers/indexFunds";


export function handleBalancedInvested(event: BalancedInvested): void {
	const to = event.transaction.to
	if (!to) {
		log.warning('ignored handle balanced invest for event did not have transaction.to', [])
		return
	}
	if (to) {
		let indexFundId = getIndexFundId(to)
		const indexFundEntity = IndexFund.load(indexFundId)
		if (!indexFundEntity) {
			log.warning('ignored handle balanced invest for event which did not associate by any existence index fund', [])
			return
		}
		updateIndexFundInfo(to, indexFundEntity)
	}
}

export function handleBalancedRedeemed(event: BalancedRedeemed): void {
	const to = event.transaction.to
	if (!to) {
		log.warning('ignored handle balanced redeem for event did not have transaction.to', [])
		return
	}
	if (to) {
		let indexFundId = getIndexFundId(to)
		const indexFundEntity = IndexFund.load(indexFundId)
		if (!indexFundEntity) {
			log.warning('ignored handle balanced redeem for event which did not associate by any existence index fund', [])
			return
		}
		updateIndexFundInfo(to, indexFundEntity)
	}
}

export function handleInvested(event: Invested): void {
	const to = event.transaction.to
	if (!to) {
		log.warning('ignored handle unbalanced invest for event did not have transaction.to', [])
		return
	}
	if (to) {
		let indexFundId = getIndexFundId(to)
		const indexFundEntity = IndexFund.load(indexFundId)
		if (!indexFundEntity) {
			log.warning('ignored handle unbalanced invest for event which did not associate by any existence index fund', [])
			return
		}
		updateIndexFundInfo(to, indexFundEntity)
	}
}

export function handleRedeemed(event: Redeemed): void {
	const to = event.transaction.to
	if (!to) {
		log.warning('ignored handle unbalanced redeem for event did not have transaction.to', [])
		return
	}
	if (to) {
		let indexFundId = getIndexFundId(to)
		const indexFundEntity = IndexFund.load(indexFundId)
		if (!indexFundEntity) {
			log.warning('ignored handle unbalanced redeem for event which did not associate by any existence index fund', [])
			return
		}
		updateIndexFundInfo(to, indexFundEntity)
	}
}
