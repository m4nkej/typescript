import axios from "axios";
const form = document.querySelector("form")!;
const addressInput = document.getElementById("address")! as HTMLInputElement;

// adding script this way will hide Google Key
const script = document.createElement("script");
script.src = `https://maps.googleapis.com/maps/api/js?key=${process.env.GOOGLE_API_KEY}`;
script.async = true;
document.head.append(script);

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
let map;

async function searchAddressHendler(event: Event): Promise<void> {
  event.preventDefault();
  const enteredAddress = addressInput.value;

  // prettier-ignore
  // @ts-ignore
  const { Map } = (await google.maps.importLibrary("maps")) as google.maps.MapsLibrary;
  // prettier-ignore
  // @ts-ignore
  const { AdvancedMarkerElement } = (await google.maps.importLibrary("marker")) as google.maps.MarkerLibrary;

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

      map = new Map(document.getElementById("map") as HTMLElement, {
        zoom: 10,
        center: coordinates,
        mapId: "DEMO_MAP_ID",
      });

      // The marker, positioned at Uluru
      new AdvancedMarkerElement({
        map: map,
        position: coordinates,
        title: "Uluru",
      });

      console.log(map);
    })
    .catch((error) => {
      alert(error.message);
      console.log(error);
    });
}

form.addEventListener("submit", searchAddressHendler);
