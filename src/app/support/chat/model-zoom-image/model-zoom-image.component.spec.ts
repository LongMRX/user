import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModelZoomImageComponent } from './model-zoom-image.component';

describe('ModelWithdrawMoneyComponent', () => {
  let component: ModelZoomImageComponent;
  let fixture: ComponentFixture<ModelZoomImageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModelZoomImageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModelZoomImageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
