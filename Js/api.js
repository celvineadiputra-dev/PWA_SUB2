const baseUrl = "https://api.football-data.org/v2/";
const token = "f4a2a5a1fd744a7486cb90a453f32323";
const id_liga = [2001, 2002, 2003, 2021, 2014, 2015, 2019];
let idbase = [];

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

let countData = 0;
const getDataFootball = () => {
  if ("caches" in window) {
    for (let index = 0; index < id_liga.length; index++) {
      caches
        .match(`${baseUrl}competitions/${id_liga[index]}/standings`)
        .then(function (res) {
          if (res) {
            res.json().then((data) => {
              console.log(data);
              setDataKlasmenLiga(data);

              getDataKompetisi(url).then((data) => {
                setDataKlasmenLiga(data);
              });

              return;
            });
          }
        });
    }
  }
  getDataKompetisi(url).then((data) => {
    setDataKlasmenLiga(data);
  });
};

const getSavedTeam = () => {
  idbase = getAllDataLove();
};

const btnSaveFunction = () => {
  Array.from(document.getElementsByClassName("btn-floating-save")).forEach(
    function (element) {
      element.addEventListener("click", (e) => {
        checkIDTeam(e.target.getAttribute("data-id").toString()).then((e) => {
          console.log(e);
        });
        if (true) {
          console.log("sudah ada");
        } else {
          SaveFootBall({
            id: e.target.getAttribute("data-id"),
            name: e.target.getAttribute("data-name"),
          });
        }
      });
    }
  );
};

const setDataKlasmenLiga = (data) => {
  // console.log(data);
  let cardHtml = "";
  for (let index = 0; index < data.standings.length; index++) {
    let type = data.standings[index].type;
    data.standings[index].table.forEach((value) => {
      cardHtml += `
            <div class="col s12 m4">
                <div class="card">
                    <div class="card-image">
                        <img src="${value.team.crestUrl}" width="150px">
                        <a class="btn-floating btn-floating-save halfway-fab waves-effect waves-light red"><i data-id="${value.team.id}" data-name="${value.team.name}" class="material-icons">add</i></a>
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
    document.getElementById("HomeCard").innerHTML = cardHtml;
    btnSaveFunction();
  }
};
