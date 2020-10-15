import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { FiPlus, FiArrowRight } from 'react-icons/fi'
import { Map, TileLayer, Marker, Popup } from 'react-leaflet'

import mapMarkerImg from '../../images/map-marker.svg'
import mapIcon from '../../utils/mapIcon'

import './orphnages-map.css'

import api from '../../services/api'

interface Orphnage {
    id: number,
    latitude: number,
    longitude: number,
    name: string,
}


function OrphnagesMap() {
    const [orphnages, setOrphnages] = useState<Orphnage[]>([]);
    
    useEffect(() => {
        api.get('orphnages').then(response => {
            setOrphnages(response.data);
        })
    }, []);

    return (
        <div id="page-map">
            <aside>
                <header>
                    <img src={mapMarkerImg} alt="Happy"/>

                    <h2>Escolha um orfanato no mapa</h2>
                    <p>Muitas crianças estão esperando a sua visita :)</p>
                </header>

                <footer>
                    <strong>Resende</strong>
                    <span>Rio de Janeiro</span>
                </footer>
            </aside>

            <Map 
                center={[-22.4665781,-44.4816303]}
                zoom={15}
                style={{ width: '100%', height: '100%' }}
            >
                <TileLayer 
                    url={`https://api.mapbox.com/styles/v1/mapbox/streets-v11/tiles/256/{z}/{x}/{y}@2x?access_token=${process.env.REACT_APP_MAPBOX_TOKEN}`} 
                />

                {orphnages.map(orphnage => {
                    return (
                        <Marker 
                            icon={mapIcon}
                            position={[orphnage.latitude,orphnage.longitude]}
                            key={orphnage.id}
                        >
                            <Popup closeButton={false} minWidth={240} maxWidth={240} className="map-popup">
                                {orphnage.name}
                                <Link to={`/orphnages/${orphnage.id}`}>
                                    <FiArrowRight size={20} color="#FFF" />
                                </Link>
                            </Popup>
                        </Marker>
                    )
                })}
            </Map>

            <Link to="/orphnages/create" className="create-orphnage">
                <FiPlus size={32} color="#fff" />
            </Link>
        </div>
    )
}

export default OrphnagesMap