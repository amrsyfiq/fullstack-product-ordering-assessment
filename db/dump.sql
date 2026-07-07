--
-- PostgreSQL database dump
--

\restrict F6j3ur8qg31yfbFnmRhSO8HbQlAJIRUee6NWPxv1pHQFpQJGj8hJfn6vifFhWIp

-- Dumped from database version 17.10
-- Dumped by pg_dump version 17.10

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET transaction_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- Name: app_user_role_enum; Type: TYPE; Schema: public; Owner: -
--

CREATE TYPE public.app_user_role_enum AS ENUM (
    'customer',
    'admin'
);


--
-- Name: order_status_enum; Type: TYPE; Schema: public; Owner: -
--

CREATE TYPE public.order_status_enum AS ENUM (
    'Open',
    'Completed'
);


SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: app_user; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.app_user (
    id integer NOT NULL,
    name character varying(100) NOT NULL,
    email character varying(150) NOT NULL,
    password character varying(255) NOT NULL,
    role public.app_user_role_enum DEFAULT 'customer'::public.app_user_role_enum NOT NULL
);


--
-- Name: app_user_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.app_user_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: app_user_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.app_user_id_seq OWNED BY public.app_user.id;


--
-- Name: brand; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.brand (
    id integer NOT NULL,
    name character varying(100) NOT NULL,
    category_id integer NOT NULL
);


--
-- Name: brand_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.brand_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: brand_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.brand_id_seq OWNED BY public.brand.id;


--
-- Name: category; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.category (
    id integer NOT NULL,
    name character varying(100) NOT NULL
);


--
-- Name: category_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.category_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: category_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.category_id_seq OWNED BY public.category.id;


--
-- Name: migrations; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.migrations (
    id integer NOT NULL,
    "timestamp" bigint NOT NULL,
    name character varying NOT NULL
);


--
-- Name: migrations_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.migrations_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: migrations_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.migrations_id_seq OWNED BY public.migrations.id;


--
-- Name: order; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public."order" (
    id integer NOT NULL,
    order_number character varying(20) NOT NULL,
    product_color_id integer NOT NULL,
    status public.order_status_enum DEFAULT 'Open'::public.order_status_enum NOT NULL,
    created_at timestamp without time zone DEFAULT now() NOT NULL
);


--
-- Name: order_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.order_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: order_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.order_id_seq OWNED BY public."order".id;


--
-- Name: product; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.product (
    id integer NOT NULL,
    code character varying(20) NOT NULL,
    name character varying(150) NOT NULL,
    price numeric(12,2) NOT NULL,
    brand_id integer NOT NULL
);


--
-- Name: product_color; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.product_color (
    id integer NOT NULL,
    name character varying(50) NOT NULL,
    product_id integer NOT NULL
);


--
-- Name: product_color_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.product_color_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: product_color_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.product_color_id_seq OWNED BY public.product_color.id;


--
-- Name: product_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.product_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: product_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.product_id_seq OWNED BY public.product.id;


--
-- Name: app_user id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.app_user ALTER COLUMN id SET DEFAULT nextval('public.app_user_id_seq'::regclass);


--
-- Name: brand id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.brand ALTER COLUMN id SET DEFAULT nextval('public.brand_id_seq'::regclass);


--
-- Name: category id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.category ALTER COLUMN id SET DEFAULT nextval('public.category_id_seq'::regclass);


--
-- Name: migrations id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.migrations ALTER COLUMN id SET DEFAULT nextval('public.migrations_id_seq'::regclass);


--
-- Name: order id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."order" ALTER COLUMN id SET DEFAULT nextval('public.order_id_seq'::regclass);


--
-- Name: product id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.product ALTER COLUMN id SET DEFAULT nextval('public.product_id_seq'::regclass);


--
-- Name: product_color id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.product_color ALTER COLUMN id SET DEFAULT nextval('public.product_color_id_seq'::regclass);


--
-- Data for Name: app_user; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.app_user (id, name, email, password, role) FROM stdin;
1	Admin User	admin@example.com	Admin@123	admin
2	Customer User	customer@example.com	Customer@123	customer
\.


--
-- Data for Name: brand; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.brand (id, name, category_id) FROM stdin;
1	Apple	1
2	Samsung	1
3	Apple	2
4	Samsung	2
\.


--
-- Data for Name: category; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.category (id, name) FROM stdin;
1	Smartphones
2	Tablets
\.


--
-- Data for Name: migrations; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.migrations (id, "timestamp", name) FROM stdin;
1	1783396783306	InitialSchema1783396783306
\.


--
-- Data for Name: order; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public."order" (id, order_number, product_color_id, status, created_at) FROM stdin;
1	MY000001	3	Completed	2026-07-07 04:04:02.291494
2	MY000002	4	Open	2026-07-07 04:04:02.291494
3	MY000003	6	Open	2026-07-07 04:04:02.291494
\.


