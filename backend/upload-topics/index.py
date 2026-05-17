import os
import json
import base64
import psycopg2
import openpyxl
from io import BytesIO


def handler(event: dict, context) -> dict:
    """Принимает Excel-файл (base64), парсит темы и сохраняет в БД."""
    if event.get('httpMethod') == 'OPTIONS':
        return {'statusCode': 200, 'headers': {'Access-Control-Allow-Origin': '*', 'Access-Control-Allow-Methods': 'POST, OPTIONS', 'Access-Control-Allow-Headers': 'Content-Type', 'Access-Control-Max-Age': '86400'}, 'body': ''}

    body = json.loads(event.get('body') or '{}')
    file_b64 = body.get('file')
    if not file_b64:
        return {'statusCode': 400, 'headers': {'Access-Control-Allow-Origin': '*'}, 'body': json.dumps({'error': 'Файл не передан'})}

    file_bytes = base64.b64decode(file_b64)
    wb = openpyxl.load_workbook(BytesIO(file_bytes))
    ws = wb.active

    topics = []
    for i, row in enumerate(ws.iter_rows(min_row=2, values_only=True)):
        title = row[0] if row[0] else None
        if not title:
            continue
        recordings = int(row[1]) if len(row) > 1 and row[1] is not None else 0
        has_compilation = bool(row[2]) if len(row) > 2 and row[2] is not None else False
        topics.append((str(title).strip(), recordings, has_compilation, i))

    if not topics:
        return {'statusCode': 400, 'headers': {'Access-Control-Allow-Origin': '*'}, 'body': json.dumps({'error': 'Темы не найдены. Проверьте формат файла.'})}

    conn = psycopg2.connect(os.environ['DATABASE_URL'])
    cur = conn.cursor()
    cur.execute("DELETE FROM t_p19684600_quantum_circuit_sim.topics")
    cur.executemany(
        "INSERT INTO t_p19684600_quantum_circuit_sim.topics (title, recordings, has_compilation, sort_order) VALUES (%s, %s, %s, %s)",
        topics
    )
    conn.commit()
    cur.close()
    conn.close()

    return {
        'statusCode': 200,
        'headers': {'Access-Control-Allow-Origin': '*', 'Content-Type': 'application/json'},
        'body': json.dumps({'ok': True, 'count': len(topics)}, ensure_ascii=False)
    }
