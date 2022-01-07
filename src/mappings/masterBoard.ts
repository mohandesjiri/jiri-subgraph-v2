import {Address, BigInt} from "@graphprotocol/graph-ts"
import {
	CompetitionCreated,
	IndexFundCreated,
	MutualFundCreated,
} from "../../generated/Masterboard/Masterboard"

import {
	IndexFund as IndexFundContact,
} from "../../generated/IndexFund/IndexFund"

import {HistoryRecordsCount, IndexFund, IndexFundAsset, IndexFundInitial} from "../../generated/schema"
import {
	getHistoryRecordsCountId,
	getIndexFundAssetId,
	getIndexFundId, getIndexFundInitialId,
	updateIndexFundInfo
} from "../helpers/indexFunds";

export function handleCompetitionCreated(event: CompetitionCreated): void {}

export function handleIndexFundCreated(event: IndexFundCreated): void {
	const indexFundAddress : Address = event.params.deployedAddress
	const indexFundId: string = getIndexFundId(indexFundAddress)
	let entity = IndexFund.load(indexFundId)
	if (!entity) {
		entity = new IndexFund(indexFundId)
	}
	entity.address = indexFundAddress
	entity.symbol = event.params.symbol
	let contract = IndexFundContact.bind(indexFundAddress)
	//Basics
	entity.name = contract.name()
	entity.creator = contract.creator()
	entity.maxSlippage = contract.maxSlippage()
	entity.entranceFee = contract.entranceFee()
	entity.decimals = contract.decimals()
	entity.timestamp = event.block.timestamp
	//History record counts
	const historyRecordsCountId = getHistoryRecordsCountId(indexFundAddress)
	const historyRecordsCountEntity = new HistoryRecordsCount(historyRecordsCountId)
	historyRecordsCountEntity.indexFund = indexFundId
	historyRecordsCountEntity.count = 0
	historyRecordsCountEntity.save()
	//Initials
	const assets = contract.getAssets()
	for(let i : i32 = 0 ; i < assets.length ; i++) {
		const asset : Address = assets[i]
		const initial = contract.initials(asset)
		const portion : BigInt = initial.value0
		const initialEntity = new IndexFundInitial(getIndexFundInitialId(indexFundId, asset))
		initialEntity.indexFund = indexFundId
		initialEntity.address = asset
		initialEntity.portion = portion
		initialEntity.save()
	}
	//Assets
	updateIndexFundInfo(event.params.deployedAddress, contract, entity)
	entity.save()
}

