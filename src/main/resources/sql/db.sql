drop table if exists todo;
drop table if exists file;
drop table if exists photo;
drop table if exists user;

-- 用户表
create table if not exists user (
    user_id int not null auto_increment primary key ,
    username varchar(128) not null ,
    password varchar(128) not null ,
    email varchar(256) default null ,
    phone varchar(256) default null ,
    avatar_path varchar(1024) default null ,
    ip_addr varchar(256) default null ,
    create_at datetime default now() ,
    update_at datetime default now() on update now(),
    index idx_username (username),
    index idx_phone (phone)
);

-- 相册表
create table if not exists photo (
    photo_id int not null auto_increment primary key ,
    user_id int not null ,
    name varchar(128) not null ,
    path varchar(1024) not null ,
    size decimal(65,3) not null ,
    place varchar(256) default null ,
    create_at datetime default now() ,
    update_at datetime default now() on update now(),
    index idx_photo_name (name),
    foreign key (user_id) references user (user_id)
);

-- 文件表
create table if not exists file (
    file_id int not null auto_increment primary key ,
    user_id int not null ,
    cate varchar(128) not null ,
    name varchar(128) not null ,
    path varchar(128) not null ,
    size decimal(65,3) not null ,
    type varchar(128) not null ,
    create_at datetime default now() ,
    update_at datetime default now() on update now(),
    index idx_file_name (name),
    index idx_file_path (path),
    foreign key (user_id) references user (user_id)
);

-- 待办列表
create table if not exists todo (
    todo_id int not null auto_increment primary key ,
    user_id int not null ,
    content varchar(1024) not null ,
    is_done tinyint not null default 0 ,
    create_at datetime default now() ,
    update_at datetime default now() on update now(),
    foreign key (user_id) references user (user_id)
);
