-- Organization Table
CREATE TABLE organization (
    organization_id SERIAL PRIMARY KEY,
    name VARCHAR(150) NOT NULL,
    description TEXT NOT NULL,
    contact_email VARCHAR(255) NOT NULL,
    logo_filename VARCHAR(255) NOT NULL
);
INSERT INTO organization (name, description, contact_email, logo_filename)
VALUES
('BrightFuture Builders', 'A nonprofit focused on improving community infrastructure through sustainable construction projects.', 'info@brightfuturebuilders.org', 'bright.png'),
('GreenHarvest Growers', 'An urban farming collective promoting food sustainability and education in local neighborhoods.', 'contact@greenharvest.org', 'green.jpeg'),
('UnityServe Volunteers', 'A volunteer coordination group supporting local charities and service initiatives.', 'hello@unityserve.org', 'unity.png');

--Projects Table--

CREATE TABLE projects(
project_id SERIAL PRIMARY KEY,
    organization_id INT NOT NULL,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    location VARCHAR(255),
    date DATE,
    FOREIGN KEY (organization_id) REFERENCES public.organization(organization_id)
);
---- populate projects---
INSERT INTO projects(organization_id, title, description, location, date)
VALUES

(7, 'School Renovation', 'Renovating classrooms in a local primary school.', 'Ikeja, Lagos', '2026-05-20'),
(8, 'Urban Garden Setup', 'Setting up rooftop gardens in apartment complexes.', 'Lekki, Lagos', '2026-04-10'),
(9, 'Food Drive', 'Collecting and distributing food to local shelters.', 'Yaba, Lagos', '2026-06-01');

---Categories Table---
CREATE TABLE public.categories (
    category_id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL UNIQUE
);

---Joint Table Project/Categories---
CREATE TABLE project_categories (
    project_id INT NOT NULL,
    category_id INT NOT NULL,
    PRIMARY KEY (project_id, category_id),
    FOREIGN KEY (project_id) REFERENCES public.projects(project_id),
    FOREIGN KEY (category_id) REFERENCES public.categories(category_id)
);

--Populate Categories--
INSERT INTO public.categories (name)
VALUES
    ('Community Development'),
    ('Environmental Sustainability'),
    ('Education & Literacy'),
    ('Food Security'),
    ('Healthcare Outreach');

-- Community Road Repair → Community Development, Environmental Sustainability
INSERT INTO project_categories (project_id, category_id)
VALUES
    (1, 1),
    (1, 2),

-- School Renovation → Education & Literacy, Community Development
    (2, 3),
    (2, 1),

-- Urban Garden Setup → Environmental Sustainability, Food Security
    (3, 2),
    (3, 4),

-- Food Drive → Food Security, Healthcare Outreach
    (1, 4),
    (2, 5);

SELECT * from project_categories;