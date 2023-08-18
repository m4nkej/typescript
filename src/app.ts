import axios from "axios";
const form = document.querySelector("form")!;
const addressInput = document.getElementById("address")! as HTMLInputElement;

async function searchAddressHendler(event: Event): Promise<void> {
  event.preventDefault();
  const enteredAddress = addressInput.value;

  type GoogleGeocodingResponse = {
    results: { geometry: { location: { lat: number; lng: number } } }[];
    status:
      | "OK"
      | "ZERO_RESULTS"
      | "OVER_DAILY_LIMIT"
      | "OVER_QUERY_LIMIT"
      | "REQUEST_DENIED"
      | "INVALID_REQUEST"
      | "UNKNOWN_ERROR";
  };
  // send to google

  const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURI(
    enteredAddress
  )}&key=${process.env.GOOGLE_API_KEY}`;
  await axios
    .get<GoogleGeocodingResponse>(url)
    .then((res) => {
      if (res.data.status !== "OK") {
        throw Error("Could not fetch location!");
      }
      const coordinates = res.data.results[0].geometry.location;
      console.log(coordinates);
    })
    .catch((error) => {
      alert(error.message);
      console.log(error);
    });
}

form.addEventListener("submit", searchAddressHendler);
