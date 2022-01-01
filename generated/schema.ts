// THIS IS AN AUTOGENERATED FILE. DO NOT EDIT THIS FILE DIRECTLY.

import {
  TypedMap,
  Entity,
  Value,
  ValueKind,
  store,
  Bytes,
  BigInt,
  BigDecimal
} from "@graphprotocol/graph-ts";

export class IndexFund extends Entity {
  constructor(id: string) {
    super();
    this.set("id", Value.fromString(id));

    this.set("symbol", Value.fromString(""));
    this.set("address", Value.fromBytes(Bytes.empty()));
    this.set("name", Value.fromString(""));
    this.set("creator", Value.fromBytes(Bytes.empty()));
    this.set("maxSlippage", Value.fromBigInt(BigInt.zero()));
    this.set("entranceFee", Value.fromBigInt(BigInt.zero()));
    this.set("prizePool", Value.fromBigInt(BigInt.zero()));
    this.set("totalSupply", Value.fromBigInt(BigInt.zero()));
  }

  save(): void {
    let id = this.get("id");
    assert(id != null, "Cannot save IndexFund entity without an ID");
    if (id) {
      assert(
        id.kind == ValueKind.STRING,
        "Cannot save IndexFund entity with non-string ID. " +
          'Considering using .toHex() to convert the "id" to a string.'
      );
      store.set("IndexFund", id.toString(), this);
    }
  }

  static load(id: string): IndexFund | null {
    return changetype<IndexFund | null>(store.get("IndexFund", id));
  }

  get id(): string {
    let value = this.get("id");
    return value!.toString();
  }

  set id(value: string) {
    this.set("id", Value.fromString(value));
  }

  get symbol(): string {
    let value = this.get("symbol");
    return value!.toString();
  }

  set symbol(value: string) {
    this.set("symbol", Value.fromString(value));
  }

  get address(): Bytes {
    let value = this.get("address");
    return value!.toBytes();
  }

  set address(value: Bytes) {
    this.set("address", Value.fromBytes(value));
  }

  get name(): string {
    let value = this.get("name");
    return value!.toString();
  }

  set name(value: string) {
    this.set("name", Value.fromString(value));
  }

  get creator(): Bytes {
    let value = this.get("creator");
    return value!.toBytes();
  }

  set creator(value: Bytes) {
    this.set("creator", Value.fromBytes(value));
  }

  get state(): i32 {
    let value = this.get("state");
    return value!.toI32();
  }

  set state(value: i32) {
    this.set("state", Value.fromI32(value));
  }

  get maxSlippage(): BigInt {
    let value = this.get("maxSlippage");
    return value!.toBigInt();
  }

  set maxSlippage(value: BigInt) {
    this.set("maxSlippage", Value.fromBigInt(value));
  }

  get entranceFee(): BigInt {
    let value = this.get("entranceFee");
    return value!.toBigInt();
  }

  set entranceFee(value: BigInt) {
    this.set("entranceFee", Value.fromBigInt(value));
  }

  get prizePool(): BigInt {
    let value = this.get("prizePool");
    return value!.toBigInt();
  }

  set prizePool(value: BigInt) {
    this.set("prizePool", Value.fromBigInt(value));
  }

  get portfolio(): Array<string> {
    let value = this.get("portfolio");
    return value!.toStringArray();
  }

  set portfolio(value: Array<string>) {
    this.set("portfolio", Value.fromStringArray(value));
  }

  get totalSupply(): BigInt {
    let value = this.get("totalSupply");
    return value!.toBigInt();
  }

  set totalSupply(value: BigInt) {
    this.set("totalSupply", Value.fromBigInt(value));
  }

  get historyRecords(): Array<string> {
    let value = this.get("historyRecords");
    return value!.toStringArray();
  }

  set historyRecords(value: Array<string>) {
    this.set("historyRecords", Value.fromStringArray(value));
  }

  get historyRecordsCount(): string {
    let value = this.get("historyRecordsCount");
    return value!.toString();
  }

  set historyRecordsCount(value: string) {
    this.set("historyRecordsCount", Value.fromString(value));
  }
}

export class IndexFundAsset extends Entity {
  constructor(id: string) {
    super();
    this.set("id", Value.fromString(id));

    this.set("address", Value.fromBytes(Bytes.empty()));
    this.set("amount", Value.fromBigInt(BigInt.zero()));
    this.set("indexFund", Value.fromString(""));
  }

  save(): void {
    let id = this.get("id");
    assert(id != null, "Cannot save IndexFundAsset entity without an ID");
    if (id) {
      assert(
        id.kind == ValueKind.STRING,
        "Cannot save IndexFundAsset entity with non-string ID. " +
          'Considering using .toHex() to convert the "id" to a string.'
      );
      store.set("IndexFundAsset", id.toString(), this);
    }
  }

  static load(id: string): IndexFundAsset | null {
    return changetype<IndexFundAsset | null>(store.get("IndexFundAsset", id));
  }

  get id(): string {
    let value = this.get("id");
    return value!.toString();
  }

  set id(value: string) {
    this.set("id", Value.fromString(value));
  }

  get address(): Bytes {
    let value = this.get("address");
    return value!.toBytes();
  }

  set address(value: Bytes) {
    this.set("address", Value.fromBytes(value));
  }

  get amount(): BigInt {
    let value = this.get("amount");
    return value!.toBigInt();
  }

  set amount(value: BigInt) {
    this.set("amount", Value.fromBigInt(value));
  }

  get indexFund(): string {
    let value = this.get("indexFund");
    return value!.toString();
  }

  set indexFund(value: string) {
    this.set("indexFund", Value.fromString(value));
  }
}

