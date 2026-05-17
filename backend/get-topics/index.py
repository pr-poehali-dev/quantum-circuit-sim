import os
import json
import psycopg2


def handler(event: dict, context) -> dict:
    """Возвращает список тем из базы данных."""
    if event.get('httpMethod') == 'OPTIONS':
        return {'statusCode': 200, 'headers': {'Access-Control-Allow-Origin': '*', 'Access-Control-Allow-Methods': 'GET, OPTIONS', 'Access-Control-Allow-Headers': 'Content-Type', 'Access-Control-Max-Age': '86400'}, 'body': ''}

    conn = psycopg2.connect(os.environ['DATABASE_URL'])
    cur = conn.cursor()
    cur.execute("""
        SELECT id, title, recordings, has_compilation, sort_order
        FROM t_p19684600_quantum_circuit_sim.topics
        ORDER BY sort_order ASC, id ASC
    """)
    rows = cur.fetchall()
    cur.close()
    conn.close()

    topics = [
        {'id': r[0], 'title': r[1], 'recordings': r[2], 'hasCompilation': r[3], 'sortOrder': r[4]}
        for r in rows
    ]

    return {
        'statusCode': 200,
        'headers': {'Access-Control-Allow-Origin': '*', 'Content-Type': 'application/json'},
        'body': json.dumps({'topics': topics}, ensure_ascii=False)
    }
