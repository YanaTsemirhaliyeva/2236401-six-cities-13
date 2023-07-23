import { getCapitalLetter } from '../../utils';
import { Icon, Marker, layerGroup } from 'leaflet';
import { City, Offer } from '../../types/offer';
import { useEffect, useRef } from 'react';
import useMap from '../hooks/useMap';
import 'leaflet/dist/leaflet.css';

type MapProps = {
  className: string;
  city: City;
  offers: Offer[];
  selectedOffer: string | null;
};

const defaultCustomIcon = new Icon({
  iconUrl: '../../../img/pin.svg',
  iconSize: [30, 40],
  iconAnchor: [20, 40]
});

const currentCustomIcon = new Icon({
  iconUrl: '../../../img/pin-active.svg',
  iconSize: [30, 40],
  iconAnchor: [20, 40]
});

function Map({className, city, offers, selectedOffer}: MapProps): JSX.Element {
  const mapRef = useRef(null);
  const map = useMap(mapRef, city);

  useEffect(() => {
    if (map) {
      const markerLayer = layerGroup().addTo(map);
      offers.forEach((offer) => {
        const type = getCapitalLetter(offer.type);
        const marker = new Marker([
          offer.location.latitude,
          offer.location.longitude
        ], {
          title: offer.title
        });

        marker
          .setIcon(
            selectedOffer && selectedOffer === offer.id
              ? currentCustomIcon
              : defaultCustomIcon
          )
          .addTo(markerLayer)
          .bindPopup(`<img src=${offer.previewImage}> <h3>${offer.title}</h3> <h1>&euro; ${offer.price}</h1> <p>${type}</p>`);
      });

      return () => {
        map.removeLayer(markerLayer);
      };
    }
  }, [map, offers, selectedOffer]);

  const style = className === 'cities' ? '100%' : '579px';

  return (
    <section
      style={{height: style}}
      className={`${className}__map map`}
      ref={mapRef}
    >
    </section>);
}

export default Map;