import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddMyBankComponent } from './add-my-bank.component';

describe('AddMyBankComponent', () => {
  let component: AddMyBankComponent;
  let fixture: ComponentFixture<AddMyBankComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddMyBankComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddMyBankComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
