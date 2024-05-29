import { useState, useEffect, useCallback } from "react";

import {
  GoogleMap,
  useJsApiLoader,
  DirectionsRenderer,
  Marker,
  LoadScript,
} from "@react-google-maps/api";

export function MyComponent({ coords }) {
  const [coordenadas, setCoordenadas] = useState({
    lat: null,
    lng: null,
  });
  const containerStyle = {
    width: "400px",
    height: "400px",
  };

  useEffect(() => {
    if (coords) {
      console.log(coords);
      const numerosStr = coords.split(",");
      const numerosFloat = numerosStr.map((numero) =>
        parseFloat(numero.trim())
      );
      const lat = numerosFloat[0];
      const lng = numerosFloat[1];
      setAnotherPosition({ lat, lng });
    } else {
      console.error("Formato de coordenadas incorrecto:", coords.coord);
    }
  }, [coords]);

  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: "AIzaSyCSGshQgTLi4Jtj21mO20JhOoS8nbC_Aek",
  });

  const [map, setMap] = useState(null);
  const [currentPosition, setCurrentPosition] = useState(null);
  const [anotherPosition, setAnotherPosition] = useState();
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
          <div className="w-[400px] flex justify-end">
            <p>{distance && <p>Distancia: {distance.toFixed(2)} km</p>}</p>
          </div>
        </>
      ) : (
        <></>
      )}
    </LoadScript>
  );
}
