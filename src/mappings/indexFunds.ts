import { log } from "@graphprotocol/graph-ts"
import {
	BalancedInvested,
	BalancedRedeemed,
	Invested,
	Redeemed,
} from '../../generated/IndexFund/IndexFund'

import { IndexFund } from "../../generated/schema"
import { updateIndexFundPortfolio } from "../helpers/indexFunds";


export function handleBalancedInvested(event: BalancedInvested): void {
	let indexFundId : string | null  = null
	if (event.transaction.to) {
		indexFundId = event.transaction.to.toHexString()
	} else {
		log.warning('ignored handle balanced invest for event did not have transaction.to', [])
		return
	}
	const indexFundEntity = IndexFund.load(indexFundId)
	if (!indexFundEntity) {
		log.warning('ignored handle balanced invest for event which did not associate by any existence index fund', [])
		return
	}
	updateIndexFundPortfolio(event.transaction.to)
}

export function handleBalancedRedeemed(event: BalancedRedeemed): void {
	let indexFundId : string | null  = null
	if (event.transaction.to) {
		indexFundId = event.transaction.to.toHexString()
	} else {
		log.warning('ignored handle balanced redeem for event did not have transaction.to', [])
		return
	}
	const indexFundEntity = IndexFund.load(indexFundId)
	if (!indexFundEntity) {
		log.warning('ignored handle balanced redeem for event which did not associate by any existence index fund', [])
		return
	}
	updateIndexFundPortfolio(event.transaction.to)
}

export function handleInvested(event: Invested): void {
	let indexFundId : string | null  = null
	if (event.transaction.to) {
		indexFundId = event.transaction.to.toHexString()
	} else {
		log.warning('ignored handle unbalanced invest for event did not have transaction.to', [])
		return
	}
	const indexFundEntity = IndexFund.load(indexFundId)
	if (!indexFundEntity) {
		log.warning('ignored handle unbalanced invest for event which did not associate by any existence index fund', [])
		return
	}
	updateIndexFundPortfolio(event.transaction.to)
}

export function handleRedeemed(event: Redeemed): void {
	let indexFundId : string | null  = null
	if (event.transaction.to) {
		indexFundId = event.transaction.to.toHexString()
	} else {
		log.warning('ignored handle unbalanced redeem for event did not have transaction.to', [])
		return
	}
	const indexFundEntity = IndexFund.load(indexFundId)
	if (!indexFundEntity) {
		log.warning('ignored handle unbalanced redeem for event which did not associate by any existence index fund', [])
		return
	}
	updateIndexFundPortfolio(event.transaction.to)
}
