--
-- PostgreSQL database dump
--

-- Dumped from database version 17.2 (Debian 17.2-1.pgdg120+1)
-- Dumped by pg_dump version 17.2 (Debian 17.2-1.pgdg120+1)

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
-- Name: public; Type: SCHEMA; Schema: -; Owner: volker
--

-- *not* creating schema, since initdb creates it


ALTER SCHEMA public OWNER TO volker;

--
-- Name: SCHEMA public; Type: COMMENT; Schema: -; Owner: volker
--

COMMENT ON SCHEMA public IS '';


SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: bitacora; Type: TABLE; Schema: public; Owner: volker
--

CREATE TABLE public.bitacora (
    bitacora_id integer NOT NULL,
    tabla character varying(50),
    accion character varying(30),
    fecha timestamp with time zone,
    usuario_id integer,
    glosa text
);


ALTER TABLE public.bitacora OWNER TO volker;

--
-- Name: bitacora_bitacora_id_seq; Type: SEQUENCE; Schema: public; Owner: volker
--

CREATE SEQUENCE public.bitacora_bitacora_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.bitacora_bitacora_id_seq OWNER TO volker;

--
-- Name: bitacora_bitacora_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: volker
--

ALTER SEQUENCE public.bitacora_bitacora_id_seq OWNED BY public.bitacora.bitacora_id;


--
-- Name: categoria; Type: TABLE; Schema: public; Owner: volker
--

CREATE TABLE public.categoria (
    categoria_id integer NOT NULL,
    nombre character varying(50) NOT NULL,
    descripcion text,
    estado boolean DEFAULT true
);


ALTER TABLE public.categoria OWNER TO volker;

--
-- Name: categoria_categoria_id_seq; Type: SEQUENCE; Schema: public; Owner: volker
--

CREATE SEQUENCE public.categoria_categoria_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.categoria_categoria_id_seq OWNER TO volker;

--
-- Name: categoria_categoria_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: volker
--

ALTER SEQUENCE public.categoria_categoria_id_seq OWNED BY public.categoria.categoria_id;


--
-- Name: cliente; Type: TABLE; Schema: public; Owner: volker
--

CREATE TABLE public.cliente (
    cliente_id integer NOT NULL,
    usuario_id integer,
    tipo_cliente_id integer,
    fecha_registro date,
    empresa_id integer
);


ALTER TABLE public.cliente OWNER TO volker;

--
-- Name: cliente_cliente_id_seq; Type: SEQUENCE; Schema: public; Owner: volker
--

CREATE SEQUENCE public.cliente_cliente_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.cliente_cliente_id_seq OWNER TO volker;

--
-- Name: cliente_cliente_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: volker
--

ALTER SEQUENCE public.cliente_cliente_id_seq OWNED BY public.cliente.cliente_id;


--
-- Name: comuna; Type: TABLE; Schema: public; Owner: volker
--

CREATE TABLE public.comuna (
    comuna_id integer NOT NULL,
    nombre_comuna character varying(50) NOT NULL,
    provincia_id integer
);


ALTER TABLE public.comuna OWNER TO volker;

--
-- Name: comuna_comuna_id_seq; Type: SEQUENCE; Schema: public; Owner: volker
--

CREATE SEQUENCE public.comuna_comuna_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.comuna_comuna_id_seq OWNER TO volker;

--
-- Name: comuna_comuna_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: volker
--

ALTER SEQUENCE public.comuna_comuna_id_seq OWNED BY public.comuna.comuna_id;


--
-- Name: detalle_ventas; Type: TABLE; Schema: public; Owner: volker
--

CREATE TABLE public.detalle_ventas (
    detalle_venta_id integer NOT NULL,
    producto_variante_id integer,
    venta_id integer,
    tienda_id integer,
    cantidad integer,
    precio_unitario numeric(10,2),
    subtotal numeric(10,2)
);


ALTER TABLE public.detalle_ventas OWNER TO volker;

--
-- Name: detalle_ventas_detalle_venta_id_seq; Type: SEQUENCE; Schema: public; Owner: volker
--

CREATE SEQUENCE public.detalle_ventas_detalle_venta_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.detalle_ventas_detalle_venta_id_seq OWNER TO volker;

--
-- Name: detalle_ventas_detalle_venta_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: volker
--

ALTER SEQUENCE public.detalle_ventas_detalle_venta_id_seq OWNED BY public.detalle_ventas.detalle_venta_id;


--
-- Name: empresa; Type: TABLE; Schema: public; Owner: volker
--

