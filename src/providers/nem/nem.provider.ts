import {Injectable} from '@angular/core';
import {Storage} from '@ionic/storage';

import {
    NEMLibrary, NetworkTypes, SimpleWallet, 
    Password, Address, AccountHttp,
    MosaicHttp, AccountOwnedMosaicsService, 
    MosaicTransferable, TransferTransaction,
    TimeWindow, PlainMessage,
    TransactionHttp, NemAnnounceResult, MosaicId
} from "nem-library";

import { Observable } from "nem-library/node_modules/rxjs";

/*
 Generated class for the NemProvider provider.

 See https://angular.io/docs/ts/latest/guide/dependency-injection.html
 for more info on providers and Angular DI.
 */
@Injectable()
export class NemProvider {
    wallets: SimpleWallet[];
    accountHttp: AccountHttp;
    mosaicHttp: MosaicHttp;
    transactionHttp: TransactionHttp;
    accountOwnedMosaicsSerivce: AccountOwnedMosaicsService

    constructor(private storage: Storage) {
        NEMLibrary.bootstrap(NetworkTypes.TEST_NET);
        this.accountHttp = new AccountHttp();
        this.mosaicHttp = new MosaicHttp();
        this.transactionHttp = new TransactionHttp();
        this.accountOwnedMosaicsSerivce = new AccountOwnedMosaicsService(this.accountHttp, this.mosaicHttp);
    }

    /**
     * Create Simple Wallet
     * @param walletName wallet idenitifier for app
     * @param password wallet's password
     * @param selected network
     * @return Promise with wallet created
     */
    public createSimpleWallet(walletName: string, password: string): SimpleWallet {
        return SimpleWallet.create(walletName, new Password(password));
    }

    /**
     * Gets private key from password and account
     * @param password
     * @param wallet
     * @return promise with selected wallet
     */
    public passwordToPrivateKey(password: string, wallet: SimpleWallet): string {
        return wallet.unlockPrivateKey(new Password(password));
    }


    /**
     * Check if acount belongs to the current Network
     * @param address address to check
     * @return Return prepared transaction
     */
    public isFromNetwork(address: Address): boolean  {
        return address.network() == NEMLibrary.getNetworkType();
    }


    /**
     * Prepares mosaic transaction
     * @param recipientAddress recipientAddress
     * @param mosaicsTransferable mosaicsTransferable
     * @param message message
     * @return Promise containing prepared transaction
     */
    public prepareMosaicTransaction(recipientAddress: Address, mosaicsTransferable: MosaicTransferable[], message: string): TransferTransaction {        
        return TransferTransaction.createWithMosaics(TimeWindow.createWithDeadline(), recipientAddress, mosaicsTransferable, PlainMessage.create(message));        
    }

    /**
     * Send transaction into the blockchain
     * @param transferTransaction transferTransaction
     * @param password wallet
     * @param password password
     * @return Promise containing sent transaction
     */
    public confirmTransaction(transferTransaction: TransferTransaction, wallet: SimpleWallet, password: string): Observable<NemAnnounceResult> {
        let account = wallet.open(new Password(password));
        let signedTransaction = account.signTransaction(transferTransaction);
        return this.transactionHttp.announceTransaction(signedTransaction);
    }

    /* Custom */
    public getMosaicTransferableDefinition(mosaicId: MosaicId, amount: number):  Observable<MosaicTransferable>{
        return this.mosaicHttp.getMosaicDefinition(mosaicId).map(mosaicDefinition => {
            return MosaicTransferable.createWithMosaicDefinition(mosaicDefinition, amount / Math.pow(10, mosaicDefinition.properties.divisibility));
        });
    }
}
