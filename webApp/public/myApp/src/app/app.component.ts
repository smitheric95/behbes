import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { HomePage } from '../pages/home/home';
import { FormPage } from '../pages/form/form';
import { InfantHealthPage } from '../pages/infanthealth/infanthealth';
import { MapPage } from '../pages/map/map';
import { HistoryPage } from '../pages/history/history';
import { SettingsComponent } from '../pages/settings/settings.component';
import { LoginComponent } from '../pages/login/login.component';
import { SignupComponent } from '../pages/signup/signup.component';
import { Globals } from './services/globals/globals';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = HomePage;

  pages: Array<{title: string, component: any}>;
  loggedUserPages: Array<{title: string, component: any}>;
  notLoggedUserPages: Array<{title: string, component: any}>;
  constructor(public platform: Platform, public statusBar: StatusBar, public splashScreen: SplashScreen, public globals:Globals) {
    this.initializeApp();

    // used for an example of ngFor and navigation
    this.pages = [
      { title: 'Home', component: HomePage },
      { title: 'Symptoms Evaluation', component: FormPage },
      { title: 'Infant Health', component: InfantHealthPage },
      { title: 'ER Locations Near You', component: MapPage },
      { title: 'History', component: HistoryPage }
    ];
    this.loggedUserPages= [
      { title: 'Settings', component: SettingsComponent }
    ];
    this.notLoggedUserPages = [
      { title: 'Login', component: LoginComponent },
      { title: 'Sign Up', component: SignupComponent }
    ];

  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }
  logout(){
    this.globals.setAuthToken("");
  }

}
