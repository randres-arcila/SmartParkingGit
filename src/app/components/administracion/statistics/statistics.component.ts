import { Component, OnInit} from '@angular/core';
import { NgForm } from '@angular/forms';
import Statistics from 'src/app/Statistics';
import { StatisticsService } from 'src/app/services/statistics.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-statistics',
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.css']
})
export class StatisticsComponent implements OnInit{

  devicesStatistics: any[] = [];
  statistics: Statistics;
  public timerInterval:any;
  constructor(private statisticsService: StatisticsService,
              private router: Router) { }

  sprite1 = new Image();
  sprite2 = new Image();
  sprite3 = new Image();
  sprite4 = new Image();
  sprite5 = new Image();
  sprite6 = new Image();
  sprite7 = new Image();
  sprite8 = new Image();
  sprite9 = new Image();
  sprite10 = new Image();
  mapSprite = new Image();

  canvas: any;
  context: any;

  ngOnInit() {
    this.sprite1.src = "../../../assets/Img/10.png";
    this.sprite2.src = "../../../assets/Img/20.png";
    this.sprite3.src = "../../../assets/Img/30.png";
    this.sprite4.src = "../../../assets/Img/40.png";
    this.sprite5.src = "../../../assets/Img/50.png";
    this.sprite6.src = "../../../assets/Img/60.png";
    this.sprite7.src = "../../../assets/Img/70.png";
    this.sprite8.src = "../../../assets/Img/80.png";
    this.sprite9.src = "../../../assets/Img/90.png";
    this.sprite10.src = "../../../assets/Img/100.png";

    this.canvas = <HTMLCanvasElement> document.getElementById('Canvas');
    this.context = this.canvas.getContext("2d");
  }

  generate(form: NgForm){
    console.log(form.value.sector);
    this.statistics = {
     sector: form.value.sector,
     month: form.value.mesAño*1,
     week: form.value.semana*1
    }

    // console.log(this.device)
    this.statisticsService.generateStatistics(this.statistics).subscribe((data) => {
      alert('Buscado correctamente');
      console.log(data);
      this.devicesStatistics = data;
      //form.resetForm();
    });
    // this.deviceService.addDevic();
    this.timerInterval=setInterval(this.pintar, (1000 / 60)); // Refresh 60 times a second
    switch (form.value.sector) {
      case "parqueadero18":
        this.mapSprite.src = '../../../assets/Img/MapaStatistics.jpg';
        break;
      case "parqueaderomuua":
        this.mapSprite.src = '../../../assets/Img/MuuAM.jpg';
        break;
      case "circunferrocarril":
        this.mapSprite.src = '../../../assets/Img/FerrocarrilM.jpg';
        break;
      case "circunregional":
        this.mapSprite.src = '../../../assets/Img/RegionalM.jpg';
        break;
      case "circunbarranquilla":
        this.mapSprite.src = '../../../assets/Img/BarranquillaM.jpg';
        break;
    }

  }
  pintar=()=>{
    this.context.fillStyle = "#000";
    this.context.fillRect(0, 0, this.canvas.width, this.canvas.height);
    this.context.drawImage(this.mapSprite, 0, 0, 800, 800);



    this.devicesStatistics.map( device=>{

      let percent = (Math.round(parseFloat(device.percentage)*100)/100)

      if( percent <= 10){
        this.context.drawImage(this.sprite1, device.canvas_location.x,device.canvas_location.y,35,35);
      }else if(percent > 10 && percent <= 20){
        this.context.drawImage(this.sprite2, device.canvas_location.x,device.canvas_location.y,35,35);
      }else if(percent > 20 && percent <= 30){
        this.context.drawImage(this.sprite3, device.canvas_location.x,device.canvas_location.y,35,35);
      }else if(percent > 30 && percent <= 40){
        this.context.drawImage(this.sprite4, device.canvas_location.x,device.canvas_location.y,35,35);
      }else if(percent > 40 && percent <= 50){
        this.context.drawImage(this.sprite5, device.canvas_location.x,device.canvas_location.y,35,35);
      }else if(percent > 50 && percent <= 60){
        this.context.drawImage(this.sprite6, device.canvas_location.x,device.canvas_location.y,35,35);
      }else if(percent > 60 && percent <= 70){
        this.context.drawImage(this.sprite7, device.canvas_location.x,device.canvas_location.y,35,35);
      }else if(percent > 70 && percent <= 80){
        this.context.drawImage(this.sprite8, device.canvas_location.x,device.canvas_location.y,35,35);
      }else if(percent > 80 && percent <= 90){
        this.context.drawImage(this.sprite9, device.canvas_location.x,device.canvas_location.y,35,35);
      }else{
        this.context.drawImage(this.sprite10, device.canvas_location.x,device.canvas_location.y,35,35);
      }
    })
  };

  ToAdministracion() {
    this.router.navigateByUrl('/Administracion');
  }
  ToSidebar(){
    this.router.navigateByUrl('/Sidebar');
  }
  ToStatistics(){
    this.router.navigateByUrl('/Statistics');
  }
}
