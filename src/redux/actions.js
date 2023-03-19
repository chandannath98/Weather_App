export const SET_WEATHER_DATA = 'SET_WEATHER_DATA';

export const setWeatherData = weatherData => dispatch => {
    dispatch({
        type: SET_WEATHER_DATA,
        payload: weatherData,
    });
};

