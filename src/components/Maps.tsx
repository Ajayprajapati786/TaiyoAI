import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, ZoomControl } from 'react-leaflet';

interface CountryData {
  country: string;
  cases: number;
  active: number;
  recovered: number;
  deaths: number;
  countryInfo: {
    _id: number;
    lat: number;
    long: number;
  };
}

const Maps = () => {
  const [countriesData, setCountriesData] = useState<CountryData[]>([]);
  const [mapBounds, setMapBounds] = useState<[[number, number], [number, number]]>([[-90, -180], [90, 180]]);

  useEffect(() => {
    fetchCountryData();
  }, []);

  const fetchCountryData = () => {
    fetch('https://disease.sh/v3/covid-19/countries')
      .then(response => response.json())
      .then((data: CountryData[]) => {
        setCountriesData(data);
        if (data.length > 0) {
          const newMapBounds = calculateMapBounds(data);
          setMapBounds(newMapBounds);
        }
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  };

  const calculateMapBounds = (data: CountryData[]): [[number, number], [number, number]] => {
    let minLat = Infinity;
    let maxLat = -Infinity;
    let minLng = Infinity;
    let maxLng = -Infinity;

    data.forEach(country => {
      const { lat, long } = country.countryInfo;
      minLat = Math.min(minLat, lat);
      maxLat = Math.max(maxLat, lat);
      minLng = Math.min(minLng, long);
      maxLng = Math.max(maxLng, long);
    });

    return [[minLat, minLng], [maxLat, maxLng]];
  };

  return (
    <div style={{ height: '100vh', width: '100vw' }}>
      {countriesData.length > 0 && (
        <MapContainer bounds={mapBounds} zoomControl={false} style={{ height: '100%', width: '100%' }}>
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            maxZoom={19}
            subdomains={['a', 'b', 'c']}
            noWrap={true}
          />

          {countriesData.map(country => (
            <Marker
              key={country.countryInfo._id}
              position={[country.countryInfo.lat, country.countryInfo.long]}
            >
              <Popup>
                <div>
                  <h3 className="mb-2 text-lg font-semibold">{country.country}</h3>
                  <p>Total Cases: {country.cases}</p>
                  <p>Active Cases: {country.active}</p>
                  <p>Recovered: {country.recovered}</p>
                  <p>Deaths: {country.deaths}</p>
                </div>
              </Popup>
            </Marker>
          ))}
          <ZoomControl position="bottomright" />
        </MapContainer>
      )}
    </div>
  );
}

export default Maps;
