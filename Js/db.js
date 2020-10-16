const dbPromised = idb.open("football-sub2Pwa", 1, (upgradeDB) => {
  const footBallObjectStore = upgradeDB.createObjectStore("itemFootBall", {
    keyPath: "ID",
  });
  footBallObjectStore.createIndex("namaTeam", "name", { unique: false });
});

const SaveFootBall = (item) => {
  dbPromised
    .then((db) => {
      let tx = db.transaction("teamSave", "readwrite");
      var store = tx.objectStore("teamSAve");
      console.log(item);
      // store.add();
      return tx.complete();
    })
    .then(() => {
      console.log("berhasil di save");
    });
};
