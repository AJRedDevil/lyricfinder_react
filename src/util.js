const BASE_URL = "http://api.musixmatch.com/ws/1.1";
const CORS_URL = "https://cors-anywhere.herokuapp.com";

const appendAPIKey = (url) => `${url}&apikey=${process.env.REACT_APP_MM_KEY}`;
const applyCors = (url) => `${CORS_URL}/${BASE_URL}/${url}`;
const musixMatchAPI = (url) => appendAPIKey(applyCors(url));

export const getChartTracksURL = () => musixMatchAPI("chart.tracks.get?page=1&page_size=10&country=us&f_has_lyrics=1");

export const getTrackLyricsURL = (id) => musixMatchAPI(`track.lyrics.get?track_id=${id}`);

export const getTracksInfoURL = (id) => musixMatchAPI(`track.get?track_id=${id}`);