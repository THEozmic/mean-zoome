import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AssetsEditComponent } from './assets-edit.component';

describe('AssetsEditComponent', () => {
  let component: AssetsEditComponent;
  let fixture: ComponentFixture<AssetsEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AssetsEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AssetsEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
