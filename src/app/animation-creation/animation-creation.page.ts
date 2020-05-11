import { Component, OnInit } from '@angular/core';

import { AnimationsService, CustomAnimation, AnimationStep } from '../services/animations.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-animation-creation',
  templateUrl: './animation-creation.page.html',
  styleUrls: ['./animation-creation.page.scss'],
})
export class AnimationCreationPage implements OnInit {
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
    private router: Router
    ) { }

  ngOnInit() {
  }

  addStep() {
    this.animationStep.id = this.animation.steps.length;
    if (this.isColor(this.animationStep.startColor) && this.isColor(this.animationStep.startColor) && this.animationStep.duration > 0) {
      this.animation.steps.push({...this.animationStep});
    }
  }

  finish() {
    if (this.animation.name.length > 0 && this.animation.steps.length > 0) {
      if (this.animationService.addCustomAnimation(this.animation)) {
        this.router.navigate(['/tabs/tab3']);
      }
    }
  }

  isColor(color: string): boolean {
    return color.length === 7;
  }
}
