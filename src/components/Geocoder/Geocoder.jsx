"use client";

import { useState } from "react";
import { LoadScript } from "@react-google-maps/api";

const Geocoder = () => {
  const [address, setAddress] = useState("");
  const [coordinates, setCoordinates] = useState({ lat: null, lng: null });

  const country = "Argentina";
  const state = "Buenos Aires";
  const city = "Mercedes";

  const handleGeocode = () => {
    const geocoder = new window.google.maps.Geocoder();
    const prueba = ` ${address} , ${city}, ${state}, ${country}`;
    geocoder.geocode({ address: prueba }, (results, status) => {
      if (status === "OK") {
        const { lat, lng } = results[0].geometry.location;
        setCoordinates({ lat: lat(), lng: lng() });
        alert(`Coordenadas: ${lat()}, ${lng()}`);
      } else {
        alert(`Geocode was not successful for the following reason: ${status}`);
      }
    });
  };

  return (
    <LoadScript
      googleMapsApiKey="AIzaSyCSGshQgTLi4Jtj21mO20JhOoS8nbC_Aek"
      libraries={[]}
    >
      <div>
        <input
          type="text"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          placeholder="Ingresa una dirección"
          className=" bg-slate-800"
        />
        <button onClick={handleGeocode}>Geocode</button>
        {coordinates.lat && coordinates.lng && (
          <div>
            <h3>Coordenadas:</h3>
            <p>Latitud: {coordinates.lat}</p>
            <p>Longitud: {coordinates.lng}</p>
          </div>
        )}
      </div>
    </LoadScript>
  );
};

export default Geocoder;
