import './style.css'
import Axios from 'axios';
import React, { useState } from 'react';
import InputMask from "react-input-mask";

export function Form() {

    const [query, setQuery] = useState('');
    const [adress, setAdress] = useState();

    const url = `https://viacep.com.br/ws/${query}/json/unicode`;

    const getData = async () => {
        const result = await Axios.get(url);
        setAdress(result)
        setQuery("");
    }

    const onSubmit = (e) => {
        e.preventDefault();
        getData();
    }

    const onChange = (e) => {
        setQuery(e.target.value);
    }

    return (

        <div className="container">

            <form onSubmit={onSubmit}>

                <div>
                    <InputMask
                        mask="99999-999"
                        placeholder=" Digite o CEP"
                        onChange={onChange}
                        value={query}
                    >
                    </InputMask>

                    <button
                        type="submit"
                        value="search"
                    >
                        Buscar
                    </button>
                </div>

                {adress ? (

                    <div className="info">
                        <div className="row">
                            <p><strong>Logradouro:</strong> {adress.data.logradouro} </p>
                            <p><strong>UF:</strong> {adress.data.uf}</p>
                        </div>
                        <div className="row">
                            <p><strong>Localidade:</strong> {adress.data.localidade} </p>
                            <p><strong>CEP:</strong> {adress.data.cep} </p>
                        </div>

                        {adress.data.complemento ? (
                            <p><strong>Complemento:</strong> {adress.data.complemento} </p>
                        ) : (
                            <span></span>
                        )}
                        {
                            <p><strong>Bairro:</strong> {adress.data.bairro} </p>
                        } </div>

                ) : (
                    <span></span>
                )}

            </form>

            <div>
                <img src="https://i.imgur.com/WPUIhpe.png" alt="" />
            </div>

        </div>
    );
}