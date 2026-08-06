import { Component, computed, effect, inject, output, signal } from '@angular/core';
import {
  form,
  FormField,
  required,
  validate,
} from '@angular/forms/signals';
import { RoomFormData, ROOM_TYPE_LABELS, ROOM_TYPES, RoomType } from '../models/room.model';
import { RoomService } from '../services/room.service';

interface RoomFormModel {
  name: string;
  type: RoomType | '';
  price: number;
  bedCount: number;
  numberOfNights: number;
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
  numberOfNights: 1,
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
  private readonly roomService = inject(RoomService);

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
    required(schema.numberOfNights, { message: 'Broj noći je obavezan.' });
    validate(schema.numberOfNights, ({ value }) => {
      const numberOfNights = value();
      if (typeof numberOfNights !== 'number' || Number.isNaN(numberOfNights) || numberOfNights <= 0) {
        return { kind: 'positiveNumber', message: 'Broj noći mora biti pozitivan broj.' };
      }
      return null;
    });
  });

  protected readonly calculatedPrice = computed(() => {
    const data = this.formModel();
    const nightsField = this.roomForm.numberOfNights();
    const priceField = this.roomForm.price();

    if (nightsField.errors().length > 0 || priceField.errors().length > 0) {
      return null;
    }

    return this.roomService.getPrice(data.numberOfNights, {
      pricePerNight: data.price,
      bazen: data.bazen,
      miniBar: data.miniBar,
      sauna: data.sauna,
      konferencijskaSala: data.konferencijskaSala,
      vecera: data.vecera,
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
