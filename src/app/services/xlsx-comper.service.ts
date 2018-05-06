import { Injectable } from '@angular/core';
import * as XLSX from 'ts-xlsx';
import {XlsxComperEnum} from "../enums/xlsx-comper.enum";
import {User} from "../classes/user";
@Injectable()
export class XlsxComperService {
  arrayBuffer:any;  constructor() { }

  /*public valueOf(name: string): string | null {
    const names = Object.keys(XlsxComperEnum);
    for (let i = 0; i < names.length; i++) {
      if (name.toLowerCase() === XlsxComperEnum[names[i]].toLowerCase()) {
        return names[i];
      }
    }

    return "";
  }*/

  Action(file:File, cb:Function) {
    let fileReader = new FileReader();
    fileReader.onload = (e) => {
      this.arrayBuffer = fileReader.result;
      var data = new Uint8Array(this.arrayBuffer);
      var arr = new Array();
      for(var i = 0; i != data.length; ++i) arr[i] = String.fromCharCode(data[i]);
      var bstr = arr.join("");
      var workbook = XLSX.read(bstr, {type:"binary"});
      var first_sheet_name = workbook.SheetNames[0];
      var worksheet = workbook.Sheets[first_sheet_name];

      var jsonFile = XLSX.utils.sheet_to_json(worksheet,{raw:true});

      var allNewUsers:User[]=[];
      for (var row of jsonFile){

        var user = new User();
        for (var field in row){
          user.setDataByField(field, row[field]);
          
          /*var convertedField:string = this.valueOf(field);
          if (convertedField != ""){
            user[convertedField] = row[field];
          }*/
        }
        user.isAddAsset = true;
        allNewUsers.push(user);
      }

      cb(allNewUsers);
      //console.log(allNewUsers);

    };
    fileReader.readAsArrayBuffer(file);
  }
}
