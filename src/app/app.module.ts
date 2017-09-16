import {NgModule, ErrorHandler} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {Http, HttpModule} from '@angular/http'
import {IonicApp, IonicModule, IonicErrorHandler} from 'ionic-angular';
import {IonicStorageModule} from '@ionic/storage';

import {StatusBar} from '@ionic-native/status-bar';
import {SplashScreen} from '@ionic-native/splash-screen';
import {Keyboard} from '@ionic-native/keyboard';

import {Network} from '@ionic-native/network';
import {TranslateModule, TranslateLoader} from '@ngx-translate/core';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';

import {AlertProvider} from '../providers/alert/alert.provider';
import {ToastProvider} from '../providers/toast/toast.provider';
import {NemProvider} from '../providers/nem/nem.provider';
import {WalletProvider} from '../providers/wallet/wallet.provider';
import {LanguageProvider} from '../providers/language/language.provider';


import {DivideByExponentialBaseTenPipe} from '../pipes/divide-by-exponential-base-ten.pipe';

import {MyApp} from './app.component';
import {AccountPage} from '../pages/account/account';
import {LoginPage} from '../pages/login/login';
import {SignupPage} from '../pages/signup/signup';
import {PayPage} from '../pages/pay/pay';


export function createTranslateLoader(http: Http) {
    return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

@NgModule({
    declarations: [
        MyApp,
        AccountPage,
        LoginPage,
        SignupPage,
        PayPage,
        DivideByExponentialBaseTenPipe,
    ],
    imports: [
        BrowserModule,
        HttpModule,
        IonicModule.forRoot(MyApp),
        IonicStorageModule.forRoot(),
        TranslateModule.forRoot({
            loader: {
                provide: TranslateLoader,
                useFactory: (createTranslateLoader),
                deps: [Http]
            }
        })

    ],
    bootstrap: [IonicApp],
    entryComponents: [
        MyApp,
        AccountPage,
        LoginPage,
        SignupPage,
        PayPage
    ],
    providers: [
        StatusBar,
        SplashScreen,
        {provide: ErrorHandler, useClass: IonicErrorHandler},
        Keyboard,
        Network,
        NemProvider,
        WalletProvider,
        AlertProvider,
        ToastProvider,
        LanguageProvider
    ]
})
export class AppModule {
}