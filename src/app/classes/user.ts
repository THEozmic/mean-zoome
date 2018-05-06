import {XlsxComperEnum} from "../enums/xlsx-comper.enum";
export class User {
  public RequestDate:string;
  public typeUser:string = 'NUN';
  public name:string;
  public phone:string;
  public email:string;
  public city:string;
  public zone:string;
  public assetType:string;
  public budget:string;
  public numRooms:string;
  public isNewAsset:boolean;
  public isAddAsset:boolean = false;

  setDataByField(field:string, data:any) {
    if (!field || !data){
      return;
    }
    switch (field) {
      case XlsxComperEnum.RequestDate:{
        this.RequestDate = data;

        break;
      }
      case XlsxComperEnum.typeUser:{
        if (data == 'מכירה'){
          this.typeUser = 'SALE';
        }
        if (data == 'השכרה'){
          this.typeUser = 'RENTING';
        }
        break;
      }
      case XlsxComperEnum.name:{
        this.name = data;
        break;
      }
      case XlsxComperEnum.phone:{
        this.phone = data;
        break;
      }
      case XlsxComperEnum.email:{
        this.email = data;
        break;
      }
      case XlsxComperEnum.city:{
        this.city = data;
        break;
      }
      case XlsxComperEnum.zone:{
        this.zone = data;
        break;
      }
      case XlsxComperEnum.assetType:{
        this.assetType = data;
        break;
      }
      case XlsxComperEnum.budget:{
        this.budget = data;
        break;
      }
      case XlsxComperEnum.numRooms:{
        this.numRooms = data;
        break;
      }
      case XlsxComperEnum.isNewAsset:{
        if (data == 'שנייה'){
          this.isNewAsset = false;
        }
        if (data == 'חדשה'){
          this.isNewAsset = true;
        }
        break;
      }
      default:{

        break;
      }
    }
  }

  /*private static convertMonth(temp:string|any) :number {
    var res:number = 0;
    switch (temp) {
      case "ינואר":{
        res = 1;
        break;
      }
      case "פבואר":{
        res = 2;
        break;
      }
      case "מרס":{
        res = 3;
        break;
      }
      case "אפריל":{
        res = 4;
        break;
      }
      case "מאי":{
        res = 5;
        break;
      }
      case "יוני":{
        res = 6;
        break;
      }
      case "יולי":{
        res = 7;
        break;
      }
      case "אוגוסט":{
        res = 8;
        break;
      }
      case "ספטמבר":{
        res = 9;
        break;
      }
      case "אוקטובר":{
        res = 10;
        break;
      }
      case "נובמבר":{
        res = 11;
        break;
      }
      case "דצמבר":{
        res = 12;
        break;
      }
      default:{
        break;
      }
    }

    return res;
  }*/
}


/*
 RequestDate = 'תאריך בקשה',
 typeUser = 'מכירה/השכרה',
 name = 'שם ומשפחה',
 phone = 'טלפון',
 email = 'דואר אלקטרוני',
 city = 'עיר',
 zone = 'אזור',
 assetType = 'סוג נכס',
 budget = 'תקציב',
 numRooms = 'מספר חדרים מבוקש',
 isNewAsset ='יד'
*/
