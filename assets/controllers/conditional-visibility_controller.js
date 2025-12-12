import { Controller } from '@hotwired/stimulus';

export default class extends Controller {
    static values = {
        trigger: String,
        targetSelector: String
    }

    connect() {
        // Find the target element within the same form to avoid conflicts
        const form = this.element.closest('form');
        if (form) {
            this.target = form.querySelector(this.targetSelectorValue);
        } else {
            // Fallback for standalone fields
            this.target = document.querySelector(this.targetSelectorValue);
        }

        if (!this.target) {
            console.warn('Conditional visibility: Target not found', this.targetSelectorValue);
            return;
        }

        // Listen for changes
        this.element.addEventListener('change', this.check.bind(this));

        // Initial check
        this.check();
    }

    check() {
        if (!this.target) return;

        // Handle multi-select (Choices.js) and single select
        const selectedValues = Array.from(this.element.selectedOptions).map(option => option.value);

        // Check if the trigger value is present in the selection
        const shouldShow = selectedValues.includes(this.triggerValue);

        if (shouldShow) {
            this.target.style.display = '';
        } else {
            this.target.style.display = 'none';
        }
    }
}
