CREATE TABLE IF NOT EXISTS members (
    id SERIAL PRIMARY KEY,
    name VARCHAR(120) NOT NULL,
    goal VARCHAR(160) NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

INSERT INTO members (name, goal) VALUES
('Demo Member', 'Strength Training'),
('Sample Athlete', 'Conditioning')
ON CONFLICT DO NOTHING;
