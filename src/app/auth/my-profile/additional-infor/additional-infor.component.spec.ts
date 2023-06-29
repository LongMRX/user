import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdditionalInforComponent } from './additional-infor.component';

describe('AdditionalInforComponent', () => {
  let component: AdditionalInforComponent;
  let fixture: ComponentFixture<AdditionalInforComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdditionalInforComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdditionalInforComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
