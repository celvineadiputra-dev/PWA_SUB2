const baseUrl = "https://api.football-data.org/v2/";
const token = "f4a2a5a1fd744a7486cb90a453f32323";

const url = `${baseUrl}competitions/`;

const getDataKompetisi = url =>{
    return fetch(url,{
        method: 'GET',
        mode:'cors',
        headers: {
            'X-Auth-Token': token
          }
    })
    .then(response => response.json());
}

getDataKompetisi(url).then(data => console.log(data));