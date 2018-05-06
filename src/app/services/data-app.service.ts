import { Injectable } from '@angular/core';


@Injectable() export class DataAppService {
  public typeUserEnum = {
    'NUN': '',
    'SALE': 'למכור',
    'RENTING': 'לשכור',
    'FOR_RENT': 'להשכיר',
    'TO_BUY': 'לקנות',

    '': 'NUN',
    'למכור': 'SALE',
    'לשכור': 'RENTING',
    'להשכיר': 'FOR_RENT',
    'לקנות': 'TO_BUY',
  };

  public isNewAssetEnum = {
    'First': 'ראשונה' ,
    'second' : 'שנייה',

    'ראשונה': true ,
    'שנייה' : false,

    true: 'ראשונה',
    false: 'שנייה'
  }
}




//'NUN', 'SALE','RENTING', 'FOR_RENT', 'TO_BUY'
