'use client';

import { useEffect, useState } from 'react';
import { Table, Button, Row, Col } from 'antd';
import { SiloCard, SiloCardProps } from '@/components/SiloCard';
import { EntradaModal } from '@/app/components/EntradaModal';
import { SaidaModal } from '@/app/components/SaidaModal';
import { getSilos, postMovimentacao } from '@/app/utils/api';

const HomePage = () => {
    const [silos, setSilos] = useState([]);
    const [movimentacoes, setMovimentacoes] = useState([]);
    const [isEntradaVisible, setEntradaVisible] = useState(false);
    const [isSaidaVisible, setSaidaVisible] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            const { silos } = await getSilos();
            setSilos(silos);
        };
        fetchData();
    }, []);


    const handleEntrada = async (data: any) => {
        await postMovimentacao({ ...data, tipo: 'entrada' });
        setEntradaVisible(false);
        const { silos, movimentacoes } = await getSilos();
        setSilos(silos);
        setMovimentacoes(movimentacoes);
    };

    const handleSaida = async (data: any) => {
        await postMovimentacao({ ...data, tipo: 'saida' });
        setSaidaVisible(false);
        const { silos, movimentacoes } = await getSilos();
        setSilos(silos);
        setMovimentacoes(movimentacoes);
    };

    return (
        <div style={{ padding: 8 }}>
            <h1>Gestão de Silos</h1>
            <Row gutter={[16, 16]} justify="space-evenly">
                {silos.map((silo: SiloCardProps, index) => (
                    <Col
                        key={index}
                        xs={12} // Tamanho em telas muito pequenas (100% largura)
                        sm={10} // Tamanho em telas pequenas (2 cartões por linha)
                        md={8}  // Tamanho em telas médias (3 cartões por linha)
                        lg={5}  // Tamanho em telas grandes (4 cartões por linha)
                        xl={4}  // Tamanho em telas grandes (5 cartões por linha)
                    >
                        <SiloCard
                            nome={silo.nome}
                            capacidade_atual={silo.capacidade_atual}
                            capacidade_total={silo.capacidade_total}
                        />
                    </Col>
                ))}
            </Row>

            <h2>Movimentações Recentes</h2>
            <Table
                dataSource={movimentacoes}
                columns={[
                    { title: 'Tipo', dataIndex: 'tipo', key: 'tipo' },
                    { title: 'Peso (kg)', dataIndex: 'peso', key: 'peso' },
                    { title: 'Silo', dataIndex: 'silo', key: 'silo' },
                    { title: 'Data', dataIndex: 'data', key: 'data' },
                ]}
                rowKey="id"
            />

            <Button type="primary" onClick={() => setEntradaVisible(true)}>
                Registrar Entrada
            </Button>
            <Button type="primary" onClick={() => setSaidaVisible(true)} style={{ marginLeft: 8 }}>
                Registrar Saída
            </Button>

            <EntradaModal visible={isEntradaVisible} onSubmit={handleEntrada} onCancel={() => setEntradaVisible(false)} />
            <SaidaModal visible={isSaidaVisible} onSubmit={handleSaida} onCancel={() => setSaidaVisible(false)} />
        </div>
    );
};

export default HomePage;
