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
15	WEEKDAY	weekend	[wiːkˈend]	выходные	this is definitely not a weekend visit	это определённо не визит выходного дня	\N	\N	\N	\N	\N	\N	\N	\N	\N
16	MONTH	month	[mʌnθ]	месяц	it was six month ago, after work	это было 6 мес назад после работы	\N	\N	\N	\N	\N	\N	\N	\N	\N
17	MONTH	january	[ˈʤænjʊərɪ]	январь	he came home in January	он вернулся домой в январе	\N	\N	\N	\N	\N	\N	\N	\N	\N
18	MONTH	february	[ˈfebrʊərɪ]	февраль	about the middle of February she went in the work	примерно в середине февраля она пошла на работу	\N	\N	\N	\N	\N	\N	\N	\N	\N
13	WEEKDAY	sunday	[ˈsʌndɪ]	воскресенье	late tomorrow or early Sunday	поздно завтра или рано в воскресенье	domingo	porque el domingo puede que tenga que encargarse de todo	[doˈmiŋɡo]	\N	\N	\N	\N	\N	\N
36	HUMAN	human	[ˈhjuːmən]	человек	I am human, am I not?	человек я или нет?	\N	\N	\N	\N	\N	\N	\N	\N	\N
37	HUMAN	girl	[gɜːl]	девочка	she is a beautiful girl	она красивая девушка	\N	\N	\N	\N	\N	\N	\N	\N	\N
38	HUMAN	boy	[bɔɪ]	мальчик	he is a handsome boy	он красивый мальчик	\N	\N	\N	\N	\N	\N	\N	\N	\N
39	HUMAN	man	[mæn]	мужчина	what a strange man	какой странный мужчина	\N	\N	\N	\N	\N	\N	\N	\N	\N
19	MONTH	march	[mɑːʧ]	март	she'll be back around the first of March	она вернется примерно в первого марта	\N	\N	\N	\N	\N	\N	\N	\N	\N
7	WEEKDAY	monday	[ˈmʌndɪ]	понедельник	i'll tell you all about it on Monday	я тебе все расскажу в понедельник	lunes	Te lo contaré todo el lunes	[ˈlunes]	\N	\N	\N	\N	\N	\N
8	WEEKDAY	tuesday	[ˈtjuːzdɪ]	вторник	it's Tuesday, you know	ты же знаешь, сегодня вторник	martes	es martes, ya sabes	[ˈmaɾtes]	\N	\N	\N	\N	\N	\N
11	WEEKDAY	friday	[ˈfraɪdɪ]	пятница	would Friday at noon be convenient?	удобно ли будет в пятницу в полдень?	viernes	¿será conveniente el viernes al mediodía?	[ˈbjeɾnes]	\N	\N	\N	\N	\N	\N
9	WEEKDAY	wednesday	[ˈwenzdɪ]	среда	call me on Wednesday	позвоните мне в среду	miércoles	Llámame el miércoles	[ˈmjeɾkoles]	\N	\N	\N	\N	\N	\N
10	WEEKDAY	thursday	[ˈθɜːzdɪ]	четверг	he'll arrive Thursday night	он приедет в четверг вечером	jueves	llegará el jueves por la noche	[ˈxweβes]	\N	\N	\N	\N	\N	\N
12	WEEKDAY	saturday	[ˈsætədɪ]	суббота	saturday morning	субботнее утро	sábado	sábado por la mañana	[ˈsaβaðo]	\N	\N	\N	\N	\N	\N
40	HUMAN	woman	[ˈwʊmən]	женщина	pretty woman	хорошенькая женщина	\N	\N	\N	\N	\N	\N	\N	\N	\N
14	WEEKDAY	weekdays	[ˈwiːkdeɪz]	будние дни	work during weekdays	работа в будние дни	\N	\N	\N	\N	\N	\N	\N	\N	\N
20	MONTH	april	[ˈeɪprəl]	апрель	the boat docked at the beginning of April	лодка причалила в начале апреля	\N	\N	\N	\N	\N	\N	\N	\N	\N
21	MONTH	may	[meɪ]	май	one day in early May	в один из дней в начале мая	\N	\N	\N	\N	\N	\N	\N	\N	\N
22	MONTH	june	[ʤuːn]	июнь	I have selected 22nd June	я выбрал(а) 22 июня	\N	\N	\N	\N	\N	\N	\N	\N	\N
25	MONTH	september	[sepˈtembə]	сентябрь	1th September	1 сентября	\N	\N	\N	\N	\N	\N	\N	\N	\N
26	MONTH	october	[ɒkˈtəʊbə]	октябрь	it was October twenty-first	было двадцать первое октября	\N	\N	\N	\N	\N	\N	\N	\N	\N
27	MONTH	november	[nəʊˈvembə]	ноябрь	twenty-two in November	двадцать два в ноябре	\N	\N	\N	\N	\N	\N	\N	\N	\N
28	MONTH	december	[dɪˈsembə]	декабрь	the baby was due in December	ребенок должен был родиться в декабре	\N	\N	\N	\N	\N	\N	\N	\N	\N
23	MONTH	july	[ʤʊˈlaɪ]	июль	more like July than October	больше похоже на июль, чем на октябрь	\N	\N	\N	\N	\N	\N	\N	\N	\N
24	MONTH	august	[ˈɔːgəst]	август	it was August, and bitterly cold	был август, и было холодно	\N	\N	\N	\N	\N	\N	\N	\N	\N
29	YEAR	year	[jɪə]	год	we'll be able to afford a vacation next year	мы сможем позволить себе отпуск в следующем году	\N	\N	\N	\N	\N	\N	\N	\N	\N
6	DAY	the day before yesterday	[ðiː][deɪ][bɪˈfɔː][ˈjestədɪ]	позавчера	they came here day before yesterday	они приехали позавчера	anteayer	llegaron aquí anteayer	[anteaˈɟ͡ʝeɾ]	\N	\N	\N	\N	\N	\N
5	DAY	the day after tomorrow	[ðiː][deɪ][ˈɑːftə][təˈmɒrəʊ]	послезавтра	you'll be released the day after tomorrow	вы будете свободны послезавтра	pasado mañana	estarás libre pasado mañana	[paˈsaðo][maˈɲana]	\N	\N	\N	\N	\N	\N
4	DAY	yesterday	[ˈjestədɪ]	вчера	he was asking about you only yesterday	он спрашивал о тебе только вчера	el ayer	estaba preguntando por ti ayer mismo	[aˈɟ͡ʝeɾ]	\N	\N	\N	\N	\N	\N
3	DAY	tomorrow	[təˈmɒrəʊ]	завтра	you know what's apt to happen tomorrow?	ты знаешь, что должно завтра случиться?	el mañana	¿sabes lo que va a pasar mañana?	[maˈɲana]	\N	\N	\N	\N	\N	\N
2	DAY	today	[təˈdeɪ]	сегодня	today is a awesome weather	сегодня потрясающая погода	hoy	el tiempo hoy es increíble	[oi]	\N	\N	\N	\N	\N	\N
1	DAY	day	[deɪ]	день	rainy day	дождливый день	día	día de lluvia	[ˈdia]	\N	\N	\N	\N	\N	\N
30	YEAR	century	[ˈsenʧərɪ]	век	let us go to the next century	давайте перейдем в следующий век	\N	\N	\N	\N	\N	\N	\N	\N	\N
31	SEASON	spring	[sprɪŋ]	весна	you know Paris in the spring	вы же знаете, каков Париж весной	\N	\N	\N	\N	\N	\N	\N	\N	\N
32	SEASON	summer	[ˈsʌmə]	лето	in the summer they throw apples	летом они кидаются яблоки	\N	\N	\N	\N	\N	\N	\N	\N	\N
33	SEASON	autumn	[ˈɔːtəm]	осень	summer passed into a hot and fragrant autumn	лето перешло в жаркую и благоухающую осень	\N	\N	\N	\N	\N	\N	\N	\N	\N
34	SEASON	winter	[ˈwɪntə]	зима	winter is coming	наступает зима	\N	\N	\N	\N	\N	\N	\N	\N	\N
35	SEASON	season	[siːzn]	сезон	not at this season	не в этом сезоне	\N	\N	\N	\N	\N	\N	\N	\N	\N
42	FAMILY	grandmother	[ˈgrænmʌðə]	бабушка	my grandmother educated me	моя бабушка воспитала меня	\N	\N	\N	\N	\N	\N	\N	\N	\N
43	FAMILY	grandfather	[ˈgrændfɑːðə]	дедушка	my grandfather is a doctor	мой дедушка доктор	\N	\N	\N	\N	\N	\N	\N	\N	\N
44	FAMILY	mother	[ˈmʌðə]	мама	i hear you, Mother	я слышу тебя, мама	\N	\N	\N	\N	\N	\N	\N	\N	\N
45	FAMILY	father	[ˈfɑːðə]	папа	his father was born in Tver	его отец родился в Твери	\N	\N	\N	\N	\N	\N	\N	\N	\N
46	FAMILY	son	[sʌn]	сын	my son swam in pool	мой сын плавал в бассейне	\N	\N	\N	\N	\N	\N	\N	\N	\N
47	FAMILY	daughter	[ˈdɔːtə]	дочь	my daughter will play in the garden	моя дочь будет играть в саду	\N	\N	\N	\N	\N	\N	\N	\N	\N
48	FAMILY	aunt	[ɑːnt]	тетя	in the garden of the cousin of my aunt	в саду двоюродного брата моей тети	\N	\N	\N	\N	\N	\N	\N	\N	\N
49	FAMILY	uncle	[ʌŋkl]	дядя	isn't he your uncle?	разве он не твой дядя?	\N	\N	\N	\N	\N	\N	\N	\N	\N
50	FAMILY	grandson	[ˈgrænsʌn]	внук	how is my delicious little grandson?	как дела у моего любимого внука?	\N	\N	\N	\N	\N	\N	\N	\N	\N
51	FAMILY	granddaughter	[ˈgrændɔːtə]	внучка	it's about your granddaughter	речь идет о вашей внучке	\N	\N	\N	\N	\N	\N	\N	\N	\N
52	FAMILY	family	[ˈfæm(ə)lɪ]	семья	this is our family	это наша семья	\N	\N	\N	\N	\N	\N	\N	\N	\N
41	HUMAN	familiar	[fəˈmɪlɪə]	знакомый	this guy looks kind of familiar	этот парень кажется мне знакомым	\N	\N	\N	\N	\N	\N	\N	\N	\N
53	HUMAN	friend	[frend]	друг	tell me about your friend	расскажи мне о своем друге	\N	\N	\N	\N	\N	\N	\N	\N	\N
54	HUMAN	enemy	[ˈenəmɪ]	враг	we share an enemy	у нас общий враг	\N	\N	\N	\N	\N	\N	\N	\N	\N
55	EDUCATION	education	[edjʊˈkeɪʃn]	образование	my college education was all planned out	мое обучение в колледже было полностью спланировано	\N	\N	\N	\N	\N	\N	\N	\N	\N
56	EDUCATION	school	[skuːl]	школа	did you never go to school?	вы никогда не ходили в школу?	\N	\N	\N	\N	\N	\N	\N	\N	\N
57	EDUCATION	university	[juːnɪˈvɜːsɪtɪ]	университет	I've heard of the University	Я слышал об университете	\N	\N	\N	\N	\N	\N	\N	\N	\N
58	EDUCATION	college	[ˈkɒlɪʤ]	колледж	now there wasn't even college	теперь нет даже колледжа	\N	\N	\N	\N	\N	\N	\N	\N	\N
59	EDUCATION	teacher	[ˈtiːʧə]	учитель	english teacher	учитель английского языка	\N	\N	\N	\N	\N	\N	\N	\N	\N
60	EDUCATION	pupil	[pjuːpl]	ученик	clever pupil	умный ученик	\N	\N	\N	\N	\N	\N	\N	\N	\N
61	EDUCATION	student	[ˈstjuːdənt]	студент	I am a student	Я студент	\N	\N	\N	\N	\N	\N	\N	\N	\N
62	EDUCATION	pen	[pen]	ручка	she used a fountain pen	она использовала авторучку	\N	\N	\N	\N	\N	\N	\N	\N	\N
63	EDUCATION	pencil	[pensl]	карандаш	let me get a pencil	дайте мне карандаш	\N	\N	\N	\N	\N	\N	\N	\N	\N
64	EDUCATION	copybook	[ˈkɔpɪbʊk]	тетрадь	you're welcome to take a look at my copybook	можете заглянуть в мою тетрадь	\N	\N	\N	\N	\N	\N	\N	\N	\N
65	EDUCATION	pencil box	[pensl][bɒks]	пенал	you broke my pencil box	ты сломал мой пенал	\N	\N	\N	\N	\N	\N	\N	\N	\N
66	EDUCATION	marker	[ˈmɑːkə]	фломастер	permanent marker	несмываемый фломастер	\N	\N	\N	\N	\N	\N	\N	\N	\N
67	EDUCATION	textbook	[ˈtekstbʊk]	учебник	history textbook	учебник истории	\N	\N	\N	\N	\N	\N	\N	\N	\N
68	EDUCATION	guide	[gaɪd]	руководство	washing machine guide	руководство по стиральной машине	\N	\N	\N	\N	\N	\N	\N	\N	\N
69	EDUCATION	guidelines	[ˈgaɪdlaɪnz]	методические рекомендации	oven guidelines	руководство духовому шкафу	\N	\N	\N	\N	\N	\N	\N	\N	\N
70	EDUCATION	tutorial	[tjuːˈtɔːrɪəl]	руководство	just do the tutorial	просто следуй руководству	\N	\N	\N	\N	\N	\N	\N	\N	\N
\.


--
-- Name: person_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.person_id_seq', 26, true);


--
-- Name: translations_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.translations_id_seq', 2, true);


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

