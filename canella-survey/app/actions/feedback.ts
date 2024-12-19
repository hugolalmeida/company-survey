'use server'

import { sql } from '@/lib/db';

interface FeedbackData {
    tempo_de_entrega: number | null;
    qualidade_da_entrega: number | null;
    tempo_de_resposta: number | null;
    qualidade_do_atendimento: number | null;
    nosso_relacionamento: number | null;
    agregar_valor: number | null;
    palavra: string;
    observacoes: string;
}

export async function createFeedback(data: FeedbackData) {
    try {
        await sql`
            INSERT INTO feedback (
                tempo_de_entrega,
                qualidade_da_entrega,
                tempo_de_resposta,
                qualidade_do_atendimento,
                nosso_relacionamento,
                agregar_valor,
                palavra,
                observacoes
            ) VALUES (
                ${data.tempo_de_entrega},
                ${data.qualidade_da_entrega},
                ${data.tempo_de_resposta},
                ${data.qualidade_do_atendimento},
                ${data.nosso_relacionamento},
                ${data.agregar_valor},
                ${data.palavra},
                ${data.observacoes}
            )
        `;
        return { success: true };
    } catch (error) {
        console.error('Erro ao salvar feedback:', error);
        return { success: false, error };
    }
}