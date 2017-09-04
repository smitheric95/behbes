import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { HttpModule } from '@angular/http';

import { AgmCoreModule } from '@agm/core'; 

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { ListPage } from '../pages/list/list';
import { FormPage } from '../pages/form/form';
import { InfantHealthPage } from '../pages/infanthealth/infanthealth';
import { MapPage } from '../pages/map/map';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { FormService } from './services/form/form.service';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    ListPage,
    FormPage,
    InfantHealthPage,
    MapPage
  ],
  imports: [
    BrowserModule,
    HttpModule,
    IonicModule.forRoot(MyApp),
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyC9qCv3Iw6nxUrFjWfFQLMNCA5wQbe82WQ'
    })
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    ListPage,
    FormPage,
    InfantHealthPage,
    MapPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    FormService,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