CREATE TABLE public.empresa (
    empresa_id bigint NOT NULL,
    razon_social character varying(120) NOT NULL,
    rut character varying(20),
    giro character varying(80),
    email character varying(120),
    fecha_creacion timestamp without time zone DEFAULT now(),
    estado boolean DEFAULT true
);


ALTER TABLE public.empresa OWNER TO volker;

--
-- Name: empresa_empresa_id_seq; Type: SEQUENCE; Schema: public; Owner: volker
--

CREATE SEQUENCE public.empresa_empresa_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.empresa_empresa_id_seq OWNER TO volker;

--
-- Name: empresa_empresa_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: volker
--

ALTER SEQUENCE public.empresa_empresa_id_seq OWNED BY public.empresa.empresa_id;


--
-- Name: estado_venta; Type: TABLE; Schema: public; Owner: volker
--

CREATE TABLE public.estado_venta (
    estado_venta_id integer NOT NULL,
    nombre_estado_venta character varying(50)
);


ALTER TABLE public.estado_venta OWNER TO volker;

--
-- Name: estado_venta_estado_venta_id_seq; Type: SEQUENCE; Schema: public; Owner: volker
--

CREATE SEQUENCE public.estado_venta_estado_venta_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.estado_venta_estado_venta_id_seq OWNER TO volker;

--
-- Name: estado_venta_estado_venta_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: volker
--

ALTER SEQUENCE public.estado_venta_estado_venta_id_seq OWNED BY public.estado_venta.estado_venta_id;


--
-- Name: inventario; Type: TABLE; Schema: public; Owner: volker
--

CREATE TABLE public.inventario (
    inventario_id integer NOT NULL,
    tienda_id integer,
    producto_variante_id integer,
    stock integer,
    cdc_create timestamp with time zone,
    cdc_update timestamp with time zone
);


ALTER TABLE public.inventario OWNER TO volker;

--
-- Name: inventario_inventario_id_seq; Type: SEQUENCE; Schema: public; Owner: volker
--

CREATE SEQUENCE public.inventario_inventario_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.inventario_inventario_id_seq OWNER TO volker;

--
-- Name: inventario_inventario_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: volker
--

ALTER SEQUENCE public.inventario_inventario_id_seq OWNED BY public.inventario.inventario_id;


--
-- Name: permiso; Type: TABLE; Schema: public; Owner: volker
--

CREATE TABLE public.permiso (
    permiso_id integer NOT NULL,
    nombre_permiso character varying(50),
    descripcion text
);


ALTER TABLE public.permiso OWNER TO volker;

--
-- Name: permiso_permiso_id_seq; Type: SEQUENCE; Schema: public; Owner: volker
--

CREATE SEQUENCE public.permiso_permiso_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.permiso_permiso_id_seq OWNER TO volker;

--
-- Name: permiso_permiso_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: volker
--

ALTER SEQUENCE public.permiso_permiso_id_seq OWNED BY public.permiso.permiso_id;


--
-- Name: producto; Type: TABLE; Schema: public; Owner: volker
--

CREATE TABLE public.producto (
    producto_id integer NOT NULL,
    nombre_producto character varying(250) NOT NULL,
    descripcion text,
    producto_id_ecommerce integer,
    url_img text,
    estado boolean DEFAULT true,
    empresa_id integer
);


ALTER TABLE public.producto OWNER TO volker;

--
-- Name: producto_atributo_variante; Type: TABLE; Schema: public; Owner: volker
--

CREATE TABLE public.producto_atributo_variante (
    producto_atributo_variante_id integer NOT NULL,
    producto_variante_id integer,
    nombre_atributo character varying(50),
    valor_atributo character varying(100),
    estado boolean DEFAULT true
);


ALTER TABLE public.producto_atributo_variante OWNER TO volker;

--
-- Name: producto_atributo_variante_producto_atributo_variante_id_seq; Type: SEQUENCE; Schema: public; Owner: volker
--

CREATE SEQUENCE public.producto_atributo_variante_producto_atributo_variante_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.producto_atributo_variante_producto_atributo_variante_id_seq OWNER TO volker;

--
-- Name: producto_atributo_variante_producto_atributo_variante_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: volker
--

ALTER SEQUENCE public.producto_atributo_variante_producto_atributo_variante_id_seq OWNED BY public.producto_atributo_variante.producto_atributo_variante_id;


--
-- Name: producto_categoria; Type: TABLE; Schema: public; Owner: volker
--

