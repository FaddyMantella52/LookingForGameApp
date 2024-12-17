import functions from "firebase-functions";
import axios from "axios";
import admin from "firebase-admin";

// Initialize Firebase Admin SDK
admin.initializeApp();
console.log("test");

exports.linkRiotAccount = functions.https.onCall(async (data, context) => {
  const {riotSummonerName, region} = data;

  // Validate inputs
  if (!riotSummonerName || !region) {
    throw new functions.https.HttpsError(
      "invalid-argument",
      "Both riotSummonerName and region are required."
    );
  }

  // Ensure the user is authenticated
  if (!context || !context.auth) {
    throw new functions.https.HttpsError(
      "unauthenticated",
      "User must be authenticated."
    );
  }

  const userId = context.auth.uid;

  try {
    // Fetch Summoner Info from Riot API
    const apiKey = "RGAPI-aa9a3972-99bc-43eb-96a6-a75d852adc9d";
    const riotResponse = await axios.get(
      `https://${region}.api.riotgames.com/lol/summoner/v4/summoners/by-name/${riotSummonerName}`,
      {headers: {"X-Riot-Token": apiKey}}
    );

    const {id, name, puuid} = riotResponse.data;

    // Create a new document in the 'userRiot' collection
    const userRiotDocRef = admin.firestore().collection("userRiot").doc(userId);
    await userRiotDocRef.set({
      riotId: id,
      riotName: name,
      puuid,
      region,
      userId, // Storing the userId as the foreign key
      linkedAt: admin.firestore.FieldValue.serverTimestamp(),
    });

    // Optionally, you can update the user's document in the 'users'
    // collection with the linked status
    const userDocRef = admin.firestore().collection("users").doc(userId);
    await userDocRef.update({
      linkedAccounts: {
        riot: {id, name, puuid, region},
      },
    });

    return {success: true, message: "Riot account linked successfully."};
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new functions.https.HttpsError(
        "failed-precondition",
        error.response?.data?.status?.message || "Failed to link Riot account."
      );
    }
    // Handle unexpected errors
    throw new functions.https.HttpsError("internal",
      "An unknown error occurred.");
  }
});

