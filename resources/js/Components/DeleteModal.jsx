import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from 'react-bootstrap/Form';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useRef, Bounce } from 'react';

function DeleteModal({ showModal, handleClose, rowData, removeDataById }) {
    const toastIdRef = useRef(null); // Referência para armazenar o ID da notificação

    const handleSubmit = async (e) => {
        e.preventDefault();
        handleClose();
        const id = rowData.original.id;

        try {
            const response = await fetch(`/api/contatos/${id}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            if (toastIdRef.current) {
                // Remove a notificação anterior se existir
                toast.dismiss(toastIdRef.current);
            }

            if (!response.ok) {
                // Adiciona uma nova notificação de erro e armazena seu ID
                toastIdRef.current = toast.error(`ERRO\nStatus: ${response.status}\nMensagem: ${response.text()}`, {
                    position: "top-center",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    progress: undefined,
                    theme: "colored",
                    });
            } else {
                removeDataById(id);
                // Adiciona uma nova notificação de sucesso e armazena seu ID
                toastIdRef.current = toast.success('Contato excluído com sucesso!', {
                    position: "top-center",
                    hideProgressBar: false,
                    closeOnClick: true,
                    theme: "colored",
                });
            }
        } catch (error) {
            // Remove a notificação anterior se existir
            if (toastIdRef.current) {
                toast.dismiss(toastIdRef.current);
            }
            // Adiciona uma nova notificação de erro e armazena seu ID
            toastIdRef.current = toast.error(`ERRO\n${error}`, {
                position: "top-center",
                hideProgressBar: false,
                closeOnClick: true,
                progress: undefined,
                theme: "colored",
                });
        }
    };

    return (
        <>
            <Modal show={showModal} onHide={handleClose} centered>
                <Modal.Header closeButton>
                    <Modal.Title>Exclusão de Contato</Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    <p>Tem certeza que deseja excluir o contato?</p>
                </Modal.Body>

                <Form onSubmit={handleSubmit}>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleClose}>Não</Button>
                        <Button variant="danger" type="submit">Sim</Button>
                    </Modal.Footer>
                </Form>
            </Modal>
            <ToastContainer limit={2} autoClose={2000} pauseOnHover={false} pauseOnFocusLoss={false} />
        </>
    );
}

export default DeleteModal;