CREATE TABLE public.producto_categoria (
    producto_categoria_id integer NOT NULL,
    producto_id integer NOT NULL,
    categoria_id integer NOT NULL
);


ALTER TABLE public.producto_categoria OWNER TO volker;

--
-- Name: producto_categoria_producto_categoria_id_seq; Type: SEQUENCE; Schema: public; Owner: volker
--

CREATE SEQUENCE public.producto_categoria_producto_categoria_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.producto_categoria_producto_categoria_id_seq OWNER TO volker;

--
-- Name: producto_categoria_producto_categoria_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: volker
--

ALTER SEQUENCE public.producto_categoria_producto_categoria_id_seq OWNED BY public.producto_categoria.producto_categoria_id;


--
-- Name: producto_producto_id_seq; Type: SEQUENCE; Schema: public; Owner: volker
--

CREATE SEQUENCE public.producto_producto_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.producto_producto_id_seq OWNER TO volker;

--
-- Name: producto_producto_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: volker
--

ALTER SEQUENCE public.producto_producto_id_seq OWNED BY public.producto.producto_id;


--
-- Name: producto_variante; Type: TABLE; Schema: public; Owner: volker
--

CREATE TABLE public.producto_variante (
    producto_variante_id integer NOT NULL,
    producto_id integer,
    sku character varying(250),
    precio numeric(10,2),
    estado boolean DEFAULT true
);


ALTER TABLE public.producto_variante OWNER TO volker;

--
-- Name: producto_variante_producto_variante_id_seq; Type: SEQUENCE; Schema: public; Owner: volker
--

CREATE SEQUENCE public.producto_variante_producto_variante_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.producto_variante_producto_variante_id_seq OWNER TO volker;

--
-- Name: producto_variante_producto_variante_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: volker
--

ALTER SEQUENCE public.producto_variante_producto_variante_id_seq OWNED BY public.producto_variante.producto_variante_id;


--
-- Name: provincia; Type: TABLE; Schema: public; Owner: volker
--

CREATE TABLE public.provincia (
    provincia_id integer NOT NULL,
    nombre_provincia character varying(50) NOT NULL,
    region_id integer
);


ALTER TABLE public.provincia OWNER TO volker;

--
-- Name: provincia_provincia_id_seq; Type: SEQUENCE; Schema: public; Owner: volker
--

CREATE SEQUENCE public.provincia_provincia_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.provincia_provincia_id_seq OWNER TO volker;

--
-- Name: provincia_provincia_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: volker
--

ALTER SEQUENCE public.provincia_provincia_id_seq OWNED BY public.provincia.provincia_id;


--
-- Name: region; Type: TABLE; Schema: public; Owner: volker
--

CREATE TABLE public.region (
    region_id integer NOT NULL,
    nombre_region character varying(50) NOT NULL,
    abreviatura character varying(5),
    capital character varying(50)
);


ALTER TABLE public.region OWNER TO volker;

--
-- Name: region_region_id_seq; Type: SEQUENCE; Schema: public; Owner: volker
--

CREATE SEQUENCE public.region_region_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.region_region_id_seq OWNER TO volker;

--
-- Name: region_region_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: volker
--

ALTER SEQUENCE public.region_region_id_seq OWNED BY public.region.region_id;


--
-- Name: rol; Type: TABLE; Schema: public; Owner: volker
--

CREATE TABLE public.rol (
    rol_id integer NOT NULL,
    nombre_rol character varying(50),
    descripcion text
);


ALTER TABLE public.rol OWNER TO volker;

--
-- Name: rol_permiso; Type: TABLE; Schema: public; Owner: volker
--

CREATE TABLE public.rol_permiso (
    rol_permiso_id integer NOT NULL,
    rol_id integer,
    permiso_id integer
);


ALTER TABLE public.rol_permiso OWNER TO volker;

--
-- Name: rol_permiso_rol_permiso_id_seq; Type: SEQUENCE; Schema: public; Owner: volker
--

CREATE SEQUENCE public.rol_permiso_rol_permiso_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.rol_permiso_rol_permiso_id_seq OWNER TO volker;

--
-- Name: rol_permiso_rol_permiso_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: volker
--

ALTER SEQUENCE public.rol_permiso_rol_permiso_id_seq OWNED BY public.rol_permiso.rol_permiso_id;


--
-- Name: rol_rol_id_seq; Type: SEQUENCE; Schema: public; Owner: volker
--

CREATE SEQUENCE public.rol_rol_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.rol_rol_id_seq OWNER TO volker;

--
-- Name: rol_rol_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: volker
--

