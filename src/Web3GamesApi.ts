import { ApiPromise, WsProvider } from '@polkadot/api';


import { Web3GamesApiOptions } from './types';
import { Web3GamesBalance } from './Balance';
import { Web3GamesBlock } from './Blocks';

export class Web3GamesApi extends ApiPromise {
  public balance: Web3GamesBalance;
  public blocks: Web3GamesBlock;

  constructor(options: Web3GamesApiOptions = {}) {
    const {providerAddress} = options;
    const provider = new WsProvider(providerAddress ?? 'ws://127.0.0.1:9944');

    super({
      provider,
    });

    this.isReady.then(() => {
      this.balance = new Web3GamesBalance(this);
      this.blocks = new Web3GamesBlock(this);
    });
  }

  static async create(options?: Web3GamesApiOptions): Promise<Web3GamesApi> {
    const api = new Web3GamesApi(options);
    await api.isReady;
    return api;
  }

  async totalIssuance(): Promise<string> {
    return (await this.query.balances.totalIssuance()).toHuman() as string;
  }

  async chain(): Promise<string> {
    return (await this.rpc.system.chain()).toHuman();
  }

  async nodeName(): Promise<string> {
    return (await this.rpc.system.name()).toHuman();
  }

  async nodeVersion(): Promise<string> {
    return (await this.rpc.system.version()).toHuman();
  }
}
