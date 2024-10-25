import { Head, Link } from '@inertiajs/react';
import { React, useEffect, useState, useMemo, useRef} from 'react';

import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';

import {
  Box,
  Button,
  Typography,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  Tooltip,
  lighten,
  TablePagination
} from '@mui/material';

import {
  MaterialReactTable,
  useMaterialReactTable,
  MRT_GlobalFilterTextField,
  MRT_FilterTextField,
} from 'material-react-table';

import { Modal, Form } from 'react-bootstrap';

import { toast } from 'react-toastify'; // Importando o toast

import LocationOnIcon from '@mui/icons-material/LocationOn';
import PersonAddAltIcon from '@mui/icons-material/PersonAddAlt';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import EditModal from './EditModal'; // Importa o modal de edição
import AddModal from './AddModal';
import DeleteModal from './DeleteModal';
import ViewLocModal from './ViewLocationModal';



const MyTable = () => {
  const [data, setData] = useState([]);
  const skipPageResetRef = useRef(false);

  const fetchData = async () => {
    try {
      const response = await fetch('/api/contatos/');

      // Verifica se a resposta foi bem-sucedida
      if (!response.ok) {
        throw new Error(`Erro: ${response.status} - ${response.statusText}`);
      }

      const dt = await response.json(); 
      setData(dt); // Atualiza o estado com os dados recebidos
    } catch (error) {
      console.error('Erro ao buscar os contatos:', error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  function removeDataById(id) {
    const i = data.findIndex(e => e.id == id);
    if (i !== -1) {
      data.splice(i, 1)
      skipPageResetRef.current = true;
      setData([...data])
    }
  }

  function updateData(id, body) {
    const i = data.findIndex(e => e.id == id);
    if (i !== -1) {
      if (body === 'string') {
        JSON.parse(body);
      }
      body['id'] = String(id);
      const dataCopy = [...data];
      dataCopy[i] = body;
      skipPageResetRef.current = true;
      setData(dataCopy)
    }
  }

  function addData(body) {
    if (body === 'string') {
      JSON.parse(body);
    }
    const dataCopy = [...data];
    dataCopy.push(body);
    skipPageResetRef.current = true;
    setData(dataCopy);
  }

  const [showAddModal, setShowAddModal] = useState(false); // Estado para o modal de adição  

  const [showViewModal, setShowViewModal] = useState(false);

  const [showEditModal, setShowEditModal] = useState(false);
  const [rowData, setRowData] = useState(null); // Estado para armazenar os dados da linha

  const [showDeleteModal, setShowDeleteModal] = useState(false); // Estado para o modal de adição  

  const handleShowView = (row) => {
    setRowData(row);
    setShowViewModal(true);
  }

  const handleShowEdit = (row) => {
    setRowData(row); // Armazena os dados da linha
    setShowEditModal(true); // Exibe o modal de edição
  };

  const handleShowDelete = (row, table) => {
    setRowData(row); // Armazena os dados da linha
    setShowDeleteModal(true); // Exibe o modal de edição
  };

  const handleCloseAdd = () => setShowAddModal(false);
  const handleCloseView = () => setShowViewModal(false);
  const handleCloseEdit = () => setShowEditModal(false);
  const handleCloseDelete = () => {
    setShowDeleteModal(false)
  };

  const columns = useMemo(() => [
    {
      accessorFn: (row) => row.id,
      id: 'id',
      header: 'ID',
      size: 50,
      filterFn: 'startsWith',
    },
    {
      accessorFn: (row) => row.nome,
      id: 'nome',
      header: 'Nome',
      size: 250,
      filterFn: 'contains',
    },
    {
      accessorFn: (row) => row.idade,
      id: 'idade',
      header: 'Idade',
      size: 100,
      filterFn: 'startsWith',
    },
    {
      accessorKey: 'telefone',
      enableClickToCopy: true,
      header: 'Telefone',
      size: 150,
      filterFn: 'fuzzy',
    },
  ], []);

  const table = useMaterialReactTable({
    columns,
    data,
    autoResetPageIndex: !skipPageResetRef.current,
    autoResetExpanded: !skipPageResetRef.current,
    enableColumnActions: false,
    enableColumnOrdering: false,
    enableGlobalFilterModes: false,
    globalFilterFn: 'contains',
    // enableColumnFilterModes: true,

    enableFilterMatchHighlighting: true,

    enableRowSelection: true,

    // enableEditing: true,

    enableRowActions: true,

    initialState: {
      showColumnFilters: true,
      showGlobalFilter: true,
      sorting: [
        {
          id: 'id',
          desc: false, // false para ordem crescente
        },
      ],
      columnPinning: {
        right: ['mrt-row-actions'], // Isso garante que as ações fiquem fixadas à direita
      },

      pagination: {
        pageSize: 10, // Define o tamanho da página
      },
    },
    muiSearchTextFieldProps: {
      placeholder: 'Pesquisar',
    },
    muiFilterTextFieldProps: ({ column }) => ({
      placeholder: `Filtrar por ${column.columnDef.header}`,

    }),
    displayColumnDefOptions: {
      'mrt-row-actions': {
        header: 'Ações', //change header text
        size: 100, //make actions column wider
      },
    },

    getRowId: (row) => row.id,
    renderTopToolbar: ({ table }) => (
      <>
        <Box sx={(theme) => ({
          backgroundColor: lighten(theme.palette.background.default, 0.05),
          display: 'flex',
          gap: '0.5rem',
          p: '8px',
          justifyContent: 'space-between',
        })}>
          <Box sx={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
            <MRT_GlobalFilterTextField table={table} />
          </Box>
          <Button
            startIcon={<PersonAddAltIcon />}
            variant="contained"
            onClick={() => setShowAddModal(true)}
          >
            Criar novo Contato
          </Button>
        </Box>
        {table.getSelectedRowModel().rows.length > 0 && (
          <Box
            sx={{
              p: 2,
              bgcolor: '#e6f0ff',
              borderRadius: '8px',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <Typography>
                {`${table.getSelectedRowModel().rows.length} contato(s) selecionado(s)`}
              </Typography>
              <Button
                variant="text" // Muda o botão para o estilo "text"
                color="primary" // Define a cor do texto como azul escuro
                sx={{ ml: 2, color: '#003366' }} // Azul escuro
                onClick={async () => {
                  const selectedRows = table.getSelectedRowModel().rows;
                  if (selectedRows.length > 0) {
                    const original = selectedRows.map(e => e.original);
                    let success = [];
                    let fails = [];
                    const delRows = original.map(async e => {
                      const id = e.id
                      try{
                        const response = await fetch(`/api/contatos/${id}`, {
                          method: 'DELETE',
                          headers: {
                              'Content-Type': 'application/json'
                            }
                        });
                        if (!response.ok){
                          throw Error(`Status: ${response.status}\nMensagem: ${response.text()}`)
                        } else{
                          success.push(id);
                          removeDataById(id);
                        }
                      } catch(err){
                        fails.push({id: `${id}`, error: `${err}`});
                      }
                    });
                    Promise.all(delRows)
                      .then(()=>{
                          if (success.length > 0){
                            if (success.length == original.length){
                              toast.success(`Os ${success.length} contatos foram excluídos com sucesso!`, {
                                position: "top-center",
                                autoClose: 5000,
                                hideProgressBar: false,
                                closeOnClick: true,
                                pauseOnHover: true,
                                progress: undefined,
                                theme: "colored",
                          }); 
                            } else{
                              toast.success(`${success.length} contato(s) excluído(s) com sucesso!`, {
                                    position: "top-center",
                                    autoClose: 5000,
                                    hideProgressBar: false,
                                    closeOnClick: true,
                                    pauseOnHover: true,
                                    progress: undefined,
                                    theme: "colored",
                              }); 
                            }
                          }
                          if (fails.length > 0){
                            const err = fails.map(e => `{\n ${e['id']}\n ${e['error']} }`).join('\n');
                            toast.error(`FALHA AO EXCLUIR ${fails.length} contatos\n${err}`, {
                                  position: "top-center",
                                  autoClose: 5000,
                                  hideProgressBar: false,
                                  closeOnClick: true,
                                  pauseOnHover: true,
                                  progress: undefined,
                                  theme: "colored",
                              });
                          }
                      })

                  } else {
                    toast.info('Nenhum contato selecionado para exclusão.');
                  }
                }}
              >
                EXCLUIR
              </Button>
            </Box>
          </Box>
        )}
      </>
    ),
    renderRowActions: ({ row, table }) => (
      <Box sx={{ display: 'flex', gap: '1rem' }}>
        <Tooltip title="Visualizar Localização">
          <IconButton onClick={() => handleShowView(row)}> {/* Passa o contato original */}
            <LocationOnIcon sx={{ color: 'green' }} />
          </IconButton>
        </Tooltip>
        <Tooltip title="Editar">
          <IconButton 
            onClick={() => {handleShowEdit(row)}
          }>
            <EditIcon />
          </IconButton>
        </Tooltip>
        <Tooltip title="Deletar">
          <IconButton color="error" onClick={() => handleShowDelete(row, table)}>
            <DeleteIcon />
          </IconButton>
        </Tooltip>
      </Box>
    ),
    renderBottomToolbar: ({ table }) => (
      <Stack spacing={2} sx={{ p: 2, alignItems: 'center' }}> {/* Alinha os itens no centro */}
        <Box sx={{ display: 'flex', justifyContent: 'center', width: '100%' }}> {/* Centraliza o conteúdo */}
          <Pagination
            count={table.getPageCount()} 
            page={table.getState().pagination.pageIndex + 1} 
            onChange={(event, value) => {
              table.setPageIndex(value - 1); 
            }}
            color="primary"
          />
        </Box>
      </Stack>
    ),

  });


  return (
    <>
      <MaterialReactTable table={table} />
      <AddModal showModal={showAddModal} handleClose={handleCloseAdd} addData={addData} />
      <EditModal showModal={showEditModal} handleClose={handleCloseEdit} rowData={rowData} updateData={updateData} />
      <DeleteModal showModal={showDeleteModal} handleClose={handleCloseDelete} rowData={rowData} removeDataById={removeDataById} />
      <ViewLocModal showModal={showViewModal} handleClose={handleCloseView} rowData={rowData} />
    </>
  );
};

export default MyTable;