--
-- Data for Name: product; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.product (id, code, name, price, brand_id) FROM stdin;
1	P000001	iPhone 8	1230.00	1
2	P000002	iPhone 9	2230.00	1
3	P000003	Galaxy S22	3200.00	2
4	P000004	Galaxy S23	4200.00	2
5	P000005	iPad 9	1500.00	3
6	P000006	iPad Air	2500.00	3
7	P000007	Galaxy Tab S8	3000.00	4
\.


--
-- Data for Name: product_color; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.product_color (id, name, product_id) FROM stdin;
1	Green	1
2	Red	1
3	Blue	1
4	Yellow	1
5	Black	2
6	Silver	2
7	Blue	2
8	Green	2
9	Black	3
10	White	3
11	Green	3
12	Black	4
13	Cream	4
14	Green	4
15	Lavender	4
16	Silver	5
17	Space Gray	5
18	Blue	6
19	Pink	6
20	Purple	6
21	Starlight	6
22	Graphite	7
23	Silver	7
24	Pink Gold	7
\.


--
-- Name: app_user_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.app_user_id_seq', 2, true);


--
-- Name: brand_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.brand_id_seq', 4, true);


--
-- Name: category_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.category_id_seq', 2, true);


--
-- Name: migrations_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.migrations_id_seq', 1, true);


--
-- Name: order_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.order_id_seq', 3, true);


--
-- Name: product_color_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.product_color_id_seq', 24, true);


--
-- Name: product_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.product_id_seq', 7, true);


--
-- Name: order PK_1031171c13130102495201e3e20; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."order"
    ADD CONSTRAINT "PK_1031171c13130102495201e3e20" PRIMARY KEY (id);


--
-- Name: app_user PK_22a5c4a3d9b2fb8e4e73fc4ada1; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.app_user
    ADD CONSTRAINT "PK_22a5c4a3d9b2fb8e4e73fc4ada1" PRIMARY KEY (id);


--
-- Name: migrations PK_8c82d7f526340ab734260ea46be; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.migrations
    ADD CONSTRAINT "PK_8c82d7f526340ab734260ea46be" PRIMARY KEY (id);


--
-- Name: category PK_9c4e4a89e3674fc9f382d733f03; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.category
    ADD CONSTRAINT "PK_9c4e4a89e3674fc9f382d733f03" PRIMARY KEY (id);


--
-- Name: brand PK_a5d20765ddd942eb5de4eee2d7f; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.brand
    ADD CONSTRAINT "PK_a5d20765ddd942eb5de4eee2d7f" PRIMARY KEY (id);


--
-- Name: product PK_bebc9158e480b949565b4dc7a82; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.product
    ADD CONSTRAINT "PK_bebc9158e480b949565b4dc7a82" PRIMARY KEY (id);


--
-- Name: product_color PK_e586d22a197c9b985af3ac82ce3; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.product_color
    ADD CONSTRAINT "PK_e586d22a197c9b985af3ac82ce3" PRIMARY KEY (id);


--
-- Name: category UQ_23c05c292c439d77b0de816b500; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.category
    ADD CONSTRAINT "UQ_23c05c292c439d77b0de816b500" UNIQUE (name);


--
-- Name: app_user UQ_3fa909d0e37c531ebc237703391; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.app_user
    ADD CONSTRAINT "UQ_3fa909d0e37c531ebc237703391" UNIQUE (email);


--
-- Name: product UQ_99c39b067cfa73c783f0fc49a61; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.product
    ADD CONSTRAINT "UQ_99c39b067cfa73c783f0fc49a61" UNIQUE (code);


--
-- Name: order UQ_f9180f384353c621e8d0c414c14; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."order"
    ADD CONSTRAINT "UQ_f9180f384353c621e8d0c414c14" UNIQUE (order_number);


--
-- Name: order FK_1262343c8b505d2ec2dc42ad547; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."order"
    ADD CONSTRAINT "FK_1262343c8b505d2ec2dc42ad547" FOREIGN KEY (product_color_id) REFERENCES public.product_color(id);


--
-- Name: product FK_2eb5ce4324613b4b457c364f4a2; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.product
    ADD CONSTRAINT "FK_2eb5ce4324613b4b457c364f4a2" FOREIGN KEY (brand_id) REFERENCES public.brand(id) ON DELETE CASCADE;


--
-- Name: product_color FK_44afd60e2220b89874a86a11cd9; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.product_color
    ADD CONSTRAINT "FK_44afd60e2220b89874a86a11cd9" FOREIGN KEY (product_id) REFERENCES public.product(id) ON DELETE CASCADE;


--
-- Name: brand FK_4b5f29a73f7b34a6e7566133393; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.brand
    ADD CONSTRAINT "FK_4b5f29a73f7b34a6e7566133393" FOREIGN KEY (category_id) REFERENCES public.category(id) ON DELETE CASCADE;


--
-- PostgreSQL database dump complete
--

\unrestrict F6j3ur8qg31yfbFnmRhSO8HbQlAJIRUee6NWPxv1pHQFpQJGj8hJfn6vifFhWIp

