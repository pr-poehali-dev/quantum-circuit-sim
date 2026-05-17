import json
import os
import hashlib
import psycopg2  # noqa


def handler(event: dict, context) -> dict:
    """Авторизация клиентов в Пещеру Тем по логину и паролю."""

    cors = {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type",
    }

    if event.get("httpMethod") == "OPTIONS":
        return {"statusCode": 200, "headers": cors, "body": ""}

    body = json.loads(event.get("body") or "{}")
    username = body.get("username", "").strip().lower()
    password = body.get("password", "")

    if not username or not password:
        return {
            "statusCode": 400,
            "headers": {**cors, "Content-Type": "application/json"},
            "body": {"ok": False, "error": "Введите логин и пароль"},
        }

    password_hash = hashlib.md5(password.encode()).hexdigest()

    conn = psycopg2.connect(os.environ["DATABASE_URL"])
    cur = conn.cursor()
    cur.execute(
        "SELECT id, username FROM t_p19684600_quantum_circuit_sim.cave_clients WHERE username = %s AND password_hash = %s",
        (username, password_hash),
    )
    row = cur.fetchone()
    cur.close()
    conn.close()

    if not row:
        return {
            "statusCode": 401,
            "headers": {**cors, "Content-Type": "application/json"},
            "body": {"ok": False, "error": "Неверный логин или пароль"},
        }

    return {
        "statusCode": 200,
        "headers": {**cors, "Content-Type": "application/json"},
        "body": {"ok": True, "username": row[1]},
    }