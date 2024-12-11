'use client';

import React, { useState, useEffect } from 'react';
import { Row, Col, Table, Button, message, Skeleton } from 'antd';
import { SiloCardProps, SiloCard } from '@/components/SiloCard'; // Assumindo que você tenha um componente de SiloCard
import { MovimentacaoSiloModal } from '@/components/MovimentacaoSiloModal'; // Modal para registrar Movimentação
import axios from 'axios'; // Usando Axios para fazer as requisições

const GestaoSilosPage = () => {
  // Estados para armazenar os silos e movimentações
  const [silos, setSilos] = useState<SiloCardProps[]>([]);
  const [movimentacoes, setMovimentacoes] = useState<any[]>([]);

  // Estados para controle de carregamento
  const [loadingSilos, setLoadingSilos] = useState<boolean>(true); // Carregamento dos silos
  const [loadingMovimentacoes, setLoadingMovimentacoes] = useState<boolean>(true); // Carregamento das movimentações

  // Estado para controlar a visibilidade dos modais
  const [isMovimentaçãoVisible, setMovimentaçãoVisible] = useState(false);
  const [isSaidaVisible, setSaidaVisible] = useState(false);

  // Função para buscar os silos e movimentações
  const fetchData = async () => {
    try {
      // Carregar silos
      setLoadingSilos(true);
      const siloResponse = await axios.get('/api/protected/silos'); // Ajuste conforme a rota da sua API
      setSilos(siloResponse.data);

      // Carregar movimentações
      setLoadingMovimentacoes(true);
      const movimentacaoResponse = await axios.get('/api/protected/silos/movimentacao');
      setMovimentacoes(movimentacaoResponse.data);
    } catch (error) {
      message.error('Erro ao carregar dados dos silos e movimentações.');
    } finally {
      setLoadingSilos(false);
      setLoadingMovimentacoes(false);
    }
  };

  // Usando useEffect para carregar dados na primeira renderização
  useEffect(() => {
    fetchData();
  }, []); // Empty dependency array -> será executado apenas uma vez

  // Funções de envio para registrar Movimentação e saída
  const handleMovimentação = async (body:any)=> {
    try {
      console.log('form send',body)
      await axios.post('/api/protected/silos/movimentacao', {
        tipo:body.tipo,
        quantidade:body.quantidade,
        silo_id:body.silo_id

      });
      message.success('Movimentação registrada com sucesso');
      fetchData(); // Atualizar dados
      setMovimentaçãoVisible(false);
    } catch (error) {
      message.error('Erro ao registrar Movimentação.');
    }
  };

  return (
    <div style={{ padding: 8 }}>
      <h1>Gestão de Silos</h1>

      {/* Skeleton para os Silos */}
      <Row gutter={[16, 16]} justify="space-evenly">
        {loadingSilos ? (
          // Mostrar Skeleton Loader se estiver carregando os silos
          [...Array(8)].map((_, index) => (
            <Col
              key={index}
              xs={12}
              sm={10}
              md={8}
              lg={5}
              xl={4}
            >
              <Skeleton active loading={loadingSilos} />
            </Col>
          ))
        ) : (
          // Mostrar os silos após o carregamento
          silos?.map((silo: SiloCardProps, index) => (
            <Col
              key={index}
              xs={12}
              sm={10}
              md={8}
              lg={5}
              xl={4}
            >
              <SiloCard
                nome={silo.nome}
                capacidade_atual={silo.capacidade_atual}
                capacidade_total={silo.capacidade_total}
              />
            </Col>
          ))
        )}
      </Row>

      <h2>Movimentações Recentes</h2>

      {/* Skeleton para a Tabela de Movimentações */}
      {loadingMovimentacoes ? (
        <Skeleton active paragraph={{ rows: 5 }} />
      ) : (
        <Table
          dataSource={movimentacoes}
          columns={[
            { title: 'Tipo', dataIndex: 'tipo', key: 'tipo' },
            { title: 'Peso (kg)', dataIndex: 'quantidade', key: 'quantidade' },
            { title: 'Silo', dataIndex: 'silo_id', key: 'silo_id' },
            { title: 'Data', dataIndex: 'created_at', key: 'created_at' },
          ]}
          rowKey="id"
        />
      )}

      <Button type="primary" onClick={() => setMovimentaçãoVisible(true)}>
        Registrar Movimentação
      </Button>
      <MovimentacaoSiloModal
        visible={isMovimentaçãoVisible}
        onCancel={() => setMovimentaçãoVisible(false)}
        onSubmit={handleMovimentação}
        silos={silos} // Passando o estado silos
      />
    </div>
  );
};

export default GestaoSilosPage;
