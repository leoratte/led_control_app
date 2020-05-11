import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { AnimationCreationPage } from './animation-creation.page';

describe('AnimationCreationPage', () => {
  let component: AnimationCreationPage;
  let fixture: ComponentFixture<AnimationCreationPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AnimationCreationPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(AnimationCreationPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
