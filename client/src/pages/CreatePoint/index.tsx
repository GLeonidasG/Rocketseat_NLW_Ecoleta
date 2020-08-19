import React, { MouseEvent, ChangeEvent, useState, useEffect, FormEvent } from 'react';
import './styles.css';
import logo from '../../assets/logo.svg'
import { FiArrowLeft } from 'react-icons/fi'
import { Link, useHistory } from 'react-router-dom';
import { Map, Marker, TileLayer } from "react-leaflet"
import api from '../../services/api'
import axios from 'axios'
import { LeafletMouseEvent } from 'leaflet';

interface Item {
    id: number
    image: string
    title: string
}

interface IBGEUFResponse {
    sigla: string;
}
interface IBGECitiesResponse {
    nome: string;
}

const CreatePoint = () => {
    const history = useHistory();
    const [formData, setFormData] = useState({
        name: "",
        endereco: "",
        whatsapp: ""
    })
    const [lat, setLat] = useState(0.0);
    const [lng, setLng] = useState(0.0);
    const [selectedUf, setSelectedUf] = useState<string>("0")
    const [selectedCity, setSelectedCity] = useState<string>("0")
    const [selectedItems, setSelectedItems] = useState<number[]>([])

    const [items, setItems] = useState<Item[]>([])

    const [uf, setUf] = useState<string[]>([])

    const [cities, setCities] = useState<string[]>([])
 
    const onSubmit = async (e:FormEvent<HTMLFormElement>) =>{
        e.preventDefault()
        const data = {
            image: "fake-image",
            ...formData,
            city: selectedCity,
            uf: selectedUf,
            longitude: lng,
            latitude: lat,
            items: selectedItems
        };
        await api.post('/points', data);
        alert("Ponto cadastrado com sucesso!")
        history.push("/")
        
    }
/* 
{
	"image":"fake-image",
	"name":"Tio ze",
	"endereco":"¯\_(ツ)_/¯",
	"whatsapp":"654654654",
	"city":"Novo Hamburgo",
	"uf":"RS",
	"longitude": -32.345345435,
	"latitude": -45.6532164,
	"items": [
		1,
		2
	]
}
     */
    // Get items from API
    useEffect(() => {
        api.get("/items")
            .then((response) => {
                setItems(response.data)
            })
    }, [])
    // Get UF from API
    useEffect(() => {
        axios.get<IBGEUFResponse[]>('https://servicodados.ibge.gov.br/api/v1/localidades/estados')
            .then(response => {
                const ufs = response.data.map(uf => uf.sigla)
                setUf(ufs)
            })
    }, []);

    // Get City from API
    useEffect(() => {
        if (selectedUf === "0") return;
        axios.get<IBGECitiesResponse[]>(`https://servicodados.ibge.gov.br/api/v1/localidades/estados/${selectedUf}/municipios`)
            .then(response => {
                const cities = response.data.map(cities => cities.nome)
                setCities(cities)
            })
    }, [selectedUf]);

    const handleItemClick = (id: number) => {
        console.log(id)
        const alreadySelected = selectedItems.findIndex((item) => item === id)
        if (alreadySelected >= 0) {
            const filtered = selectedItems.filter(item => item !== id)
            setSelectedItems(filtered)
        } else {
            setSelectedItems([...selectedItems, id])
        }
    }

    const handleMapClick = (e: LeafletMouseEvent) => {
        setLat(e.latlng.lat)
        setLng(e.latlng.lng)
    }

    const handleSelectedUf = (e: ChangeEvent<HTMLSelectElement>) => {
        setSelectedUf(e.target.value)
    }
    const handleSelectedCity = (e: ChangeEvent<HTMLSelectElement>) => {
        setSelectedCity(e.target.value)
    }

    const handleFormChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target
        setFormData({ ...formData, [name]: value })
    }

    return (
        <div id="page-create-point">
            <header>
                <img src={logo} alt="Ecoleta" />
                <Link to="/">
                    <span>
                        <FiArrowLeft />
                    </span>
                    <strong>Voltar para home</strong>
                </Link>
            </header>
            <form onSubmit={onSubmit} >
                <h1>Cadastro do <br />ponto de coleta</h1>
                <fieldset>
                    <legend>
                        <h2>Dados da entidade</h2>
                    </legend>
                    <div className="field-group">
                        <div className="field">
                            <label htmlFor="name">Nome da entidade</label>
                            <input
                                type="text"
                                name="name"
                                onChange={handleFormChange}
                            />
                        </div>
                    </div>
                    <div className="field-group">
                        <div className="field">
                            <label htmlFor="endereco">Endereço</label>
                            <input
                                type="text"
                                name="endereco"
                                onChange={handleFormChange}
                            />
                        </div>
                        <div className="field">
                            <label htmlFor="whatsapp">Whatsapp</label>
                            <input
                                type="text"
                                name="whatsapp"
                                onChange={handleFormChange}
                            />
                        </div>
                    </div>
                </fieldset>
                <fieldset>
                    <legend>
                        <h2>Endereço da entidade</h2>
                    </legend>

                    <Map center={[-29.6772338, -51.1501391]} zoom={15} onClick={handleMapClick}>
                        <TileLayer
                            attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        />
                        <Marker position={[lat, lng]} />
                    </Map>

                    <div className="field-group">
                        <div className="field">
                            <label htmlFor="uf">Estado(UF)</label>
                            <select name="uf" id="uf" onChange={handleSelectedUf} >
                                <option value="0">Selecione uma UF</option>
                                {
                                    uf.map((uf, i) => (
                                        <option key={i} value={uf}>{uf}</option>
                                    ))
                                }
                            </select>
                        </div>
                        <div className="field">
                            <label htmlFor="city">Cidade</label>
                            <select name="city" id="city" onChange={handleSelectedCity} >
                                <option value="0">Selecione uma cidade</option>
                                {
                                    cities.map((city, i) => (
                                        <option key={i} value={city}>{city}</option>
                                    ))
                                }
                            </select>
                        </div>
                    </div>
                </fieldset>
                <fieldset>
                    <legend>
                        <h2>Ítens de coleta</h2>
                    </legend>
                    <div className="field-group">
                        <ul className="items-grid"  >
                            {
                                items.map((item) => {
                                    return (
                                        <li
                                            className={selectedItems.includes(item.id) ? 'selected' : ''}
                                            onClick={() => handleItemClick(item.id)}
                                            key={item.id}
                                        >
                                            <img src={item.image} alt={item.title} />
                                            <span>{item.title}</span>
                                        </li>
                                    )
                                })
                            }
                        </ul>
                    </div>
                </fieldset>
                <button type="submit">Cadastrar ponto de coleta</button>
            </form>
        </div>
    )
}

export default CreatePoint;