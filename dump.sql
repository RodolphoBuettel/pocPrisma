--
-- PostgreSQL database dump
--

-- Dumped from database version 14.5 (Ubuntu 14.5-0ubuntu0.22.04.1)
-- Dumped by pg_dump version 14.5 (Ubuntu 14.5-0ubuntu0.22.04.1)

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
-- Name: responsible; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.responsible (
    id integer NOT NULL,
    name text NOT NULL
);


--
-- Name: responsible_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.responsible_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: responsible_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.responsible_id_seq OWNED BY public.responsible.id;


--
-- Name: task; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.task (
    id integer NOT NULL,
    "responsibleId" integer NOT NULL,
    name text NOT NULL,
    description text NOT NULL,
    day date NOT NULL,
    status text NOT NULL
);


--
-- Name: task_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.task_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: task_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.task_id_seq OWNED BY public.task.id;


--
-- Name: responsible id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.responsible ALTER COLUMN id SET DEFAULT nextval('public.responsible_id_seq'::regclass);


--
-- Name: task id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.task ALTER COLUMN id SET DEFAULT nextval('public.task_id_seq'::regclass);


--
-- Data for Name: responsible; Type: TABLE DATA; Schema: public; Owner: -
--

INSERT INTO public.responsible VALUES (1, 'rodolpho');
INSERT INTO public.responsible VALUES (2, 'randolpho');
INSERT INTO public.responsible VALUES (3, 'rods');


--
-- Data for Name: task; Type: TABLE DATA; Schema: public; Owner: -
--

INSERT INTO public.task VALUES (4, 2, 'test3', 'teste3', '2023-01-20', 'em andamento3');
INSERT INTO public.task VALUES (1, 1, 'teste1', 'testando', '2023-01-20', 'finalizado');
INSERT INTO public.task VALUES (5, 1, 'teste4', 'testando4', '2023-01-20', 'em andamento4');


--
-- Name: responsible_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.responsible_id_seq', 3, true);


--
-- Name: task_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.task_id_seq', 5, true);


--
-- Name: responsible responsible_pk; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.responsible
    ADD CONSTRAINT responsible_pk PRIMARY KEY (id);


--
-- Name: task task_pk; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.task
    ADD CONSTRAINT task_pk PRIMARY KEY (id);


--
-- Name: task task_fk0; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.task
    ADD CONSTRAINT task_fk0 FOREIGN KEY ("responsibleId") REFERENCES public.responsible(id);


--
-- PostgreSQL database dump complete
--

