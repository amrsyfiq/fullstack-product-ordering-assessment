--
-- PostgreSQL database dump
--

\restrict LXLbghclbqu3yNxDdxJWhX63XQhZ3goIz2Ad1hrLOaYUnd7pbKeo2jCpGz8Vzba

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
-- Data for Name: app_user; Type: TABLE DATA; Schema: public; Owner: -
--

INSERT INTO public.app_user (id, name, email, password, role) VALUES (1, 'Admin User', 'admin@example.com', 'Admin@123', 'admin');
INSERT INTO public.app_user (id, name, email, password, role) VALUES (2, 'Customer User', 'customer@example.com', 'Customer@123', 'customer');


--
-- Data for Name: category; Type: TABLE DATA; Schema: public; Owner: -
--

INSERT INTO public.category (id, name) VALUES (1, 'Smartphones');
INSERT INTO public.category (id, name) VALUES (2, 'Tablets');


--
-- Data for Name: brand; Type: TABLE DATA; Schema: public; Owner: -
--

INSERT INTO public.brand (id, name, category_id) VALUES (1, 'Apple', 1);
INSERT INTO public.brand (id, name, category_id) VALUES (2, 'Samsung', 1);
INSERT INTO public.brand (id, name, category_id) VALUES (3, 'Apple', 2);
INSERT INTO public.brand (id, name, category_id) VALUES (4, 'Samsung', 2);


--
-- Data for Name: migrations; Type: TABLE DATA; Schema: public; Owner: -
--

INSERT INTO public.migrations (id, "timestamp", name) VALUES (1, 1783396783306, 'InitialSchema1783396783306');


--
-- Data for Name: product; Type: TABLE DATA; Schema: public; Owner: -
--

INSERT INTO public.product (id, code, name, price, brand_id) VALUES (1, 'P000001', 'iPhone 8', 1230.00, 1);
INSERT INTO public.product (id, code, name, price, brand_id) VALUES (2, 'P000002', 'iPhone 9', 2230.00, 1);
INSERT INTO public.product (id, code, name, price, brand_id) VALUES (3, 'P000003', 'Galaxy S22', 3200.00, 2);
INSERT INTO public.product (id, code, name, price, brand_id) VALUES (4, 'P000004', 'Galaxy S23', 4200.00, 2);
INSERT INTO public.product (id, code, name, price, brand_id) VALUES (5, 'P000005', 'iPad 9', 1500.00, 3);
INSERT INTO public.product (id, code, name, price, brand_id) VALUES (6, 'P000006', 'iPad Air', 2500.00, 3);
INSERT INTO public.product (id, code, name, price, brand_id) VALUES (7, 'P000007', 'Galaxy Tab S8', 3000.00, 4);


--
-- Data for Name: product_color; Type: TABLE DATA; Schema: public; Owner: -
--

INSERT INTO public.product_color (id, name, product_id) VALUES (1, 'Green', 1);
INSERT INTO public.product_color (id, name, product_id) VALUES (2, 'Red', 1);
INSERT INTO public.product_color (id, name, product_id) VALUES (3, 'Blue', 1);
INSERT INTO public.product_color (id, name, product_id) VALUES (4, 'Yellow', 1);
INSERT INTO public.product_color (id, name, product_id) VALUES (5, 'Black', 2);
INSERT INTO public.product_color (id, name, product_id) VALUES (6, 'Silver', 2);
INSERT INTO public.product_color (id, name, product_id) VALUES (7, 'Blue', 2);
INSERT INTO public.product_color (id, name, product_id) VALUES (8, 'Green', 2);
INSERT INTO public.product_color (id, name, product_id) VALUES (9, 'Black', 3);
INSERT INTO public.product_color (id, name, product_id) VALUES (10, 'White', 3);
INSERT INTO public.product_color (id, name, product_id) VALUES (11, 'Green', 3);
INSERT INTO public.product_color (id, name, product_id) VALUES (12, 'Black', 4);
INSERT INTO public.product_color (id, name, product_id) VALUES (13, 'Cream', 4);
INSERT INTO public.product_color (id, name, product_id) VALUES (14, 'Green', 4);
INSERT INTO public.product_color (id, name, product_id) VALUES (15, 'Lavender', 4);
INSERT INTO public.product_color (id, name, product_id) VALUES (16, 'Silver', 5);
INSERT INTO public.product_color (id, name, product_id) VALUES (17, 'Space Gray', 5);
INSERT INTO public.product_color (id, name, product_id) VALUES (18, 'Blue', 6);
INSERT INTO public.product_color (id, name, product_id) VALUES (19, 'Pink', 6);
INSERT INTO public.product_color (id, name, product_id) VALUES (20, 'Purple', 6);
INSERT INTO public.product_color (id, name, product_id) VALUES (21, 'Starlight', 6);
INSERT INTO public.product_color (id, name, product_id) VALUES (22, 'Graphite', 7);
INSERT INTO public.product_color (id, name, product_id) VALUES (23, 'Silver', 7);
INSERT INTO public.product_color (id, name, product_id) VALUES (24, 'Pink Gold', 7);


--
-- Data for Name: order; Type: TABLE DATA; Schema: public; Owner: -
--

INSERT INTO public."order" (id, order_number, product_color_id, status, created_at) VALUES (1, 'MY000001', 3, 'Completed', '2026-07-07 04:04:02.291494');
INSERT INTO public."order" (id, order_number, product_color_id, status, created_at) VALUES (2, 'MY000002', 4, 'Open', '2026-07-07 04:04:02.291494');
INSERT INTO public."order" (id, order_number, product_color_id, status, created_at) VALUES (3, 'MY000003', 6, 'Open', '2026-07-07 04:04:02.291494');


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
-- PostgreSQL database dump complete
--

\unrestrict LXLbghclbqu3yNxDdxJWhX63XQhZ3goIz2Ad1hrLOaYUnd7pbKeo2jCpGz8Vzba

