import {Address, BigInt} from "@graphprotocol/graph-ts"
import {
	IndexFund as IndexFundContact,
	IndexFund__getDistributionsResultValue0Struct as IndexFundDistribution
} from "../../generated/IndexFund/IndexFund";
import {
	ERC20
} from '../../generated/IndexFund/ERC20'
import {IndexFundAsset, IndexFund} from "../../generated/schema";

export function getIndexFundAssetId(indexFundId: string, assetAddress: Address ) : string {
	return indexFundId.concat('-').concat(assetAddress.toHexString())
}

export function getIndexFundId(contractAddress: Address) : string {
	return contractAddress.toHexString()
}

export function updateIndexFundInfo(contractAddress: Address, indexFundEntity: IndexFund ) : void {
	const contract = IndexFundContact.bind(contractAddress)
	const indexFundId = getIndexFundId(contractAddress)
	//update totalSupply
	indexFundEntity.totalSupply = contract.totalSupply()
	indexFundEntity.state = contract.state()
	let distributions: Array<IndexFundDistribution> = contract.getDistributions()
	for(let i : i32 = 0; i<distributions.length; i++) {
		let distribution = distributions[i]
		const assetId : string = getIndexFundAssetId(indexFundId, distribution.asset)
		let asset = IndexFundAsset.load(assetId)
		if(!asset) {
			asset = new IndexFundAsset(assetId)
			asset.address = distribution.asset
			asset.indexFund = indexFundId
		}
		const tokenContract = ERC20.bind(distribution.asset)
		asset.amount = tokenContract.balanceOf(contractAddress)
		asset.save()
	}
	indexFundEntity.save()
}
