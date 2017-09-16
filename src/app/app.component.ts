import {Component, ViewChild} from '@angular/core';
import {Platform, Nav} from 'ionic-angular';

import {StatusBar} from '@ionic-native/status-bar';
import {SplashScreen} from '@ionic-native/splash-screen';

import {AlertProvider} from '../providers/alert/alert.provider';
import {LanguageProvider} from '../providers/language/language.provider';

import {AccountPage} from '../pages/account/account';
import {LoginPage} from '../pages/login/login';

import {Network} from '@ionic-native/network';


@Component({
    templateUrl: 'app.html'
})
export class MyApp {
    @ViewChild(Nav) navCtrl: Nav;
    rootPage: any = LoginPage;

    constructor(private platform: Platform, private statusBar: StatusBar, private network: Network, private alert: AlertProvider, private language: LanguageProvider, private splashScreen: SplashScreen) {
        platform.ready().then(() => {


            network.onDisconnect().subscribe(() => {
                this.alert.showOnPhoneDisconnected();
            });

            this.language.setLanguage();

            //ionic default
            statusBar.styleDefault();
            splashScreen.hide();
        });
    }
    goToAccount(params) {
        if (!params) params = {};
        this.navCtrl.setRoot(AccountPage);
    }
}
