import { UserLogic } from './ngrx/logic/user.store';
import { UserEffects } from './ngrx/store/user/user.effect';
import { BrowserXhr } from '@angular/http';
import { UserService } from './ngrx/services/user.service';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { AppRoutes } from './app.routing';
import { SidebarModule } from './sidebar/sidebar.module';
import { FooterModule } from './shared/footer/footer.module';
import { NavbarModule} from './shared/navbar/navbar.module';
import { FixedPluginModule} from './shared/fixedplugin/fixedplugin.module';
import { NguiMapModule} from '@ngui/map';

import { DashboardComponent }   from './dashboard/dashboard.component';
import { UserComponent }   from './user/user.component';
import { TableComponent }   from './table/table.component';
import { TypographyComponent }   from './typography/typography.component';
import { IconsComponent }   from './icons/icons.component';
import { MapsComponent }   from './maps/maps.component';
import { NotificationsComponent }   from './notifications/notifications.component';
import { UpgradeComponent }   from './upgrade/upgrade.component';
import { UsersComponent } from './users/users.component';
import { ArticlesComponent } from './articles/articles.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { userReducer } from './ngrx/store/user/user.reduce';
import { AlertMsgComponent } from './alert-msg/alert-msg.component';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
// import * as bootstrap from "bootstrap";

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    UserComponent,
    TableComponent,
    TypographyComponent,
    IconsComponent,
    MapsComponent,
    NotificationsComponent,
    UpgradeComponent,
    UsersComponent,
    ArticlesComponent,
    AlertMsgComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(AppRoutes,{ enableTracing: true }),
    SidebarModule,
    NavbarModule,
    FooterModule,
    FixedPluginModule,
    HttpClientModule,
    NguiMapModule.forRoot({apiUrl: 'https://maps.google.com/maps/api/js?key=YOUR_KEY_HERE'}),
    NgbModule.forRoot(),
    StoreModule.forRoot({ users: userReducer}),
    EffectsModule.forRoot([UserEffects])
  ],
    providers: [ UserService,
    UserLogic],
  bootstrap: [AppComponent ],
  entryComponents: [AlertMsgComponent]
})
export class AppModule { }
