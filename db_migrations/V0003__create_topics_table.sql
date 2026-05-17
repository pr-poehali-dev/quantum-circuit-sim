CREATE TABLE IF NOT EXISTS t_p19684600_quantum_circuit_sim.topics (
  id SERIAL PRIMARY KEY,
  title TEXT NOT NULL,
  recordings INT NOT NULL DEFAULT 0,
  has_compilation BOOLEAN NOT NULL DEFAULT FALSE,
  sort_order INT NOT NULL DEFAULT 0,
  created_at TIMESTAMP DEFAULT NOW()
);