ALTER SEQUENCE public.rol_rol_id_seq OWNED BY public.rol.rol_id;


--
-- Name: tienda; Type: TABLE; Schema: public; Owner: volker
--

CREATE TABLE public.tienda (
    tienda_id integer NOT NULL,
    nombre_sucursal character varying(50) NOT NULL,
    direccion character varying(100),
    comuna_id integer,
    estado boolean DEFAULT true,
    empresa_id integer
);


ALTER TABLE public.tienda OWNER TO volker;

--
-- Name: tienda_tienda_id_seq; Type: SEQUENCE; Schema: public; Owner: volker
--

CREATE SEQUENCE public.tienda_tienda_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.tienda_tienda_id_seq OWNER TO volker;

--
-- Name: tienda_tienda_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: volker
--

ALTER SEQUENCE public.tienda_tienda_id_seq OWNED BY public.tienda.tienda_id;


--
-- Name: tipo_cliente; Type: TABLE; Schema: public; Owner: volker
--

CREATE TABLE public.tipo_cliente (
    tipo_cliente_id integer NOT NULL,
    nombre_tipo character varying(50),
    descripcion text
);


ALTER TABLE public.tipo_cliente OWNER TO volker;

--
-- Name: tipo_cliente_tipo_cliente_id_seq; Type: SEQUENCE; Schema: public; Owner: volker
--

CREATE SEQUENCE public.tipo_cliente_tipo_cliente_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.tipo_cliente_tipo_cliente_id_seq OWNER TO volker;

--
-- Name: tipo_cliente_tipo_cliente_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: volker
--

ALTER SEQUENCE public.tipo_cliente_tipo_cliente_id_seq OWNED BY public.tipo_cliente.tipo_cliente_id;


--
-- Name: usuario; Type: TABLE; Schema: public; Owner: volker
--

CREATE TABLE public.usuario (
    usuario_id integer NOT NULL,
    nombre_usuario character varying(100),
    email character varying(60),
    clave_hash character varying(255),
    rol_id integer,
    activo boolean,
    fecha_creacion timestamp with time zone,
    empresa_id integer
);


ALTER TABLE public.usuario OWNER TO volker;

--
-- Name: usuario_usuario_id_seq; Type: SEQUENCE; Schema: public; Owner: volker
--

CREATE SEQUENCE public.usuario_usuario_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.usuario_usuario_id_seq OWNER TO volker;

--
-- Name: usuario_usuario_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: volker
--

ALTER SEQUENCE public.usuario_usuario_id_seq OWNED BY public.usuario.usuario_id;


--
-- Name: ventas; Type: TABLE; Schema: public; Owner: volker
--

CREATE TABLE public.ventas (
    venta_id integer NOT NULL,
    estado_venta_id integer,
    tienda_id integer,
    fecha date,
    total numeric(10,2),
    medio_de_pago character varying(50) NOT NULL
);


ALTER TABLE public.ventas OWNER TO volker;

--
-- Name: COLUMN ventas.medio_de_pago; Type: COMMENT; Schema: public; Owner: volker
--

COMMENT ON COLUMN public.ventas.medio_de_pago IS 'efectivo-transferencia-credito-debito';


--
-- Name: ventas_venta_id_seq; Type: SEQUENCE; Schema: public; Owner: volker
--

CREATE SEQUENCE public.ventas_venta_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.ventas_venta_id_seq OWNER TO volker;

--
-- Name: ventas_venta_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: volker
--

ALTER SEQUENCE public.ventas_venta_id_seq OWNED BY public.ventas.venta_id;


--
-- Name: bitacora bitacora_id; Type: DEFAULT; Schema: public; Owner: volker
--

ALTER TABLE ONLY public.bitacora ALTER COLUMN bitacora_id SET DEFAULT nextval('public.bitacora_bitacora_id_seq'::regclass);


--
-- Name: categoria categoria_id; Type: DEFAULT; Schema: public; Owner: volker
--

ALTER TABLE ONLY public.categoria ALTER COLUMN categoria_id SET DEFAULT nextval('public.categoria_categoria_id_seq'::regclass);


--
-- Name: cliente cliente_id; Type: DEFAULT; Schema: public; Owner: volker
--

ALTER TABLE ONLY public.cliente ALTER COLUMN cliente_id SET DEFAULT nextval('public.cliente_cliente_id_seq'::regclass);


--
-- Name: comuna comuna_id; Type: DEFAULT; Schema: public; Owner: volker
--

