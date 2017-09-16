import {Component} from '@angular/core';
import {NavController, Platform, LoadingController} from 'ionic-angular';
import { Subscription } from 'rxjs';

import {TranslateService} from '@ngx-translate/core';

import {NemProvider} from '../../providers/nem/nem.provider';
import {AlertProvider} from '../../providers/alert/alert.provider';
import {WalletProvider} from '../../providers/wallet/wallet.provider';


import {LoginPage} from "../login/login";

import {SimpleWallet} from "nem-library";
@Component({
    selector: 'page-account',
    templateUrl: 'account.html'
})
export class AccountPage {
    common: any;
    selectedWallet: SimpleWallet;
    qrCode: any;
    private onResumeSubscription: Subscription;

    constructor(public navCtrl: NavController, private nem: NemProvider, private wallet: WalletProvider, private loading: LoadingController, private alert: AlertProvider, private platform: Platform, public translate: TranslateService) {
        //Stores sensitive data.
        this.common = {};
        //Initialize common
        this._clearCommon();

        //clear common if app paused
        this.onResumeSubscription = platform.resume.subscribe(() => {
            this._clearCommon();
        });

    }

    /**
     * Init view with QR and current wallet info
     * @param transaction  transaction object
     */
    ionViewWillEnter() {
        this.wallet.getSelectedWallet().then(
            value => {
                if (!value) {
                    this.navCtrl.setRoot(LoginPage);
                }
                else {
                    this.selectedWallet = value;
                }
            }
        )
    }

    /**
     * Clears sensitive data
     */
    private _clearCommon() {
        this.common = {
            'password': '',
            'privateKey': ''
        };
    }


    /**
     * Clears data and moves to login screen
     * @param transaction  transaction object
     */
    public logout() {
        this.wallet.unsetSelectedWallet();
        this._clearCommon();
        this.navCtrl.setRoot(LoginPage);
    }

    ngOnDestroy() {
        // always unsubscribe your subscriptions to prevent leaks
        this.onResumeSubscription.unsubscribe();
    }

}

