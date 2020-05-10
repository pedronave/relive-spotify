import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TrackFeaturesTabComponent } from './track-features-tab.component';

describe('TrackFeaturesTabComponent', () => {
  let component: TrackFeaturesTabComponent;
  let fixture: ComponentFixture<TrackFeaturesTabComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TrackFeaturesTabComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TrackFeaturesTabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
