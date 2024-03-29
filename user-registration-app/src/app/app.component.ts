import { Component, AfterViewInit } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { NgProgress } from 'ngx-progressbar';
import { AppConstants } from './AppConstants';
import { AuthService } from './services/AuthService/auth.service';
import { environment } from '../environments/environment';
import { LiveWebsiteDateGuard } from './services/route-guards/guards';
import { fadeOutAnimation } from './animations';

declare let $: any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  animations: [
    fadeOutAnimation,
    // animation triggers go here
  ],
})
export class AppComponent implements AngularFireAuthModule, AfterViewInit {
  static scrollToID(id, speed) {
    const elem = $(id);
    if (elem) {
      const targetOffset = elem.offset().top;
      $('html,body').animate({ scrollTop: targetOffset }, speed);
      setTimeout(() => {}, speed);
    }
  }

  ngAfterViewInit(): void {
    $('.button-collapse').sideNav();
    $('.dropdown-button').dropdown();
    $('nav')
      .find('.scroller')
      .click((e) => {
        e.preventDefault();
        AppComponent.scrollToID($(e.target).attr('href'), 500);
      });
    $('#mobile-demo')
      .find('.scroller')
      .click((e) => {
        e.preventDefault();
        AppComponent.scrollToID($(e.target).attr('href'), 500);
      });
  }

  constructor(
    public authService: AuthService,
    public router: Router,
    private progressBar: NgProgress
  ) {
    this.router.events.subscribe((event) => {
      switch (event.constructor.name) {
        case 'NavigationStart':
          this.progressBar.ref().start();
          break;
        case 'NavigationEnd':
        case 'NavigationCancel':
        case 'NavigationError':
          this.progressBar.ref().complete();
          break;
        default:
          break;
      }
    });
  }

  logout() {
    this.authService
      .signOut()
      .then(() => this.router.navigate([AppConstants.LOGIN_ENDPOINT]))
      .catch(() => this.router.navigate([AppConstants.LOGIN_ENDPOINT]));
  }

  showLive() {
    return Date.now() >= environment.liveWebsiteGuardTime.getTime();
  }

  get DateGuard() {
    return LiveWebsiteDateGuard;
  }

  prepareRoute(outlet: RouterOutlet) {
    return outlet && outlet.activatedRouteData && outlet.activatedRouteData['animation'];
  }

  isOnLiveSite(): boolean {
    // Use includes instead of === because href's could make router url "/live#schedule" or something like that
    return this.router.url.includes('/live');
  }
}
