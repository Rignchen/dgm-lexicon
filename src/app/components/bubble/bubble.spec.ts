import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Bubble } from './bubble';

describe('Bubble', () => {
  let component: Bubble;
  let fixture: ComponentFixture<Bubble>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Bubble]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Bubble);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
