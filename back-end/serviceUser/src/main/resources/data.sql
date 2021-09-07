CREATE TABLE IF NOT EXISTS public.users
(
    email character varying(255) COLLATE pg_catalog."default" NOT NULL,
    password character varying(255) COLLATE pg_catalog."default",
    username character varying(255) COLLATE pg_catalog."default",
    roles character varying(255) COLLATE pg_catalog."default",
    CONSTRAINT users_pkey PRIMARY KEY (email)
);
INSERT INTO public.users(email, password, username, roles) VALUES ('admin', 'admin', 'admin', 'admin');
INSERT INTO public.users(email, password, username, roles) VALUES ('guest', 'guest', 'guest', 'guest');