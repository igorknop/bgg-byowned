// all options are optional
var options = {
  timeout: 10000, // timeout of 10s (5s is the default)

  // see https://github.com/cujojs/rest/blob/master/docs/interceptors.md#module-rest/interceptor/retry
  retry: {
    initial: 100,
    multiplier: 2,
    max: 15e3,
  },
};

var bgg = require("bgg")(options);
const username = process.argv[2]||"igorknop";
bgg("collection", {
  "username": username,
  subtype: "boardgame",
  excludesubtype: "boardgameexpansion",
  stats: 1,
  own: 1,
}).then(function (results) {
    console.log(`user: ${username}\n`);
    console.log("Owned\tRated\tName\n");
  console.log(
    results.items.item.map((game) => ({
      name: game.name["$t"],
      owners: game.stats.numowned * 1,
      rated: game.stats.rating.usersrated.value
    })).sort((a,b)=>{return a.owners-b.owners}).reduce((a,k)=>`${a}${k.owners}\t${k.rated}\t${k.name}\n`,"")
  );
});
