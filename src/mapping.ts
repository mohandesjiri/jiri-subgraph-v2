// import {Address, BigInt} from "@graphprotocol/graph-ts"
// import {
//   Masterboard,
//   Approval,
//   CompetitionCreated,
//   IndexFundCreated,
//   MutualFundCreated,
//   Transfer
// } from "../generated/Masterboard/Masterboard"
//
// import {
//   IndexFund as IndexFundContact,
//   IndexFund__getDistributionsResultValue0Struct as IndexFundDistribution
// } from "../generated/Masterboard/IndexFund"
//
// import { ExampleEntity, IndexFund, IndexFundAsset } from "../generated/schema"
//
// export function handleApproval(event: Approval): void {
//   // Entities can be loaded from the store using a string ID; this ID
//   // needs to be unique across all entities of the same type
//   let entity = ExampleEntity.load(event.transaction.from.toHex())
//
//   // Entities only exist after they have been saved to the store;
//   // `null` checks allow to create entities on demand
//   if (!entity) {
//     entity = new ExampleEntity(event.transaction.from.toHex())
//
//     // Entity fields can be set using simple assignments
//     entity.count = BigInt.fromI32(0)
//   }
//
//   // BigInt and BigDecimal math are supported
//   // @ts-ignore
//   entity.count = entity.count + BigInt.fromI32(1)
//
//   // Entity fields can be set based on event parameters
//   entity.owner = event.params.owner
//   entity.spender = event.params.spender
//
//   // Entities can be written to the store with `.save()`
//   entity.save()
//
//   // Note: If a handler doesn't require existing field values, it is faster
//   // _not_ to load the entity from the store. Instead, create it fresh with
//   // `new Entity(...)`, set the fields that should be updated and save the
//   // entity back to the store. Fields that were not set or unset remain
//   // unchanged, allowing for partial updates to be applied.
//
//   // It is also possible to access smart contracts from mappings. For
//   // example, the contract that has emitted the event can be connected to
//   // with:
//   //
//   // let contract = Contract.bind(event.address)
//   //
//   // The following functions can then be called on this contract to access
//   // state variables and other data:
//   //
//   // - contract.allowance(...)
//   // - contract.approve(...)
//   // - contract.balanceOf(...)
//   // - contract.createIndexFund(...)
//   // - contract.decimals(...)
//   // - contract.decreaseAllowance(...)
//   // - contract.increaseAllowance(...)
//   // - contract.isLegit(...)
//   // - contract.name(...)
//   // - contract.swapRouter(...)
//   // - contract.symbol(...)
//   // - contract.totalSupply(...)
//   // - contract.transfer(...)
//   // - contract.transferFrom(...)
// }
//
// export function handleCompetitionCreated(event: CompetitionCreated): void {}
//
// export function handleIndexFundCreated(event: IndexFundCreated): void {
//   const indexFundId: string = event.transaction.from.toHex()
//   const IndexFundAddress: Address = event.params.deployedAddress
//   let entity = IndexFund.load(indexFundId)
//   if (!entity) {
//     entity = new IndexFund(indexFundId)
//   }
//   entity.address = IndexFundAddress
//   entity.symbol = event.params.symbol
//   let contract = IndexFundContact.bind(event.params.deployedAddress)
//   entity.name = contract.name()
//   let distributions: Array<IndexFundDistribution> = contract.getDistributions()
//   for(let i = 0; i<distributions.length; i++) {
//     let distribution = distributions[i]
//     const assetId : string = indexFundId.concat('-').concat(distribution.asset.toHexString())
//     let asset = new IndexFundAsset(assetId)
//     asset.address = distribution.asset
//     asset.indexFund = indexFundId
//     asset.ideal = distribution.ideal
//     asset.save()
//   }
//   entity.save()
// }
//
// export function handleMutualFundCreated(event: MutualFundCreated): void {}
//
// export function handleTransfer(event: Transfer): void {}
