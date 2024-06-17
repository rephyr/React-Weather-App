import clearImage from './assets/clear.jpg';
import rainyImage from './assets/rain.jpg';
import cloudyImage from './assets/clouds.jpg';
import snowImage from './assets/snow.jpg';
import thunderstormImage from './assets/thunder.jpg';
import defaultImage from './assets/clouds.jpg';

const getBackgroundImage = (weatherCondition) => {
    switch (weatherCondition) {
        case "Clear":
            return clearImage;
        case 'Rain':
            return rainyImage;
        case 'Clouds':
            return cloudyImage;
        case 'Snow':
            return snowImage;
        case 'Drizzle':
            return rainyImage;
        case 'Thunderstorm':
            return thunderstormImage;
        default:
            return defaultImage;
    }
};

export default getBackgroundImage;