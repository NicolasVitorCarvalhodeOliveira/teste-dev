import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import axios from "axios";
import React, { useState, useEffect } from "react";
import { ToastContainer, toast } from 'react-toastify';

const AddModal = ({ showModal, handleClose, addData }) => {
    const [nome, setNome] = useState("");
    const [idade, setIdade] = useState("");
    const [telefone, setTelefone] = useState("");
    const [cep, setCep] = useState("");
    const [estado, setEstado] = useState("");
    const [cidade, setCidade] = useState("");
    const [rua, setRua] = useState("");
    const [numero, setNumero] = useState("");
    const [complemento, setComplemento] = useState("");

    const handleNomeChange = (e) => {
        const value = e.target.value;

        if (value.length <= 200){
            setNome(value);
        }
    }

    const handleIdadeChange = (e) => {
        const number = String(e.target.value.replace(/\D/g, '')).trim();

        if (number.length <= 3){
            setIdade(number);
        }

    }

    const handleTelefoneChange = (e) => {
        const number = e.target.value.replace(/\D/g, '');
    
        let formattedTel = '';
        
        if (number.length <= 10) {
            if (number.length > 2) {
                formattedTel = `(${number.slice(0, 2)}) ${number.slice(2, 6)}-${number.slice(6, 10)}`;
            } else if (number.length > 0) {
                formattedTel = `(${number}`;
            }
            setTelefone(formattedTel);
        } else if (number.length <= 11) {
            if (number.length > 2) {
                formattedTel = `(${number.slice(0, 2)}) ${number.slice(2, 7)}-${number.slice(7, 11)}`;
            } else if (number.length > 0) {
                formattedTel = `(${number}`;
            }
            setTelefone(formattedTel);
        }
    
        
    };


    const fetchCepData = async (value) => {
        try {
            const response = await axios.get(`https://viacep.com.br/ws/${value}/json/`);
            const { logradouro, localidade, uf } = response.data;

            setRua(logradouro);
            setCidade(localidade);
            setEstado(uf);
        } catch (error) {
            console.error('Erro ao buscar o CEP:', error);
        }
    };

    const handleCepChange = (e) => {
        const value = String(e.target.value.replace(/\D/g, '')).trim(); // Remove caracteres não numéricos

        // Limita a entrada a 8 caracteres
        if (value.length <= 8) {
            let formattedCep = '';

            if (value.length <= 5) {
                formattedCep = value;
            } else if (value.length <= 8) {
                formattedCep = `${value.slice(0, 5)}-${value.slice(5)}`;
            }

            setCep(formattedCep);

            // Verifica se o CEP possui o tamanho correto
            if (value.length === 8) {
                fetchCepData(value);
            }
        }
    };

    const handleEstadoChange = (e) => {
        const str = e.target.value.replace(/[^a-zA-Z]/g, '').toUpperCase();

        if (str.length <= 2){
            setEstado(str);
        }
    }

    const handleNumeroChange = (e) => {
        const number = String(e.target.value.replace(/\D/g, '')).trim();

        if (number.length <= 10){
            setNumero(number);
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        handleClose();
        const novoContato = {
            nome,
            idade,
            telefone,
            cep,
            rua,
            numero,
            complemento,
            cidade,
            estado
        }
        try{
            const res = await fetch(`/api/contatos/`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(novoContato)
            })

            const toastOptions = {
                position: 'top-center',
                autoClose: 5000,
                pauseOnHover: true,
                pauseOnFocusLoss: false,
                theme: 'colored'
            }

            if (!res.ok){
                toast.error(`ERRO\nStatus: ${res.status}\nMessagem: ${res.text()}`, toastOptions)
            } else{
                const novoUsuarioo = await res.json();
                addData(novoUsuarioo);
                toast.success('Contato criado com sucesso', toastOptions)
            }

        } catch(error){
            toast.error(`ERRO\n${error}`, toastOptions)
        }
    };

    return (
        <Modal show={showModal} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Adicionar Contato</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form onSubmit={handleSubmit}>
                    <Form.Group controlId="editNome" className="mb-3">
                        <Form.Label>Nome</Form.Label>
                        <Form.Control
                            type="text"
                            value={nome}
                            onChange={handleNomeChange}
                            required
                        />
                    </Form.Group>
                    <Form.Group controlId="editIdade" className="mb-3">
                        <Form.Label>Idade</Form.Label>
                        <Form.Control
                            type="text"
                            value={idade}
                            onChange={handleIdadeChange}
                            required
                        />
                    </Form.Group>
                    <Form.Group controlId="editTelefone" className="mb-3">
                        <Form.Label>Telefone</Form.Label>
                        <Form.Control
                            type="text"
                            value={telefone}
                            onChange={handleTelefoneChange}
                            required
                        />
                    </Form.Group>
                    <Form.Group controlId="editCep" className="mb-3">
                        <Form.Label>Cep</Form.Label>
                        <Form.Control
                            type="text"
                            value={cep}
                            onChange={handleCepChange}
                            required
                        />
                    </Form.Group>
                    <Form.Group controlId="editEstado" className="mb-3">
                        <Form.Label>Estado</Form.Label>
                        <Form.Control
                            type="text"
                            value={estado}
                            onChange={handleEstadoChange}
                            required
                        />
                    </Form.Group>
                    <Form.Group controlId="editCidade" className="mb-3">
                        <Form.Label>Cidade</Form.Label>
                        <Form.Control
                            type="text"
                            value={cidade}
                            onChange={(e) => setCidade(e.target.value)}
                            required
                        />
                    </Form.Group>
                    <Form.Group controlId="editRua" className="mb-3">
                        <Form.Label>Rua</Form.Label>
                        <Form.Control
                            type="text"
                            value={rua}
                            onChange={(e) => setRua(e.target.value)}
                            required
                        />
                    </Form.Group>
                    <Form.Group controlId="editNumero" className="mb-3">
                        <Form.Label>Numero</Form.Label>
                        <Form.Control
                            type="text"
                            value={numero}
                            onChange={handleNumeroChange}
                            required
                        />
                    </Form.Group>
                    <Form.Group controlId="editComplemento" className="mb-3">
                        <Form.Label>Complemento</Form.Label>
                        <Form.Control
                            type="text"
                            value={complemento}
                            onChange={(e) => setComplemento(e.target.value)}
                            required
                        />
                    </Form.Group>
                    <Button type="submit" variant="primary">
                        Salvar
                    </Button>
                </Form>
            </Modal.Body>
        </Modal>
    );
};

export default AddModal;