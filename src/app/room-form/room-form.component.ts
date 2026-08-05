import { Component, effect, output, signal } from '@angular/core';
import {
  form,
  FormField,
  required,
  validate,
} from '@angular/forms/signals';
import { RoomFormData, ROOM_TYPE_LABELS, ROOM_TYPES, RoomType } from '../models/room.model';

interface RoomFormModel {
  name: string;
  type: RoomType | '';
  price: number;
  bedCount: number;
  description: string;
  bazen: boolean;
  miniBar: boolean;
  sauna: boolean;
  konferencijskaSala: boolean;
  vecera: boolean;
}

const emptyFormModel = (): RoomFormModel => ({
  name: '',
  type: '',
  price: 0,
  bedCount: 1,
  description: '',
  bazen: false,
  miniBar: false,
  sauna: false,
  konferencijskaSala: false,
  vecera: false,
});

interface FormFieldState {
  touched: () => boolean;
  errors: () => unknown[];
}

@Component({
  selector: 'app-room-form',
  imports: [FormField],
  templateUrl: './room-form.component.html',
})
export class RoomFormComponent {
  readonly roomSubmitted = output<RoomFormData>();

  protected readonly roomTypes = ROOM_TYPES;
  protected readonly roomTypeLabels = ROOM_TYPE_LABELS;
  protected readonly submitAttempted = signal(false);

  protected readonly formModel = signal<RoomFormModel>(emptyFormModel());

  protected readonly roomForm = form(this.formModel, (schema) => {
    required(schema.name, { message: 'Naziv je obavezan.' });
    required(schema.type, { message: 'Tip sobe je obavezan.' });
    validate(schema.price, ({ value }) => {
      const price = value();
      if (typeof price !== 'number' || Number.isNaN(price) || price <= 0) {
        return { kind: 'positiveNumber', message: 'Cena mora biti pozitivan broj.' };
      }
      return null;
    });
    validate(schema.bedCount, ({ value }) => {
      const bedCount = value();
      if (typeof bedCount !== 'number' || Number.isNaN(bedCount) || bedCount <= 0) {
        return { kind: 'positiveNumber', message: 'Broj kreveta mora biti pozitivan broj.' };
      }
      return null;
    });
  });

  constructor() {
    effect(() => {
      const name = this.formModel().name;
      if (name.length < 6) {
        console.log('Naziv sobe mora imati najmanje 6 karaktera.');
      }
    });
  }

  protected showFieldError(field: FormFieldState): boolean {
    return (this.submitAttempted() || field.touched()) && field.errors().length > 0;
  }

  onSubmit(event: Event): void {
    event.preventDefault();
    this.submitAttempted.set(true);

    if (!this.roomForm().valid()) {
      return;
    }

    const data = this.formModel();
    this.roomSubmitted.emit({
      name: data.name,
      type: data.type as RoomType,
      price: data.price,
      bedCount: data.bedCount,
      description: data.description,
    });

    this.resetForm();
  }

  private resetForm(): void {
    this.roomForm().reset(emptyFormModel());
    this.submitAttempted.set(false);
  }
}
