import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyInforComponent } from './my-infor.component';

describe('MyInforComponent', () => {
  let component: MyInforComponent;
  let fixture: ComponentFixture<MyInforComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MyInforComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MyInforComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
