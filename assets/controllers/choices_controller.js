import { Controller } from '@hotwired/stimulus';
import Choices from 'choices.js';

/*
 * This controller requires the "choices.js" package.
 * Run: php bin/console importmap:require choices.js
 */
export default class extends Controller {
    connect() {
        // Find the select or input element inside the container
        const element = this.element.querySelector('select, input');

        if (!element) {
            console.warn('Choices controller: No select or input found in', this.element);
            return;
        }

        this.choices = new Choices(element, {
            removeItemButton: true,
            allowHTML: true,
            itemSelectText: '',
            classNames: {
                containerOuter: 'choices',
                containerInner: 'choices__inner',
                input: 'choices__input',
                inputCloned: 'choices__input--cloned',
                list: 'choices__list',
                listItems: 'choices__list--multiple',
                listSingle: 'choices__list--single',
                listDropdown: 'choices__list--dropdown',
                item: 'choices__item',
                itemSelectable: 'choices__item--selectable',
                itemDisabled: 'choices__item--disabled',
                itemChoice: 'choices__item--choice',
                placeholder: 'choices__placeholder',
                group: 'choices__group',
                groupHeading: 'choices__heading',
                button: 'choices__button',
                activeState: 'is-active',
                focusState: 'is-focused',
                openState: 'is-open',
                disabledState: 'is-disabled',
                highlightedState: 'is-highlighted',
                selectedState: 'is-selected',
                flippedState: 'is-flipped',
                loadingState: 'is-loading',
                noResults: 'has-no-results',
                noChoices: 'has-no-choices'
            }
        });
    }

    disconnect() {
        if (this.choices) {
            this.choices.destroy();
        }
    }
}