ALTER TABLE ONLY public.comuna ALTER COLUMN comuna_id SET DEFAULT nextval('public.comuna_comuna_id_seq'::regclass);


--
-- Name: detalle_ventas detalle_venta_id; Type: DEFAULT; Schema: public; Owner: volker
--

ALTER TABLE ONLY public.detalle_ventas ALTER COLUMN detalle_venta_id SET DEFAULT nextval('public.detalle_ventas_detalle_venta_id_seq'::regclass);


--
-- Name: empresa empresa_id; Type: DEFAULT; Schema: public; Owner: volker
--

ALTER TABLE ONLY public.empresa ALTER COLUMN empresa_id SET DEFAULT nextval('public.empresa_empresa_id_seq'::regclass);


--
-- Name: estado_venta estado_venta_id; Type: DEFAULT; Schema: public; Owner: volker
--

ALTER TABLE ONLY public.estado_venta ALTER COLUMN estado_venta_id SET DEFAULT nextval('public.estado_venta_estado_venta_id_seq'::regclass);


--
-- Name: inventario inventario_id; Type: DEFAULT; Schema: public; Owner: volker
--

ALTER TABLE ONLY public.inventario ALTER COLUMN inventario_id SET DEFAULT nextval('public.inventario_inventario_id_seq'::regclass);


--
-- Name: permiso permiso_id; Type: DEFAULT; Schema: public; Owner: volker
--

ALTER TABLE ONLY public.permiso ALTER COLUMN permiso_id SET DEFAULT nextval('public.permiso_permiso_id_seq'::regclass);


--
-- Name: producto producto_id; Type: DEFAULT; Schema: public; Owner: volker
--

ALTER TABLE ONLY public.producto ALTER COLUMN producto_id SET DEFAULT nextval('public.producto_producto_id_seq'::regclass);


--
-- Name: producto_atributo_variante producto_atributo_variante_id; Type: DEFAULT; Schema: public; Owner: volker
--

ALTER TABLE ONLY public.producto_atributo_variante ALTER COLUMN producto_atributo_variante_id SET DEFAULT nextval('public.producto_atributo_variante_producto_atributo_variante_id_seq'::regclass);


--
-- Name: producto_categoria producto_categoria_id; Type: DEFAULT; Schema: public; Owner: volker
--

ALTER TABLE ONLY public.producto_categoria ALTER COLUMN producto_categoria_id SET DEFAULT nextval('public.producto_categoria_producto_categoria_id_seq'::regclass);


--
-- Name: producto_variante producto_variante_id; Type: DEFAULT; Schema: public; Owner: volker
--

ALTER TABLE ONLY public.producto_variante ALTER COLUMN producto_variante_id SET DEFAULT nextval('public.producto_variante_producto_variante_id_seq'::regclass);


--
-- Name: provincia provincia_id; Type: DEFAULT; Schema: public; Owner: volker
--

ALTER TABLE ONLY public.provincia ALTER COLUMN provincia_id SET DEFAULT nextval('public.provincia_provincia_id_seq'::regclass);


--
-- Name: region region_id; Type: DEFAULT; Schema: public; Owner: volker
--

ALTER TABLE ONLY public.region ALTER COLUMN region_id SET DEFAULT nextval('public.region_region_id_seq'::regclass);


--
-- Name: rol rol_id; Type: DEFAULT; Schema: public; Owner: volker
--

ALTER TABLE ONLY public.rol ALTER COLUMN rol_id SET DEFAULT nextval('public.rol_rol_id_seq'::regclass);


--
-- Name: rol_permiso rol_permiso_id; Type: DEFAULT; Schema: public; Owner: volker
--

ALTER TABLE ONLY public.rol_permiso ALTER COLUMN rol_permiso_id SET DEFAULT nextval('public.rol_permiso_rol_permiso_id_seq'::regclass);


--
-- Name: tienda tienda_id; Type: DEFAULT; Schema: public; Owner: volker
--

ALTER TABLE ONLY public.tienda ALTER COLUMN tienda_id SET DEFAULT nextval('public.tienda_tienda_id_seq'::regclass);


--
-- Name: tipo_cliente tipo_cliente_id; Type: DEFAULT; Schema: public; Owner: volker
--

ALTER TABLE ONLY public.tipo_cliente ALTER COLUMN tipo_cliente_id SET DEFAULT nextval('public.tipo_cliente_tipo_cliente_id_seq'::regclass);


--
-- Name: usuario usuario_id; Type: DEFAULT; Schema: public; Owner: volker
--

