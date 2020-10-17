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
