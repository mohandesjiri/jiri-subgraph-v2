import {Address, BigInt} from "@graphprotocol/graph-ts"
import {
	Masterboard,
	Approval,
	CompetitionCreated,
	IndexFundCreated,
	MutualFundCreated,
	Transfer
} from "../../generated/Masterboard/Masterboard"

import {
	IndexFund as IndexFundContact,
	IndexFund__getDistributionsResultValue0Struct as IndexFundDistribution
} from "../../generated/Masterboard/IndexFund"

import { IndexFund, IndexFundAsset } from "../../generated/schema"
import {getIndexFundAssetId} from "../helpers/indexFunds";

export function handleCompetitionCreated(event: CompetitionCreated): void {}

export function handleIndexFundCreated(event: IndexFundCreated): void {
	const indexFundId: string = event.params.deployedAddress.toHexString()
	const IndexFundAddress: Address = event.params.deployedAddress
	let entity = IndexFund.load(indexFundId)
	if (!entity) {
		entity = new IndexFund(indexFundId)
	}
	entity.address = IndexFundAddress
	entity.symbol = event.params.symbol
	let contract = IndexFundContact.bind(event.params.deployedAddress)
	entity.name = contract.name()
	let distributions: Array<IndexFundDistribution> = contract.getDistributions()
	for(let i = 0; i<distributions.length; i++) {
		let distribution = distributions[i]
		const assetId : string = getIndexFundAssetId(indexFundId, distribution.asset)
		let asset = new IndexFundAsset(assetId)
		asset.address = distribution.asset
		asset.indexFund = indexFundId
		asset.ideal = distribution.ideal
		asset.save()
	}
	entity.save()
}

export function handleMutualFundCreated(event: MutualFundCreated): void {}

