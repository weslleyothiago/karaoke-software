import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { HomePage } from './home.page';

import { HomePageRoutingModule } from './home-routing.module';
import { MusicCardComponent } from 'src/app/components/music-card/music-card.component';
import { MusicListComponent } from 'src/app/components/music-list/music-list.component';

@NgModule({
  imports: [CommonModule, FormsModule, IonicModule, HomePageRoutingModule],
  declarations: [HomePage, MusicCardComponent, MusicListComponent],
})
export class HomePageModule {}
