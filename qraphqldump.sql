--
-- PostgreSQL database dump
--

-- Dumped from database version 13.2
-- Dumped by pg_dump version 13.2

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: orders; Type: TABLE; Schema: public; Owner: pavelpetyakin
--

CREATE TABLE public.orders (
    id integer NOT NULL,
    description text,
    person_id integer,
    created timestamp without time zone
);


ALTER TABLE public.orders OWNER TO pavelpetyakin;

--
-- Name: person; Type: TABLE; Schema: public; Owner: pavelpetyakin
--

CREATE TABLE public.person (
    id integer NOT NULL,
    name text,
    surname text,
    email text,
    created timestamp without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    password text
);


ALTER TABLE public.person OWNER TO pavelpetyakin;

--
-- Name: person_id_seq; Type: SEQUENCE; Schema: public; Owner: pavelpetyakin
--

CREATE SEQUENCE public.person_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.person_id_seq OWNER TO pavelpetyakin;

--
-- Name: person_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: pavelpetyakin
--

ALTER SEQUENCE public.person_id_seq OWNED BY public.person.id;


--
-- Name: translation; Type: TABLE; Schema: public; Owner: pavelpetyakin
--

CREATE TABLE public.translation (
    id integer NOT NULL,
    type text,
    english text,
    transcription text,
    russian text,
    english_example text,
    russian_example text
);


ALTER TABLE public.translation OWNER TO pavelpetyakin;

--
-- Name: translations_id_seq; Type: SEQUENCE; Schema: public; Owner: pavelpetyakin
--

CREATE SEQUENCE public.translations_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.translations_id_seq OWNER TO pavelpetyakin;

--
-- Name: translations_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: pavelpetyakin
--

ALTER SEQUENCE public.translations_id_seq OWNED BY public.translation.id;


--
-- Name: person id; Type: DEFAULT; Schema: public; Owner: pavelpetyakin
--

ALTER TABLE ONLY public.person ALTER COLUMN id SET DEFAULT nextval('public.person_id_seq'::regclass);


--
-- Name: translation id; Type: DEFAULT; Schema: public; Owner: pavelpetyakin
--

ALTER TABLE ONLY public.translation ALTER COLUMN id SET DEFAULT nextval('public.translations_id_seq'::regclass);


--
-- Data for Name: orders; Type: TABLE DATA; Schema: public; Owner: pavelpetyakin
--

COPY public.orders (id, description, person_id, created) FROM stdin;
3	описание заказа 3	2	2021-02-04 00:03:14
4	описание заказа 4	3	2020-02-04 00:03:21
5	описание заказа 5	3	2021-03-04 00:03:05
2	описание заказа 2	1	2020-03-04 00:03:10
1	описание заказа 1	1	2020-08-04 00:03:27
\.


--
-- Data for Name: person; Type: TABLE DATA; Schema: public; Owner: pavelpetyakin
--

COPY public.person (id, name, surname, email, created, password) FROM stdin;
1	Иван	Иванов	ivanov@mail.ru	1999-01-08 04:05:06	\N
4	Сергей	Сергеев	sergeev@mail.ru	1996-01-05 17:52:15	\N
5	Денис	Денисов	denisov@mail.ru	1999-04-18 17:52:30	\N
2	Роман	Романов	romanov@mail.ru	2021-02-27 17:51:52	\N
3	Андрей	Андреев	andreev@mail.ru	2010-07-30 17:51:56	\N
19	Pavel	Petyakin	pavel@ya.ru	2021-03-17 01:41:34.821497	$2b$10$THxLFcOWAG83bGmRTNaZTuLvmK5QvfwtlYkBRorv2DdNCsPFZV.ni
18	Kate	Sorokina	kate@ya.ru	2021-03-17 00:41:56.724815	$2b$10$tZ7tWMlN.WMD4QLfcE5jdecT0CT98G40j0bA5quutHMpiJ.gqdyxy
23	Pavel	P	p@ya.ru	2021-03-20 14:14:09.377904	$2b$10$9R9b9EmGHrYIi3NSGx4/cOQT4xLXgNBcwJWhXbZ7bZJ7/xSAFn04K
\.


--
-- Data for Name: translation; Type: TABLE DATA; Schema: public; Owner: pavelpetyakin
--

COPY public.translation (id, type, english, transcription, russian, english_example, russian_example) FROM stdin;
2	TIME	today	[təˈdeɪ]	сегодня	today is a awesome weather	сегодня потрясающая погода
1	TIME	day	[deɪ]	день	rainy day	дождливый день
3	TIME	tomorrow	[təˈmɒrəʊ]	завтра	you know what's apt to happen tomorrow?	ты знаешь, что должно завтра случиться?
4	TIME	yesterday	[ˈjestədɪ]	вчера	he was asking about you only yesterday	он спрашивал о тебе только вчера
5	TIME	the day after tomorrow	[ðiː][deɪ][ˈɑːftə][təˈmɒrəʊ]	послезавтра	you'll be released the day after tomorrow	вы будете свободны послезавтра
6	TIME	day before yesterday	[deɪ][bɪˈfɔː][ˈjestədɪ]	позавчера	they came here day before yesterday	они приехали позавчера
7	WEEKDAY	monday	[ˈmʌndɪ]	понедельник	i'll tell you all about it Monday	я тебе все расскажу в понедельник
8	WEEKDAY	tuesday	[ˈtjuːzdɪ]	вторник	it's Tuesday, you know	ты же знаешь, сегодня вторник
9	WEEKDAY	wednesday	[ˈwenzdɪ]	среда	give me a call on Wednesday	позвоните мне в среду
10	WEEKDAY	thursday	[ˈθɜːzdɪ]	четверг	he'll arrive Thursday night	он приедет в четверг вечером
11	WEEKDAY	friday	[ˈfraɪdɪ]	пятница	would Friday at noon be convenient?	удобно ли будет в пятницу в полдень?
12	WEEKDAY	saturday	[ˈsætədɪ]	суббота	saturday morning	субботнее утро
13	WEEKDAY	sunday	[ˈsʌndɪ]	воскресенье	because sunday he may have to handle everything	потому что в воскресенье ему, возможно, придется все уладить
\.


--
-- Name: person_id_seq; Type: SEQUENCE SET; Schema: public; Owner: pavelpetyakin
--

SELECT pg_catalog.setval('public.person_id_seq', 26, true);


--
-- Name: translations_id_seq; Type: SEQUENCE SET; Schema: public; Owner: pavelpetyakin
--

SELECT pg_catalog.setval('public.translations_id_seq', 1, true);


--
-- Name: orders orders_pkey; Type: CONSTRAINT; Schema: public; Owner: pavelpetyakin
--

ALTER TABLE ONLY public.orders
    ADD CONSTRAINT orders_pkey PRIMARY KEY (id);


--
-- Name: person persons_pkey; Type: CONSTRAINT; Schema: public; Owner: pavelpetyakin
--

ALTER TABLE ONLY public.person
    ADD CONSTRAINT persons_pkey PRIMARY KEY (id);


--
-- Name: translation translations_pk; Type: CONSTRAINT; Schema: public; Owner: pavelpetyakin
--

ALTER TABLE ONLY public.translation
    ADD CONSTRAINT translations_pk PRIMARY KEY (id);


--
-- PostgreSQL database dump complete
--

