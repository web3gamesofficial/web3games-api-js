<p align="center">
  <img src="https://user-images.githubusercontent.com/26602057/163522053-ea3ad06a-be06-4453-920b-15db4df3536a.png" width="500">
</p>

<div align="center">

[![GitHub Workflow Status](https://img.shields.io/github/workflow/status/web3gamesofficial/web3games-blockchain/Rust)](https://github.com/web3gamesofficial/web3games-blockchain/actions)
[![License: GPL v3](https://img.shields.io/badge/License-GPL%20v3-blue.svg)](https://github.com/web3gamesofficial/web3games-blockchain/blob/main/LICENSE)
[![Twitter URL](https://img.shields.io/twitter/url?style=social&url=https%3A%2F%2Ftwitter.com%2Fweb3games)](https://twitter.com/web3games)
[![Discord](https://img.shields.io/badge/Discord-gray?logo=discord)](https://discord.gg/web3games)
[![Medium](https://img.shields.io/badge/Medium-gray?logo=medium)](https://blog.web3games.com/)

</div>

## Description

The Web3Games-JS API provides a set of utilities, libraries and tools that enable JavaScript applications to interact with smart contracts or pallets running in the Web3Games network via queries to a Web3Games node.

## Installation

```sh
npm install @web3games-js/api
```

or

```sh
yarn add @web3games-js/api
```
---

## Getting started

Start an API connection to a running node on localhost:

```javascript
import { Web3GamesApi } from '@web3games-js/api';

const Web3GamesApi = await Web3GamesApi.create();
```

You can also connect to a different node:

```javascript
const Web3GamesApi = await Web3GamesApi.create({ providerAddress: 'wss://devnet.web3games.org/' });
```

Getting node info:

```javascript
const chain = await Web3GamesApi.chain();
const nodeName = await Web3GamesApi.nodeName();
const nodeVersion = await Web3GamesApi.nodeVersion();
const genesis = Web3GamesApi.genesisHash.toHex();
```

---

## Payloads and metadata

### Encode / decode payloads
*It's necessary to send only bytes to interact with programs on blockchain.*
*For that purpose we use the `scale-codec` implementation from `@polkadot-js`*

You can use static `CreateType.create` method to encode and decode data 

<details>
<summary>Example</summary>

```javascript
import { CreateType } from '@web3games-js/api';

// If "TypeName" alredy registred
const result = CreateType.create('TypeName', somePayload);
// Otherwise need to add metadata containing TypeName and all required types
const result = CreateType.create('TypeName', somePayload, metadata);
```

Result of this functions is data of type `Codec` and it has the next methods

```javascript
result.toHex(); // - returns a hex represetation of the value
result.toHuman(); // - returns human friendly object representation of the value
result.toString(); //  - returns a string represetation of the value
result.toU8a(); // - encodes the value as a Unit8Array
result.toJSON(); // - converts the value to JSON
```
</details>

---

## Events

### Subscribe to all events
<details>
<summary>Example</summary>

```javascript
const unsub = await Web3GamesApi.query.system.events((events) => {
  console.log(events.toHuman());
});
// Unsubscribe
unsub();
```
</details>

---
## Blocks
### Get block data
<details>
<summary>Example</summary>

```javascript
const data = await Web3GamesApi.blocks.get(blockNumberOrBlockHash);
console.log(data.toHuman());
```
</details>

### Get block timestamp
<details>
<summary>Example</summary>

```javascript
const ts = await Web3GamesApi.blocks.getBlockTimestamp(blockNumberOrBlockHash);
console.log(ts.toNumber());
```
</details>

### Get blockHash by block number
<details>
<summary>Example</summary>

```javascript
const hash = await Web3GamesApi.blocks.getBlockHash(blockNumber);
console.log(hash.toHex());
```
</details>

### Get block number by blockhash
<details>
<summary>Example</summary>

```javascript
const hash = await Web3GamesApi.blocks.getBlockNumber(blockHash);
console.log(hash.toNumber());
```
</details>

### Get all block's events
<details>
<summary>Example</summary>

```javascript
const events = await Web3GamesApi.blocks.getEvents(blockHash);
events.forEach((event) => {
  console.log(event.toHuman());
});
```
</details>

### Get all block's extrinsics
<details>
<summary>Example</summary>

```javascript
const extrinsics = await Web3GamesApi.blocks.getExtrinsics(blockHash);
extrinsics.forEach((extrinsic) => {
  console.log(extrinsic.toHuman());
});
```
</details>

---

## Keyring

### Create keyring
To create keyring you can use static methods of `Web3GamesKeyring` class.

<details>
<summary>Example</summary>

- Creating a new keyring

```javascript
import { Web3GamesKeyring } from '@web3games-js/api';
const { keyring, json } = await Web3GamesKeyring.create('keyringName', 'passphrase');
```

- Getting a keyring from JSON

```javascript
const jsonKeyring = fs.readFileSync('path/to/keyring.json').toString();
const keyring = Web3GamesKeyring.fromJson(jsonKeyring, 'passphrase');
```

- Getting JSON for keyring

```javascript
const json = Web3GamesKeyring.toJson(keyring, 'passphrase');
```

- Getting a keyring from seed

```javascript
const seed = '0x496f9222372eca011351630ad276c7d44768a593cecea73685299e06acef8c0a';
const keyring = await Web3GamesKeyring.fromSeed(seed, 'name');
```

- Getting a keyring from mnemonic

```javascript
const mnemonic = 'slim potato consider exchange shiver bitter drop carpet helmet unfair cotton eagle';
const keyring = Web3GamesKeyring.fromMnemonic(mnemonic, 'name');
```

- Generate mnemonic and seed

```javascript
const { mnemonic, seed } = Web3GamesKeyring.generateMnemonic();

// Getting a seed from mnemonic
const { seed } = Web3GamesKeyring.generateSeed(mnemonic);
```

</details>

### Sign data

<details>
<summary>Example</summary>

1. Create signature

```javascript
import { Web3GamesKeyring } from '@web3games-js/api';
const message = 'your message';
const signature = Web3GamesKeyring.sign(keyring, message);
```

2. Validate signature

```javascript
import { signatureIsValid } from '@web3games-js/api';
const publicKey = keyring.address;
const verified = signatureIsValid(publicKey, signature, message);
```

</details>

### Convert public keys into ss58 format and back

Use `encodeAddress` and `decodeAddress` functions to convert the public key into ss58 format and back.

<details>
<summary>Example</summary>

1. Convert to raw format

```javascript
import { decodeAddress } from '@web3games-js/api';
console.log(decodeAddress('5GrwvaEF5zXb26Fz9rcQpDWS57CtERHpNehXCPcNoHGKutQY'))
```

2. Convert to ss58 format

```javascript
import { encodeAddress } from '@web3games-js/api';
console.log(encodeAddress('0xd43593c715fdd31c61141abd04a99fd6822c8558854ccde39a5684e7a56da27d'))
```

</details>
