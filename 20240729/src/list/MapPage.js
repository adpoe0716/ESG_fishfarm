import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { useNavigate } from 'react-router-dom';
import L from 'leaflet';
import Map from './Map.json';
import './MapPage.css'; // 对应的CSS文件

// 创建自定义图标
const fishIcon = new L.Icon({
    iconUrl: process.env.PUBLIC_URL + '/fish2.png', // 使用正确的相对路径
    iconSize: [50, 50], // 调整图标大小
    iconAnchor: [25, 50], // 调整图标锚点
    popupAnchor: [0, -50], // 调整弹出框锚点
    shadowSize: [50, 50] // 调整阴影大小
});

function MapPage() {
    const navigate = useNavigate();

    const handleClick = (link) => {
        navigate(link);
    };

    return (
        <div className="map-container">
            <MapContainer center={[23.834148, 120.232551]} zoom={12} style={{ height: "100vh", width: "100%" }}>
                <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                />
                {Map.map((location) => (
                    <Marker
                        key={location.id}
                        position={location.position}
                        icon={fishIcon}
                    >
                        <Popup>
                            <div>
                                <h2>{location.name}</h2>
                                <button onClick={() => handleClick(location.link)}>查看魚塭</button>
                            </div>
                        </Popup>
                    </Marker>
                ))}
            </MapContainer>
        </div>
    );
}

export default MapPage;
