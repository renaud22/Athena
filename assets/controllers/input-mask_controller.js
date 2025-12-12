import { Controller } from '@hotwired/stimulus';
import IMask from 'imask';

/*
 * This controller requires the "imask" package.
 * Run: php bin/console importmap:require imask
 */
export default class extends Controller {
    static values = {
        pattern: String,
        lazy: { type: Boolean, default: true }
    }

    connect() {
        this.mask = IMask(this.element, {
            mask: this.patternValue,
            lazy: this.lazyValue
        });
    }

    disconnect() {
        if (this.mask) {
            this.mask.destroy();
        }
    }
}
