import React, { FC } from 'react'
import { FiLogIn, FiSearch } from 'react-icons/fi'
import logo from '../../assets/logo.svg'
import './styles.css'
import { Link } from 'react-router-dom'
const Home = () => {
    return (
        <div id="page-home">
            <div className="content">
                <header>
                    <img src={logo} alt="Ecoleta"/>
                    <Link to="/cadastrar">
                        <span><FiLogIn/></span>
                        <strong>Cadastrar um ponto de coleta</strong>
                    </Link>
                </header>
                <main>
                    <h1>Seu market de coleta de resíduos</h1>
                    <p>Ajudamos pessoas a encontrarem pontos de coleta de forma eficiente</p>
                    <Link to="/search">
                        <span><FiSearch/></span>
                        <strong>Buscar pontos de coleta</strong>
                    </Link>
                </main>
            </div>
        </div>
    )
}
export default Home