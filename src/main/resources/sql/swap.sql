drop table if exists swap;

create table if not exists swap (
    swap_id int not null auto_increment primary key ,
    user_id int not null ,
    src_path varchar(1024) default null,
    dst_path varchar(1024) default null,
    swap_path varchar(1024) default null,
    create_at datetime default now() ,
    update_at datetime default now() on update now(),
    foreign key (user_id) references user (user_id)
);