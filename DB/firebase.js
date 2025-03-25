import { initializeApp, cert } from "firebase-admin/app";
import { getFirestore } from "firebase-admin/firestore";
import serviceAcc from "/Users/marcus.ledo/Downloads/fuel-expenses-de5aa-firebase-adminsdk-fbsvc-6a1e4ccc53.json"  with { type: "json" };

initializeApp({
  credential: cert(serviceAcc),
});

let db;

initializeFirebaseDB();
main();

async function main() {
    console.log("Inside main");
}

function initializeFirebaseDB() {
  try {
    db = getFirestore();
  } catch (err) {
    console.log("Oh no! " + err);
  }
}

async function addData(data) {
  const res = await db.collection("travels").add(data);
}

async function getData() {
  const transactionRef = db.collection("travels");
  const snapshot = await transactionRef.get();
  const data = [];

  snapshot.forEach((doc) => {
    data.push(doc.data());
  });

  return data;
}

export { addData, getData };
