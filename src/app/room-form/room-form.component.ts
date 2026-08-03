import { Component, output, signal } from '@angular/core';
import {
  form,
  FormField,
  min,
  required,
} from '@angular/forms/signals';
import { RoomFormData, ROOM_TYPE_LABELS, ROOM_TYPES, RoomType } from '../models/room.model';

interface RoomFormModel {
  name: string;
  type: RoomType | '';
  price: number;
  bedCount: number;
  description: string;
}

const emptyFormModel = (): RoomFormModel => ({
  name: '',
  type: '',
  price: 0,
  bedCount: 1,
  description: '',
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
    required(schema.price, { message: 'Cena je obavezna.' });
    min(schema.price, 0, { message: 'Cena mora biti 0 ili veća.' });
    required(schema.bedCount, { message: 'Broj kreveta je obavezan.' });
    min(schema.bedCount, 1, { message: 'Broj kreveta mora biti najmanje 1.' });
  });

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