export class HistoryRecord extends Entity {
  constructor(id: string) {
    super();
    this.set("id", Value.fromString(id));

    this.set("type", Value.fromString(""));
    this.set("timestamp", Value.fromBigInt(BigInt.zero()));
    this.set("shareAmount", Value.fromBigInt(BigInt.zero()));
    this.set("account", Value.fromBytes(Bytes.empty()));
    this.set("indexFund", Value.fromString(""));
  }

  save(): void {
    let id = this.get("id");
    assert(id != null, "Cannot save HistoryRecord entity without an ID");
    if (id) {
      assert(
        id.kind == ValueKind.STRING,
        "Cannot save HistoryRecord entity with non-string ID. " +
          'Considering using .toHex() to convert the "id" to a string.'
      );
      store.set("HistoryRecord", id.toString(), this);
    }
  }

  static load(id: string): HistoryRecord | null {
    return changetype<HistoryRecord | null>(store.get("HistoryRecord", id));
  }

  get id(): string {
    let value = this.get("id");
    return value!.toString();
  }

  set id(value: string) {
    this.set("id", Value.fromString(value));
  }

  get type(): string {
    let value = this.get("type");
    return value!.toString();
  }

  set type(value: string) {
    this.set("type", Value.fromString(value));
  }

  get timestamp(): BigInt {
    let value = this.get("timestamp");
    return value!.toBigInt();
  }

  set timestamp(value: BigInt) {
    this.set("timestamp", Value.fromBigInt(value));
  }

  get shareAmount(): BigInt {
    let value = this.get("shareAmount");
    return value!.toBigInt();
  }

  set shareAmount(value: BigInt) {
    this.set("shareAmount", Value.fromBigInt(value));
  }

  get bonus(): BigInt | null {
    let value = this.get("bonus");
    if (!value || value.kind == ValueKind.NULL) {
      return null;
    } else {
      return value.toBigInt();
    }
  }

  set bonus(value: BigInt | null) {
    if (!value) {
      this.unset("bonus");
    } else {
      this.set("bonus", Value.fromBigInt(<BigInt>value));
    }
  }

  get account(): Bytes {
    let value = this.get("account");
    return value!.toBytes();
  }

  set account(value: Bytes) {
    this.set("account", Value.fromBytes(value));
  }

  get assets(): Array<string> {
    let value = this.get("assets");
    return value!.toStringArray();
  }

  set assets(value: Array<string>) {
    this.set("assets", Value.fromStringArray(value));
  }

  get indexFund(): string {
    let value = this.get("indexFund");
    return value!.toString();
  }

  set indexFund(value: string) {
    this.set("indexFund", Value.fromString(value));
  }
}

export class HistoryRecordAsset extends Entity {
  constructor(id: string) {
    super();
    this.set("id", Value.fromString(id));

    this.set("address", Value.fromBytes(Bytes.empty()));
    this.set("amount", Value.fromBigInt(BigInt.zero()));
    this.set("historyRecord", Value.fromString(""));
  }

  save(): void {
    let id = this.get("id");
    assert(id != null, "Cannot save HistoryRecordAsset entity without an ID");
    if (id) {
      assert(
        id.kind == ValueKind.STRING,
        "Cannot save HistoryRecordAsset entity with non-string ID. " +
          'Considering using .toHex() to convert the "id" to a string.'
      );
      store.set("HistoryRecordAsset", id.toString(), this);
    }
  }

  static load(id: string): HistoryRecordAsset | null {
    return changetype<HistoryRecordAsset | null>(
      store.get("HistoryRecordAsset", id)
    );
  }

  get id(): string {
    let value = this.get("id");
    return value!.toString();
  }

  set id(value: string) {
    this.set("id", Value.fromString(value));
  }

  get address(): Bytes {
    let value = this.get("address");
    return value!.toBytes();
  }

  set address(value: Bytes) {
    this.set("address", Value.fromBytes(value));
  }

  get amount(): BigInt {
    let value = this.get("amount");
    return value!.toBigInt();
  }

  set amount(value: BigInt) {
    this.set("amount", Value.fromBigInt(value));
  }

  get historyRecord(): string {
    let value = this.get("historyRecord");
    return value!.toString();
  }

  set historyRecord(value: string) {
    this.set("historyRecord", Value.fromString(value));
  }
}

export class HistoryRecordsCount extends Entity {
  constructor(id: string) {
    super();
    this.set("id", Value.fromString(id));

    this.set("indexFund", Value.fromString(""));
  }

  save(): void {
    let id = this.get("id");
    assert(id != null, "Cannot save HistoryRecordsCount entity without an ID");
    if (id) {
      assert(
        id.kind == ValueKind.STRING,
        "Cannot save HistoryRecordsCount entity with non-string ID. " +
          'Considering using .toHex() to convert the "id" to a string.'
      );
      store.set("HistoryRecordsCount", id.toString(), this);
    }
  }

  static load(id: string): HistoryRecordsCount | null {
    return changetype<HistoryRecordsCount | null>(
      store.get("HistoryRecordsCount", id)
    );
  }

  get id(): string {
    let value = this.get("id");
    return value!.toString();
  }

  set id(value: string) {
    this.set("id", Value.fromString(value));
  }

  get count(): i32 {
    let value = this.get("count");
    return value!.toI32();
  }

  set count(value: i32) {
    this.set("count", Value.fromI32(value));
  }

  get indexFund(): string {
    let value = this.get("indexFund");
    return value!.toString();
  }

  set indexFund(value: string) {
    this.set("indexFund", Value.fromString(value));
  }
}
