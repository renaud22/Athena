import { Controller } from '@hotwired/stimulus';

/*
 * This controller requires the Google Maps JavaScript API with Places library.
 * Ensure you have <script src="https://maps.googleapis.com/maps/api/js?key=YOUR_API_KEY&libraries=places"></script> in your layout.
 */
export default class extends Controller {
    static targets = ['input'];

    connect() {
        this.attemptInitialization();
    }

    attemptInitialization() {
        // On vérifie si l'API Google est chargée
        if (typeof google !== 'undefined' && typeof google.maps !== 'undefined' && typeof google.maps.places !== 'undefined') {
            this.initAutocomplete();
        } else {
            // Sinon, on réessaie dans 100ms
            console.log('Google Maps API not ready yet, retrying...');
            setTimeout(() => this.attemptInitialization(), 100);
        }
    }

    initAutocomplete() {
        console.log('Initializing Google Places Autocomplete');

        const options = {
            fields: ["formatted_address", "geometry", "name"],
            strictBounds: false,
            types: ['address'],
        };

        try {
            this.autocomplete = new google.maps.places.Autocomplete(this.element, options);

            this.autocomplete.addListener('place_changed', this.onPlaceChanged.bind(this));

            // Empêcher la soumission du formulaire quand on appuie sur Entrée pour choisir une adresse
            this.element.addEventListener('keydown', (e) => {
                if (e.key === 'Enter') {
                    e.preventDefault();
                }
            });
        } catch (error) {
            console.error('Google Maps Autocomplete initialization failed:', error);
        }
    }

    onPlaceChanged() {
        const place = this.autocomplete.getPlace();

        if (!place.geometry) {
            return;
        }

        // You can dispatch an event here if you need to fill other fields (city, zip, etc.)
        // For now, the input value is automatically updated by the API.
        this.element.value = place.formatted_address;
        this.element.dispatchEvent(new Event('change'));
    }
}
