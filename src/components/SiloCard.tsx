"use client"; // Adicione esta linha no topo do arquivo

import React from 'react';
import { Card, Progress, Typography } from 'antd';
const { Text } = Typography;


export interface SiloCardProps {
    nome: string;
    capacidade_atual: number;
    capacidade_total: number;
}

export function SiloCard({ nome, capacidade_atual, capacidade_total }: SiloCardProps) {
    if (capacidade_atual === undefined || capacidade_total === undefined) {
        return <div>Dados de capacidade inválidos</div>;
    }

    const capacidadePercentual = Math.round(
        (capacidade_atual / capacidade_total) * 100
    );

    return (
        <Card
            title={nome}
            bordered
            style={{ textAlign: 'center', padding: '1px', border: '1px solid #f0f0f0', borderRadius: '6px' }}
        >
            <div style={{ textAlign: 'center' }}>
                <Progress
                    type="circle"
                    percent={capacidadePercentual}
                    format={() => `${capacidadePercentual}%`}
                    style={{ marginBottom: '16px' }}
                />
                <div>
                    <Text strong>Capacidade: </Text>{' '}
                    <Text>{`${capacidade_atual.toLocaleString()} / ${capacidade_total.toLocaleString()} Kg`}</Text>
                </div>
            </div>
        </Card>
    );
}
