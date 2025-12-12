import { Controller } from '@hotwired/stimulus';

let googleMapsLoadingPromise = null;

function loadGoogleMaps() {
    if (googleMapsLoadingPromise) return googleMapsLoadingPromise;

    googleMapsLoadingPromise = new Promise((resolve, reject) => {
        if (typeof google !== 'undefined' && google.maps) {
            resolve(google.maps);
            return;
        }

        const script = document.createElement('script');
        script.src = "https://maps.googleapis.com/maps/api/js?key=AIzaSyD4BxjS_5EjgkPhAlo-vZh1PIrSp73SfRc&libraries=places&callback=initGoogleMapsCallback";
        script.async = true;
        script.defer = true;

        window.initGoogleMapsCallback = () => {
            resolve(google.maps);
        };

        script.onerror = (error) => {
            console.error('Google Maps load error:', error);
            reject(error);
        };

        document.head.appendChild(script);
    });

    return googleMapsLoadingPromise;
}

/*
 * This controller loads the Google Maps JavaScript API with Places library on demand.
 */
export default class extends Controller {
    static targets = ['input'];

    connect() {
        loadGoogleMaps().then(() => {
            this.initAutocomplete();
        }).catch(error => {
            console.error('Failed to load Google Maps API:', error);
        });
    }

    initAutocomplete() {
        console.log('Initializing Google Places Autocomplete');

        const options = {
            fields: ["formatted_address"],
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
