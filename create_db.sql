create database myapp;

use myapp;

create table my_device
(
    id          int unsigned auto_increment primary key,
    cid        varchar(256) default '' not null,
    name        varchar(256) default '' not null,
    cdes        text,
    create_time datetime     default CURRENT_TIMESTAMP not null,
    user		varchar(256) default '' not null
);

create table my_message
(
    id        int unsigned auto_increment	primary key,
    alert     int           default 0                 not null,
    cid      varchar(256)  default ''                not null,
    info      varchar(256)  default ''                not null,
    lat		  float 		default 0.0000            not null,
    lng		  float			default 0.0000            not null,
    timestamp datetime      default CURRENT_TIMESTAMP not null on update CURRENT_TIMESTAMP,
    value     int           default 0                 not null
)charset = utf8;

create table user_info
(
    id       int unsigned auto_increment	primary key,
    name     varchar(256) default '' not null,
    password varchar(256) default '' not null,
    email    varchar(256) default '' not null,
    gender   varchar(256) default '' not null,
    birthday varchar(256) default '' not null
);