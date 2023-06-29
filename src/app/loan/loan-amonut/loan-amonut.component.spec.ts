import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoanAmonutComponent } from './loan-amonut.component';

describe('LoanAmonutComponent', () => {
  let component: LoanAmonutComponent;
  let fixture: ComponentFixture<LoanAmonutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LoanAmonutComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LoanAmonutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
