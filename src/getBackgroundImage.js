import clearImage from './assets/clear.jpg';
import rainyImage from './assets/clouds.jpg';
import cloudyImage from './assets/clouds.jpg';
import snowImage from './assets/clouds.jpg';
import rainImage from './assets/clouds.jpg';
import thunderstormImage from './assets/clouds.jpg';
import defaultImage from './assets/clouds.jpg';

const getBackgroundImage = (weatherCondition) => {
    switch (weatherCondition) {
        case "Clear":
            return `url(${clearImage})`;
        case 'Rain':
            return `url(${rainyImage})`;
        case 'Clouds':
            return `url(${cloudyImage})`;
        case 'Snow':
            return `url(${snowImage})`;
        case 'Drizzle':
            return `url(${rainImage})`;
        case 'Thunderstorm':
            return `url(${thunderstormImage})`;
        default:
            return `url(${defaultImage})`;
    }
};

export default getBackgroundImage;