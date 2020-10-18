var dbPromised = idb.open("football", 1, (upgradeDB) => {
  let footBallObjectStore = upgradeDB.createObjectStore("teamLove", {
    keyPath: "id",
  });
  footBallObjectStore.createIndex("namaTeam", "name", { unique: false });
});

const SaveFootBall = (item) => {
  dbPromised
    .then(function (db) {
      console.log(db);
      let tx = db.transaction("teamLove", "readwrite");
      let store = tx.objectStore("teamLove");
      store.add(item);
      return tx.complete;
    })
    .then(() => {
      console.log("berhasil di save");
    })
    .catch((err) => {
      console.log(err);
    });
};

const getAllDataLove = () => {
  return new Promise((resolve, reject) => {
    dbPromised
      .then((db) => {
        const tx = db.transaction("teamLove", "readonly");
        var store = tx.objectStore("teamLove");
        return store.getAll();
      })
      .then((items) => {
        resolve(items);
      });
  });
};

const checkIDTeam = (id) => {
  return new Promise(function (resolve, reject) {
    dbPromised
      .then(function (db) {
        var tx = db.transaction("teamLove", "readonly");
        var store = tx.objectStore("teamLove");
        return store.get(id);
      })
      .then(function (data) {
        console.log(data);
        if (data != undefined) {
          resolve(true);
        } else {
          reject(false);
        }
      });
  });
};
