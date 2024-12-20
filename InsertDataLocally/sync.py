import os
import psycopg2
import pyodbc
from datetime import datetime
from dotenv import load_dotenv

# Carregar variáveis de ambiente do arquivo .env
load_dotenv()

# URL do banco Neon (PostgreSQL)
DATABASE_URL = os.getenv("DATABASE_URL")

# Configuração do SQL Server
SQL_SERVER_CONFIG = {
    'server': os.getenv("SQL_SERVER_HOST", "localhost"),
    'database': os.getenv("SQL_SERVER_DB"),
    'username': os.getenv("SQL_SERVER_USER"),
    'password': os.getenv("SQL_SERVER_PASSWORD")
}

def get_sql_server_connection():
    conn_str = (
        f"DRIVER={{SQL Server}};"
        f"SERVER={SQL_SERVER_CONFIG['server']};"
        f"DATABASE={SQL_SERVER_CONFIG['database']};"
        f"UID={SQL_SERVER_CONFIG['username']};"
        f"PWD={SQL_SERVER_CONFIG['password']};"
        "Trusted_Connection=no;"
    )
    return pyodbc.connect(conn_str)

def sync_data():
    neon_connection = None
    sql_server_connection = None
    
    try:
        # Conectar ao banco de dados da Neon
        print("Conectando ao banco Neon...")
        neon_connection = psycopg2.connect(DATABASE_URL)
        neon_cursor = neon_connection.cursor()

        # Buscar os dados de feedback do banco Neon
        print("Buscando dados do Neon...")
        neon_cursor.execute('''
            SELECT 
                tempo_de_entrega,
                qualidade_da_entrega,
                tempo_de_resposta,
                qualidade_do_atendimento,
                nosso_relacionamento,
                agregar_valor,
                palavra,
                observacoes,
                created_at
            FROM feedback
            WHERE created_at > CURRENT_DATE - INTERVAL '1 day'
        ''')
        feedback_data = neon_cursor.fetchall()
        
        if not feedback_data:
            print("Nenhum dado novo encontrado para sincronizar.")
            return

        # Conectar ao SQL Server
        print("Conectando ao SQL Server...")
        sql_server_connection = get_sql_server_connection()
        sql_server_cursor = sql_server_connection.cursor()

        # Transferir os dados para o SQL Server
        for feedback in feedback_data:
            tempo_de_entrega, qualidade_da_entrega, tempo_de_resposta, \
            qualidade_do_atendimento, nosso_relacionamento, agregar_valor, \
            palavra, observacoes, created_at = feedback

            # Verificar se o feedback já existe
            sql_server_cursor.execute("""
                SELECT 1 FROM feedback 
                WHERE palavra = ? AND observacoes = ? AND created_at = ?
            """, (palavra, observacoes, created_at))
            
            if not sql_server_cursor.fetchone():
                # Inserir novo feedback
                sql_server_cursor.execute("""
                    INSERT INTO feedback (
                        tempo_de_entrega,
                        qualidade_da_entrega,
                        tempo_de_resposta,
                        qualidade_do_atendimento,
                        nosso_relacionamento,
                        agregar_valor,
                        palavra,
                        observacoes,
                        created_at
                    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
                """, (
                    tempo_de_entrega, qualidade_da_entrega, tempo_de_resposta,
                    qualidade_do_atendimento, nosso_relacionamento, agregar_valor,
                    palavra, observacoes, created_at
                ))
                print(f"Novo feedback inserido: {palavra}")

        # Commit das alterações
        sql_server_connection.commit()
        print("Sincronização concluída com sucesso!")

    except Exception as error:
        print(f"Erro na sincronização: {error}")
        if sql_server_connection:
            sql_server_connection.rollback()
    
    finally:
        # Fechar as conexões
        if neon_connection:
            neon_connection.close()
            print("Conexão com Neon fechada")
        
        if sql_server_connection:
            sql_server_connection.close()
            print("Conexão com SQL Server fechada")

if __name__ == '__main__':
    sync_data()