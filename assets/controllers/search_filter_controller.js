import { Controller } from '@hotwired/stimulus';

export default class extends Controller {
    static targets = ["item", "container", "searchInput", "sortSelect", "viewBtn"];
    static classes = ["hidden"];

    connect() {
        this.viewMode = localStorage.getItem('commercial-relation-view') || 'grid';
        this.applyViewMode();
    }

    filter() {
        const query = this.searchInputTarget.value.toLowerCase();

        this.itemTargets.forEach(item => {
            const name = item.dataset.name.toLowerCase();
            const status = item.dataset.status.toLowerCase();
            const type = item.dataset.type.toLowerCase();

            const match = name.includes(query) || status.includes(query) || type.includes(query);

            if (match) {
                item.classList.remove('d-none');
            } else {
                item.classList.add('d-none');
            }
        });
    }

    sort() {
        const sortBy = this.sortSelectTarget.value;
        const items = Array.from(this.itemTargets);

        items.sort((a, b) => {
            let valA, valB;

            switch(sortBy) {
                case 'name_asc':
                    valA = a.dataset.name.toLowerCase();
                    valB = b.dataset.name.toLowerCase();
                    return valA.localeCompare(valB);
                case 'name_desc':
                    valA = a.dataset.name.toLowerCase();
                    valB = b.dataset.name.toLowerCase();
                    return valB.localeCompare(valA);
                case 'status':
                    valA = a.dataset.status.toLowerCase();
                    valB = b.dataset.status.toLowerCase();
                    return valA.localeCompare(valB);
                default:
                    return 0;
            }
        });

        items.forEach(item => this.containerTarget.appendChild(item));
    }

    toggleView(event) {
        const mode = event.currentTarget.dataset.mode;
        this.viewMode = mode;
        localStorage.setItem('commercial-relation-view', mode);
        this.applyViewMode();
    }

    applyViewMode() {
        // Update container class
        if (this.viewMode === 'list') {
            this.containerTarget.classList.remove('row', 'row-cols-1', 'row-cols-md-2', 'row-cols-lg-3', 'g-4');
            this.containerTarget.classList.add('d-flex', 'flex-column', 'gap-3');
        } else {
            this.containerTarget.classList.add('row', 'row-cols-1', 'row-cols-md-2', 'row-cols-lg-3', 'g-4');
            this.containerTarget.classList.remove('d-flex', 'flex-column', 'gap-3');
        }

        // Update items
        this.itemTargets.forEach(item => {
            if (this.viewMode === 'list') {
                item.classList.remove('col');
                item.querySelector('.card').classList.add('flex-row', 'align-items-center');
                item.querySelector('.card-img-top')?.classList.add('d-none'); // If we had images
                // Add specific list styling classes if needed
            } else {
                item.classList.add('col');
                item.querySelector('.card').classList.remove('flex-row', 'align-items-center');
                item.querySelector('.card-img-top')?.classList.remove('d-none');
            }
        });

        // Update buttons state
        this.viewBtnTargets.forEach(btn => {
            if (btn.dataset.mode === this.viewMode) {
                btn.classList.add('active', 'btn-primary');
                btn.classList.remove('btn-outline-secondary');
            } else {
                btn.classList.remove('active', 'btn-primary');
                btn.classList.add('btn-outline-secondary');
            }
        });
    }
}
