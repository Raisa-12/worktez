import { Component, OnInit, Input } from '@angular/core';
import { ThemeService } from '../../../services/theme/theme.service';
import { AngularFireFunctions } from '@angular/fire/functions';

@Component({
  selector: 'app-theme',
  templateUrl: './theme.component.html',
  styleUrls: ['./theme.component.css']
})
export class ThemeComponent implements OnInit {
  @Input('appTheme') appTheme: string
  @Input('uid') uid: string
  showloader: boolean = false;

  enableDarkTheme: boolean
  constructor(public themeService: ThemeService, private functions: AngularFireFunctions) { }

  ngOnInit(): void {
    if(this.appTheme == 'theme-dark'){
      this.enableDarkTheme = true;
    }else{
      this.enableDarkTheme = false;
    }
  }

  changeThemeSwitch(){
    if(!this.enableDarkTheme){
      return this.updateTheme('theme-dark')
    }
    else{
      return this.updateTheme('theme-light')
    }
   
  }

  async updateTheme(appTheme: string){
    this.showloader = true;
    this.themeService.changeTheme(appTheme);
    const callable = this.functions.httpsCallable('updateTheme');

    try {
      const result = await callable({Uid: this.uid, AppTheme: appTheme}).toPromise();
      this.showloader = false;
      console.log("Successfully created the task");
      console.log(result);
    } catch (error) {
    }
  }

}
