import { Component, OnInit } from '@angular/core';

import { AnimationsService, CustomAnimation, AnimationStep } from '../../services/animations.service';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-animation-creation',
  templateUrl: './animation-creation.component.html',
  styleUrls: ['./animation-creation.component.scss'],
})
export class AnimationCreationComponent implements OnInit {
  animation: CustomAnimation = {
    name: '',
    type: 'custom',
    steps: []
  };
  animationStep: AnimationStep = {
    id: 0,
    startColor: '',
    endColor: '',
    duration: 1
  };
  constructor(
    private animationService: AnimationsService,
    private modalCtrl: ModalController
    ) { }
  ngOnInit() {}

  addStep() {
    this.animationStep.id = this.animation.steps.length;
    if (this.isColor(this.animationStep.startColor) && this.isColor(this.animationStep.startColor) && this.animationStep.duration > 0) {
      this.animation.steps.push({...this.animationStep});
    }
  }

  async finish() {
    if (this.animation.name.length > 0 && this.animation.steps.length > 0) {
      if (this.animationService.addCustomAnimation(this.animation)) {
        await this.modalCtrl.dismiss();
      }
    }
  }

  isColor(color: string): boolean {
    return color.length === 7;
  }
}
