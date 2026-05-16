import json
import os

SCHEMA = "t_p19684600_quantum_circuit_sim"

def get_conn():
    import psycopg2
    return psycopg2.connect(os.environ["DATABASE_URL"])

def handler(event: dict, context) -> dict:
    """Чат для Своих клиентов: GET — получить сообщения, POST — отправить сообщение."""
    cors = {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type",
    }

    if event.get("httpMethod") == "OPTIONS":
        return {"statusCode": 200, "headers": cors, "body": ""}

    method = event.get("httpMethod", "GET")

    if method == "GET":
        conn = get_conn()
        cur = conn.cursor()
        cur.execute(f"SELECT id, author_name, message, created_at FROM {SCHEMA}.chat_messages ORDER BY created_at ASC LIMIT 100")
        rows = cur.fetchall()
        cur.close()
        conn.close()
        messages = [
            {"id": r[0], "author": r[1], "message": r[2], "created_at": r[3].isoformat()}
            for r in rows
        ]
        return {"statusCode": 200, "headers": cors, "body": json.dumps({"messages": messages}, ensure_ascii=False)}

    if method == "POST":
        body = json.loads(event.get("body") or "{}")
        author = body.get("author", "").strip()
        message = body.get("message", "").strip()
        if not author or not message:
            return {"statusCode": 400, "headers": cors, "body": json.dumps({"error": "Укажите имя и сообщение"})}
        conn = get_conn()
        cur = conn.cursor()
        cur.execute(
            f"INSERT INTO {SCHEMA}.chat_messages (author_name, message) VALUES (%s, %s) RETURNING id, created_at",
            (author[:100], message[:1000])
        )
        row = cur.fetchone()
        conn.commit()
        cur.close()
        conn.close()
        return {"statusCode": 200, "headers": cors, "body": json.dumps({"id": row[0], "created_at": row[1].isoformat()})}

    return {"statusCode": 405, "headers": cors, "body": json.dumps({"error": "Method not allowed"})}
