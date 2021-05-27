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
-- Name: orders; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.orders (
    id integer NOT NULL,
    description text,
    person_id integer,
    created timestamp without time zone
);


--
-- Name: person; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.person (
    id integer NOT NULL,
    name text,
    surname text,
    email text,
    created timestamp without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    password text,
    roles text[]
);


--
-- Name: person_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.person_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: person_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.person_id_seq OWNED BY public.person.id;


--
-- Name: translation; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.translation (
    id integer NOT NULL,
    type text,
    english text,
    english_transcription text,
    russian text,
    english_example text,
    russian_example text,
    spanish text,
    spanish_example text,
    spanish_transcription text,
    french text,
    french_example text,
    french_transcription text,
    german text,
    german_example text,
    german_transcription text
);


--
-- Name: translations_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.translations_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: translations_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.translations_id_seq OWNED BY public.translation.id;


--
-- Name: person id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.person ALTER COLUMN id SET DEFAULT nextval('public.person_id_seq'::regclass);


--
-- Name: translation id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.translation ALTER COLUMN id SET DEFAULT nextval('public.translations_id_seq'::regclass);


--
-- Data for Name: orders; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.orders (id, description, person_id, created) FROM stdin;
3	описание заказа 3	2	2021-02-04 00:03:14
4	описание заказа 4	3	2020-02-04 00:03:21
5	описание заказа 5	3	2021-03-04 00:03:05
2	описание заказа 2	1	2020-03-04 00:03:10
6	описание заказа 6	23	2020-08-04 00:03:27
7	описание заказа 7	23	2020-08-04 00:03:27
8	описание заказа 8	18	2020-08-04 00:03:27
\.


--
-- Data for Name: person; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.person (id, name, surname, email, created, password, roles) FROM stdin;
5	Денис	Денисов	denisov@mail.ru	1999-04-18 17:52:30	\N	{CLIENT}
18	Kate	Sorokina	kate@ya.ru	2021-03-17 00:41:56.724815	$2b$10$tZ7tWMlN.WMD4QLfcE5jdecT0CT98G40j0bA5quutHMpiJ.gqdyxy	{CLIENT}
4	Сергей	Сергеев	sergeev@mail.ru	1996-01-05 17:52:15	\N	{CLIENT}
3	Андрей	Андреев	andreev@mail.ru	2010-07-30 17:51:56	\N	{CLIENT}
2	Роман	Романов	romanov@mail.ru	2021-02-27 17:51:52	\N	{CLIENT}
1	Иван	Иванов	ivanov@mail.ru	1999-01-08 04:05:06	\N	{CLIENT}
23	Pavel	P	p@ya.ru	2021-03-20 14:14:09.377904	$2b$10$9R9b9EmGHrYIi3NSGx4/cOQT4xLXgNBcwJWhXbZ7bZJ7/xSAFn04K	{ADMIN,CLIENT}
19	Pavel	Petyakin	pavel@ya.ru	2021-03-17 01:41:34.821497	$2b$10$THxLFcOWAG83bGmRTNaZTuLvmK5QvfwtlYkBRorv2DdNCsPFZV.ni	{ADMIN,CLIENT}
\.


--
-- Data for Name: translation; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.translation (id, type, english, english_transcription, russian, english_example, russian_example, spanish, spanish_example, spanish_transcription, french, french_example, french_transcription, german, german_example, german_transcription) FROM stdin;
2	TIME	today	[təˈdeɪ]	сегодня	today is a awesome weather	сегодня потрясающая погода	hoy	el tiempo hoy es increíble	[oi]	\N	\N	\N	\N	\N	\N
1	TIME	day	[deɪ]	день	rainy day	дождливый день	día	día de lluvia	[ˈdia]	\N	\N	\N	\N	\N	\N
5	TIME	the day after tomorrow	[ðiː][deɪ][ˈɑːftə][təˈmɒrəʊ]	послезавтра	you'll be released the day after tomorrow	вы будете свободны послезавтра	pasado mañana	estarás libre pasado mañana	[paˈsaðo][maˈɲana]	\N	\N	\N	\N	\N	\N
4	TIME	yesterday	[ˈjestədɪ]	вчера	he was asking about you only yesterday	он спрашивал о тебе только вчера	el ayer	estaba preguntando por ti ayer mismo	[aˈɟ͡ʝeɾ]	\N	\N	\N	\N	\N	\N
3	TIME	tomorrow	[təˈmɒrəʊ]	завтра	you know what's apt to happen tomorrow?	ты знаешь, что должно завтра случиться?	el mañana	¿sabes lo que va a pasar mañana?	[maˈɲana]	\N	\N	\N	\N	\N	\N
6	TIME	day before yesterday	[deɪ][bɪˈfɔː][ˈjestədɪ]	позавчера	they came here day before yesterday	они приехали позавчера	anteayer	llegaron aquí anteayer	[anteaˈɟ͡ʝeɾ]	\N	\N	\N	\N	\N	\N
7	WEEKDAY	monday	[ˈmʌndɪ]	понедельник	i'll tell you all about it on Monday	я тебе все расскажу в понедельник	lunes	Te lo contaré todo el lunes	[ˈlunes]	\N	\N	\N	\N	\N	\N
8	WEEKDAY	tuesday	[ˈtjuːzdɪ]	вторник	it's Tuesday, you know	ты же знаешь, сегодня вторник	martes	es martes, ya sabes	[ˈmaɾtes]	\N	\N	\N	\N	\N	\N
11	WEEKDAY	friday	[ˈfraɪdɪ]	пятница	would Friday at noon be convenient?	удобно ли будет в пятницу в полдень?	viernes	¿será conveniente el viernes al mediodía?	[ˈbjeɾnes]	\N	\N	\N	\N	\N	\N
9	WEEKDAY	wednesday	[ˈwenzdɪ]	среда	call me on Wednesday	позвоните мне в среду	miércoles	Llámame el miércoles	[ˈmjeɾkoles]	\N	\N	\N	\N	\N	\N
10	WEEKDAY	thursday	[ˈθɜːzdɪ]	четверг	he'll arrive Thursday night	он приедет в четверг вечером	jueves	llegará el jueves por la noche	[ˈxweβes]	\N	\N	\N	\N	\N	\N
12	WEEKDAY	saturday	[ˈsætədɪ]	суббота	saturday morning	субботнее утро	sábado	sábado por la mañana	[ˈsaβaðo]	\N	\N	\N	\N	\N	\N
13	WEEKDAY	sunday	[ˈsʌndɪ]	воскресенье	because sunday he may have to handle everything	потому что в воскресенье ему, возможно, придется все уладить	domingo	porque el domingo puede que tenga que encargarse de todo	[doˈmiŋɡo]	\N	\N	\N	\N	\N	\N
\.


--
-- Name: person_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.person_id_seq', 26, true);


--
-- Name: translations_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.translations_id_seq', 1, true);


--
-- Name: orders orders_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.orders
    ADD CONSTRAINT orders_pkey PRIMARY KEY (id);


--
-- Name: person persons_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.person
    ADD CONSTRAINT persons_pkey PRIMARY KEY (id);


--
-- Name: translation translations_pk; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.translation
    ADD CONSTRAINT translations_pk PRIMARY KEY (id);


--
-- PostgreSQL database dump complete
--

