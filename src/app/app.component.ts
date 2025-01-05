import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { faker } from '@faker-js/faker';

interface ILetter {
  value: string;
  isCorrect?: boolean;
}

@Component({
  selector: 'app-root',
  imports: [CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  wordsCount = 10;
  text = '';
  submittedText = '';
  letters: ILetter[] = [];
  hasStarted = false;
  startTime?: number;
  result?: number;

  public constructor() {
    this.resetGame();
  }

  resetGame() {
    this.hasStarted = false;
    this.startTime = undefined;
    this.submittedText = '';
    this.result = undefined;

    this.generateText();
    this.getLetters();
  }

  generateText() {
    this.text = faker.word.words({
      count: this.wordsCount,
    });
  }

  getLetters() {
    this.letters = [];

    for (let i = 0; i < this.text.length; i += 1) {
      const result: ILetter = {
        value: this.text[i],
      };

      if (this.submittedText.length > i) {
        result.isCorrect = this.submittedText[i] === this.text[i];
      }

      this.letters.push(result);
    }
  }

  startGame() {
    this.hasStarted = true;
    this.startTime = Date.now();
  }

  onInput(target: EventTarget) {
    if (!this.hasStarted) this.startGame();

    const { value } = target as HTMLInputElement;

    this.submittedText = value;

    this.getLetters();
  }

  getColor(result: ILetter) {
    if (result.isCorrect) {
      return 'text-white';
    } else if (result.isCorrect === false) {
      return 'text-red-500';
    } else {
      return 'text-neutral-400';
    }
  }

  getResult() {
    if (this.hasStarted && this.startTime) {
      const endTime = Date.now();

      const duration = endTime - this.startTime;

      return Math.round(
        this.text.replace(' ', '').length / 4.7 / (duration / (1000 * 60))
      );
    }

    return null;
  }
}
