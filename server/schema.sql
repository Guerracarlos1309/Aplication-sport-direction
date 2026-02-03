-- Database Schema for Sport Direction App

-- Drop tables if they exist
DROP TABLE IF EXISTS training_sessions CASCADE;
DROP TABLE IF EXISTS wellness CASCADE;
DROP TABLE IF EXISTS users CASCADE;
DROP TABLE IF EXISTS players CASCADE;
DROP TABLE IF EXISTS payments CASCADE;
DROP TABLE IF EXISTS inventory CASCADE;
DROP TABLE IF EXISTS scouting_objectives CASCADE;

-- Training Sessions Table
CREATE TABLE training_sessions (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    type VARCHAR(50) NOT NULL,
    description TEXT,
    date TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Players Table
CREATE TABLE players (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    position VARCHAR(50),
    status VARCHAR(50) DEFAULT 'No Convocado',
    medical_status VARCHAR(255) DEFAULT 'Apto',
    prognosis VARCHAR(100) DEFAULT '-',
    last_review DATE,
    callup_acknowledged BOOLEAN DEFAULT FALSE
);

-- Users Table
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(100) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    role VARCHAR(20) NOT NULL, -- 'DT', 'Jugador'
    player_id INTEGER REFERENCES players(id) ON DELETE SET NULL
);

-- Wellness Table
CREATE TABLE wellness (
    id SERIAL PRIMARY KEY,
    player_id INTEGER REFERENCES players(id) ON DELETE CASCADE,
    date DATE DEFAULT CURRENT_DATE,
    sleep INTEGER,
    fatigue INTEGER,
    stress INTEGER,
    soreness INTEGER,
    mood INTEGER,
    UNIQUE(player_id, date)
);

-- Payments Table
CREATE TABLE payments (
    id SERIAL PRIMARY KEY,
    concept VARCHAR(255) NOT NULL,
    amount DECIMAL(12, 2) NOT NULL,
    status VARCHAR(20) DEFAULT 'pending',
    due_date DATE
);

-- Inventory Table
CREATE TABLE inventory (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    stock INTEGER DEFAULT 0,
    unit VARCHAR(20) DEFAULT 'unid.'
);

-- Scouting Objectives Table
CREATE TABLE scouting_objectives (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    rating INTEGER,
    position VARCHAR(50)
);

-- Seed Data
INSERT INTO players (name, position, status, medical_status) VALUES
('Carlos Ruiz', 'POR', 'Convocado', 'Apto'),
('Marcos Silva', 'DEF', 'Convocado', 'Apto'),
('Luca Modric', 'MED', 'Duda', 'Fatiga Muscular'),
('Ivan Rakitic', 'MED', 'Convocado', 'Apto'),
('Karim B.', 'DEL', 'Lesionado', 'Lesión Isquios');

INSERT INTO users (username, password, role, player_id) VALUES 
('entrenador', '1234', 'DT', NULL),
('carlos', '1234', 'Jugador', 1);

INSERT INTO inventory (name, stock) VALUES
('Balones Nike Flight', 45),
('Conos Entrenamiento', 120),
('Pichis / Chalecos', 60),
('Botiquines Completos', 8);

INSERT INTO payments (concept, amount, status, due_date) VALUES
('Proveedor Material Nike', 15000, 'paid', '2026-01-15'),
('Alquiler Instalaciones', 8500, 'pending', '2026-02-01'),
('Seguro Médico Mapfre', 12200, 'overdue', '2026-01-20');

INSERT INTO wellness (player_id, sleep, fatigue, stress, soreness, mood) VALUES
(1, 4, 3, 2, 3, 4),
(1, 5, 4, 1, 4, 5),
(2, 3, 5, 4, 2, 3);

INSERT INTO scouting_objectives (name, rating, position) VALUES
('Erling Haaland', 95, 'DC'),
('Vinícius Jr', 92, 'EI');
