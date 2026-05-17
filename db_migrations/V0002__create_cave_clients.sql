CREATE TABLE IF NOT EXISTS t_p19684600_quantum_circuit_sim.cave_clients (
  id SERIAL PRIMARY KEY,
  username VARCHAR(100) NOT NULL UNIQUE,
  password_hash VARCHAR(255) NOT NULL,
  created_at TIMESTAMP DEFAULT NOW()
);

INSERT INTO t_p19684600_quantum_circuit_sim.cave_clients (username, password_hash)
VALUES ('demo', md5('demo123'))
ON CONFLICT DO NOTHING;
