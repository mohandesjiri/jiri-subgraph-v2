import {Address, BigInt} from "@graphprotocol/graph-ts"
import {
	IndexFund as IndexFundContact,
	IndexFund__getDistributionsResultValue0Struct as IndexFundDistribution
} from "../../generated/IndexFund/IndexFund";
import {IndexFundAsset} from "../../generated/schema";

export function getIndexFundAssetId(indexFundId: string, assetAddress: Address ) {
	return indexFundId.concat('-').concat(assetAddress.toHexString())
}

export function getIndexFundId(contractAddress: Address) {
	return contractAddress.toHexString()
}

export function updateIndexFundPortfolio(contractAddress: Address) {
	const contract = IndexFundContact.bind(contractAddress)
	const indexFundId = getIndexFundId(contractAddress)
	let distributions: Array<IndexFundDistribution> = contract.getDistributions()
	for(let i : i32 = 0; i<distributions.length; i++) {
		let distribution = distributions[i]
		const assetId : string = getIndexFundAssetId(indexFundId, distribution.asset)
		let asset = IndexFundAsset.load(assetId)
		if(!asset) {
			asset = new IndexFundAsset(assetId)
			asset.address = distribution.asset
			asset.indexFund = indexFundId
			asset.ideal = distribution.ideal
		}
		asset.current = distribution.current
		asset.amount = contract.balanceOf(distribution.asset)
		asset.save()
	}
}
