import { Controller } from '@hotwired/stimulus';

export default class extends Controller {
    static values = {
        content: String
    }

    copy(event) {
        event.preventDefault();
        if (!this.contentValue) return;

        navigator.clipboard.writeText(this.contentValue).then(() => {
            const icon = this.element.querySelector('i');
            if (icon) {
                const originalClass = icon.className;
                icon.className = 'bi bi-check-lg';
                setTimeout(() => {
                    icon.className = originalClass;
                }, 2000);
            }
        });
    }
}
