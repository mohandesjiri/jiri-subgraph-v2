import { Address } from "@graphprotocol/graph-ts"
import {
	CompetitionCreated,
	IndexFundCreated,
	MutualFundCreated,
} from "../../generated/Masterboard/Masterboard"

import {
	IndexFund as IndexFundContact,
} from "../../generated/IndexFund/IndexFund"

import { IndexFund, IndexFundAsset } from "../../generated/schema"
import {getIndexFundAssetId, getIndexFundId, updateIndexFundInfo} from "../helpers/indexFunds";

export function handleCompetitionCreated(event: CompetitionCreated): void {}

export function handleIndexFundCreated(event: IndexFundCreated): void {
	const indexFundId: string = getIndexFundId(event.params.deployedAddress)
	const IndexFundAddress: Address = event.params.deployedAddress
	let entity = IndexFund.load(indexFundId)
	if (!entity) {
		entity = new IndexFund(indexFundId)
	}
	entity.address = IndexFundAddress
	entity.symbol = event.params.symbol
	let contract = IndexFundContact.bind(event.params.deployedAddress)
	entity.name = contract.name()
	entity.creator = contract.creator()
	entity.maxSlippage = contract.maxSlippage()
	entity.entranceFee = contract.entranceFee()
	entity.decimals = contract.decimals()
	updateIndexFundInfo(event.params.deployedAddress, contract, entity)
	entity.save()
}

