import {Address, BigInt, ethereum, log} from "@graphprotocol/graph-ts"
import {
	IndexFund as IndexFundContract,
	IndexFund__getDistributionsResultValue0Struct as IndexFundDistribution
} from "../../generated/IndexFund/IndexFund";
import {
	ERC20
} from '../../generated/IndexFund/ERC20'
import {
	IndexFundAsset,
	IndexFund,
	HistoryRecord,
	HistoryRecordAsset,
	HistoryRecordsCount, InvestorIndexFund, Investor
} from "../../generated/schema";

export function getIndexFundAssetId(indexFundId: string, assetAddress: Address ) : string {
	return indexFundId.concat('-').concat(assetAddress.toHexString().toLowerCase())
}

export function getIndexFundInitialId(indexFundId: string, assetAddress: Address ) : string {
	return ('IFI-').concat(indexFundId).concat('-').concat(assetAddress.toHexString().toLowerCase())
}
export function getIndexFundId(contractAddress: Address) : string {
	return contractAddress.toHexString().toLowerCase()
}

export function getInvestorId(investorAddress: Address): string {
	return investorAddress.toHexString()
}

export function getInvestorFundBalanceId(investorAddress: Address, fundAddress: Address) : string {
	return ('UFB-').concat(investorAddress.toHexString()).concat('-').concat(fundAddress.toHexString().toLowerCase())
}
export function updateIndexFundInfo(contractAddress: Address, contract: IndexFundContract, indexFundEntity: IndexFund ) : void {
	const indexFundId = getIndexFundId(contractAddress)
	//update totalSupply
	indexFundEntity.totalSupply = contract.totalSupply()
	indexFundEntity.state = contract.state()
	indexFundEntity.prizePool = contract.prizePool()
	const assets: Array<Address> = contract.getAssets()
	for(let i : i32 = 0; i<assets.length; i++) {
		const asset : Address = assets[i]
		const assetId : string = getIndexFundAssetId(indexFundId, asset)
		let indexFundAssetEntity = IndexFundAsset.load(assetId)
		if(!indexFundAssetEntity) {
			indexFundAssetEntity = new IndexFundAsset(assetId)
			indexFundAssetEntity.index = i
			indexFundAssetEntity.address = asset
			indexFundAssetEntity.indexFund = indexFundId
		} else if(indexFundAssetEntity.index !== i) {
			indexFundAssetEntity.index = i;
			log.warning('Found corruption in index fund assets order... {}', [indexFundId])
		}
		const tokenContract = ERC20.bind(asset)
		indexFundAssetEntity.amount = tokenContract.balanceOf(contractAddress)
		indexFundAssetEntity.save()
	}
	indexFundEntity.save()
}

export function getHistoryRecordId(event: ethereum.Event): string {
	return event.transaction.hash.toHexString()
}

export function createHistoryRecordEntity(event: ethereum.Event, type: string, indexFundId: string): HistoryRecord {
	const historyRecordEntity = new HistoryRecord(getHistoryRecordId(event))
	historyRecordEntity.type = type
	historyRecordEntity.indexFund = indexFundId
	historyRecordEntity.timestamp = event.block.timestamp
	historyRecordEntity.account = event.transaction.from
	return historyRecordEntity
}

export function getHistoryARecordAssetId(historyRecordId : string, assetAddress: Address ) : string {
	return historyRecordId.concat('-').concat(assetAddress.toHexString())
}

export function createHistoryARecordAsset(historyRecordId : string, assetAddress: Address, amount: BigInt) : HistoryRecordAsset {
	const historyRecordAsset = new HistoryRecordAsset(getHistoryARecordAssetId(historyRecordId, assetAddress))
	historyRecordAsset.historyRecord = historyRecordId
	historyRecordAsset.address = assetAddress
	historyRecordAsset.amount = amount
	return historyRecordAsset
}

export function getHistoryRecordsCountId(contractAddress: Address): string {
	return ('HRC-').concat(contractAddress.toHexString())
}
export function increaseHistoryRecordsCount(contractAddress: Address): void {
	const historyRecordsCountId = getHistoryRecordsCountId(contractAddress)
	let entity = HistoryRecordsCount.load(historyRecordsCountId)
	if (!entity) {
		entity = new HistoryRecordsCount(historyRecordsCountId)
		entity.indexFund = getIndexFundId(contractAddress)
		entity.count = 1
	} else {
		entity.count = entity.count + 1
	}
	entity.save()
}

export function updateInvestorIndexFundBalance(investorAddress: Address, indexFundAddress: Address, indexFundContract: IndexFundContract ) : void {
	//Ignore transferFrom
	if(indexFundAddress.toHexString() == investorAddress.toHexString()) {
		return
	}

	if(investorAddress.toHexString() == Address.zero().toHexString() ) {
		return
	}
	const investorIndexFundBalanceId = getInvestorFundBalanceId(investorAddress, indexFundAddress)
	let investorIndexFundBalanceEntity = InvestorIndexFund.load(investorIndexFundBalanceId)
	if(!investorIndexFundBalanceEntity) {
		investorIndexFundBalanceEntity = new InvestorIndexFund(investorIndexFundBalanceId)
		const investorId: string = getInvestorId(investorAddress)
		let investorEntity = Investor.load(investorId)
		if (!investorEntity) {
			investorEntity = new Investor(investorId)
			investorEntity.address = investorAddress
			investorEntity.save()
		}
		investorIndexFundBalanceEntity.investor = investorId
		investorIndexFundBalanceEntity.indexFund = getIndexFundId(indexFundAddress)
	}
	investorIndexFundBalanceEntity.balance = indexFundContract.balanceOf(investorAddress)
	investorIndexFundBalanceEntity.save()
}
