import { useState, useEffect } from 'react';
import { fetchNextDaySunrise } from '../api/weatherApi';

const useNextDaySunrise = (lat, lon) => {
  const [sunrise, setSunrise] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!lat || !lon) {
      setError(new Error('Latitude and longitude are required'));
      setLoading(false);
      return;
    }

    setLoading(true);
    fetchNextDaySunrise(lat, lon)
      .then(sunriseLocal => {
        setSunrise(sunriseLocal);
        setLoading(false);
      })
      .catch(err => {
        setError(err);
        setLoading(false);
      });
  }, [lat, lon]);

  return { sunrise, loading, error };
};

export default useNextDaySunrise;