ALTER TABLE ONLY public.usuario ALTER COLUMN usuario_id SET DEFAULT nextval('public.usuario_usuario_id_seq'::regclass);


--
-- Name: ventas venta_id; Type: DEFAULT; Schema: public; Owner: volker
--

ALTER TABLE ONLY public.ventas ALTER COLUMN venta_id SET DEFAULT nextval('public.ventas_venta_id_seq'::regclass);


--
-- Name: bitacora bitacora_pkey; Type: CONSTRAINT; Schema: public; Owner: volker
--

ALTER TABLE ONLY public.bitacora
    ADD CONSTRAINT bitacora_pkey PRIMARY KEY (bitacora_id);


--
-- Name: categoria categoria_pkey; Type: CONSTRAINT; Schema: public; Owner: volker
--

ALTER TABLE ONLY public.categoria
    ADD CONSTRAINT categoria_pkey PRIMARY KEY (categoria_id);


--
-- Name: cliente cliente_pkey; Type: CONSTRAINT; Schema: public; Owner: volker
--

ALTER TABLE ONLY public.cliente
    ADD CONSTRAINT cliente_pkey PRIMARY KEY (cliente_id);


--
-- Name: comuna comuna_pkey; Type: CONSTRAINT; Schema: public; Owner: volker
--

ALTER TABLE ONLY public.comuna
    ADD CONSTRAINT comuna_pkey PRIMARY KEY (comuna_id);


--
-- Name: detalle_ventas detalle_ventas_pkey; Type: CONSTRAINT; Schema: public; Owner: volker
--

ALTER TABLE ONLY public.detalle_ventas
    ADD CONSTRAINT detalle_ventas_pkey PRIMARY KEY (detalle_venta_id);


--
-- Name: empresa empresa_pkey; Type: CONSTRAINT; Schema: public; Owner: volker
--

ALTER TABLE ONLY public.empresa
    ADD CONSTRAINT empresa_pkey PRIMARY KEY (empresa_id);


--
-- Name: empresa empresa_rut_key; Type: CONSTRAINT; Schema: public; Owner: volker
--

ALTER TABLE ONLY public.empresa
    ADD CONSTRAINT empresa_rut_key UNIQUE (rut);


--
-- Name: estado_venta estado_venta_pkey; Type: CONSTRAINT; Schema: public; Owner: volker
--

ALTER TABLE ONLY public.estado_venta
    ADD CONSTRAINT estado_venta_pkey PRIMARY KEY (estado_venta_id);


--
-- Name: inventario inventario_pkey; Type: CONSTRAINT; Schema: public; Owner: volker
--

ALTER TABLE ONLY public.inventario
    ADD CONSTRAINT inventario_pkey PRIMARY KEY (inventario_id);


--
-- Name: permiso permiso_pkey; Type: CONSTRAINT; Schema: public; Owner: volker
--

ALTER TABLE ONLY public.permiso
    ADD CONSTRAINT permiso_pkey PRIMARY KEY (permiso_id);


--
-- Name: producto_atributo_variante producto_atributo_variante_pkey; Type: CONSTRAINT; Schema: public; Owner: volker
--

ALTER TABLE ONLY public.producto_atributo_variante
    ADD CONSTRAINT producto_atributo_variante_pkey PRIMARY KEY (producto_atributo_variante_id);


--
-- Name: producto_categoria producto_categoria_pkey; Type: CONSTRAINT; Schema: public; Owner: volker
--

ALTER TABLE ONLY public.producto_categoria
    ADD CONSTRAINT producto_categoria_pkey PRIMARY KEY (producto_categoria_id);


--
-- Name: producto_categoria producto_categoria_producto_id_categoria_id_key; Type: CONSTRAINT; Schema: public; Owner: volker
--

ALTER TABLE ONLY public.producto_categoria
    ADD CONSTRAINT producto_categoria_producto_id_categoria_id_key UNIQUE (producto_id, categoria_id);


--
-- Name: producto producto_pkey; Type: CONSTRAINT; Schema: public; Owner: volker
--

ALTER TABLE ONLY public.producto
    ADD CONSTRAINT producto_pkey PRIMARY KEY (producto_id);


--
-- Name: producto_variante producto_variante_pkey; Type: CONSTRAINT; Schema: public; Owner: volker
--

ALTER TABLE ONLY public.producto_variante
    ADD CONSTRAINT producto_variante_pkey PRIMARY KEY (producto_variante_id);


--
-- Name: provincia provincia_pkey; Type: CONSTRAINT; Schema: public; Owner: volker
--

