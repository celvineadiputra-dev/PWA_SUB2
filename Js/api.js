const baseUrl = "https://api.football-data.org/v2/";
const token = "f4a2a5a1fd744a7486cb90a453f32323";
const id_liga = [2001, 2002, 2003, 2021, 2014, 2015, 2019];

const randomLiga = () => {
  const index = Math.floor(Math.random() * 7);
  console.log(index);
  return id_liga[index];
};

const url = `${baseUrl}competitions/${randomLiga()}/standings`;

const getDataKompetisi = (url) => {
  return fetch(url, {
    method: "GET",
    mode: "cors",
    headers: {
      "X-Auth-Token": token,
    },
  }).then((response) => response.json());
};
getDataKompetisi(url).then((data) => setDataKlasmenLiga(data));

const setDataKlasmenLiga = (data) => {
  console.log(data);
  let cardHtml = "";
  let i = 0;
  for (let index = 0; index < data.standings.length; index++) {
    let type = data.standings[index].type;
    data.standings[index].table.forEach((value) => {
      //   console.log(value);
      if (i == 3) {
        document.getElementById("HomeCard").innerHTML = cardHtml;
        return;
      }
      i++;
      cardHtml += `
            <div class="col s12 m4">
                <div class="card">
                    <div class="card-image">
                        <img src="${value.team.crestUrl}" width="150px">
                        <a class="btn-floating halfway-fab waves-effect waves-light red"><i class="material-icons">add</i></a>
                    </div>
                    <div class="card-content">
                        <h6 class="black-text font-weight-bold">${value.team.name}</h6>
                        <br/>
                        <b>Type : ${type}</b>
                        <table>
                                <tbody>
                                <tr>
                                    <td>Bermain</td>
                                    <td>:</td>
                                    <td>${value.playedGames}</td>
                                </tr>
                                <tr>
                                    <td>Menang</td>
                                    <td>:</td>
                                    <td>${value.won}</td>
                                </tr>
                                <tr>
                                    <td>Seri</td>
                                    <td>:</td>
                                    <td>${value.draw}</td>
                                </tr>
                                <tr>
                                    <td>Kalah</td>
                                    <td>:</td>
                                    <td>${value.lost}</td>
                                </tr>
                                <tr>
                                    <td>Poin</td>
                                    <td>:</td>
                                    <td>${value.points}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        `;
    });
  }
};
