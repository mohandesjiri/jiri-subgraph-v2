import {Address, BigInt} from "@graphprotocol/graph-ts"

export function getIndexFundAssetId(indexFundId: string, assetAddress: Address ) {
	return indexFundId.concat('-').concat(assetAddress.toHexString())
}
