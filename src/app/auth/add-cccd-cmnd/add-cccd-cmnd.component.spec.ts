import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddCccdCmndComponent } from './add-cccd-cmnd.component';

describe('AddCccdCmndComponent', () => {
  let component: AddCccdCmndComponent;
  let fixture: ComponentFixture<AddCccdCmndComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddCccdCmndComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddCccdCmndComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
