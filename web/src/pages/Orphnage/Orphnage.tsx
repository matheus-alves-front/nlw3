import React, { useState, useEffect } from "react";
import { FaWhatsapp } from "react-icons/fa";
import { FiClock, FiInfo } from "react-icons/fi";
import { Map, Marker, TileLayer } from "react-leaflet";
import { useParams } from 'react-router-dom' 

import './orphnage.css';
import Sidebar from "../../components/Sidebar/Sidebar";
import mapIcon from "../../utils/mapIcon";
import api from "../../services/api";

interface Orphnage {
  latitude: number,
  longitude: number,
  name: string,
  about: string,
  instructions: string,
  opening_hours: string,
  open_on_weekends: string,
  images: Array<{
    url: string,
    id: number,
  }>;
}

interface OrphnageParams {
  id: string;
}

export default function Orphnage() {
  const params = useParams<OrphnageParams>();
  const [orphnage, setOrphnage] = useState<Orphnage>();
  const [activeImageIndex, setActiveImageIndex] = useState(0);
    
  useEffect(() => {
      api.get(`orphnages/${params.id}`).then(response => {
          setOrphnage(response.data);
      })
  }, [params.id]);

  if (!orphnage) {
    return <p>carregando.</p>;
  }

  return (
    <div id="page-orphnage">
      <Sidebar />

      <main>
        <div className="orphnage-details">
          <img src={orphnage.images[activeImageIndex].url} alt={orphnage.name} />

          <div className="images">
            {orphnage.images.map((image, index) => {
              return (
                <button 
                  key={image.id} 
                  className={activeImageIndex === index ? 'active' : ''} 
                  type="button" 
                  onClick={() => {
                    setActiveImageIndex(index)
                  }}
                >
                  <img src={image.url} alt={orphnage.name} />
                </button>
              )
            })}
          </div>
          
          <div className="orphnage-details-content">
            <h1>{orphnage.name}</h1>
            <p>{orphnage.about}</p>
            <div className="map-container">
              <Map 
                center={[orphnage.latitude,orphnage.longitude]} 
                zoom={14} 
                style={{ width: '100%', height: 280 }}
                dragging={false}
                touchZoom={false}
                zoomControl={false}
                scrollWheelZoom={false}
                doubleClickZoom={false}
              >
                <TileLayer 
                  url={`https://api.mapbox.com/styles/v1/mapbox/streets-v11/tiles/256/{z}/{x}/{y}@2x?access_token=${process.env.REACT_APP_MAPBOX_TOKEN}`}
                />
                <Marker interactive={false} icon={mapIcon} position={[orphnage.latitude,orphnage.longitude]} />
              </Map>

              <footer>
                <a target="_blank" rel="noopener noreferrer" href={`https://google.com/maps/dir/?api=1&destination=${orphnage.latitude},${orphnage.longitude}`}>Ver rotas no Google Maps</a>
              </footer>
            </div>

            <hr />

            <h2>Instruções para visita</h2>
            <p>{orphnage.instructions}</p>

            <div className="open-details">
              <div className="hour">
                <FiClock size={32} color="#15B6D6" />
                Segunda à Sexta <br />
                {orphnage.opening_hours}
              </div>
              { orphnage.open_on_weekends ? (
                <div className="open-on-weekends">
                  <FiInfo size={32} color="#39CC83" />
                  Atendemos <br />
                  fim de semana
                </div>
              ) : (
                <div className="open-on-weekends dont-open">
                  <FiInfo size={32} color="#FF669D" />
                  Não Atendemos <br />
                  fim de semana
                </div>
              ) }
            </div>

            <button type="button" className="contact-button">
              <FaWhatsapp size={20} color="#FFF" />
              Entrar em contato
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}