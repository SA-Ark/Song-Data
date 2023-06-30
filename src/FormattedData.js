import data1 from './data/data1.json';
import data2 from './data/data2.json';
import data3 from './data/data3.json';
import data4 from './data/data4.json';
import data5 from './data/data5.json';
import data6 from './data/data6.json';
import data7 from './data/data7.json';
import data8 from './data/data8.json';
import data9 from './data/data9.json';

function msToTime(duration) {
    let seconds = Math.floor((duration / 1000) % 60),
        minutes = Math.floor((duration / (1000 * 60)) % 60),
        hours = Math.floor((duration / (1000 * 60 * 60)));

    return hours + "::" + minutes + "::" + seconds;
}


const allData = [].concat(data1, data2, data3, data4, data5, data6, data7, data8, data9);


let songData = {};
let artistData = {};

allData.forEach(item => {
    // Handle song data
    if (!songData[item.trackName.toLowerCase()]) {
        songData[item.trackName.toLowerCase()] = {
            name: item.trackName,  // add this line
            count: 1,
            artist: item.artistName,
            msPlayed: item.msPlayed
        };
    } else {
        songData[item.trackName.toLowerCase()].count++;
        songData[item.trackName.toLowerCase()].msPlayed += item.msPlayed;
    }

    // Handle artist data
    if (!artistData[item.artistName.toLowerCase()]) {
        artistData[item.artistName.toLowerCase()] = {
            name: item.artistName,  // add this line
            count: 1,
            msPlayed: item.msPlayed,
            songs: new Set([item.trackName])
        };
    } else {
        artistData[item.artistName.toLowerCase()].count++;
        artistData[item.artistName.toLowerCase()].msPlayed += item.msPlayed;
        artistData[item.artistName.toLowerCase()].songs.add(item.trackName);
    }
});

// Convert msPlayed to time for each song
Object.values(songData).forEach(song => {
    song.msPlayed = msToTime(song.msPlayed);
});

// Convert msPlayed to time for each artist
Object.values(artistData).forEach(artist => {
    artist.msPlayed = msToTime(artist.msPlayed);
});

export { songData, artistData, allData };
