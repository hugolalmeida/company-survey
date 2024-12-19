// components/FeedbackForm.tsx
"use client";
import React, { useState, useEffect } from "react";
import EmojiRating from "./EmojiRating";
import { useRouter } from "next/navigation";
import emailjs from "emailjs-com";
import { createFeedback } from '@/app/actions/feedback';

const FeedbackForm: React.FC = () => {
    const [feedback1, setFeedback1] = useState("");
    const [feedback2, setFeedback2] = useState("");
    const [ratings, setRatings] = useState<Record<string, number>>({});
    const router = useRouter();

    useEffect(() => {
        document.title = "Pesquisa de Satisfação - Canella & Santos";
    }, []);

    const handleRatingChange = (title: string, rating: number) => {
        setRatings((prev) => ({
            ...prev,
            [title]: rating,
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const dbData = {
            tempo_de_entrega: ratings["Tempo de Entrega dos Serviços"] || 0,
            qualidade_da_entrega: ratings["Qualidade das Entregas"] || 0,
            tempo_de_resposta: ratings["Tempo de Resposta"] || 0,
            qualidade_do_atendimento: ratings["Qualidade do Atendimento"] || 0,
            nosso_relacionamento: ratings["Como Avalia Nosso Relacionamento"] || 0,
            agregar_valor: ratings["Nossos Serviços Agregam Valor ao Seu Negócio"] || 0,
            palavra: feedback1.trim(),
            observacoes: feedback2.trim(),
        };

        try {
            // Salvar no banco de dados
        const result = await createFeedback(dbData);
        
        if (!result.success) {
            throw new Error('Falha ao salvar no banco de dados');
        }

            const emailContent = {
                subject: "Pesquisa de Satisfação - Respostas do Cliente",
                to_name: "Equipe Canella & Santos",
                from_name: "Pesquisa de Satisfação",
                ...dbData,
            };
            console.log(emailContent);
            
            await emailjs.send(
                "service_mp1or57",
                "template_2mhlnrm",
                emailContent,
                "o0sumI06EDLRXZoOe"
            );

            router.push("/thanks");
        } catch (error) {
            console.error("Erro ao enviar feedback:", error);
        }
    };

    return (
        <div className="container">
            <div className="section">
                <h3 className="section-title">ENTREGA</h3>
                <EmojiRating title="Tempo de Entrega dos Serviços" currentRating={ratings["Tempo de Entrega dos Serviços"] || 0} onRatingChange={handleRatingChange} />
                <EmojiRating title="Qualidade das Entregas" currentRating={ratings["Qualidade das Entregas"] || 0} onRatingChange={handleRatingChange} />
            </div>

            <div className="section">
                <h3 className="section-title">ATENDIMENTO</h3>
                <EmojiRating title="Tempo de Resposta" currentRating={ratings["Tempo de Resposta"] || 0} onRatingChange={handleRatingChange} />
                <EmojiRating title="Qualidade do Atendimento" currentRating={ratings["Qualidade do Atendimento"] || 0} onRatingChange={handleRatingChange} />
            </div>

            <div className="section">
                <h3 className="section-title">RELACIONAMENTO</h3>
                <EmojiRating title="Como Avalia Nosso Relacionamento" currentRating={ratings["Como Avalia Nosso Relacionamento"] || 0} onRatingChange={handleRatingChange} />
                <EmojiRating title="Nossos Serviços Agregam Valor ao Seu Negócio" currentRating={ratings["Nossos Serviços Agregam Valor ao Seu Negócio"] || 0} onRatingChange={handleRatingChange} />
            </div>

            <div>
                <h4 className="feedback-title">Em uma palavra, como você descreveria nossa contabilidade?</h4>
                <textarea value={feedback1} onChange={(e) => setFeedback1(e.target.value)} className="textarea" />
                <h4 className="feedback-title">Fique à vontade para fazer sugestões ou observações!</h4>
                <textarea value={feedback2} onChange={(e) => setFeedback2(e.target.value)} className="textarea" />
            </div>

            <div style={{ textAlign: "center", marginTop: "20px" }}>
                <button onClick={handleSubmit} className="submit-button">Enviar Feedback</button>
            </div>
        </div>
    );
};

export default FeedbackForm;
