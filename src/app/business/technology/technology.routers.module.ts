import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {TechnologyComponent} from './technology.component';
import {TechnicspackAmendComponent} from './technicspack-amend/technicspack-amend.component';
import {TechnicspackTemperatureComponent} from './technicspack-temperature/technicspack-temperature.component';
const mainRoutes: Routes = [
  {path: '', component: TechnologyComponent,
    children: [
      {path: 'amend', component: TechnicspackAmendComponent},
      {path: 'temperature', component: TechnicspackTemperatureComponent},
    ]}
];

@NgModule({
  imports: [RouterModule.forChild(mainRoutes)],
  exports: [RouterModule],
  providers: []
})
export class TechnologyRoutersModule {}
