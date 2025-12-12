import { Controller } from '@hotwired/stimulus';

export default class extends Controller {
    static targets = ["collectionContainer"]
    static values = {
        index: Number,
        prototype: String,
    }

    connect() {
        this.updateDeleteButtons();
    }

    addCollectionElement(event) {
        const card = document.createElement('div');
        card.classList.add('card', 'contact-item', 'fade-in');
        card.setAttribute('data-controller', 'contact-item');

        // Replace __name__ with the current index
        const prototype = this.prototypeValue.replace(/__name__/g, this.indexValue);
        const contactNumber = this.indexValue + 1;

        card.innerHTML = `
            <div class="card-header d-flex justify-content-between align-items-center">
                <span class="fw-bold text-primary" data-contact-item-target="title">Contact #${contactNumber}</span>
                <div>
                    <button type="button" class="btn btn-sm btn-outline-primary me-2" data-action="form-collection#addCollectionElement">
                        <i class="bi bi-person-plus"></i>
                    </button>
                    <button type="button" class="btn btn-sm btn-outline-danger" aria-label="Supprimer" data-action="form-collection#removeCollectionElement">
                        <i class="bi bi-trash"></i>
                    </button>
                </div>
            </div>
            <div class="card-body">
                ${prototype}
            </div>
        `;

        this.collectionContainerTarget.appendChild(card);
        this.indexValue++;
        this.updateDeleteButtons();
    }

    removeCollectionElement(event) {
        event.preventDefault();
        const items = this.collectionContainerTarget.querySelectorAll('.contact-item');
        if (items.length <= 1) {
            return;
        }
        const item = event.target.closest('.contact-item');
        item.remove();
        this.updateDeleteButtons();
    }

    updateDeleteButtons() {
        const items = this.collectionContainerTarget.querySelectorAll('.contact-item');
        const deleteButtons = this.collectionContainerTarget.querySelectorAll('[data-action="form-collection#removeCollectionElement"]');

        if (items.length <= 1) {
            deleteButtons.forEach(btn => btn.setAttribute('disabled', 'disabled'));
        } else {
            deleteButtons.forEach(btn => btn.removeAttribute('disabled'));
        }
    }
}
