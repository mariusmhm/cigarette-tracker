const faunadb = require("faunadb");
const q = faunadb.query;

// Acquire the secret and optional endpoint from environment variables
const secret = process.env.FAUNADB_SECRET;
var endpoint = "https://db.eu.fauna.com/";

if (typeof secret === "undefined" || secret === "") {
  console.error("The FAUNADB_SECRET environment variable is not set, exiting.");
  process.exit(1);
}

if (!endpoint) endpoint = "https://db.fauna.com/";

// Instantiate a client
const faunaClient = new faunadb.Client({
  secret: secret,
  endpoint: endpoint,
});

const getLogs = async () => {
  const { data } = await faunaClient.query(
    q.Map(
      q.Paginate(q.Documents(q.Collection("cig_log"))),
      q.Lambda("ref", q.Get(q.Var("ref"))),
    ),
  );
  const logs = data.map((log) => {
    log.id = log.ref.id;
    delete log.ref;
    return log;
  });
  return logs;
};

const createLog = async () => {
  faunaClient.query(
    q.Create(q.Collection("cig_log"), {
      data: { timestamp: new Date().toISOString() },
    }),
  );
};

module.exports = {
  getLogs,
  createLog,
};
