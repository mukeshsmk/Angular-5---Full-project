import { Injectable, EventEmitter } from "@angular/core";

@Injectable()
export default class GeneralService {
  emitter: EventEmitter<string> = new EventEmitter();
  constructor() {}
  changeModule(type: string) {
    this.emitter.emit(type);
  }
}
