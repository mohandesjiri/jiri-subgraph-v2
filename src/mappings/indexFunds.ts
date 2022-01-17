import {Address, BigInt, log} from "@graphprotocol/graph-ts"
import {
	BalancedInvested,
	BalancedRedeemed,
	Invested,
	Redeemed,
	IndexFund as IndexFundContract, Transfer,
} from '../../generated/IndexFund/IndexFund'

import {HistoryRecord, HistoryRecordAsset, IndexFund,  } from "../../generated/schema"
import {
	updateInvestorIndexFundBalance,
	createHistoryARecordAsset,
	createHistoryRecordEntity, getHistoryARecordAssetId,
	getHistoryRecordId,
	getIndexFundId, getInvestorId, increaseHistoryRecordsCount,
	updateIndexFundInfo
} from "../helpers/indexFunds";


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
		const historyRecordEntity = createHistoryRecordEntity(event, 'BALANCED_INVEST', indexFundId)
		historyRecordEntity.shareAmount = event.params.shareAmount
		historyRecordEntity.nav = event.params.nav
		// Add history record assets
		const contract = IndexFundContract.bind(to)
		const assets = contract.getAssets()
		const investingAmount : BigInt = event.params.nav.times(event.params.shareAmount)
		for(let i: i32 = 0 ; i < assets.length ; i++) {
			const asset : Address = assets[i]
			const initial = contract.initials(asset)
			const amount = investingAmount.times(initial.value0).div(initial.value1.times(BigInt.fromString('100000000000000000000')))
			const historyRecordAsset = createHistoryARecordAsset(historyRecordEntity.id, asset, amount)
			historyRecordAsset.save()
		}
		historyRecordEntity.save()
		increaseHistoryRecordsCount(to)
		updateIndexFundInfo(to, contract, indexFundEntity)
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
		const historyRecordEntity = createHistoryRecordEntity(event, 'BALANCED_REDEEM', indexFundId)
		historyRecordEntity.shareAmount = event.params.shareAmount
		historyRecordEntity.nav = event.params.nav
		// Add history record assets
		const contract = IndexFundContract.bind(to)
		const assets = contract.getAssets()
		const investingAmount : BigInt = event.params.nav.times(event.params.shareAmount)
		for(let i : i32 = 0 ; i < assets.length ; i++) {
			const asset : Address = assets[i]
			const initial = contract.initials(asset)
			const amount = investingAmount.times(initial.value0).div(initial.value1.times(BigInt.fromString('100000000000000000000')))
			const historyRecordAssetEntity = createHistoryARecordAsset(historyRecordEntity.id, asset, amount)
			historyRecordAssetEntity.save()
		}
		historyRecordEntity.save()
		increaseHistoryRecordsCount(to)
		updateIndexFundInfo(to, contract, indexFundEntity)
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
		const historyRecordEntity = createHistoryRecordEntity(event, 'INVEST', indexFundId)
		historyRecordEntity.shareAmount = event.params.shareAmount
		historyRecordEntity.nav = event.params.nav
		historyRecordEntity.bonus = event.params.bonus
		const contract = IndexFundContract.bind(to)
		const historyRecordAssetEntity = createHistoryARecordAsset(historyRecordEntity.id, event.params.investingAsset, event.params.investingAmount)
		historyRecordAssetEntity.save()
		historyRecordEntity.save()
		increaseHistoryRecordsCount(to)
		updateIndexFundInfo(to, contract, indexFundEntity)
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
		const historyRecordEntity = createHistoryRecordEntity(event, 'REDEEM', indexFundId)
		historyRecordEntity.shareAmount = event.params.shareAmount
		historyRecordEntity.nav = event.params.nav
		historyRecordEntity.bonus = event.params.bonus
		const contract = IndexFundContract.bind(to)
		const historyRecordAssetEntity = createHistoryARecordAsset(historyRecordEntity.id, event.params.redeemingAsset, event.params.redeemingAmount)
		historyRecordAssetEntity.save()
		historyRecordEntity.save()
		increaseHistoryRecordsCount(to)
		updateIndexFundInfo(to, contract, indexFundEntity)
	}
}

export function handleTransfer(event: Transfer) : void {
	const indexFundAddress: Address | null = event.transaction.to
	if(!indexFundAddress) {
		//log.warning('Ignore transfer event without transaction.to association!', [])
		return
	}
	const indexFundId: string = getIndexFundId(indexFundAddress)
	const indexFundEntity = IndexFund.load(indexFundId)
	if(!indexFundEntity) {
		//log.warning('Ignore transfer event without index fund entity association!', [])
		return
	}
	const indexFundContract = IndexFundContract.bind(indexFundAddress)

	//Mint situation
	if(event.params.from.toHexString() === Address.zero().toHexString()) {
		updateInvestorIndexFundBalance(event.transaction.from, indexFundAddress, indexFundContract)
		return
	}
	//Burn situation
	if(event.params.to.toHexString() === Address.zero().toHexString()) {
		updateInvestorIndexFundBalance(event.transaction.from, indexFundAddress, indexFundContract)
		return;
	}
	//Transfer tokens
	updateInvestorIndexFundBalance(event.params.from, indexFundAddress, indexFundContract)
	updateInvestorIndexFundBalance(event.params.to, indexFundAddress, indexFundContract)
}
