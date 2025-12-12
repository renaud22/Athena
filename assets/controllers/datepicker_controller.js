import { Controller } from '@hotwired/stimulus';
import flatpickr from 'flatpickr';
import { French } from 'flatpickr/dist/l10n/fr.js';

/*
 * This controller requires the "flatpickr" package.
 * Run: php bin/console importmap:require flatpickr
 */
export default class extends Controller {
    connect() {
        // Remove form-control from the original input (which becomes hidden)
        // This prevents Bootstrap's floating label CSS from seeing a "non-placeholder-shown" hidden input and floating the label permanently.
        this.element.classList.remove('form-control');

        this.fp = flatpickr(this.element, {
            locale: French,
            altInput: true,
            altFormat: "j F Y",
            dateFormat: "Y-m-d",
            allowInput: true,
            disableMobile: true,
            theme: "dark",
            onReady: (selectedDates, dateStr, instance) => {
                if (instance.altInput) {
                    instance.altInput.classList.add('form-control');
                    // Ensure placeholder is set to trigger floating label logic
                    // We use a space if no placeholder is defined to ensure the label can float/rest correctly
                    const placeholder = this.element.getAttribute('placeholder') || ' ';
                    instance.altInput.placeholder = placeholder;
                }
            }
        });
    }

    disconnect() {
        if (this.fp) {
            this.fp.destroy();
        }
    }
}
