CREATE TABLE t_p19684600_quantum_circuit_sim.chat_messages (
  id SERIAL PRIMARY KEY,
  author_name VARCHAR(100) NOT NULL,
  message TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT NOW()
);