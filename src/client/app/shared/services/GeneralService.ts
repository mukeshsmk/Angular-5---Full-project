import { Injectable, EventEmitter } from '@angular/core';

@Injectable()
export class GeneralService {
  emitter: EventEmitter<string> = new EventEmitter();
  public changeModule(type: string) {
    this.emitter.emit(type);
  }
}
