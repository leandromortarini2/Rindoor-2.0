import { useState, useEffect, useCallback } from "react";
import { useAuth } from "../../app/context/Context";

import {
  GoogleMap,
  useJsApiLoader,
  DirectionsRenderer,
  Marker,
  LoadScript,
} from "@react-google-maps/api";

const containerStyle = {
  width: "400px",
  height: "400px",
};

export function MyComponent() {
  const { userData } = useAuth();
  const [coordenadas, setCoordenadas] = useState({
    lat: "",
    lng: "",
  });

  useEffect(() => {
    if (userData && userData.coord) {
      const array = userData.coord.split(",");
      if (array.length === 2) {
        const lat = array[0];
        const lng = array[1];
        setCoordenadas({ lat, lng });
      } else {
        console.error("Formato de coordenadas incorrecto:", userData.coord);
      }
    }
  }, [userData]);

  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: "AIzaSyCSGshQgTLi4Jtj21mO20JhOoS8nbC_Aek",
  });

  const [map, setMap] = useState(null);
  const [currentPosition, setCurrentPosition] = useState(null);
  const [anotherPosition, setAnotherPosition] = useState({
    lat: -34.7517406,
    lng: -58.4332683,
  });
  const [directions, setDirections] = useState(null);
  const [distance, setDistance] = useState(null);

  const successCallback = useCallback(function (position) {
    setCurrentPosition({
      lat: position.coords.latitude,
      lng: position.coords.longitude,
    });
  }, []);

  const errorCallback = useCallback(function (error) {
    console.error("Error getting current position:", error);
  }, []);

  const onLoad = useCallback(
    function (map) {
      if (!currentPosition) {
        navigator.geolocation.getCurrentPosition(
          successCallback,
          errorCallback
        );
      } else {
        const bounds = new window.google.maps.LatLngBounds(currentPosition);
        map.fitBounds(bounds);
      }
      setMap(map);
    },
    [currentPosition, errorCallback, successCallback]
  );

  const onUnmount = useCallback(function () {
    setMap(null);
  }, []);

  useEffect(() => {
    if (currentPosition && anotherPosition) {
      const directionsService = new window.google.maps.DirectionsService();
      directionsService.route(
        {
          origin: currentPosition,
          destination: anotherPosition,
          travelMode: "DRIVING",
        },
        (result, status) => {
          if (status === "OK") {
            setDirections(result);
            const route = result.routes[0];
            let totalDistance = 0;
            route.legs.forEach((leg) => {
              totalDistance += leg.distance.value;
            });
            setDistance(totalDistance / 1000); // Convertir a kilómetros
          } else {
            console.error("Error al obtener las direcciones:", result);
          }
        }
      );
    }
  }, [currentPosition, anotherPosition]);

  return (
    <LoadScript
      googleMapsApiKey="AIzaSyCSGshQgTLi4Jtj21mO20JhOoS8nbC_Aek"
      libraries={[]}
    >
      {isLoaded ? (
        <>
          <GoogleMap
            mapContainerStyle={containerStyle}
            center={currentPosition}
            zoom={10}
            onLoad={onLoad}
            onUnmount={onUnmount}
          >
            {currentPosition && <Marker position={currentPosition} />}
            <Marker position={anotherPosition} />
            {directions && <DirectionsRenderer directions={directions} />}
          </GoogleMap>
          <p>{distance && <p>Distancia: {distance.toFixed(2)} km</p>}</p>
        </>
      ) : (
        <></>
      )}
    </LoadScript>
  );
}