ALTER TABLE ONLY public.provincia
    ADD CONSTRAINT provincia_pkey PRIMARY KEY (provincia_id);


--
-- Name: region region_pkey; Type: CONSTRAINT; Schema: public; Owner: volker
--

ALTER TABLE ONLY public.region
    ADD CONSTRAINT region_pkey PRIMARY KEY (region_id);


--
-- Name: rol_permiso rol_permiso_pkey; Type: CONSTRAINT; Schema: public; Owner: volker
--

ALTER TABLE ONLY public.rol_permiso
    ADD CONSTRAINT rol_permiso_pkey PRIMARY KEY (rol_permiso_id);


--
-- Name: rol rol_pkey; Type: CONSTRAINT; Schema: public; Owner: volker
--

ALTER TABLE ONLY public.rol
    ADD CONSTRAINT rol_pkey PRIMARY KEY (rol_id);


--
-- Name: tienda tienda_pkey; Type: CONSTRAINT; Schema: public; Owner: volker
--

ALTER TABLE ONLY public.tienda
    ADD CONSTRAINT tienda_pkey PRIMARY KEY (tienda_id);


--
-- Name: tipo_cliente tipo_cliente_pkey; Type: CONSTRAINT; Schema: public; Owner: volker
--

ALTER TABLE ONLY public.tipo_cliente
    ADD CONSTRAINT tipo_cliente_pkey PRIMARY KEY (tipo_cliente_id);


--
-- Name: usuario usuario_pkey; Type: CONSTRAINT; Schema: public; Owner: volker
--

ALTER TABLE ONLY public.usuario
    ADD CONSTRAINT usuario_pkey PRIMARY KEY (usuario_id);


--
-- Name: ventas ventas_pkey; Type: CONSTRAINT; Schema: public; Owner: volker
--

ALTER TABLE ONLY public.ventas
    ADD CONSTRAINT ventas_pkey PRIMARY KEY (venta_id);


--
-- Name: bitacora bitacora_usuario_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: volker
--

ALTER TABLE ONLY public.bitacora
    ADD CONSTRAINT bitacora_usuario_id_fkey FOREIGN KEY (usuario_id) REFERENCES public.usuario(usuario_id);


--
-- Name: cliente cliente_empresa_fk; Type: FK CONSTRAINT; Schema: public; Owner: volker
--

ALTER TABLE ONLY public.cliente
    ADD CONSTRAINT cliente_empresa_fk FOREIGN KEY (empresa_id) REFERENCES public.empresa(empresa_id);


--
-- Name: cliente cliente_tipo_cliente_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: volker
--

ALTER TABLE ONLY public.cliente
    ADD CONSTRAINT cliente_tipo_cliente_id_fkey FOREIGN KEY (tipo_cliente_id) REFERENCES public.tipo_cliente(tipo_cliente_id);


--
-- Name: cliente cliente_usuario_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: volker
--

ALTER TABLE ONLY public.cliente
    ADD CONSTRAINT cliente_usuario_id_fkey FOREIGN KEY (usuario_id) REFERENCES public.usuario(usuario_id);


--
-- Name: comuna comuna_provincia_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: volker
--

ALTER TABLE ONLY public.comuna
    ADD CONSTRAINT comuna_provincia_id_fkey FOREIGN KEY (provincia_id) REFERENCES public.provincia(provincia_id);


--
-- Name: detalle_ventas detalle_ventas_producto_variante_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: volker
--

ALTER TABLE ONLY public.detalle_ventas
    ADD CONSTRAINT detalle_ventas_producto_variante_id_fkey FOREIGN KEY (producto_variante_id) REFERENCES public.producto_variante(producto_variante_id);


--
-- Name: detalle_ventas detalle_ventas_tienda_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: volker
--

ALTER TABLE ONLY public.detalle_ventas
    ADD CONSTRAINT detalle_ventas_tienda_id_fkey FOREIGN KEY (tienda_id) REFERENCES public.tienda(tienda_id);


--
-- Name: detalle_ventas detalle_ventas_venta_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: volker
--

ALTER TABLE ONLY public.detalle_ventas
    ADD CONSTRAINT detalle_ventas_venta_id_fkey FOREIGN KEY (venta_id) REFERENCES public.ventas(venta_id);


--
-- Name: inventario inventario_producto_variante_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: volker
--

ALTER TABLE ONLY public.inventario
    ADD CONSTRAINT inventario_producto_variante_id_fkey FOREIGN KEY (producto_variante_id) REFERENCES public.producto_variante(producto_variante_id);


