import Axios from 'axios';
import Data from '../config/Data';
import { config } from '../config/Config';

const data = new Data();

class LibGeolocation {
    constructor() {
        this.locationListener = null;
    }   

    watch() {
        this.unwatch();

        this.locationListener = navigator.geolocation.watchPosition(
            (position) => {
                this.storeLocation(position.coords);
            },
            (error) => alert(error.message),
            {
                enableHighAccuracy: false,
                timeout: 20000,
                maximumAge: 1000
            },
        );
    }

    unwatch() {
        navigator.geolocation.clearWatch(this.locationListener);
    }

    async storeLocation({ latitude, longitude }) {
        const user = await data.select('user');
        const token = await data.select('api_token');

        if (!user || !token) return;

        try {
            user.latitude = latitude;
            user.longitude = longitude;

            Axios.defaults.headers.common['Authorization'] = 'Bearer ' + token;

            await Axios.post(config.url + 'location', { latitude, longitude });
            await data.insert('user', user);
        } catch (error) {
            console.error(error);
        }
    }
}

const instance = new LibGeolocation();
export default instance;