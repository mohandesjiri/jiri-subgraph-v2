import { Address } from "@graphprotocol/graph-ts"
import {
	CompetitionCreated,
	IndexFundCreated,
	MutualFundCreated,
} from "../../generated/Masterboard/Masterboard"

import {
	IndexFund as IndexFundContact,
	IndexFund__getDistributionsResultValue0Struct as IndexFundDistribution
} from "../../generated/Masterboard/IndexFund"

import { IndexFund, IndexFundAsset } from "../../generated/schema"
import {getIndexFundAssetId, getIndexFundId, updateIndexFundPortfolio} from "../helpers/indexFunds";

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
	entity.state = contract.state()
	updateIndexFundPortfolio(event.params.deployedAddress)
	entity.save()
}

export function handleMutualFundCreated(event: MutualFundCreated): void {}