--
-- Name: inventario inventario_tienda_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: volker
--

ALTER TABLE ONLY public.inventario
    ADD CONSTRAINT inventario_tienda_id_fkey FOREIGN KEY (tienda_id) REFERENCES public.tienda(tienda_id);


--
-- Name: producto_atributo_variante producto_atributo_variante_producto_variante_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: volker
--

ALTER TABLE ONLY public.producto_atributo_variante
    ADD CONSTRAINT producto_atributo_variante_producto_variante_id_fkey FOREIGN KEY (producto_variante_id) REFERENCES public.producto_variante(producto_variante_id);


--
-- Name: producto_categoria producto_categoria_categoria_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: volker
--

ALTER TABLE ONLY public.producto_categoria
    ADD CONSTRAINT producto_categoria_categoria_id_fkey FOREIGN KEY (categoria_id) REFERENCES public.categoria(categoria_id) ON DELETE CASCADE;


--
-- Name: producto_categoria producto_categoria_producto_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: volker
--

ALTER TABLE ONLY public.producto_categoria
    ADD CONSTRAINT producto_categoria_producto_id_fkey FOREIGN KEY (producto_id) REFERENCES public.producto(producto_id) ON DELETE CASCADE;


--
-- Name: producto producto_empresa_fk; Type: FK CONSTRAINT; Schema: public; Owner: volker
--

ALTER TABLE ONLY public.producto
    ADD CONSTRAINT producto_empresa_fk FOREIGN KEY (empresa_id) REFERENCES public.empresa(empresa_id);


--
-- Name: producto_variante producto_variante_producto_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: volker
--

ALTER TABLE ONLY public.producto_variante
    ADD CONSTRAINT producto_variante_producto_id_fkey FOREIGN KEY (producto_id) REFERENCES public.producto(producto_id);


--
-- Name: provincia provincia_region_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: volker
--

ALTER TABLE ONLY public.provincia
    ADD CONSTRAINT provincia_region_id_fkey FOREIGN KEY (region_id) REFERENCES public.region(region_id);


--
-- Name: rol_permiso rol_permiso_permiso_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: volker
--

ALTER TABLE ONLY public.rol_permiso
    ADD CONSTRAINT rol_permiso_permiso_id_fkey FOREIGN KEY (permiso_id) REFERENCES public.permiso(permiso_id);


--
-- Name: rol_permiso rol_permiso_rol_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: volker
--

ALTER TABLE ONLY public.rol_permiso
    ADD CONSTRAINT rol_permiso_rol_id_fkey FOREIGN KEY (rol_id) REFERENCES public.rol(rol_id);


--
-- Name: tienda tienda_comuna_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: volker
--

ALTER TABLE ONLY public.tienda
    ADD CONSTRAINT tienda_comuna_id_fkey FOREIGN KEY (comuna_id) REFERENCES public.comuna(comuna_id);


--
-- Name: tienda tienda_empresa_fk; Type: FK CONSTRAINT; Schema: public; Owner: volker
--

ALTER TABLE ONLY public.tienda
    ADD CONSTRAINT tienda_empresa_fk FOREIGN KEY (empresa_id) REFERENCES public.empresa(empresa_id);


--
-- Name: usuario usuario_empresa_fk; Type: FK CONSTRAINT; Schema: public; Owner: volker
--

ALTER TABLE ONLY public.usuario
    ADD CONSTRAINT usuario_empresa_fk FOREIGN KEY (empresa_id) REFERENCES public.empresa(empresa_id);


--
-- Name: usuario usuario_rol_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: volker
--

ALTER TABLE ONLY public.usuario
    ADD CONSTRAINT usuario_rol_id_fkey FOREIGN KEY (rol_id) REFERENCES public.rol(rol_id);


--
-- Name: ventas ventas_estado_venta_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: volker
--

ALTER TABLE ONLY public.ventas
    ADD CONSTRAINT ventas_estado_venta_id_fkey FOREIGN KEY (estado_venta_id) REFERENCES public.estado_venta(estado_venta_id);


--
-- Name: ventas ventas_tienda_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: volker
--

ALTER TABLE ONLY public.ventas
    ADD CONSTRAINT ventas_tienda_id_fkey FOREIGN KEY (tienda_id) REFERENCES public.tienda(tienda_id);


--
-- Name: SCHEMA public; Type: ACL; Schema: -; Owner: volker
--

REVOKE USAGE ON SCHEMA public FROM PUBLIC;


--
-- PostgreSQL database dump complete
--

